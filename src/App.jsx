



import { useState , useCallback , useEffect ,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [Numberallowed, setNumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [Password, setPassword] = useState("")

  // useRef 

  const passwordref = useRef(null)

  const passwordgenerator = useCallback(()=>{
    let pass= ""

    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (Numberallowed) string += "0123456789"
    if (charallowed) string += "!@#$%^&*-_+=[]{}~`"
    for(let i=1; i<=length;i++){

       let char = Math.floor(Math.random()*string.length+1)
    
       pass += string.charAt(char)

    }

    setPassword(pass)

  },[length,Numberallowed,charallowed,setPassword])
  
  // to save inside of the memonry

  const copyPasswordToCipboard = useCallback( () =>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange()
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  
  
  useEffect( () => {
    passwordgenerator()
  }, [length,charallowed,Numberallowed,passwordgenerator])

  // used to make the code run 

  return (
  
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

    <h1 className='text-white text-center my-3'>Password generator
    </h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordref}
         
      />
      <button
      
      onClick={copyPasswordToCipboard}
      className='outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white'>copy</button>
      </div>

      <div  className='flex text-sm gap-x-2'>

     <div  className='flex items-center gap-x-1'>

      <input type="range" 
      
      min={6}
      max={50}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setlength(e.target.value)}}
      
      />
      <label htmlFor="">Lenght:{length}</label>
     </div>
     <div  className='flex items-center gap-x-1'>

      <input type="checkbox"
      
      defaultChecked={Numberallowed}
      
      id="numberinput"
      
      onClick={()=>{
        setNumberallowed( (prev) => !prev)
      }}
      />
      <label htmlFor="">Numbers</label>
      
      
     </div>
     <div  className='flex items-center gap-x-1'>

      <input type="checkbox"
      
      defaultChecked={charallowed}
      
      id="charinput"
      
      onClick={()=>{
        setcharallowed( (prev) =>!prev)
      }}
      />
      <label htmlFor="">characters</label>
      
      
     </div>
      </div>
      </div>)
}

export default App
