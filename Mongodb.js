import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const dbName = 'mydatabase'; // Replace with your database name

let db;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected successfully to MongoDB server');

    // Select the database
    db = client.db(dbName);

    // Listen for connection and disconnection events
    client.on('close', () => {
      console.log('Disconnected from MongoDB');
    });

    client.on('reconnect', () => {
      console.log('Reconnected to MongoDB');
    });

    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectToDatabase