const express =require("express");
const path =require("path");
const hbs =require("hbs");
const Register=require("./models/userRegister");
require("../src/db/connection");
const app =express();
const port =process.env.Port || 3000;
const static_path =path.join(__dirname,"../public")
const partials_path =path.join(__dirname,"../templates/partials")
const views_path=path.join(__dirname,"../templates/views")



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path)) 
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path)



app.get('/', (req, res) => {
    res.render("registration");
});
app.get('.registration', (req, res) => {
    res.render("registration");
});
app.get('.login', (req, res) => {
    res.render("login");
});
app.post('/registration',async (req, res) => {
   try {
       const password =req.body.password;
       const cpassword =req.body.confirmpassword;
        if(password==cpassword){
            const userRegisteration =new Register({
                firstname:req.body.firstname,    
                lastname:req.body.lastname,    
                email:req.body.email,    
                gender:req.body.gender,    
                phone:req.body.phone,    
                age:req.body.age,    
                password:req.body.password,    
                confirmpassword:req.body.confirmpassword,    
            })
            const registered=await userRegisteration.save();
            console.log(registered)
        }else{
            res.send("password and confirm password are not matched");
        }
   } catch (error) {
       res.send(error);
   } 
});


app.listen(port, () => {
    console.log(`App listening on port${port}`);
});