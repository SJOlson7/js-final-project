const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect.js')

let collection = null
const getMenu = async () => {
    if (!collection) collection = await getCollection('Mais-ThaiAPI', 'Menu')
    return collection
}





module.exports = router