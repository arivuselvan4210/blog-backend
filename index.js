const express = require("express");
const mongooes = require("mongoose");
const router = require("./router/user");
const blogrouter = require("./router/blog");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use( cors({
   origin: 'https://blog-forntend.vercel.app',
   optionsSuccessStatus: 200,
}));
app.use("/", router);
app.use("/blog", blogrouter);
app.listen(5000||'https://blog-forntend.vercel.app', () => {
  console.log("servser launch");
});
mongooes
  .connect(
   "mongodb+srv://arivuselvan4210:Arivu0707@cluster0.zw6zoar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
