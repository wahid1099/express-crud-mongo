import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("insertDB");
    const haiku = database.collection("haiku");
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await haiku.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  async function run(){
    try{

      await client.connect();
      const database=client.db('user');
      const usersCollection=database.collection('data');
      //creat a document to insert into the database
      const doc = {
        Name: "Md wahid",
        email: "wahidahemd80@gmail.com",
      }
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      console.log(result);

    }finally{
      await client.close();
    }

    

  }
