import create from 'zustand';

type ConsoleState = 'init' | 'compile' | 'terminated' | 'running';

type ConsoleStore = {
  output: string[];
  state: ConsoleState;
  addText: (text: string) => void;
  clearText: (text: string) => void;
  setState: (state: ConsoleState) => void;
};

export const useConsoleStore = create<ConsoleStore>((set, get) => ({
  output: [],
  state: 'init',
  addText(text: string) {
    set({ output: [...get().output, text + '\n'] });
  },
  clearText() {
    set({ output: [] });
  },
  setState(state: ConsoleState) {
    set({ state });
  },
}));
