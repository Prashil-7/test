import React, { type ReactElement} from 'react'
import noteIcon from '/note.png'


  interface items {
        icon : ReactElement;
        text: string;
     }


function SidebarItem({icon ,text}:items) {


   


  return (
    <div>
      

      <div className=' flex gap-3  m-4 items-center pl-4'>
        {icon} {text} 
        
        </div>
    </div>
  )
}

export default SidebarItem