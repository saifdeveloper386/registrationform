const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/userRegistration",)
.then(()=>{console.log("connection to the databese is successful")})
.catch((e)=>{
    console.log("connection filed "+e);
});