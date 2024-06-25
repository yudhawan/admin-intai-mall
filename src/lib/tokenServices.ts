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
async function decryptJWT(jwt:string | Uint8Array, scrt:Uint8Array):Promise<{payload:object,protectedHeader:object}>{
        const {payload,protectedHeader} = await jwtVerify(jwt,scrt,{})
        return {payload,protectedHeader}
}

export { generateToken, encryptJWT, decryptJWT}
