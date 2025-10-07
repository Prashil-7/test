let x:number = 9; //type infering
//ex-->> int x =9;
let y: number | string = 5; 
console.log(x);


 function firstname (n :string){
    console.log("hello "+ n);
    
}

firstname("prahil");

const nums =(n:number , n_2 :number):number=>{
    return n+n_2;
    
}
nums(4,4);

function age(age:number){
    if(age>18){
        return true;
    }
    else{
        return false;
    }
}

console.log(age(5));


function delaycalls(fn:()=> void){
    setTimeout(fn,2000);
}

delaycalls(function (){
    console.log("hello");
    
})

//funcx me object

//types gives to explicitetlly in user obj
function greet(user:{
    name:string,
    age:number
}){
    console.log("user name" +  user.name);
    
}
greet({
    name:"hakirat",
    age:45
})
  

//give s to implicitlly obj
let user={
    name:"prahil",
    age:45
}

//iterfaces


interface userFileds {
    name:string,
    age:number,
    lastanme:string
}

function usergreet(user:userFileds){

}

let new_user: userFileds ={
    name:"prashil",
    age:45,
    lastanme:"lonare"
}

//types

type typesuser ={
    tumharaname:string,
    tumharalastname:string
}
//union 
type suminputs = number

function sum(a:suminputs ,b:suminputs):number{
   return a+b;
   
}

//intersecrtion

 interface manager {
    name:string,
    age:number
 }
 interface emp {
    departaments : string,
    name:string
 }

 //intersection..
 type teadLeads = manager & emp;
 let t :teadLeads={
    name:"sdj",age:45,departaments:"hdx"
 }
