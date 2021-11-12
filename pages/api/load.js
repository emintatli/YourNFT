// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkAuth from "../../checkAuth";
import { MongoClient } from "mongodb";
const uri = "mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net/";
export default async function handler(req, res) {
  const client = new MongoClient(uri);
  let status="";
  try{
      await client.connect();
      const database = client.db("nft_mint");
      const collection = database.collection("nft_mint");
      const query = {};
      status = await collection.findOne(query);
  }
  catch(err){
      status=""
  }
  finally {
      await client.close();
  }
  res.status(200).json({...status,admin_password:"",JWT:true});
  
}
