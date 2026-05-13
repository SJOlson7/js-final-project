const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null

const getMenu = async () => {
    if (!collection) {collection = await getCollection('mais-thai', 'Menu')}
    return collection
}

router.get('/', async (request, response) => {
    const collection = await getMenu()
    const found = await collection.find().toArray()
    response.send(found)
})

router.get('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getMenu()
    const found = await collection.findOne({_id: new ObjectId(id)})

    if (found) {response.send(found)}
    else { response.send({ error: { message: `Could not find menu item with id: ${id}`} }) }
})

router.post('/', async (request, response) => {
    const { name, description, price, image } = request.body
    const collection = await getMenu()
    const { acknowledged, insertedId } = await collection.insertOne({ name, description, price, image })

    response.send({ acknowledged, insertedId })
})

module.exports = router