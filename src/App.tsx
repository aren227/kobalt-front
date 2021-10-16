import React from 'react';
import Console from './component/Console';
import Editor from './component/Editor';
import Header from './component/Header';

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <Editor />
      <Console />
    </div>
  );
}

export default App;
