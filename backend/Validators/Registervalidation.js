const{body}=require("express-validator");
const Registervalitaion=[
    body("Name").notEmpty().withMessage("Name is required"),
    body("Username").notEmpty().withMessage("Username is required").isLength({min:8}).withMessage("Username is must be 8 character"),
    body("Email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    body("Password").notEmpty().withMessage("password is required").isLength({min:6}).withMessage("password must be at least 6 characters"),
    body("Number").notEmpty().withMessage("Number is required").isLength({min:10, max: 10}).withMessage("Number must be  10 digites")
]
module.exports=Registervalitaion;

