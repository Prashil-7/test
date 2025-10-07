
import { ShareIcon } from '../icons/shareIcon'


interface CardProps{
  title:string;
  link:string;
  type: "twitter" | "youtube"

  
}




export const  Cards=({title,link,type}: CardProps)=> {
  return (
 <div >
  <div className='  p-3 bg-gray-200 shadow-lg  rounded-md border-slate-300 max-w-96 m-2  border-1 '>
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center'>
                    <span className='text-gray-400'><ShareIcon /></span> 
                     <h4>{title}</h4>
              </div>
                 <div className='flex gap-4 mr-2 text-gray-400'>
                     <a href={link} target='_blank'><ShareIcon/></a>
                     <ShareIcon/>
                  </div>
            </div>
                {/* <h1 className='text-xl font-medium m-2'>You Tube Videos</h1> */}
        <div className='flex items-center justify-center'>
          {type === 'youtube' &&     <iframe className='h-100% ' src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> }
        
        </div>

  </div>


</div>






  )
}

