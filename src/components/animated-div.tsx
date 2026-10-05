import { Accessor, children, createEffect, createSignal, JSXElement, on, onMount } from "solid-js";

interface AnimatedDivProps {
    animationClass: string
    children: JSXElement,
    onAnimationDone: () => void,
    runAnimation?: Accessor<boolean>,
}
export const AnimatedDiv = (props: AnimatedDivProps) => {
    const [ref, setRef] = createSignal<HTMLDivElement>();
    let onAnimationEnd: ((ev: AnimationEvent) => void) | null = null
    onMount(async () => {
        const executeAnimation = (classname: string) => {
            return new Promise<boolean>((res, _) => {
                if (onAnimationEnd) {
                    ref()!.removeEventListener("animationend", onAnimationEnd);
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
        if(props.runAnimation === undefined || props.runAnimation()) {
            await executeAnimation(props.animationClass);
            props.onAnimationDone();
        }
        createEffect(async ()=>{
            if(props.runAnimation === undefined) {
                return;
            }
            console.log(props.runAnimation());
            if(props.runAnimation()){
                await executeAnimation(props.animationClass);
                props.onAnimationDone();
            }
        })
    })
    return <div ref={setRef}>
        {props.children}
    </div>
}
