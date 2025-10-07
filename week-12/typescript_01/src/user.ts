// //becomesnext videos

// // ? mark se opton filed isd de warna mat de
// interface User {
//     name:string,
//     age:number,
//     adress ?:{
//         street:string,
//         pincode:number
//     }
// }


// let user_ :User={
//     name:"prahsil",
//     age:21
// }

// // implement the interefaces in class

// interface people {
//     name:string,
//     age:number,
//    // greet:()=>string,
// }

// class userObj implements  people {
//     name:string;
//     age:number;


//     constructor(name:string, age:number){
//         this.name =name;
//         this.age= age
//     }
// }
// let  user_2 =new userObj("prahilloanre",21); 


// abstract class user_3{
//     name:string;
//     //age:number

//     constructor(name: string){
//         this.name = name
//     }
//         abstract greet:()=> string
//         hello(){
//             console.log(`the hweloo`);
            
//         }
// }

// class emp extends user_3{
//     name:string

//     constructor(name:string){
//         super(name)
//         this.name= name;
//     }

//     greet(){
//         return "hii" + this.name  
//     }
// }


//intersection -->> mtlb dono ki prop lega ye

  type Manager ={
    name:string,
    age: number
  }

  type Emp ={
    name:string,
    age:number,
    department: string
  }


  //intersection pura  hona
   type teamLead = Manager & Emp

   let T:teamLead={
    name:"ora",
    age:15,
    department:"networking"
   }


   //union 
   // dono me se ek chez hona 
   // //ya pura 
   type useUnion = Manager | Emp

   const All: useUnion = {
    name:"ora",
    age:15,
    department:"networking"

   }