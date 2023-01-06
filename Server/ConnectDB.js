const { mongoose } = require("mongoose");

module.exports = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected successfull on ${dbConnect.connection.host} `);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
    process.exit(1);
  }
};
