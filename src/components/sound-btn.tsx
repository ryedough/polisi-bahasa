import SoundOn from "../assets/sound-on.png"
import SoundOff from "../assets/sound-off.png"
import { createSignal, Show } from "solid-js"

export const SoundBtn = ()=> {
    const [sound, setSound] = createSignal(false);
    return <button class="w-14 h-14 hover-scale relative rounded-full bg-blue-500 border-4 border-yellow-300"
    onclick={()=>setSound((p)=>!p)}>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={sound() ? SoundOn : SoundOff} alt="" />
        </div>
    </button>
}
