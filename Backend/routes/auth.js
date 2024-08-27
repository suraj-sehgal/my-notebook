const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt =require('bcryptjs');
const { query, validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchuser');

const jwt_secret=process.env.JWT_SECRET;


//ROUTE 1: creating a user using : POST "/api/auth/createuser". NO login required
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password','password must be atleast 5 characters').isLength({min:5}),
] , async (req,res)=>{
    let success=false;

    //if there are errors, returns bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors : errors.array()});
    }

    try {

    //Check whether the user with this email exists already
    let user =await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success,errors : "Sorry, User with this email is already exists"});
    }
    //password encryption
    const salt =await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password,salt);

    user = await User.create ({
        name:req.body.name,
        password: secPass,
        email : req.body.email,
        cpassword:req.body.password,
    });

    // Token Generation
    const data ={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,jwt_secret);
    success=true;
    let userName= user.name;
    res.json({success,userName,authToken});

} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
});

//ROUTE 2: authenticate a user using : POST "/api/auth/login". No login required
router.post('/login',[
    body('email').isEmail(),
    body('password',"Password cannot be blank").exists(),
] , async (req,res)=>{
    let success=false;
    //if there are errors, returns bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success,error :"Please login with correct credentials"});
        }

        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(404).json({success,error :"Please login with correct credentials"});
        }
        // Token Generation
        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,jwt_secret);
        success=true;
        let userName= user.name;
        res.json({success,userName,authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

//ROUTE 3: Get loggedin user details using : POST "/api/auth/getuser".login required
router.post('/getuser',fetchuser, async (req,res)=>{


    try {
        userId =req.user.id;
        const user =await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
});
module.exports = router;