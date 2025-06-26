const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Your MongoDB URI
const dbName = 'kanaban_board'; // Your database name
const collectionName = 'projects'; // Your collection name

async function updateProjectStatuses() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Update all projects whose status is not already 'todo' to 'todo'
    const result = await collection.updateMany(
      { status: { $ne: 'todo' } },
      { $set: { status: 'todo' } }
    );

    console.log(`Updated ${result.modifiedCount} project(s) to status 'todo'.`);
  } catch (err) {
    console.error('Error updating projects:', err);
  } finally {
    await client.close();
  }
}

updateProjectStatuses(); 