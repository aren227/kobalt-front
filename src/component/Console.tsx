import { useConsoleStore } from '../state/consoleState';
import { useSessionStore } from '../state/sessionState';
import LanguageDropdowns from './LanguageDropdowns';

function Console() {
  const { output, state, addText } = useConsoleStore();
  const { sendToStdIn } = useSessionStore();

  const onEnterPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      addText(e.target.value);
      sendToStdIn(e.target.value + '\n');
      e.target.value = '';
    }
  };

  return (
    <div className="bg-gray-600 h-64 flex flex-col">
      <LanguageDropdowns />
      <div className="flex-1 bg-gray-800 p-2 font-mono overflow-y-scroll">
        {state === 'init' && (
          <div className="text-gray-400">여기에 실행 결과가 표시됩니다</div>
        )}
        {state !== 'init' && (
          <>
            <div className="text-gray-50">
              {output.map((line, index) => (
                <div key={index}>
                  <span>{line}</span>
                  <br />
                </div>
              ))}
            </div>
            {state === 'running' && (
              <textarea
                className="text-gray-50 bg-gray-800 resize-none focus:outline-none w-full"
                onKeyDown={onEnterPress}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Console;
