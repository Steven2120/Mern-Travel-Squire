require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
//brings in the PORT that we created on .env file and if it can't find it than it sets value to 3001;
const PORT = process.env.PORT || 3001;

//connects to mongoDB server
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected on Port ${PORT}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
