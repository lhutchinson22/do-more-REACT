const mongoose = require("mongoose");

// setup mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/website-april",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

module.exports = mongoose;
