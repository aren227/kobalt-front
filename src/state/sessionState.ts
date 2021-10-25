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
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ws: undefined,
  async requestCompile(language: string, code: string) {
    const { setState, addText, addRaw, clearText } = useConsoleStore.getState();
    try {
      clearText();

      setState('compile');
      addText('컴파일 중...');

      const response = await fetch('http://localhost:8080/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const data = (await response.json()) as CompileApiResult;

      clearText();

      if (data.result === 'success') {
        get().ws?.close();

        const ws = new WebSocket('ws://localhost:8080/' + data.session_id);

        ws.onmessage = (e) => {
          const packet = JSON.parse(e.data);

          if (packet.type === 'stdout') {
            addRaw(packet.out);
          } else if (packet.type === 'terminated') {
            addText(`프로그램 종료됨 (${packet.code})`);
            setState('terminated');
          } else if (packet.type === 'timeout') {
            addText('세션 시간 만료');
            setState('terminated');
          }
        };

        set({ ws });

        setState('running');

        return;
      }

      setState('terminated');
      if (data.result === 'compile_error') {
        addText('컴파일 실패');
      } else {
        addText('잘못된 접근');
      }
    } catch (err) {
      clearText();
      addText('서버 연결 실패');
    }
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
