import React from 'react'
import CloseIcon from '../icons/CloseIcon'
import { ButtonStyle } from './ButtonStyle'

function CreateContent({ open, close }) {
  if (!open) return null;

  return (
    <div>
      {/* Overlay */}
      <div className='fixed top-0 left-0 h-screen w-screen bg-slate-800 opacity-60 z-40'></div>
      {/* Modal */}
      <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50'>
        <div className='bg-white p-4 flex flex-col justify-center items-center rounded shadow-lg min-w-[300px]'>
          <div className='w-full flex justify-end mb-2'>
            <button onClick={close} className='p-1 cursor-pointer'>
              <CloseIcon />
            </button>
          </div>
          <h1 className='text-lg text-center text-black font-bold mb-4'>Enter the Details</h1>
          <Input placeholder={"Title"} />
          <Input placeholder={"Link"} />
          <div className='flex justify-center m-2'>
            <ButtonStyle variant='primary' text='submit' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateContent

type InputProps = {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ placeholder, onChange }: InputProps) {
  return (
    <div>
      <input
        type='text'
        placeholder={placeholder}
        className='px-4 py-2 border-b border-red-400 rounded m-3 w-full'
        onChange={onChange}
      />
    </div>
  );
}