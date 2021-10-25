import { useEditorStore } from '../state/editorState';
import ExecuteButton from './ExecuteButton';

function Editor() {
  const { setCode } = useEditorStore();

  return (
    <div className="flex-1 flex-grow">
      <div className="w-full h-full">
        <textarea
          className="box-border w-full h-full text-gray-50 bg-gray-800 p-2 font-mono resize-none focus:outline-none"
          placeholder="여기에 코드를 작성하세요"
          onChange={(e) => setCode(e.target.value)}
        />
        <ExecuteButton />
      </div>
    </div>
  );
}

export default Editor;
