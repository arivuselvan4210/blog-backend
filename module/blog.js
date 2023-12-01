const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  titale: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Blog", blogSchema);
