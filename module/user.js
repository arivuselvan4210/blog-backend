const mongooes = require("mongoose");

const userShecma = new mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongooes.SchemaTypes.ObjectId, required: true, ref: "Blog" }],
});
module.exports = mongooes.model("User", userShecma);
