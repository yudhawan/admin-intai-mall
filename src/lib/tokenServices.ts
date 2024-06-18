import jose,{ generateKeyPair, JWTPayload, jwtVerify, KeyLike, SignJWT } from "jose"


async function generateToken():Promise<{public_key:KeyLike,private_key:KeyLike}> {
    const {publicKey,privateKey} = await generateKeyPair("RSA-OAEP")
    return { public_key:publicKey,private_key:privateKey}
}

async function encryptJWT(payload:JWTPayload, scrt:Uint8Array):Promise<string>{
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('6h')
            .sign(scrt)
        return jwt
}
async function decryptJWT(jwt:string, scrt:Uint8Array){
        const {payload,protectedHeader} = await jwtVerify(jwt,scrt,{})
        console.log(payload)
        console.log(protectedHeader)
}

export { generateToken, encryptJWT, decryptJWT}
// async function encryptJWT(jwt:string,public_key:KeyLike):Promise<string> {
//     const jwe = await new jose.CompactEncrypt(new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.'))
//         .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
//         .encrypt(public_key)
//     return jwe
// }
// async function decryptJWT(jwe:string,public_key:KeyLike):Promise<string> {
//     const {plain} = await new jose.flattenedDecrypt()
//     return jwe
// }