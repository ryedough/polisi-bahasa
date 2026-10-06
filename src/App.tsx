import { Accessor, createContext, createEffect, createSignal, Match, onMount, Setter, Show, Switch, type Component } from 'solid-js';
import { Classic } from './pages/classic';
import { MainMenu } from './pages/main-menu';

import { createStore, SetStoreFunction } from 'solid-js/store';
import BgCityDay from "./assets/city-day.jpg";
import CopArrest from "./assets/cop-arrest.png";
import CopExplain from "./assets/cop-explain.png";
import CopIdle from "./assets/cop-idle.png";
import CopLetgo from "./assets/cop-letgo.png";
import CopTicket from "./assets/cop-ticket.png";
import CopWave from "./assets/cop-wave.png";
import CopWonder from "./assets/cop-wonder.png";
import DudeHappy from "./assets/dude-happy.png";
import DudeScared from "./assets/dude-scared.png";
import DudeTalking from "./assets/dude-talking.png";
import GavelBlock from "./assets/gavel-block.png";
import Gavel from "./assets/gavel.png";
import LetgoGift from "./assets/gift.jpg";
import Heart from "./assets/heart.png";
import LetgoWanted from "./assets/wanted.jpg";

const loadAssets = [
    CopArrest, CopExplain, CopIdle, CopLetgo, CopTicket, CopWave, CopWonder, DudeHappy, DudeScared, DudeTalking, BgCityDay, GavelBlock, Gavel, LetgoGift, LetgoWanted, Heart
]

export enum Page {
    main,
    classic
}

type PageContextType = {
    set: Setter<Page>,
}

export namespace GameItems {
    export enum Avatar {
        Cop,
        FemCop,
        RoboCop,
    }

    export enum Background {
        CityDay,
        CityNight,
        VillageDay,
        VillageNight,
        BeachDay,
        BeachNight,
    }
}

export interface PlayerDataContextType {
    equipped: {
        avatar: GameItems.Avatar,
        background: GameItems.Background,
    },
    isUnlocked: {
        avatar: { [k in GameItems.Avatar]: boolean };
        background: { [k in GameItems.Background]: boolean };
    },
    healthRegen: number,
    maxHealth: number,
    coin: number,
}

export const PlayerDataContext = createContext<PlayerDataContextType>()
export const PageContext = createContext<PageContextType>();

const App: Component = () => {
    const [page, setPage] = createSignal<Page>(Page.main);
    const [loaded, setLoaded] = createSignal(false);
    const [player, setPlayer] = createStore<PlayerDataContextType>({
        coin: 0,
        equipped: {
            avatar: GameItems.Avatar.Cop,
            background: GameItems.Background.CityDay,
        },
        isUnlocked: {
            avatar: {
                [GameItems.Avatar.Cop]: true,
                [GameItems.Avatar.FemCop]: false,
                [GameItems.Avatar.RoboCop]: false,
            },
            background: {
                [GameItems.Background.CityDay]: true,
                [GameItems.Background.CityNight]: false,
                [GameItems.Background.VillageDay]: false,
                [GameItems.Background.VillageNight]: false,
                [GameItems.Background.BeachDay]: false,
                [GameItems.Background.BeachNight]: false,
            }
        },
        maxHealth: 3,
        healthRegen: 0,
    });

    // save when playerData changed
    createEffect(()=>{
        localStorage.setItem("coin", player.coin.toString());
        localStorage.setItem("maxHealth", player.maxHealth.toString());
        localStorage.setItem("healthRegen", player.healthRegen.toString());
        localStorage.setItem("isUnlocked", JSON.stringify(player.isUnlocked));
        localStorage.setItem("equipped", JSON.stringify(player.equipped));
    })

    return <div class='flex justify-center bg-blue-200'>
        <div class={`max-w-lg w-full h-screen relative ${loaded() ? "" : "pointer-events-none"}`}>
            {!loaded() && <LoadingScreen setPlayer={setPlayer} loadingItem={loadAssets} onLoaded={() => setLoaded(true)} />}
            <Show when={loaded()}>
                <PageContext.Provider value={{ set: setPage }}>
                    <PlayerDataContext.Provider value={player}>
                        <Switch>
                            <Match when={page() == Page.main}>
                                <MainMenu />
                            </Match>
                            <Match when={page() == Page.classic}>
                                <Classic />
                            </Match>
                        </Switch>
                    </PlayerDataContext.Provider>
                </PageContext.Provider>
            </Show>
        </div>
    </div>
};

interface LoadingScreenProps {
    loadingItem: string[],
    onLoaded: () => void,
    setPlayer: SetStoreFunction<PlayerDataContextType>,
}
export const LoadingScreen = (props: LoadingScreenProps) => {
    const [totalAssets, setTotalAssets] = createSignal(0)
    const [loadedAssets, setLoadedAssets] = createSignal(0);
    const [playerDataLoaded, setPlayerDataLoaded] = createSignal(false);
    createEffect(() => {
        if (totalAssets() === loadedAssets() && playerDataLoaded()) {
            props.onLoaded();
        }
    });
    onMount(() => {
        setTotalAssets(props.loadingItem.length);
        for (const item of props.loadingItem) {
            function loading() {
                const img = new Image();
                img.src = item;
                img.onload = () => setLoadedAssets(p => p + 1); // Resolves when successful
                img.onerror = loading;
            }
            loading();
        }
        const coin_raw = localStorage.getItem("coin");
        const coin = parseInt(coin_raw ?? "0");
        if (coin) {
            props.setPlayer("coin", coin);
        }
        const max_health_raw = localStorage.getItem("maxHealth");
        const max_health = parseInt(max_health_raw ?? "0");
        if (max_health) {
            props.setPlayer("maxHealth", max_health);
        }
        let health_regen_raw = localStorage.getItem("healthRegen");
        const health_regen = parseInt(health_regen_raw ?? "0");
        if (health_regen) {
            props.setPlayer("healthRegen", health_regen);
        }
        const equipped_raw = localStorage.getItem("equipped");
        const equipped = JSON.parse(equipped_raw ?? "{}")
        if (equipped) {
            props.setPlayer("equipped", (curr) => {
                const avatar = equipped.avatar ?? curr.avatar;
                const background = equipped.background ?? curr.background;
                return {
                    avatar,
                    background,
                }
            })
        }
        const unlocked_raw = localStorage.getItem("isUnlocked");
        const unlocked = JSON.parse(unlocked_raw ?? "{}");
        if (unlocked) {
            props.setPlayer("isUnlocked", (curr) => {
                const avatar = { ...curr.avatar, ...(unlocked.avatar ? unlocked.avatar : {}) };
                const background = { ...curr.background, ...(unlocked.background ? unlocked.background : {}) };
                return {
                    avatar,
                    background,
                }
            })
        }
        setPlayerDataLoaded(true);
    })
    return <>
        <div class="w-full h-full absolute left-0 top-0 z-5 bg-blue-500"></div>
        <div class="flex flex-col gap-2 justify-center w-full h-full top-0 left-0 absolute z-6 px-4">
            <div class="text-center text-white font-bold text-2xl">
                Memuat...
            </div>
            <div class="w-full rounded-full h-5 relative overflow-hidden bg-white ">
                <div class="absolute left-0 top-0 h-full bg-yellow-300 transition-all duration-100 " style={{ width: `${(loadedAssets() / (totalAssets() + 1)) * 100}%` }}></div>
            </div>
        </div>
    </>
}

export default App;
