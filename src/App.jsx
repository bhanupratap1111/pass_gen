import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [len, setLen] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
   console.log(passwordRef)
  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*_-"

    for (let i = 0; i < len; i++) {
      let index = Math.floor(Math.random()*str.length)
      pass+= str[index]
    }

    setPassword(pass)

  }, [len, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passGenerator()
  }, [len, numAllowed, charAllowed, passGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-4 my-8 text-blue-500 bg-green-800'> 
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4'>

          <input type="text" value={password} className='outline-none w-full rounded-md py-1 px-3 my-3'
          placeholder='password'
          readOnly
          ref = {passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-md mx-3 my-3'>copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>

            <div className='flex items-center mx-2 gap-x-1'>
              <input 
              type="range" 
              min={6}
              max={50}
              value={len}
              className='cursor-pointer'
              onChange={(e) => {setLen(e.target.value)}}
              />
              <label className='text-white'>Length:{len}</label>
            </div>

            <div className='flex items-center mx-2
            gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              onChange={(e) => {
                setNumAllowed((prev) => !prev);
              }}
              />
              <label className='text-white'>Number</label>
            </div>

            <div className='flex items-center mx-2 gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
              />
              <label className='text-white'>Character</label>
            </div>

          </div>

      </div>
    </>
  )
}

export default App
