const{body}=require("express-validator");
const productvalitaion=[
    body("productname").notEmpty().withMessage("productname is required"),
    body("price").notEmpty().withMessage("price is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("about").notEmpty().withMessage("about is required"),
    body("Tax").notEmpty().withMessage("Tax is required"),
    body("Brand").notEmpty().withMessage("Brand is required"),
    body("seller").notEmpty().withMessage("Seller is required"),
    body("file").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("image is required");
        }
        return true;
    })
]
module.exports=productvalitaion