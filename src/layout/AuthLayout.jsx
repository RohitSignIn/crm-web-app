import React from "react";
import { GiJumpAcross } from "react-icons/gi";

export default function AuthLayout({ children }) {
  return (
    <section
      className='w-full h-screen flex justify-center items-center'
      id='auth'
    >
      <div className='flex-1 hidden md:block md:w-[50%] lg:w-[55%]'>
        <div className='flex justify-center'>
          <img
            className='max-w-[90%] max-h-[90vh] md:min-h-[380px] md:min-w-[400px]'
            src='images/crm.png'
            alt='Login'
          />
        </div>
      </div>
      <div className='w-[400px] md:w-[450px] lg:w-[500px]'>
        <div
          className='h-screen w-full flex flex-col justify-center items-center md:border-l-[2px] border-secondary'
          id='formContainer'
        >
          <div className='max-w-max cursor-pointer mx-6'>
            <div className='my-5'>
              <p className='flex items-center gap-2'>
                <GiJumpAcross className='text-[2rem] hover:fill-primary transition-all ease-in-out duration-200' />{" "}
                <span className='text-[1.4rem]'>Jumble</span>
              </p>
            </div>
            <h1 className='text-xl mb-1'>Welcome to Jumble 😃</h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
