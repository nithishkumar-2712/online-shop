const multer=require("multer");
const path=require("path");
 const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, "../public/image"));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
 });
 const maxAge=2 * 1024 * 1024;
 const uplaode=multer({
    storage:storage,
    limits:{
        fieldSize:maxAge
    }
 });
 module.exports=uplaode;