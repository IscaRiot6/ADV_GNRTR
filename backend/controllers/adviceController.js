const Advice = require('../modules/adviceModule')

const getAdvice = async (req, res) => {
  let advices = await Advice.find({}).populate('owner')
  res.send(advices)
}

const addAdvice = async (req, res) => {
  let newAdvice = new Advice(
    // advice: req.body.advice,
    // userId: req.body.userId
    req.body
  )
  await newAdvice.save()
  res.send({ message: true })
}

const deleteAdvice = async (req, res) => {
  await Advice.findOneAndDelete({ _id: req.params.id })
  res.send({ message: true })
}

module.exports = {
  addAdvice,
  getAdvice,
  deleteAdvice
}

// userId: req.params.id
