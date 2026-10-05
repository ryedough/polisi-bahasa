import { Accessor, createContext, createEffect, createSignal, Match, onMount, Setter, Switch, type Component } from 'solid-js';
import { Classic } from './pages/classic';
import { MainMenu } from './pages/main-menu';

import Arrest from "./assets/arrest.png"
import CopExplain from "./assets/cop-explain.png"
import CopIdle from "./assets/cop-idle.png"
import CopLetgo from "./assets/cop-letgo.png"
import CopTicket from "./assets/cop-ticket.png"
import CopWave from "./assets/cop-wave.png"
import CopWonder from "./assets/cop-wonder.png"
import DudeHappy from "./assets/dude-happy.png"
import DudeScared from "./assets/dude-scared.png"
import DudeTalking from "./assets/dude-talking.png"
import GameBg from "./assets/game-bg.jpg"
import GavelBlock from "./assets/gavel-block.png"
import Gavel from "./assets/gavel.png"
import LetgoGift from "./assets/gift.jpg"
import Heart from "./assets/heart.png"
import LetgoWanted from "./assets/wanted.jpg"

const loadAssets = [
    Arrest, CopExplain, CopIdle, CopLetgo, CopTicket, CopWave, CopWonder, DudeHappy, DudeScared, DudeTalking, GameBg, GavelBlock, Gavel, LetgoGift, LetgoWanted, Heart
]

export enum Page {
    main,
    classic
}

type PageContextType = {
    set: Setter<Page>,
}

export const PageContext = createContext<PageContextType>();

const App: Component = () => {
    const [page, setPage] = createSignal<Page>(Page.main);
    const [assetLoaded, setAssetLoaded] = createSignal(false);

    return <div class='flex justify-center bg-blue-200'>
        <div class={`max-w-lg w-full h-screen relative ${assetLoaded() ? "": "pointer-events-none"}`}>
            {!assetLoaded() && <LoadingScreen loadingItem={loadAssets} onLoaded={()=>setAssetLoaded(true)}/>}
            <PageContext.Provider value={{ set: setPage }}>
                <Switch>
                    <Match when={page() == Page.main}>
                        <MainMenu />
                    </Match>
                    <Match when={page() == Page.classic}>
                        <Classic />
                    </Match>
                </Switch>
            </PageContext.Provider>
        </div>
    </div>
};

interface LoadingScreenProps {
    loadingItem: string[],
    onLoaded: () => void,
}
export const LoadingScreen = (props: LoadingScreenProps) => {
    const [totalItem, setTotalItem] = createSignal(0)
    const [loadedItem, setLoadedItem] = createSignal(0);
    createEffect(()=>{
        if(totalItem() === loadedItem()) {
            props.onLoaded();
        }
    });
    onMount(() => {
        setTotalItem(props.loadingItem.length);
        for (const item of props.loadingItem) {
            function loading(){
                const img = new Image();
                img.src = item;
                img.onload = () => setLoadedItem(p=>p+1); // Resolves when successful
                img.onerror = loading;
            }
            loading();
        }
    })
    return <>
        <div class="w-full h-full absolute left-0 top-0 z-5 bg-blue-500"></div>
        <div class="flex flex-col gap-2 justify-center w-full h-full top-0 left-0 absolute z-6 px-4">
            <div class="text-center text-white font-bold text-2xl">
                Memuat...
            </div>
            <div class="w-full rounded-full h-5 relative overflow-hidden bg-white ">
                <div class="absolute left-0 top-0 h-full bg-yellow-300 transition-all duration-100 " style={{ width: `${(loadedItem()/totalItem()) * 100}%` }}></div>
            </div>
        </div>
    </>
}

export default App;
