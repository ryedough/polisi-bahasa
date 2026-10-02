import type { Component } from 'solid-js';
import { MainMenu } from './pages/main-menu';

const App: Component = () => {
  return <div class='flex justify-center bg-blue-200'>
      <div class='max-w-lg w-full h-screen'>
      <MainMenu/>
      </div>
  </div>
};

export default App;
