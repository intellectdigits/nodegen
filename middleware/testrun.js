const testrunModel = require("../Model/testrunModel");
module.exports=async (req,res, next)=>{
var body=req.body
    let error=[]
   
    
let fields ={test1:{required:true,max:22,min:22, email:false,unique:false},test2:{required:false,max:232,min:23, email:false,unique:false},} 
  for(var i=0;i<Object.keys(fields).length;i++) {
   if(req.body.test1===""&&fields.test1.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(fields.test1.unique===true){
 const oldUser = await testrunModel.findOne({testrun1:req.body.test1 });

  if (oldUser) {
    error.push("data is already existing");
  }
}

 if(req.body.test1.length<fields.test1.min){
  error.push("this input must not be less than"+fields.test1.min+"character");

}
if(req.body.test1.length>fields.test1.min){
  error.push("this input must not be greater than"+fields.test1.max+"character");

}
if(req.body.test1.length>fields.test1.min){
  error.push("this input must not be greater than"+fields.test1.max+"character");

}

}
 
  for(var i=0;i<Object.keys(fields).length;i++) {
   if(req.body.test2===""&&fields.test2.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(fields.test2.unique===true){
 const oldUser = await testrunModel.findOne({testrun1:req.body.test2 });

  if (oldUser) {
    error.push("data is already existing");
  }
}

 if(req.body.test2.length<fields.test2.min){
  error.push("this input must not be less than"+fields.test2.min+"character");

}
if(req.body.test2.length>fields.test2.min){
  error.push("this input must not be greater than"+fields.test2.max+"character");

}
if(req.body.test2.length>fields.test2.min){
  error.push("this input must not be greater than"+fields.test2.max+"character");

}

}
 
uniqueArray = error.filter(function(item, pos) {
  return error.indexOf(item) == pos;
  })
  const data=await testrunModel.find();
  if(error.length>0){
  res.render("testrun",{error:uniqueArray,model:data})
}
else{
console.log(error)
next()
}
} 