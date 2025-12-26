const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const uri = process.env.ATLAS_URI;

  if (!uri) {
    throw new Error("ATLAS_URI is not defined");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const collections = await client
      .db("code-n-cluck-menu")
      .collections("menu");

    collections.forEach((collection) =>
      console.log(collection.collectionName)
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
