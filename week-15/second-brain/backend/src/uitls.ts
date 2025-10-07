export const random = (len :number)=>{
    
    let options = 'lshsdhsdhfjskfn36483dbfsdjh836r48whfc38rydshc8';
    let length = options.length;
    let ans ="";
    
    for(let i=0; i<=len; i++){
        ans+=options[Math.floor(Math.random()*length)]
    }
return ans;
} 