// filters map arr fubnx


// old ways 
const a=[1,2,3,4,5];

//  const newArray=[];

//  for(let i=0 ; i<a.length; i++){
//     newArray.push(a[i] *3);
//  }

//  console.log(newArray);
 

// by maps  its iterate the whoole arr

const ans =a.map((input)=>{
    return input*3;
})
console.log(ans);


//filters  arar arr se kuch nikalna hai to

const arrNew =[];

for (let i=0; i< a.length; i++){

    if(a[i] %2 ==0){
        arrNew.push(a[i]);
    }
}
    console.log("arrnew",arrNew);
    
// by filters

const filterarr = a.filter((i)=>{
    if(i % 2 ==0){
        return true;
    }else{return false}
})

console.log("filterarr",filterarr);
