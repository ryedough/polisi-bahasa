import { Accessor, batch, children, createEffect, createMemo, createSignal, For, on, onMount, Show, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import Arrest from "../assets/arrest.png"
import LetgoGift from "../assets/gift.jpg"
import LetgoWanted from "../assets/wanted.jpg"
import CopExplain from "../assets/cop-explain.png"
import CopIdle from "../assets/cop-idle.png"
import CopLetgo from "../assets/cop-letgo.png"
import CopTicket from "../assets/cop-ticket.png"
import CopWave from "../assets/cop-wave.png"
import CopWonder from "../assets/cop-wonder.png"
import DudeHappy from "../assets/dude-happy.png"
import DudeScared from "../assets/dude-scared.png"
import DudeTalking from "../assets/dude-talking.png"
import GameBg from "../assets/game-bg.jpg"
import GavelBlock from "../assets/gavel-block.png"
import Gavel from "../assets/gavel.png"
import Heart from "../assets/heart.png"
import { AnimatedDiv } from "../components/animated-div"
import { Character, GameChar } from "../components/game-char"
import { Choice, getQuestions } from "../items/questions"
import { delay } from "../utils/delay"
import { Page, PageContext } from "../App"

export const Classic = () => {
    const [leftChar, _setLeftChar] = createSignal<Character>({});
    let leftCharAnim = Promise.withResolvers<void>();
    async function setLeftChar(c: Character) {
        leftCharAnim = Promise.withResolvers<void>();
        _setLeftChar(c);
        await leftCharAnim.promise;
    }
    const [rightChar, _setRightChar] = createSignal<Character>({});
    let rightCharAnim = Promise.withResolvers<void>();
    async function setRightChar(c: Character) {
        rightCharAnim = Promise.withResolvers<void>();
        _setRightChar(c);
        await rightCharAnim.promise;
    }
    const [text, _setText] = createSignal<string | null>(null);
    let textAnim = Promise.withResolvers<void>();
    async function setText(s: string | null) {
        if (s === null) {
            _setText(null);
            return;
        }
        textAnim = Promise.withResolvers<void>();
        _setText(s);
        await textAnim.promise;
    }

    let gavelAnim = Promise.withResolvers<void>();
    const [currentChoices, setCurrentChoices] = createSignal<Choice[]>([])
    const [choiceId, setChoiceId] = createSignal<number | null>(null);
    const [status, setStatus] = createSignal<"guilty" | "not-guilty" | "wrong-charge" | "pending" | null>(null)
    const [showTicket, setShowTicket] = createSignal<boolean>(false);
    const [ticket, setTicket] = createSignal<boolean>(false);
    const [letgoStatus, setLetgoStatus] = createSignal<boolean>(false);
    const [showLetgoStatus, setShowLetgoStatus] = createSignal<boolean>(false);
    const [health, setHealth] = createSignal<number>(3);
    const [score, setScore] = createSignal<number>(0);
    const [totalQuestion, setTotalQuestion] = createSignal<number>(0);
    const [gameOver, setGameOver] = createSignal(false);
    const questions = getQuestions(10);
    let questionIdx = -1;

    onMount(async () => {
        setTotalQuestion(questions.length);
        nextQuestion();
    })

    async function nextQuestion() {
        batch(() => {
            setCurrentChoices([]);
            setChoiceId(null);
            setShowLetgoStatus(false);
            setStatus(null);
            setShowTicket(false);
            setTicket(false);
            _setText(null);
        })
        if (questionIdx === questions.length - 1 || health() === 0) {
            setGameOver(true);
            return;
        }

        await setRightChar({
            src: CopIdle,
            enterClass: "fade-in-right"
        })
        await delay(100);
        await setLeftChar({
            enterClass: "fade-in-left",
            src: DudeTalking,
        })
        questionIdx++;
        await setText(questions[questionIdx].text);
        setCurrentChoices(questions[questionIdx].choices);
        await delay(100);
        await setRightChar({
            src: CopWonder,
        })
        setShowTicket(true);
    }

    const onTicket = async () => {
        setTicket(true);
        setRightChar({
            src: CopTicket
        })
        await setLeftChar({
            enterClass: "shake",
            src: DudeScared
        })
    }

    const onLetGo = async () => {
        batch(() => {
            setShowTicket(false);
            _setText(null);
        })
        setRightChar({
            src: CopLetgo,
        })
        await delay(300);
        await setLeftChar({
            src: DudeHappy,
            exitClass: "fade-out-right-large",
        })
        await setLeftChar({});
        await delay(200);
        await setRightChar({ overridePrevExitClass: "fade-out-right" })
        await delay(700);
        if(questions[questionIdx].noRightChoice) {
            setScore(p=>p+1);
            setLetgoStatus(true);
        }else {
            setLetgoStatus(false);
            setHealth(p=>p-1);
        }
        setShowLetgoStatus(true);
        await delay(1500);
        nextQuestion();
    }

    const onTicketCancel = () => {
        setLeftChar({
            src: DudeHappy,
        })
        setRightChar({
            src: CopWonder
        });
        setTicket(false);
    }

    const onTicketAnswer = async (idx: number) => {
        if (choiceId() !== null) return;
        setChoiceId(idx);
        await setRightChar({ overridePrevExitClass: "fade-out-left" });
        await delay(100);
        await setLeftChar({ enterClass: "fade-in-right", src: Arrest, exitClass: "fade-out-left" });
        await delay(300);
        await setLeftChar({});
        await delay(300);
        gavelAnim = Promise.withResolvers();
        setStatus("pending");
        await gavelAnim.promise;
        await delay(500);
        if (questions[questionIdx].noRightChoice) {
            batch(() => {
                setStatus("not-guilty");
                setHealth(p => p - 1);
            })
        } else if (questions[questionIdx].choices[choiceId()!].correct) {
            batch(() => {
                setStatus("guilty");
                setScore(p => p + 1);
            })
        } else {
            setStatus("wrong-charge");
        }
        await delay(1500);
        nextQuestion();
    }

    const statusExist = createMemo(() => !!status());

    const pageContext = useContext(PageContext)!;
    function backToMenu(){
        pageContext.set(Page.main);
    }

    return <div class="relative h-full">
        <Show when={gameOver()}>
            <GameOver score={score} onMenuClick={backToMenu} totalQuestion={totalQuestion} />
        </Show>

        <div class={"absolute left-0 top-0 w-full h-full transition-opacity duration-300 z-3 bg-black " + (showLetgoStatus()? "opacity-50" : "opacity-0 pointer-events-none")}></div>
        <div class={"absolute flex flex-col justify-center left-0 top-0 w-full h-full transition-opacity duration-300 px-3 z-4 " + (showLetgoStatus()? "opacity-100" : "opacity-0 pointer-events-none")}>
            <div class={"px-2 py-5 text-2xl font-medium flex flex-col gap-4 items-center border-2 rounded-lg text-white " + (letgoStatus() ? "bg-green-600 border-green-800" : "bg-red-600 border-red-800")}>
                {letgoStatus() ?
                    <>
                        <img src={LetgoGift} class="h-80 rounded-md"/>
                        <div class="text-center">Keputusan anda benar</div>
                    </> :
                    <>
                        <img src={LetgoWanted} class="transform rotate-6 h-80 rounded-sm"/>
                        <div class="text-center">Anda membiarkan buronan lolos</div>
                    </> }
            </div>
        </div>

        <div class={"transform -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 w-82 h-82 lg:w-96 lg:h-96 rounded-full z-4 transition-all duration-200 pointer-events-none "
            + (status() === 'not-guilty' ? "bg-red-500" : status() === "guilty" ? "bg-green-500" : status() === "wrong-charge" ? "bg-orange-400" : "scale-0 opacity-0")}></div>
        <div class="transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-5 pointer-events-none">
            <div class={"relative transition-opacity duration-500 " + (status() ? "opacity-100" : "opacity-0 pointer-events-none")}>
                <AnimatedDiv runAnimation={statusExist} animationClass="gavel" onAnimationDone={() => { gavelAnim.resolve() }}>
                    <img src={Gavel} class="transform translate-x-18" alt="" />
                </AnimatedDiv>
                <img src={GavelBlock} alt="" />
                <div class="absolute top-full flex flex-col gap-2 w-full text-center">
                    <div class={"text-2xl font-bold text-white mt-2 transform transition-all duration-200 delay-200 " + (status() !== "pending" ? "opacity-100" : "opacity-0 translate-y-10")}>
                        {status() === "guilty" ? "Tuduhan benar" : status() === "not-guilty" ? "Salah tangkap" : status() === "wrong-charge" ? "Tuduhan salah" : ""}
                    </div>
                </div>
            </div>
        </div>
        <div class={"absolute w-full h-full z-3 bg-black transition-opacity duration-300 " + (status() ? "opacity-50" : "opacity-0 pointer-events-none")}></div>

        <div class="absolute w-full h-full z-1 overflow-hidden bg-black opacity-30" />
        <div class="absolute w-full h-full z-0 overflow-hidden">
            <img src={GameBg} class="w-full h-full object-cover" alt="" />
        </div>
        <div class="flex flex-col p-3 relative z-2 h-full">
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <For each={Array.from({ length: health() })}>
                        {() => <img src={Heart} class="w-12" alt="" />}
                    </For>
                </div>
                <div class="text-2xl flex items-center bg-blue-500/80 border px-2 border-yellow-300 rounded-lg">
                    <span class="text-yellow-300">
                        {score()}
                    </span>
                    <span class="text-white">
                        /{totalQuestion()}
                    </span>
                </div>
            </div>
            <div class="grow"></div>
            <div class="bg-blue-500/80 border-2 border-yellow-300 h-1/2 rounded-lg relative" >
                <div class="absolute bottom-[calc(100%+2px)] w-full">
                    <div class="flex justify-between h-52">
                        <GameChar character={leftChar} onAnimationDone={() => leftCharAnim.resolve()} />
                        <GameChar character={rightChar} onAnimationDone={() => rightCharAnim.resolve()} />
                    </div>
                </div>
                <div class="overflow-scroll h-full">
                    <div class="flex flex-col px-3 py-2 gap-4">
                        {text() &&
                            <Textbox text={text as Accessor<string>} onAnimationDone={() => textAnim.resolve()} />
                        }
                        <Show when={!ticket()}>
                            <div class={"flex flex-col gap-2 transition-opacity duration-300 " + (showTicket() ? "opacity-100" : "opacity-0 pointer-events-none")}>
                                <hr class="text-yellow-300" />
                                <div class="text-yellow-300">Apakah terdapat kesalahan pada teks diatas ?</div>
                                <div class="flex flex-col gap-2 py-2">
                                    < button
                                        onclick={onTicket}
                                        class="bg-blue-600 text-yellow-300 border-2 border-yellow-300 p-2 font-bold rounded-lg transform hover:scale-x-102 cursor-pointer transition-all">
                                        Ya
                                    </button>
                                    <button
                                        class="bg-blue-600 text-yellow-300 border-2 border-yellow-300 p-2 font-bold rounded-lg transform hover:scale-102 cursor-pointer transition-all"
                                        onclick={onLetGo}>
                                        Tidak
                                    </button>
                                </div>
                            </div>
                        </Show>
                        <Show when={ticket()}>
                            <div class={"flex flex-col gap-2 transition-opacity duration-300 " + (showTicket() ? "opacity-100" : "opacity-0 pointer-events-none")}>
                                <hr class="text-yellow-300" />
                                <div class="text-yellow-300">Pilih teks dibawah ini yang sesuai dengan EYD</div>
                                <For each={currentChoices()}>
                                    {(choice, idx) =>
                                        <button
                                            onclick={() => onTicketAnswer(idx())}
                                            class={
                                                " border-2 p-2 rounded-lg transform hover:scale-102 cursor-pointer transition-all "
                                                + (choiceId() !== idx() ? "bg-blue-600 text-yellow-300 border-yellow-300" : "bg-yellow-300 text-blue-600 border-blue-600")
                                            }>
                                            {choice.text}
                                        </button>
                                    }
                                </For>
                                <button
                                    class="border-2 p-2 rounded-lg transform hover:scale-102 cursor-pointer transition-all bg-none text-yellow-300 border-yellow-300"
                                    onclick={onTicketCancel}>
                                    Batal
                                </button>
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

interface GameOverProps {
    score: Accessor<number>,
    totalQuestion: Accessor<number>,
    onMenuClick : ()=>void,
}
const GameOver = (props: GameOverProps) => {
    return <>
        <div class="absolute left-0 top-0 w-full h-full bg-black opacity-50 z-3" />
        <div class="absolute left-0 top-0 w-full h-full flex flex-col justify-center p-2 z-4">
            <div class="bg-blue-500/80 border-2 border-yellow-300 h-1/2 rounded-lg p-2 flex flex-col justify-center items-center gap-2">
                <div class="text-white text-xl">Skor anda</div>
                <div class="text-2xl font-bold -mt-3">
                    <span class="text-yellow-300">
                        {props.score()}
                    </span>
                    <span class="text-white">
                        /{props.totalQuestion()}
                    </span>
                </div>
                <button
                    onclick={() => props.onMenuClick()}
                    class={
                        " border-2 p-2 rounded-lg transform hover:scale-102 cursor-pointer transition-all bg-blue-600 text-yellow-300 border-yellow-300" 
                    }>
                    Kembali ke menu
                </button>
            </div>
        </div>
    </>
}

interface TextboxProps {
    text: Accessor<string>,
    onAnimationDone: () => void,
}

const Textbox = (props: TextboxProps) => {
    const [index, setIndex] = createSignal(0);
    let interval: number | null = null;
    const text = createMemo(() => props.text().slice(0, index()));
    createEffect(on(props.text, (newText) => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        };
        let idx = 0;
        interval = setInterval(() => {
            if (idx == newText.length + 1) {
                clearInterval(interval!);
                props.onAnimationDone();
                return;
            }
            setIndex(idx);
            idx++;
        }, 20);
    }));
    return <div class="text-yellow-300">{text()}</div>
}
