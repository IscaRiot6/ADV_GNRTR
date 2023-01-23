const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

main()
  .catch(err => console.log(err))
  .then(() => console.log('mongoDB is connected'))

async function main () {
  mongoose.set('strictQuery', false)
  await mongoose.connect(process.env.MONGO_URI)
}

module.exports = mongoose
