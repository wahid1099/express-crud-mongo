const express=require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port= 5000;



// middleware
app.use(cors());
app.use(express.json());


//mongodb code start
//user==mdmongouser
//password=FbTk9EgGkRvtqolb



const uri = "mongodb+srv://mdmongouser:FbTk9EgGkRvtqolb@cluster0.byzxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const client=new MongoClient(uri,{
  useNewUrlParser: true, useUnifiedTopology: true 
});
  


async function run() {

  try{
    await client.connect();
    const database=client.db('user');
    const usersCollection=database.collection('data');

    //Get Api getting all users in the collection database
    app.get('/user',async(req,res)=>{
      const cursor=usersCollection.find({});
      const users=await cursor.toArray();
      res.send(users);

    });
    //getting user with dynamic id
    app.get('/user/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const user=await usersCollection.findOne(query);
      console.log('load user with id: ', id);
      res.send(user)
    })

    // POST API
    app.post('/Adduser',async(req,res)=>{
      const newUser=req.body;
      const result=await usersCollection.insertOne(newUser);
      console.log("got new user",req.body);
      res.json(result);
    })

     ////////////////////////////////update api
   app.put('/users/:id',async (req, res) => {

        const id = req.params.id;
        const updateuser=req.body;
        const filter={_id:ObjectId(id)};
        const options = {upsert:true};
        const updateDoc={
          $set:{
            name:updateuser.name,
            email:updateuser.email
          },
        };
           const result = await usersCollection.updateOne(filter, 
            updateDoc,options);
            console.log('updating',id);
            res.json(result);
      


    
  });

  //delete api 

  app.delete('/user/:id',async (req,res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const result=await usersCollection.deleteOne(query);
    console.log('deleting user with id ',result);
    res.json(result);


  })



  }

 



  finally{

  }


}



  run().catch(console.dir);
//mongo code finished 

app.get('/', (req,res) => {
    res.send("Running my crud server");
});


app.listen(port,()=>{
    console.log("running on port",port)
})


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("hitting the database");
//   client.close();
// });
