const form = require("../Model/form");

module.exports=(req,res, next)=>{
    let fields ={password:{required:true,max:20,min:10, email:false,unique:false},
    email:{required:true,max:20,min:10, email:true,unique:true}, username:{required:true,max:20,min:10, email:true,unique:true}}
    var body=req.body
    var error=[]
    let b=req.body.password;
   var reqArray =Object.keys(body)
   console.log(Object.keys(fields).length)
   console.log(fields.password.min)
    for(var i=0;i<Object.keys(fields).length;i++) {
        console.log(b.length)
     if(req.body.password===""&&fields.password.required==true){
        error.push("this field must not be empty");
        console.log("this field must not be empty")
     }
     if(req.body.password.length<fields.password.min){
        error.push(`${b} must be above ${fields.password.min} characters`)
        console.log(`${b} must be above ${fields.password.min} characters`)
     }
    
        }
        next()
}