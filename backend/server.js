const express = require("express");
// const mongoose = require('mongoose')
const app = express();
const port = 3636;

const userRoute = require("./routes/userRoute");
const adviceRoute = require("./routes/adviceRoute");

// const User = require('./modules/userModule')
// const Advice = require('./modules/adviceModule')
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/advice", adviceRoute);

app.listen(port, () => {
  console.log(`server is connected on port : ${port} `);
});

// Authentication
// app.post('/signup', async (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.send({ message: 'Please fill-in the correct data' })
//   } else {
//     let user = await User.findOne({ username: req.body.username })
//     if (user) {
//       res.send({ message: 'This user already exists' })
//     } else {
//       bcrypt.hash(req.body.password, 10, async (err, hash) => {
//         if (hash) {
//           let newUser = new User({
//             username: req.body.username,
//             password: hash
//           })
//           await newUser.save()
//           res.send({ message: true })
//         } else {
//           console.log(err)
//           res.send({ message: false })
//         }
//       })
//     }
//   }
// })

// app.post('/login', async (req, res) => {
//   let user = await User.findOne({ username: req.body.username })
//   if (user) {
//     bcrypt.compare(req.body.password, user.password, function (err, result) {
//       if (result) {
//         let token = jwt.sign({ id: user._id }, 'secret')
//         res.send({ token })
//       } else {
//         res.send({ message: 'Incorrect password' })
//       }
//     })
//   } else {
//     res.send({ message: 'Incorrect username' })
//   }
// })

// app.post('/verify', async (req, res) => {
//   jwt.verify(req.body.token, 'secret', async (err, payload) => {
//     if (payload) {
//       let user = await User.findOne({ _id: payload.id })
//       res.send(user)
//     } else {
//       res.send({ message: 'session expired' })
//     }
//   })
// })

// app.post('/advice', async (req, res) => {
//   let newAdvice = new Advice({
//     advice: req.body.advice,
//     userId: req.body.userId
//   })
//   await newAdvice.save()
//   res.send({ message: true })
// })

// app.get('/advice/:id', async (req, res) => {
//   let advices = await Advice.find({ userId: req.params.id })
//   res.send({ list: advices })
// })

// app.delete('/advice/:id', async (req, res) => {
//   await Advice.findOneAndDelete({ _id: req.params.id })
//   res.send({ message: true })
// })
