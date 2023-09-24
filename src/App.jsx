import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(10)
  const [numberAlow, setNumberalow] = useState(false)
  const [charAlow, setCharAlow] = useState(false)
  const [password, setPassword] = useState("")

  //useref ho0k
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAlow) str += "0123456789"
    if (charAlow) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }
    ,
    [length, numberAlow, charAlow, setPassword])

  const startGenerate = () => {
    passwordGenerator()
  }

  const copyPass = useCallback(() => {

    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator
  }, [length, numberAlow, charAlow, passwordGenerator])



  return (
    <>
      <div className='w-full max-w-md mx-auto px-4 py-3 my-8 rounded-lg text-orange-500 bg-gray-700 mt-20'>
        <h1 className='text-4xl text-center'>Password Generator</h1>
        <div className='flex flex-col rounded-lg overflow-hidden mb-4 mt-6'>
          <input type='text'
            value={password}
            className='rounded-lg w-full px-1 py-3'
            placeholder='Password'
            ref={passwordRef}
            readOnly />
          <button className='bg-blue-600 py-2 rounded-lg mt-2 text-white font-medium'
            onClick={copyPass}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-8 xl:flex flex-col'>
          <div className='flex flex-col gap-x-2 w-2/6'>
            <input type='range'
              min={8}
              max={22}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className='cursor-pointer ' />
            <label htmlFor=''>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mt-2'>
            <input type='checkbox'
              defaultChecked={numberAlow}
              id='numberInput'
              onChange={() => {
                setNumberalow((prev) => !prev)
              }} />
            <label htmlFor=''>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={charAlow}
              id='characterInput'
              onChange={() => {
                setCharAlow((prev) => !prev)
              }} />
            <label htmlFor=''>Character</label>
          </div>
          <button className="bg-blue-600 py-2 rounded-lg text-white font-medium mt-5" onClick={startGenerate}>Generate</button>
        </div>
      </div >
    </>
  )
}

export default App
