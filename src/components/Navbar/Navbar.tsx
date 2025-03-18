import React from 'react'
import { Link } from "react-router";

const Navbar = () => {
    const [dark, setDark] = React.useState(document.body.classList.contains("dark"));
    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
  return (
    <div className=' flex justify-between md:items-center px-4 w-full py-4 dark:bg-black border-b border-gray-200 dark:border-gray-900'>
        <div className='flex flex-col md:flex-row gap-8 items-center'>
          <Link to={"/"} >
            <div className='text-red-600 text-2xl font-semibold'>Kaleido<span className='text-gray-900 dark:text-white'>Scope</span></div>
          </Link>
          <Link to={"/favorite"} className='group'>
            <div className='flex items-center text-gray-600 dark:text-white text-base font-medium group-hover:text-red-600'>
              <p>Your Favorites</p>
              <svg className="w-6 h-6 pt-0.5 group-hover:text-red-600 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4"/>
              </svg>
            </div>
          </Link>
        </div>
        <div className='py-1.5'>
          <label className="inline-flex items-center cursor-pointer">
              <input onChange={()=> darkModeHandler()} type="checkbox" checked={dark} className="sr-only peer"/>
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{dark?'Dark':'Light'} Mode</span>
          </label>
        </div> 
        
    </div>    
  )
}

export default Navbar