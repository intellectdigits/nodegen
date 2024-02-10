const form = require("../Model/undefinedModel");
module.exports=(req,res, next)=>{
var body=req.body
    var error=[]
   
    
let fields ={contact1:{required:dfd,max:30,min:20, email:true,unique:dfdfd},contact2:{required:undefined,max:40,min:10, email:false,unique:undefined},contact3:{required:undefined,max:5,min:5, email:false,unique:undefined},} 
   if(req.body.contact1===""&&fields.contact1.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(req.body.contact1.length<fields.contact1.min){
  error.push("this input must not be less than"+fields.contact1.min+"character");
  console.log("this field must not be empty")
}
if(req.body.contact1.length>fields.contact1.min){
  error.push("this input must not be greater than"+fields.contact1.max+"character");
  console.log("this field must not be empty")
}
if(req.body.contact1.length>fields.contact1.min){
  error.push("this input must not be greater than"+fields.contact1.max+"character");
  console.log("this field must not be empty")
}

 
   if(req.body.contact2===""&&fields.contact2.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(req.body.contact2.length<fields.contact2.min){
  error.push("this input must not be less than"+fields.contact2.min+"character");
  console.log("this field must not be empty")
}
if(req.body.contact2.length>fields.contact2.min){
  error.push("this input must not be greater than"+fields.contact2.max+"character");
  console.log("this field must not be empty")
}
if(req.body.contact2.length>fields.contact2.min){
  error.push("this input must not be greater than"+fields.contact2.max+"character");
  console.log("this field must not be empty")
}

 
   if(req.body.contact3===""&&fields.contact3.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(req.body.contact3.length<fields.contact3.min){
  error.push("this input must not be less than"+fields.contact3.min+"character");
  console.log("this field must not be empty")
}
if(req.body.contact3.length>fields.contact3.min){
  error.push("this input must not be greater than"+fields.contact3.max+"character");
  console.log("this field must not be empty")
}
if(req.body.contact3.length>fields.contact3.min){
  error.push("this input must not be greater than"+fields.contact3.max+"character");
  console.log("this field must not be empty")
}


 
next()
} 
