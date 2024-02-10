const form = require("../Model/moghModel");
module.exports=(req,res, next)=>{
var body=req.body
    var error=[]
   
    
let fields ={uuuu:{required:true,max:777,min:777, email:true,unique:true},} 
  for(var i=0;i<Object.keys(fields).length;i++) {
   if(req.body.uuuu===""&&fields.uuuu.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(req.body.uuuu.length<fields.uuuu.min){
  error.push("this input must not be less than"+fields.uuuu.min+"character");
  console.log("this field must not be empty")
}
if(req.body.uuuu.length>fields.uuuu.min){
  error.push("this input must not be greater than"+fields.uuuu.max+"character");
  console.log("this field must not be empty")
}
if(req.body.uuuu.length>fields.uuuu.min){
  error.push("this input must not be greater than"+fields.uuuu.max+"character");
  console.log("this field must not be empty")
}
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.uuuu)&&fields.uuuu.email===true) {
  return true;
}else{
error.push("You have entered an invalid email address!");
return false;
}
if (fields.uuuu.regex.test(req.body.uuuu)&&fields.uuuu.regex!=="") {
  return true;
}else{
error.push("You have entered an invalid email address!");
return false;
}
}
 
next()
} 