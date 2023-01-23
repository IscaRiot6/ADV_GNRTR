const Advice = require('../modules/adviceModule')

const addAdvice = async (req, res) => {
  let newAdvice = new Advice({
    advice: req.body.advice,
    userId: req.body.userId
  })
  await newAdvice.save()
  res.send({ message: true })
}

const getAdvice = async (req, res) => {
  let advices = await Advice.find({ userId: req.params.id }).populate('owner')
  res.send({ list: advices })
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
