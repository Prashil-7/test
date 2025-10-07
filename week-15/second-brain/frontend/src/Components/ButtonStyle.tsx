

 interface buttonprops {
    variant : "primary" | "secondary";
    text:string;
    startIcon? : React.ReactElement;
    onclick? :()=>void;
  
}

const variantClass ={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-white",
};
const defaultClass = " p-3 rounded-md font-medium flex items-center cursor-pointer ";




export const ButtonStyle=({variant ,text, startIcon, onclick} : buttonprops)=>{
    return(
        
    <button onClick={onclick} className= {variantClass[variant]  + " " +defaultClass}> 
    <div className="pr-2">{startIcon} </div> 
    {text} </button>
    
    );
}