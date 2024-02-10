const express = require('express');
const Model = require('../Model/model');
const charts = require('../Model/charts');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const User = require("../Model/user");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const fs = require('fs');

const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../Middleware/auth')


module.exports=router;


 const errors= require('../middleware/testrun');
 const testrunModel = require('../Model/testrunModel');
 router.post("/testrun", errors, (req,res)=>{
  new testrunModel({test1:req.body.test1,test2:req.body.test2,}).save().then(()=>{
  res.redirect("/testrunView")
})

      })
      router.get('/testrunView', urlencodedParser, async function (req, res) {
        const testrunView= await testrunModel.find();
                res.render("testrun",{model:testrunView})
            
              });   
              router.get('/deltestrun/:id', urlencodedParser, async function (req, res) {
                const id = req.params.id;
                const data = await testrunModel.findByIdAndDelete(id).deleteOne(()=>res.redirect("/testrunView"))
                      });
                      router.post('/updatetestrun', urlencodedParser, async (req, res) => {
                        try {
                            const id = req.body._id;
                            const updatedData = req.body;
                            const options = { new: true };
                      
                            const result = await testrunModel.findByIdAndUpdate(
                                id, updatedData, options
                            )
                      
                            res.redirect("/testrunView")
                            console.log("body"+req.body._id)
                        }
                        catch (error) {
                          res.redirect("/testrunView")
                            console.log({ message: error.message })
                        }
                      })
      