const db = {
    'user':[
        {id:'1',name:"Marcos"}
    ]
}

const list = async (tabla)=>{
    return db[tabla] ||[]
}
const get = async (tabla,id)=>{
    let col = await list(tabla)
    return col.filter(item=> item.id===id)[0] || "null"
}
const upsert= async (table,data)=>{
    if(!db[table]){
        db[table]=[]
    }
    db[table].push(data)

}
const query = async (tabla,q)=>{
    let col = await list(tabla)
    let keys = Object.keys(q)
    let key = keys[0]

    return col.filter(item=> item[key]===q[key])[0] || "null"
}
const remove =(tabla,id)=>{


}
export default{
    list,
    get,
    upsert,
    remove,
    query
};