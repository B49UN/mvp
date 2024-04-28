"use client";
import {useState} from "react";

export default function Home() {
  const [isHidden, setIsHidden] = useState(true);

  const toggleText = () => setIsHidden(!isHidden);

  return (
      <main className="center-content flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold">ANSER</h1>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={toggleText}>TEXT</button>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => (document.getElementById('fileInput') as HTMLInputElement)?.click()}>FILE
        </button>
        <input type="file" id="fileInput" className={`${isHidden ? 'hidden' : ''} mt-4`} accept=".pdf,image/*"
               onChange={(e) => console.log(e)}/>
        {isHidden ? null : (
            <textarea id="userText" className="mt-4 p-2 border border-gray-300 rounded"
                      placeholder="Enter text here..."></textarea>
        )}
          <div className="flex mt-4">

              <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer"/>
                  <div
                      className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">학습모드</span>
              </label>


              <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer"/>
                  <div
                      className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">학습지</span>
              </label>

          </div>
          <div className="mt-4">
              <button className="p-2 bg-green-500 text-white rounded" onClick={() => console.log('submitData')}>Submit
              </button>
          </div>
      </main>
  );
}
