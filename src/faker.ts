import {faker} from '@faker-js/faker'
export interface UserFakeType{
    id:string
    name:string
    sosmed:string
    address:string
    jenis:string
    status:string
}
export function getUserFake (amount:number=100):UserFakeType[]{
    return Array.from({length:amount},()=>{
        return {
            id: faker.database.mongodbObjectId(),
            name: faker.person.fullName(),
            sosmed: faker.person.firstName(),
            address: faker.location.secondaryAddress(),
            jenis:faker.animal.type(),
            status:faker.word.interjection()
        }
    })    
}
