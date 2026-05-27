const {body}=require("express-validator");
const Loginvalitaion=[
body("Email").notEmpty().isEmail().withMessage("Email is required"),
body("Password").notEmpty().withMessage("password is required").isLength({min:6}).withMessage("password must be at least 6 characters"),
]
module.exports=Loginvalitaion