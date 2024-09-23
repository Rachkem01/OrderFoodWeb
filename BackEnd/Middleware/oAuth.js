import jwt from 'jsonwebtoken'
//all of these is to ensure proper cart storage
const authMiddleware = async(req, res, next)=>{
const {token} = req.headers
if(!token){
    return res.json({success:false, message:"Not authorized, log in again"})
}
try{
const token_decode = jwt.verify(token, process.env.JWT_SECRET)
req.body.userId =token_decode.id;
next()
}catch(error){
console.log(error)
res.json({success:false, message:"error"})
}
}
export default authMiddleware