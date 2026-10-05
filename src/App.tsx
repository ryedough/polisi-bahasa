import { Accessor, createContext, createSignal, Match, Setter, Switch, type Component } from 'solid-js';
import { Classic } from './pages/classic';
import { MainMenu } from './pages/main-menu';

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

    return <div class='flex justify-center bg-blue-200'>
        <div class='max-w-lg w-full h-screen'>
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

export default App;
