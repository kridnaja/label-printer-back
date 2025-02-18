const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

exports.register = async (req, res, next) => {
    try {
      const value = {
        username: "gemicks@admin.com",
        password: "11223344"
    }

    value.password = await bcrypt.hash(value.password,12)

    const admin = await prisma.admin.create({
        data:{
            username: value.username,
            password: value.password,
        }
    })
    const payload = { adminId : admin.id}
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY || "sdsdsdsd",
        { expiresIn: process.env.JWT_EXPIRE}
    )
    delete admin.password;
    return res.status(201).json( { accessToken, admin})
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res, next) => {
 try {


  const admin = await prisma.admin.findFirst({
    where:{
        username: req.body.username
    }
})

if(!admin) {
    return res.status(404).json("not found !!")
}

const isMatch = await bcrypt.compare(req.body.password,admin.password)
if (!isMatch) {
    return res.status(400).json("invalid credential")
}

const payload = { adminId : admin.id}
const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY || "123ss456",
    { expiresIn: process.env.JWT_EXPIRE }
)
delete admin.password
let now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

const afterLogin = await prisma.loginLogoutTime.create({
 data: {
    login : now,
    adminId: admin.id
 }
})

return res.status(200).json( {accessToken, admin} );
 } catch (error) {
    console.log(error)
 }
};

exports.logout = async (req, res, next) => {
    try {


        let now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
        const afterLogin = await prisma.loginLogoutTime.create({
            data: {
               logout : now,
               adminId: req.body.id
            }
           })
           return res.status(200).json("logout successfully")
    } catch (error) {
        console.log(error)
    }
}


exports.getMe = async (req, res,next) => {
  try {
  return  res.status(200).json({admin: req.admin} )
  } catch (error) {
    console.log(error)
  }
};
