import create from 'zustand';

type EditorStore = {
  code: string;
  setCode: (code: string) => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  code: '',
  setCode(code: string) {
    set({ code });
  },
}));
