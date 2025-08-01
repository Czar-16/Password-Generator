import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

// text-4xl5
function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null); // in this project to show the content which is being copied {basically highlight}

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~!@#$%^&*()_+{}<>?/=";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  // method hai
  const copyPasswordToClipboard = useCallback(() => {
    //" ? means : If passwordRef.current exists, then call .select() on it."
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  // passwordGenerator();
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charAllowed]);

  return (
    <>
      <div className="w-full text-white shadow-md rounded-lg bg-slate-800 mx-auto my-8 max-w-md py-7 mt-64">
        <h1 className="text-white py-2 my-0.5 mb-2 font-medium ">
          Password Generator🔑
        </h1>
        <div className="bg-white rounded-lg flex shadow mb-4 ml-2 mr-2 overflow-hidden">
          <input
            type="text"
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
            className="outline-none w-full py-1.5 px-4 font-medium text-red-600"
          />

          <button
            //mthod hai ye copyPass......
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 ... text-white outline-none px-3 py-1 shrink-0 cursor-pointer "
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer ml-1 mt-1"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label className="ml-2">Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              checked={numbersAllowed} //The checkbox is checked if numbersAllowed is true, unchecked if false
              onChange={() => setNumberAllowed((prev) => !prev)}
            ></input>
            <label className="ml-0.5">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed} //The checkbox is checked if numbersAllowed is true, unchecked if false
              onChange={() => setCharAllowed((prev) => !prev)}
            ></input>
            <label className="ml-0.5">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
