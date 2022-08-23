import auth from '../../../auth/index.js'
import bcrypt from 'bcrypt'
const TABLA = 'auth'
export default (injectedStore) => {
    let store = injectedStore
    if(!store){
        store = require("../../../store/dummy").default;
    }
    const login =async (username,password)=>{
        const data = await store.query(TABLA,{username:username})
        return bcrypt.compare(password,data.password)
        .then(sonIguales=>{
            if(sonIguales === true){
                return auth.sign(data);
            }else{
                throw new Error('Informacion invalida controller/auth')
            }
        })
       
        
    }
    const upsert= async (data)=>{
        const authData = {
            id:data.id,
        }
        if(data.username){
            authData.username=data.username
        }
        if(data.password){
            authData.password=await bcrypt.hash(data.password,5)
        }
        console.log(authData)
        return store.upsert(TABLA,authData)
    }

    return {
        upsert,
        login
    }
}