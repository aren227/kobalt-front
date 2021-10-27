import create from 'zustand';
import { useConsoleStore } from './consoleState';

type SessionStore = {
  ws?: WebSocket;
  requestCompile: (language: string, code: string) => Promise<void>;
  sendToStdIn: (message: string) => void;
  terminate: () => void;
};

type CompileApiResultType =
  | 'success'
  | 'compile_error'
  | 'invalid_request'
  | 'connection_failed';

type CompileApiResult = {
  result: CompileApiResultType;
  address?: string;
  session_id?: string;
  message?: string;
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ws: undefined,
  async requestCompile(language: string, code: string) {
    const { setState, addText, clearText } = useConsoleStore.getState();

    get().ws?.close();

    const ws = new WebSocket(`ws://${process.env.REACT_APP_API_HOST}/`);

    set({ ws });

    clearText();

    setState('compile');
    addText('서버 연결 중...');

    ws.onopen = (e) => {
      clearText();
      addText('컴파일 중...');

      ws.send(JSON.stringify({ type: 'compile', language, code }));
    };

    ws.onmessage = (e) => {
      const packet = JSON.parse(e.data);

      if (packet.type === 'compile_success') {
        clearText();
        setState('running');
      } else if (packet.type === 'compile_error') {
        clearText();
        setState('terminated');
        addText('컴파일 실패');
        addText(packet.out);
      } else if (packet.type === 'stdout') {
        addText(packet.out);
      } else if (packet.type === 'terminated') {
        addText(`프로그램 종료됨 (${packet.code})`);
        setState('terminated');
      } else if (packet.type === 'timeout') {
        addText('세션 시간 만료');
        setState('terminated');
      } else if (packet.type === 'closed') {
        ws.close();
      }
    };

    ws.onerror = (e) => {
      clearText();
      addText('서버 연결 실패');
      setState('terminated');
    };
  },
  sendToStdIn(message: string) {
    get().ws?.send(
      JSON.stringify({
        type: 'stdin',
        in: message,
      })
    );
  },
  terminate() {
    get().ws?.send(
      JSON.stringify({
        type: 'terminate',
      })
    );
  },
}));
