// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model');

const {checkCarId,checkCarPayload,checkVinNumberValid,checkVinNumberUnique} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    // DO YOUR MAGIC
    try{
      const data = await Cars.getAll()
      res.json(data)
    } catch(err){
      next(err)
    }
  })

  router.get('/:id', checkCarId, (req, res) => {
    // DO YOUR MAGIC
    // try{
    //   const data = await Cars.getById(req.params.id)
    //   res.json(data)
    // } catch(err){
    //   next(err)
    // }
    res.json(req.car)

  })

  router.post('/',  checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    // DO YOUR MAGIC
    try{
      const account = await Cars.create(req.body)
      res.json(account)
    }catch(err){
      next(err)
    }
  })

  module.exports = router;
