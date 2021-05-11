const Cars = require('./cars-model')
var vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params
  Cars
    .getById(id)
    .then((car) => {
      if (car) {
        req.car = car
        next()
      } else {
        res.status(404).json({ message: `car with id ${id} is not found` })
      }
    })
    .catch((err) => {
      next(err)
    })
}

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body

  try {
    if (!vin) {
      res.status(400).json({ message: `vin is missing` })
    } else if (!make) {
      res.status(400).json({ message: `make is missing` })
    } else if (!model) {
      res.status(400).json({ message: `model is missing` })
    } else if (!mileage) {
      res.status(400).json({ message: `mileage is missing` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body

  if (vinValidator.validate(vin)) {
    next()
  } else {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  const car = await Cars.getByVin(vin)
  if (car) {
    res.status(400).json({ message: `vin ${vin} already exists` })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}