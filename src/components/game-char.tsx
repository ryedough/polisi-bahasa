import { Accessor, createEffect, createSignal, JSXElement, on, onMount } from "solid-js";

type AnimationClass =
    "fade-in" |
    "fade-in-left" |
    "fade-in-right" |
    "fade-out" |
    "fade-out-left" |
    "fade-out-right" |
"fade-out-right-large" |
    "shake"

export interface Character {
    src?: string,
    enterClass?: AnimationClass,
    exitClass?: AnimationClass,
    overridePrevExitClass? : AnimationClass,
}

interface GameCharProps {
    character: Accessor<Character>;
    onAnimationDone: () => void;
}
export const GameChar = (props: GameCharProps) => {
    const [ref, setRef] = createSignal<HTMLDivElement>();
    const [imgSrc, setImgSrc] = createSignal<string>();
    let onAnimationEnd : ((ev: AnimationEvent)=>void) | null = null
    onMount(() => {
        const executeAnimation = (classname : string)=>{
            return new Promise<boolean>((res, _)=>{
                if(onAnimationEnd){
                    ref()!.removeEventListener("animationend",onAnimationEnd);
                }
                onAnimationEnd = (ev: AnimationEvent) => {
                    res(true);
                    ref()!.removeEventListener("animationend", onAnimationEnd!);
                    onAnimationEnd = null
                    ref()!.className = "";
                }
                ref()!.addEventListener("animationend", onAnimationEnd);
                ref()!.className = classname;
            })
        }
        createEffect(on(props.character, async (char, prevChar, __) => {
            ref()!.className = "";
            if(char.overridePrevExitClass) {
                await executeAnimation(char.overridePrevExitClass);
            }else if(prevChar?.exitClass){
                await executeAnimation(prevChar.exitClass);
            }
            setImgSrc(char.src);
            char.enterClass &&
                await executeAnimation(char.enterClass);
            props.onAnimationDone();
        }));
    })
    return <div ref={setRef}>
        {imgSrc() && <img class="w-full h-full" src={imgSrc()} alt="" />}
    </div>
}
