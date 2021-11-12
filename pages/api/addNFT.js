//jwt check// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkAuth from "../../checkAuth";
import { MongoClient } from "mongodb";
const uri = "mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net/";

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  const body=JSON.parse(req.body)
  const data=await checkAuth(body.jwt,client);
 if(data.JWT){
  await client.connect();
  const database = client.db("nft_mint");
  const collection = database.collection("nft_mint");
  let new_nfts=data.nfts;
  body.nfts.map((v)=>{
    new_nfts.push(v)
  })
 
  const query = {JWT:body.jwt};
  const updateDoc = {
    $set:{
        nfts:new_nfts
    }
  };
  const result=await collection.updateOne(query,updateDoc);

  res.status(200).json(result);
 }
  }
  