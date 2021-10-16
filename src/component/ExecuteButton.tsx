import { FaPlay } from 'react-icons/fa';
function ExecuteButton() {
  return (
    <div className="absolute shadow-lg bottom-8 right-8 rounded-full bg-red-500 w-20 h-20 flex">
      <FaPlay color="white" className="w-7 h-7 m-auto" />
    </div>
  );
}

export default ExecuteButton;
