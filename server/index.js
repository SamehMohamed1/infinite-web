const exprees = require("express")
const mysql = require("mysql2")

const cors = require("cors")


const bcrypt = require('bcrypt')
const salt = 10;

const app = exprees()
app.use(cors())
app.use(exprees.json())
app.use(exprees.urlencoded({extended:true}))

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"infiniteWeb"
})

  // Restful APIs (get only for now )
app.get("/",(req,res)=>{
    const cate = req.query.cate
    let query;
    if(cate == "NewSeazon"){
         query = `SELECT * FROM Products WHERE isNew = 1 `
    }else if(!cate){
        query = `SELECT * FROM Products`

    }
        else{

        query = `SELECT * FROM Products WHERE Category = '${cate}' `
    }
    connection.execute(query,(err,data)=>{
        if(err){
            console.log("errorrrrrrrr happped",err)
        }else{
            res.send(data)
        }
    })
})


// adding new product (allowed for those who have admin role only)
app.post("/addItem",(req,res)=>{
    const {name,des,img1,img2,isNew,rate,category,discount,oldPrice} = req.body
    const addquery = "INSERT INTO `Products`( `Product_Name`, `Product_Description`, `Product_Price`, `Product_img1`, `Product_img2`, `isNew`, `rate`,`category`,`discount`,`oldPrice`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    connection.execute(addquery,[name,des,oldPrice-(oldPrice*discount),img1,img2,isNew,rate,category,discount,oldPrice],(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send("item added successfully")
        }
    })
})

// Registretion code
app.post("/adduser",(req,res)=>{
    const {username,email,birthday,password} = req.body
    const addquery = "INSERT INTO `users`( `username`, `email`, `password`, `birthday`) VALUES (?,?,?,?)"

    bcrypt.hash(password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error:"error happend on hashing password"})

        // check if user exist or not 
        const sql = 'SELECT * FROM `users` WHERE email = ?'

        connection.execute(sql,[email],(err,data)=>{
            if(err) return res.json({Error:"error happedn on restration server "})
    
            if(data.length == 1){
                res.json({Error:"user already exist"})
            }else{
                connection.execute(addquery,[username,email,hash,birthday],(err,data)=>{
                    if(err){
                        res.json({Error :"error happend while executing addquery"})
                    }else{
                        res.send(true)
                    }
                })
            }
            
      
        })

    })


    
})

// login code 

app.post("/login",(req,res)=>{
    const {email,password} = req.body

    const sql = 'SELECT * FROM `users` WHERE email = ?'

    connection.execute(sql,[email],(err,data)=>{
        if(err) return res.json({Error:"error happedn on login server"})

        //check if passwords are the same 
        if(data.length == 1){
            bcrypt.compare(password.toString(),data[0].password,(err,same)=>{
                if(err) return res.json({Error:"error happend on server"})
                if(same){
                    return res.send(true)
                }else{
                    res.json({Error:"invalid password ya m3lm"})
                }
            })

        }
        
        
        else if(data.length == 0){
            res.json({Error:"User not Found"})
        }else{
            res.json({Error:"Server Error "})
        }
    })

})

// init server
app.listen(3000,()=>{
    console.log("app is runng now in port http://localhost:3000")
})