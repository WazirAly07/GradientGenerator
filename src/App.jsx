import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [num , setnum] = useState(12);
  const [type , settpye] = useState("linear");
  const [gradient, setgradient] = useState([])

  const gethexcolorcode = () =>{
    const rgb = 255*255*255
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hexcode = int.toString(16)
    const colorhex = hexcode.padStart(6 , "0")
    return `#${colorhex}`
  }
  const generateGradient = () =>{
    const colors = []
    for(let i =0; i <= num; i++){
      const color1 = gethexcolorcode()
      const color2 = gethexcolorcode()
      const degree = Math.floor(Math.random()*360)
      const degreestring = `${degree}deg`
      if(type === "linear"){
        colors.push({
        gradient:`linear-gradient(${degreestring}, ${color1} , ${color2})`,
        css:`background : 'linear-gradient(${degreestring}, ${color1} , ${color2})'`,
      })
      }
      else{
      colors.push({
        gradient:`radial-gradient(circle, ${color1} , ${color2})`,
        css:`background : 'radial-gradient(circle ${color1} , ${color2})'`,
      })
    }
    }
    setgradient(colors)
  }
  const oncopy = (css)=>{
    console.log(css);
    navigator.clipboard.writeText(css)
    toast.success("Copied to clipboard!" ,{position: 'top-center'})

  }
useEffect(()=>{ 
  generateGradient()
},[num , type ])
  return (
    <div className='min-h-screen bg-gray-200 pt-12'>
    <div className='h-[300px]' style={{
      background : 'linear-gradient(79deg, #1ed5d3 , #280c3d)'
    }}></div>
      <div className='w-9/12 mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Gradient Generator </h1>
        <div className='flex gap-4'>
      <input 
      value = {num}
      className='border border-white bg-slate rounded-lg w-[100px] p-2'
      placeholder='12'
      onChange={(e)=>setnum(Number(e.target.value))}
      />
      <select value={type} className='border border-white bg-slate rounded-lg w-[100px] p-2' onChange={(e)=>settpye(e.target.value)}>
        <option vlaue="linear">Linear</option>
        <option vlaue="radial" >radial</option>
      </select>
      <button className='px-8 py-2 bg-indigo-500 text-white rounded font-medium' onClick={generateGradient}>Generate</button>
        </div>
        
      </div>
      <div className='grid grid-4'>
        <div className='h-[180px] rounded-xl bg-red'></div>
        </div>
        <div className='grid grid-cols-4 gap-4 '>
        {
          gradient.map((items , index)=>(
            <div 
            key={index}
            className='h-[180px] relative  rounded-xl ' 
        style={{
          background:items.gradient
        }}>
          <button onClick={()=>oncopy(items.css)} className='bg-black/40 hover:bg-black text-white rounded text-10px py-1 px-2 absolute bottom-1 right-2 '>COPY</button>
        </div>
          ))
        }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App