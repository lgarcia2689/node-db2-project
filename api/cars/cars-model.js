const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db.select('*').from('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where({id}).first()
}

async function create(car) {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car)
  return db('cars').where({id}).first()
}

const getByVin = (vin) => {
  return db('cars').where({ vin }).first()
}


module.exports = {
  getAll,
  getById,
  create,
  getByVin,
}