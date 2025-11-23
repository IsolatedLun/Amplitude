import { MongoClient, ServerApiVersion } from "mongodb";

async function ping() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("[Ampl] Ping successful, connected to db.");
    } catch(err) {
        console.error(err);
    }
}

const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});


ping();

let db = client.db("amplitude");
export default db;