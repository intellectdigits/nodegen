const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


var app=express();
const PORT = process.env.PORT||3000;
dotenv.config({ path: './config/config.env' })

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Passport config
require('./config/passport')(passport)



// Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine','ejs');

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(require("./routes/index"))
app.use(require("./routes/web"))
app.use('/auth', require('./routes/auth'))
// Set up our main routes

const cat=require("./controller");
app.get('/cat', (req, res) => {
 
    cat(req,res)
    });
    app.get('/dashboard', (req, res) => {
 res.render("welcome")
      });



app.get("/reducer",(req,res)=>{

})
app.listen(PORT,console.log(`listening at ${PORT}`))