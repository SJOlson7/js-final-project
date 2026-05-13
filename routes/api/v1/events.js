const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null

const getEvents = async () => {
    if (!collection) {collection = await getCollection('mais-thai', 'Events')}
    return collection
}

router.get('/', async (request, response) => {
    const collection = await getEvents()
    const found = await collection.find().toArray()
    response.send(found)
})

router.get('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getEvents()
    const found = await collection.findOne({_id: new ObjectId(id)})

    if (found) {response.send(found)}
    else { response.send({ error: { message: `Could not find event with id: ${id}` } })  }
})

router.post('/', async (request, response) => {
    const { title, location, date, description, image } = request.body
    const collection = await getEvents()
    const { acknowledged, insertedId } = await collection.insertOne({ title, location, date, description, image })

    response.send({ acknowledged, insertedId })
})

module.exports = router