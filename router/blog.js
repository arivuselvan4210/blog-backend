const express = require("express");
const blogrouter = express.Router();
const {
  add,
  deleteBlog,
  getall,
  update,
  get,
  user,
} = require("../controler/blog");

blogrouter.get("/getall", getall);
blogrouter.post("/add", add);
blogrouter.put("/update/:id", update);
blogrouter.get("/:id", get);
blogrouter.delete("/:id", deleteBlog);
blogrouter.get("/user/:id", user);

module.exports = blogrouter;
