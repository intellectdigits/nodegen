const express = require('express');
const Model = require('../Model/model');
const courses = require('../Model/courses');
const Cart = require('../Model/Cart');
const Learning = require('../Model/Learning');
const Resource = require('../Model/Resource');
const charts = require('../Model/charts');
const subscription = require('../Model/subscriptions');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const User = require("../Model/user");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const fs = require('fs');
 
const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../Middleware/auth')


router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})
router.post('/post',urlencodedParser, function (req, res) {
   
  const data = new Model({
      name: req.body.name,
      age: req.body.age
  })

  try {
      const dataToSave = data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})
//Get all Method
router.get('/courses/:cat',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const searchTerm = req.params.cat //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find({ category: regex });
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/AllCourses',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const searchTerm = req.params.cat //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/resources',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  try{
      const data = await Resource.find();
      res.status(200).json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/resources/:course',urlencodedParser, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
const course=req.params.course;

  try{
      const data = await Resource.find({course:course});
      res.status(200).json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  res.end()
})
router.get('/course/:id', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try{
      const data = await courses.findById(req.params.id);
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.get('/search/:searchTerm', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const searchTerm = req.params.searchTerm //variable
const regex =  new RegExp(searchTerm,'g'); // correct way
  try{
      const data = await courses.find({ title: regex });
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.get('/carts/:user', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const user=req.params.user;
  try{
      const data = await Cart.find({user});
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.get('/learning/:user', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const user=req.params.user;
  try{
      const data = await Learning.find({user});
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/DelCourse', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      const data = await courses.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.post('/DelRes', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      const data = await Resource.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/CreateSub', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const data = req.body.formData;
  data.forEach(obj => {
    const data = new Learning({
      user:obj.user,
      title: obj.title,
      subDate:obj.subDate
  })

  try {
      const dataToSave = data.save();
     // res.status(200).json(dataToSave)
      Cart.find({user:obj.user}).remove(()=>console.log("user removed"))
  }
  catch (error) {
    //  res.status(400).json({message: error.message})
  }
   console.log(obj.user)
   
});
res.send("yes")
})
router.post('/DelCart', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      console.log(id)
      const data = await Cart.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
router.post('/DelLeraning', async (req, res) => {
  console.log("request sent")
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
      const {id} = req.body;
      console.log(id)
      const data = await Learning.findByIdAndDelete(id)
      res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  
})
//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})
router.post("/subscription", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { fullname, category, course, startDate,startTime,instructor,email,password } = req.body;
console.log(req.body)
    // Validate user input
    if (!(email && password && fullname && course)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await subscription.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await subscription.create({
      fullname: fullname,
      category: category,
      course:course,
      startDate:startDate,
  startTime:startTime,
      instructor:instructor,
      email: email,
      password: encryptedUserPassword,
      token:""
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});
let crypto = require("crypto");
let increment=0;
let id = crypto.randomBytes(16).toString("hex");
let imgurl=id+increment;
const multer =require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, id+increment+".jpg")
  },
})

const upload = multer({ storage: storage })
router.post("/addCourse",upload.single('file'),async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { title, category, desc, ratings,imgUrl,instructor,price} = req.body;
console.log(req.body)
    // Validate user input
    if (!(title && category && desc && ratings)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const course = await courses.create({
      title: title,
      category: category,
      desc:desc,
      instructor:instructor,
      ratings: ratings,
      price: price,
      imgUrl:id+increment
    });

   
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
  increment=increment+1;
 res.end()
 
  // Our register logic ends here
});
let resCount=0;

const Res_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/res/')
  },
  filename: (req, file, cb) => {
    cb(null, id+resCount+".mp4")
  },
})

const Res_upload = multer({ storage: Res_storage })
router.post("/addRes",Res_upload.single('file'),async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { title,desc,course} = req.body;
console.log(req.body)
    // Validate user input
    if (!(title && desc)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const res = await Resource.create({
      course: course, 
      title: title,  
      desc:desc,
      resUrl:id+resCount
    });

   
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
  resCount=resCount+1;
 res.end()
 
  // Our register logic ends here
});
router.post("/addCart", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { user,title,totalPrice} = req.body;
console.log(req.body)
    // Validate user input
    if (!(user &&  totalPrice)) {
      res.status(400).send("All input is required");
    }

   
    // Create user in our database
    const cart = await Cart.create({
      user: user,
      title:title,
      totalPrice: totalPrice,
 
    });

   
    res.status(201).json(cart);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});
router.post("/register", urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our register logic starts here
   try {
    // Get user input
    const { firstname, lastname, email, password } = req.body;
console.log(req.body)
    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      email: email, // sanitize
      password: encryptedUserPassword,
      token:""
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  res.end()
  // Our register logic ends here
});

router.post("/login",  urlencodedParser,async function (req, res) {
  res.header("Access-Control-Allow-Origin", "https://edukis.onrender.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Our login logic starts here
   try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await subscription.findOne({ email });
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      
      // save user token
      user.token = token;
   
   
      res.status(201).json({Token:token,user:user.email});
    }
    return res.status(400).send("Invalid Credentials");
    
  // Our login logic ends here
}
catch(error){}
});
router.post("/email4reset",urlencodedParser,async (req,res)=>{
const {email}=req.body;
const user = await User.findOne({ email });
if(!user){
  res.redirect("/resetForm")
}else{
  let token = jwt.sign(
    { user_id: user._id },
    process.env.TOKEN_KEY,
    {
      expiresIn: "5h",
    }
  );
  
  const data = new resetToken({
    user_id: user._id,
    token: token,
    created_at:Date.now(),
    Expired_at:Date.now()+30*(60*1000)
})

try {
    const dataToSave = data.save();
   res.render("sentEmail",{token:token})
   
}
catch (error) {
    res.status(400).json({message: error.message})
}
}

})

router.get("/logout",(req,res)=>{
  res.clearCookie("token");
  res.end()
})
router.post("/getroute", urlencodedParser, function (req, res) {

fs.readFile(`${req.body.route}`, 'utf8', (err, data) => {
if (err) {
  console.error(err);
  return;
}
res.send(data); 
});

});


 router.post('/createForm', urlencodedParser, function (req, res) {
  console.log('Sent');
  const inputs=req.body.inputs.split(",");
  const inputype=req.body.inputtypes.split(",");
  const tbname=req.body.tbname;
  var html=`<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
    <link rel="stylesheet" href="/style.css" />
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="./css/style.css">
    <!-- End layout styles -->
      <title>Login</title>
  </head>
  
  <body>
<div class="container login-container">
  <div class="card" style="margin-top:100px;">
      <div class="card-content">
        <table border="1" class="table ">
                <thead class="thead-dark">
                  <tr>`
 for(var i=0;i<inputs.length-1;i++){
html=html+` <th>${inputs[i]}</th>`

 }  
                  html=html+`  </tr>
                  </thead>
                  <tbody>
                      <% if(typeof model!= 'undefined') {
                          %>
                          <% for (const cat of model) { %>
                              <tr> 
                                                            
                  <td hidden> <div id="uuid" hidden><%= cat._id%></div></td>
                  `   
                  for(var i=0;i<inputs.length-1;i++){
                    html=html+`<td>

                      <input id="${inputs[i]}" class="au-input au-input--full" value=" <%= cat.${inputs[i]} %>" type="text" name="username" placeholder="Level">  
                  </td>`
                  }   
                  html=html+`<td><button type="button" id="edit" class="btn btn-primary" data-toggle="modal" data-target="#formModal">edit</button>
                  <button type="button" id="delete" class="btn btn-danger"><a href="/del${tbname}/<%= cat._id%>">Delete</a></button></td> </tr>
                  <% } %>

                  <%}%>

                  </tbody>
                  </table>
                  <% if(typeof error !='undefined'){
                    for(var i=0;i<error.length;i++){%>
                  <p style="color: bisque;"><%=error[i]%></p>
                    <%}
                  }%>
                  <form action="${tbname}" method="post"><div class="form-group">`    
              for(var i=0;i<inputs.length-1;i++){
                if(inputype[i]==="select"){
                html=html+ `<div class="form-group">
                <label>${inputs[i]}</label>
                <select class="form-control" name="${inputs[i]}"><option>option1</option><option>option2</option><option>hghgh</option></select>
            </div>`
          }else{
            html=html+ `<div class="form-group">
           
            <input type="${inputype[i]}" class="form-control"  name="${inputs[i]}" placeholder="${inputs[i]}">
            <label>${inputype[i]}</label>
        </div>`
          }
              }
        html=html+`
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  </div>
</div>
        <!-- Modal -->
        <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                <div class="modal-body">
                
                   <form action="updateForm" method="post"><div class="form-group">
                  <input id="editid" type="text" name="editid">
`
                  for(var i=0;i<inputs.length-1;i++){
                    html=html+` <div class="form-group">
                                  
                    <input type="text" class="form-control" id="edit${inputs[i]}"  name="username" placeholder="email">
                    <label>text</label>
                  </div>`
                  }
                  html=html+`  <button id="updateForm" type="button" class="btn btn-primary">Update Form</button>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
        </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="vendors/js/vendor.bundle.base.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.js"></script>
<script>
$(document).on("click","#edit",function(){
$("#editid").val($(this).closest("tr").find("#uuid").text());`;
for(var i=0;i<inputs.length-1;i++){
  html=html+` $("#edit${inputs[i]}").val($(this).closest("tr").find("#${inputs[i]}").val());`
}
html=html+` })
$(document).on("click","#updateForm",function(){

var editid= $("#editid").val();`
for(var i=0;i<inputs.length-1;i++){
  html=html+`  var edit${inputs[i]} = $("#edit${inputs[i]}").val();`
}
html=html+` $.ajax({
  type: "POST",
  url: "update${tbname}",
  data:{_id:editid.trim(),`
  for(var i=0;i<inputs.length-1;i++){
    html=html+`${inputs[i]}:edit${inputs[i]},`
  } 
  html=html+`},
  success(data) {

   location.reload();
 
                    
  },
});  
})

</script>
</body>

</html>`
  fs.writeFile('./views/'+tbname+".ejs", html, function (err) {
              if (err) throw err;
              console.log('Saved!');
              res.end()
              }); 
 var formpost=`
 const errors= require('../middleware/${tbname}');
 const ${tbname}Model = require('../Model/${tbname}Model');
 router.post("/${tbname}", errors, (req,res)=>{
  new ${tbname}Model({`
  for(var i=0;i<inputs.length-1;i++){
formpost=formpost+`${inputs[i]}:req.body.${inputs[i]},`

  }      
formpost=formpost+`}).save().then(()=>{
  res.redirect("/${tbname}View")
})

      })
      router.get('/${tbname}View', urlencodedParser, async function (req, res) {
        const ${tbname}View= await ${tbname}Model.find();
                res.render("${tbname}",{model:${tbname}View})
            
              });   
              router.get('/del${tbname}/:id', urlencodedParser, async function (req, res) {
                const id = req.params.id;
                const data = await ${tbname}Model.findByIdAndDelete(id).deleteOne(()=>res.redirect("/${tbname}View"))
                      });
                      router.post('/update${tbname}', urlencodedParser, async (req, res) => {
                        try {
                            const id = req.body._id;
                            const updatedData = req.body;
                            const options = { new: true };
                      
                            const result = await ${tbname}Model.findByIdAndUpdate(
                                id, updatedData, options
                            )
                      
                            res.redirect("/${tbname}View")
                            console.log("body"+req.body._id)
                        }
                        catch (error) {
                          res.redirect("/${tbname}View")
                            console.log({ message: error.message })
                        }
                      })
      `
      fs.appendFile('./routes/web.js', formpost, function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.end()
        }); 
        const email=req.body.email.split(",")
        const unique=req.body.unique.split(",")
        const min=req.body.min.split(",")
        const max=req.body.max.split(",")
        const required=req.body.required.split(",")
        const regex=req.body.regex.split(",")
var valhtml=`const ${tbname}Model = require("../Model/${tbname}Model");
module.exports=async (req,res, next)=>{
var body=req.body
    let error=[]
   
let fields ={`
for(var i=0;i<email.length-1;i++){
  valhtml=valhtml+`${inputs[i]}:{required:${required[i]},max:${max[i]},min:${min[i]}, email:${email[i]},unique:${unique[i]}},`
}
valhtml=valhtml+`}`
for(var i=0;i<email.length-1;i++){
  
  
  valhtml=valhtml+ ` 
  for(var i=0;i<Object.keys(fields).length;i++) {
   if(req.body.${inputs[i]}===""&&fields.${inputs[i]}.required==true){
    error.push("this field must not be empty");
    console.log("this field must not be empty")
 }
 if(fields.${inputs[i]}.unique===true){
 const oldUser = await ${tbname}Model.findOne({testrun1:req.body.${inputs[i]} });

  if (oldUser) {
    error.push("data is already existing");
  }
}

 if(req.body.${inputs[i]}.length<fields.${inputs[i]}.min){
  error.push("this input must not be less than"+fields.${inputs[i]}.min+"character");

}
if(req.body.${inputs[i]}.length>fields.${inputs[i]}.min){
  error.push("this input must not be greater than"+" "+"fields.${inputs[i]}.max+"character");

}
if(req.body.${inputs[i]}.length>fields.${inputs[i]}.min){
  error.push("this input must not be greater than+" "+"fields.${inputs[i]}.max+"character");

}

}
`

}
valhtml=valhtml+` 
uniqueArray = error.filter(function(item, pos) {
  return error.indexOf(item) == pos;
  })
  const data=await ${tbname}Model.find();
  if(error.length>0){
  res.render("${tbname}",{error:uniqueArray,model:data})
}
else{
console.log(error)
next()
}
} ` 
fs.writeFile('./middleware/'+tbname+".js", valhtml, function (err) {
  if (err) throw err;
  console.log('Saved!');
  res.end()
  }); 
  
  var modeljs=`const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema({` 
 for(var i=0;i<inputs.length-1;i++){
  modeljs=modeljs+ ` ${inputs[i]}: {
  
    type: String
  },`
  }
  modeljs=modeljs+`})

  module.exports = mongoose.model('${tbname}', dataSchema)`      
  fs.writeFile('./Model/'+tbname+"Model.js", modeljs, function (err) {
    if (err) throw err;
    console.log('Saved!');
    res.end()
    });   
});
      router.get("/form",(req,res)=>{
        res.render("form")
      })
      
   
      const registrationSchema= require('../middleware/validation');
      const form = require('../Model/form');
      router.post("/testform", registrationSchema, (req,res)=>{
       const {username,email,password}=req.body;
new form({username:req.body.username,email:req.body.email,password:req.body.password}).save().then(()=>{
  res.redirect("/formView")
})

      })
      router.post('/updateForm', urlencodedParser, async (req, res) => {
        try {
            const id = req.body._id;
            const updatedData = req.body;
            const options = { new: true };
      
            const result = await form.findByIdAndUpdate(
                id, updatedData, options
            )
      
            res.send("success")
            console.log("body"+req.body._id)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
      })
      router.get('/delform/:id', urlencodedParser, async function (req, res) {
        const id = req.params.id;
        const data = await form.findByIdAndDelete(id).deleteOne(()=>res.redirect("/formView"))
              });
      router.get('/formView', urlencodedParser, async function (req, res) {
const formView= await form.find();
        res.render("form",{model:formView})
    
      });
      router.post('/middleware', urlencodedParser, function (req, res) {
      if(req.body.midroutes==="All"){
        fs.appendFile('./Routes/index.js', `
        const ${req.body.midname}=require('../App/Http/Middleware/${req.body.midname}')
        
    router.${req.body.midtypes}('/',${req.body.midname}
        ,(req,res)=>{
          
        });`, function (err) {
            if (err) throw err;
            console.log('Saved!');
            res.end()
            });
            fs.writeFile('./App/Http/Middleware/'+req.body.midname+".js", `
        
            const ${req.body.midname}=(req, res, next) => {
  
              const fs = require('fs'); 
           
              // Function to get current filenames 
              // in directory 
              fs.readdir("./Routes", (err, files) => { 
                if (err) 
                  console.log(err); 
                else { 
                
                  files.forEach(file => { 
                    console.log(files); 
                  }) 
                 console.log("authenticateduser")
                 next()
                } 
               
              })  
             
               
          
            
           }
           module.exports=${req.body.midname};`, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                    res.end()
                    });
                    res.redirect("/cat?message=condocumentation")
          }
          if(req.body.midroutes==="Group"){
            fs.appendFile('./Routes/index.js', `
            const ${req.body.midname}=require('../App/Http/Middleware/${req.body.midname}') 
        router.${req.body.midtypes}(['/group1','/group2','/group3','.../groupn'],${req.body.midname}
            ,(req,res)=>{
             // middleware function
            });`, function (err) {
                if (err) throw err;
                console.log('Saved!');
                res.end()
                });
                fs.writeFile('./App/Http/Middleware/'+req.body.midname+".js", `
        
                const ${req.body.midname}=(req, res, next) => {
      
                  const fs = require('fs'); 
               
                  // Function to get current filenames 
                  // in directory 
                  fs.readdir("./Routes", (err, files) => { 
                    if (err) 
                      console.log(err); 
                    else { 
                    
                      files.forEach(file => { 
                        console.log(files); 
                      }) 
                     console.log("authenticateduser")
                     next()
                    } 
                   
                  })  
                 
                   
              
                
               }
               module.exports=${req.body.midname};`, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                        res.end()
                        }); 
                        res.redirect("/cat?message=condocumentation")   
              }

            });

            router.post('/route', urlencodedParser, function (req, res) {
              fs.appendFile('./Routes/index.js', `
              
          router.post('/${req.body.routename}',${req.body.midlleware}(),${req.body.customMiddleware}()
              ,(req,res)=>{
                res.render(${req.body.view},{${req.body.model}})
              });`, function (err) {
                  if (err) throw err;
                  console.log('Saved!');
                  res.end()
                  });
                  
                  });
                  router.post('/migration', urlencodedParser, function (req, res) {
                   
                    fs.writeFile('./App/Http/Models/'+req.body.migname+".js",`
                    const mongoose = require("mongoose");
                    const dataSchema = new mongoose.Schema({
                       name: {
                            required: true,
                            type: String
                        },
                        age: {
                            required: true,
                            type: Number
                        }
                    })
                    
                    module.exports = mongoose.model(' ${req.body.migname}', dataSchema)`, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                        res.end()
                        });
                        fs.writeFile('./App/Http/Controllers/'+req.body.migname+".js", `
                        
                        const ${req.body.migname}Model = require("../Models/${req.body.migname}");
                        // Assigning to exports will not modify module, must use module.exports
                        module.exports = class  ${req.body.migname}{
                          constructor(record,id) {
                     
                         this.id=id;
                         this.record=record;
                          }
                        
                         
                    store() {
                          
                          const data = new ${req.body.migname}Model(this.record)
                    
                        try {
                            const dataToSave = data.save();
                            console.log(dataToSave)
                        }
                        catch (error) {
                           console.log({message: error.message})
                        }
                          }
                        async  show() {
                            try{
                              const data = await ${req.body.migname}Model.find();
                              console.log(data)
                          }
                          catch(error){
                              console.log({message: error.message})
                          }
                          }
                        async  get() {
                            try{
                              const data = await Tables1.findById(this.id);
                              console.log(data)
                          }
                          catch(error){
                              console.log({message: error.message})
                          }
                          }
                       async   update() {
                            try {
                              const id = this.id;
                              const updatedData = this.record;
                              const options = { new: true };
                      
                              const result = await ${req.body.migname}Model.findByIdAndUpdate(
                                  id, updatedData, options
                              )
                      
                             console.log(result)
                          }
                          catch (error) {
                             console.log({ message: error.message })
                          }
                          }
                        async  delete() {
                            try {
                              const id = this.id;
                              const data = await ${req.body.migname}Model.findByIdAndDelete(id)
                              console.log("data deleted")
                          }
                          catch (error) {
                              res.status(400).json({ message: error.message })
                          }
                          }
                        }`, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                            res.end()
                            });
                            res.redirect("/cat?message=condocumentation")
                        });
                  router.post('/controller', urlencodedParser, function (req, res) {
                  if(req.body.conroutes==="All"){
                    fs.writeFile('./App/Http/Controllers/'+req.body.conname+".js", `// Assigning to exports will not modify module, must use module.exports
                    module.exports = class ${req.body.conname}{
                      constructor(req,res) {
                        this.width = width;
                      }
                    
                      index() {
                     
                      }
                      create() {
                        return this.width ** 2;
                      }
                      store() {
                        return this.width ** 2;
                      }
                      show() {
                        return this.width ** 2;
                      }
                      edit() {
                        return this.width ** 2;
                      }
                      update() {
                        return this.width ** 2;
                      }
                      destroy() {
                        return this.width ** 2;
                      }
                    }`, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                        res.end()
                        });
                      }
                      if(req.body.midroutes==="Group"){
                        fs.appendFile('./Routes/index.js', `
                        
                    router.${req.body.midtypes}(['/group1','/group2','/group3','.../groupn'],${req.body.midname}()
                        ,(req,res)=>{
                         // middleware function
                        });`, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                            res.end()
                            });
                          }
                          res.redirect("/cat?message=condocumentation")
                        });
