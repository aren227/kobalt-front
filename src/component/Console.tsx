import LanguageDropdowns from './LanguageDropdowns';

function Console() {
  return (
    <div className="bg-gray-600 h-64 flex flex-col">
      <LanguageDropdowns />
      <textarea
        className="w-full flex-1 text-gray-50 bg-gray-800 p-2 font-mono resize-none focus:outline-none"
        placeholder="여기에 실행 결과가 표시됩니다"
      />
    </div>
  );
}

export default Console;
