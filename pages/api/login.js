//jwt update// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const uri = "mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net/";
import { MongoClient } from "mongodb";
import sha256 from "sha256";
export default async function handler(req, res) {
  const client = new MongoClient(uri);
  const body=JSON.parse(req.body);
  let status="";
  let new_jwt=""
  try{
    await client.connect();
    const database = client.db("nft_mint");
    const collection = database.collection("nft_mint");
    const query = {admin_password:body.password};
    status = await collection.findOne(query);
    if(!!status){
      new_jwt=sha256((body.password+Date.now()*Math.random()));
      const updateDoc = {
        $set: {
         JWT:new_jwt
        },
      };
      await collection.updateOne(query,updateDoc);
    }
}
catch(err){
    status=""
    new_jwt=""
}


finally {
  await client.close();
  res.status(200).json({ jwt:new_jwt })
}
   
  }
  