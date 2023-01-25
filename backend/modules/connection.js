const mongoose = require("mongoose");

main()
  .catch((err) => console.log(err))
  .then(() => console.log("mongoDB is connected"));

async function main() {
  //mongoose.set("strictQuery", false);
  await mongoose.connect(
    "mongodb+srv://stefanatti-13:Ananas@cluster0.sghhmsy.mongodb.net/?retryWrites=true&w=majority"
  );
}

module.exports = mongoose;
