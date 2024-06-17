import jose from 'jose'
const private_key = process.env.PRIVATE_KEY
const public_key = process.env.PUBLIC_KEY || ''


// const generateToken = async(header_val:string):boolean=>{
//     const token_get = await new jose.EncryptJWT().encrypt(public_key)

//     return false
// }