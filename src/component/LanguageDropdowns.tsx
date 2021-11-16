import { Menu } from '@headlessui/react';
import { FaSortDown } from 'react-icons/fa';

function LanguageDropdowns() {
  const languages = ['C++'];
  const currentLanguage = 'C++';

  return (
    <div className="flex py-1 px-2 align-middle">
      <div className="text-md text-gray-100">언어</div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-sm w-32 pl-2 text-md text-left font-medium text-gray-100 flex">
            <FaSortDown color="white" className="mr-1" />
            {currentLanguage}
          </Menu.Button>
        </div>

        <Menu.Items className="origin-top-right absolute left-0 mt-1 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            {languages.map((lang) => (
              <Menu.Item>
                {({ active }) => (
                  <div className="block px-2 py-2 text-sm">{lang}</div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default LanguageDropdowns;
