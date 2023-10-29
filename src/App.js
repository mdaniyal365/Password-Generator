import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [char, isChar] = useState(false);
  const [number, isNumber] = useState(false);
  const [length, setLength] = useState(8);
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  // function passwordGenerator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "123456789";
    if (char) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      let c = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(c);
    }
    setPassword(pass);
  }, [setPassword, number, length, char]);

  useEffect(() => {
    passwordGenerator();
  }, [number, length, char,passwordGenerator]);

  console.log(password);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="outline-none w-full py-1 px-3"
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "
          >
            copy
          </button>
        </div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="cursor-pointer mr-2"
          />
          <label htmlFor="">Length {length}</label>
          <div className="flex items-center gap-x-1 ml-4">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                isNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ml-4">
            <input
              type="checkbox"
              defaultChecked={char}
              id="numberInput"
              onChange={() => {
                isChar((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
