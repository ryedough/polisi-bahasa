import { createMemo, createSignal, onMount, useContext } from "solid-js"
import { GameItems, Page, PageContext, PlayerDataContext } from "../App"
import Cop from "../assets/cop-wave.png"
import FemCop from "../assets/femcop-wave.png"
import RoboCop from "../assets/robocop-wave.png"
import BgImg from "../assets/mainbg.jpg"
import Title from "../assets/title.png"
import { SoundBtn } from "../components/sound-btn"

export const MainMenu = () => {
    const page = useContext(PageContext);
    const playerData = useContext(PlayerDataContext)!;
    const copWaveSrc = createMemo(()=>{
        switch (playerData.equipped.avatar){
            case GameItems.Avatar.Cop : return Cop;
            case GameItems.Avatar.FemCop : return FemCop;
            case GameItems.Avatar.RoboCop : return RoboCop;
        }
    })

    return <div class="flex flex-col h-full bg-blue-300 relative">
        <div class="absolute w-full h-full z-0 overflow-hidden pointer-events-none">
            <div class="z-1 bg-black opacity-20 w-full h-full absolute"></div>
            <img class="z-0 object-cover w-full h-full" src={BgImg} alt="" />
        </div>
        <div class={`flex gap-10 flex-col relative z-1 items-center h-full`}>
            <img src={Title} alt="" />
            <div class="relative mx-2 bg-blue-500/75 font-medium text-yellow-300 border-yellow-300 rounded-lg p-2 pb-24 border-2 overflow-hidden">
                <div>
                    Banyak pelanggaran bahasa ditemukan! Jadilah polisi bahasa dan tangkap kesalahannya.
                </div>
                <img src={copWaveSrc()} alt="" class="absolute bottom-0 right-0 w-28" />
            </div>
            <div class="flex gap-2 flex-col items-center">
                <button
                    onclick={() => page!.set(Page.classic)}
                    class="bg-blue-600 text-yellow-300 border-4 border-yellow-300 w-max p-3 text-3xl font-bold rounded-full hover-scale">Mulai Patroli</button>
            </div>
            { /*<div class="grow flex flex-col-reverse w-full">
                <div class="mx-3 mb-4">
                    <SoundBtn />
                </div>
            </div>*/}
        </div>
    </div>
}

