import React from 'react'
import SidebarItem from './SidebarItem'
import TwitterIcon from '../icons/TwitterIcon'
import YoutubeIcon from '../icons/YoutubeIcon'
import CloseSideBarIcon from '../icons/CloseSideBarIcon'

function Sidebar() {
  return (
    

        <div  className=' fixed  border-r  left-0 top-0 bg-white h-screen w-65 '>



              <div className='top-0 flex  justify-end mr-5 mt-5' onClick={()=>{}}><CloseSideBarIcon/></div>

                <div className=' border-b border-gray-300  flex items-center '>


                     <img src="/note.png" alt=""  className='w-15 m-4'/>
                      <h1 className='text-lg font-medium p-2'> Second Brain</h1>
                      
                </div>


       
       <div className=''>
             <SidebarItem icon={<TwitterIcon/>} text='Twitter' />
            <SidebarItem icon={<YoutubeIcon/>} text='YouTube' />
       </div>


        </div>

 
  )
}

export default Sidebar