module.exports=router;
  router.post("/savefile",urlencodedParser, function (req, res) {
    const fs = require('fs');
const content = 'Hello World!';

fs.writeFile('./Routes/index.js', req.body.savefile, err => {
  if (err) {
    console.error(err);
  }
  res.send('changes Made successfully!');
});

  })
router.get("/loginuser",(req,res)=>{ 
  res.render("LoginUser")
})
router.get("/register",(req,res)=>{ 
  res.render("Register")
})
router.get("/datatable",(req,res)=>{ 
  res.render("datatable")
})
router.get("/resetForm",(req,res)=>{ 
  res.render("passReset")
})
const {faker} = require('@faker-js/faker');
const user = require('../Model/user');




const generateUsers = (num) => {
  const user = [];

  for (let i = 0; i < num; i++) {
    const usd = 23;
    const cad = 44;
 
    const eur = 22;
    const crypto = 22;
   

    user.push({
      usd,
      cad,
      eur,
      crypto
    });
  }

  return user;
};
router.get("/seeds",(req,res)=>{
 
  const user = generateUsers(15);
  console.log(user);
  charts.insertMany(user)
  .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
  });
})
router.get("/list",(req,res)=>{
  res.render("listgroup")
})
router.get("/charts",async (req,res)=>{
  
  res.render("charts")
})
router.post('/chartvalues',urlencodedParser,async function (req, res) {
   
  const data = await charts.find();
 res.send(data)
})

