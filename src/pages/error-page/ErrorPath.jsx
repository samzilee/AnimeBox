import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPath = () => {
    setTimeout(() => {
        console.error("Error 404: Page Not Found");
    }, 1000)
    return (
    <main className="flex justify-center items-center p-6 h-dvh">
        <div className='w-[200px] h-[100px] flex flex-col gap-2 justify-center items-center'>
          <h1 className='font-bold text-red-500'>Error 404  Page Not Found</h1>
          <Link
            to="/"
            className="font-bold px-3 w-fit bg-green-500 text-white rounded-md"
          >
           Home
          </Link>
        </div>
    </main>
 );
}

export default ErrorPath

