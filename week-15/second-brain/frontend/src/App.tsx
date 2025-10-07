import { ButtonStyle } from "./Components/ButtonStyle"
import { Cards } from "./Components/Cards"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/shareIcon"
import CreateContent from "./Components/CreateContent"
import { useState } from "react"
import Sidebar from "./Components/Sidebar"



function App() {
 const [contentOpen ,setContentOpen] =useState(false)

  return (
<div>
      <Sidebar/>
      

    <div className="p-4 ml-65  top-0 h-screen bg-gray-200">
      <CreateContent open={ contentOpen} close ={()=>
      {setContentOpen(false );
      }}/>

 <div className="flex justify-end gap-4  p-4">
       <ButtonStyle onclick={()=>{setContentOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon/>}></ButtonStyle>

  <ButtonStyle variant="secondary" text="share Brain" startIcon={<ShareIcon/>}></ButtonStyle>

 </div>
      <div className="flex">
    <Cards type="youtube" title="learning" link="https://www.youtube.com/watch?v=JgDNFQ2RaLQ"  />

    <Cards type="youtube" title="learning" link="https://www.youtube.com/watch?v=JgDNFQ2RaLQ"  />
      </div>


      </div>





</div>   
  )
}

export default App
