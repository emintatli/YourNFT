
const checkAuth=async(jwt,client)=>{
    let status="";
    try{
        await client.connect();
        const database = client.db("nft_mint");
        const collection = database.collection("nft_mint");
        const query = {JWT:jwt};
        status = await collection.findOne(query);
    }
    catch(err){
        status=""
    }
    finally {
        await client.close();
    }
    return {...status,admin_password:"",JWT:true};
    


}

module.exports=checkAuth;