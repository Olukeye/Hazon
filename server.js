require('dotenv').config();
// express

const express = require("express");
const app = express();
// rest of the packages
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')


// database
const connectDB = require("./db/connect");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { StatusCodes } = require("http-status-codes");


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json())


app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.urlencoded({ extended: true }))



app.use(express.static('./public'));
// app.use(fileUpload());//checking this

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/README.html");
  res.status(StatusCodes.OK).json({
    message: "Welcome to Ribi",
  });
});

//this endpoint is for cloudinary
app.post("/api/solitary",async(req,res)=>{
  const file = req.files.image.tempFilePath
  console.log("file", file)
 const response= await cloudinary.uploader
  .upload(file,{
      // /Users/okpalaanayo/Desktop
      //image is thr default resource type if you dont specify
      resource_type:"image",
  })


  fs.unlinkSync(file)
  
  res.status(200).send(response)
})

//  Auth Route
app.use("/api/v1/auth", require("./routes/authRoutes"));

// // User Route
app.use("/api/v1/products", require("./routes/productRoutes"));


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const PORT = process.env.PORT || 5000;

  try {
    await connectDB()//process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
