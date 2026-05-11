const { MongoClient, ObjectId } = require('mongodb')

const { uri } = require('./secrets/mondodb.json')

const client = new MongoClient(uri)

const getMenu = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

module.exports = { getCollection, ObjectId }