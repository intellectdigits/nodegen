
const cat=(req, res) => {
    
     const fs = require('fs'); 
  
     // Function to get current filenames 
     // in directory 
     fs.readdir("./Routes", (err, files) => { 
       if (err) 
         console.log(err); 
       else { 
         console.log("\nCurrent directory filenames:"); 
         files.forEach(file => { 
           console.log(files); 
         }) 
         res.render("cat", { files : files });
       } 
      
     })  
    
      

   
  }
  module.exports=cat;