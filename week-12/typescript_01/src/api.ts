//  interface User{
//     name:string,
//     age:number
//  } 
// const sumage=(a:User , b:User)=>{
//         return a.age + b.age;
// }

//  const result =sumage({
//     age:21,
//     name:"prashil"
// },{
//     name:"prahfi",
//     age:25
// });

// console.log(result);

//pick 

interface  user {
    name:string,
    age:number,
    password:string,
}

type upadate = Pick<user,"name"|"password">

function use(user:upadate){
    console.log(`${user.name},${user.password}`);
    
}