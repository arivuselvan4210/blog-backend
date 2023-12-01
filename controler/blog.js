const { default: mongoose } = require("mongoose");
const Blog = require("../module/blog");
const User = require("../module/user");
module.exports.getall = async (req, res, nex) => {
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs) {
      return res.status(500).json({ massage: "blog no avalivable" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};
module.exports.add = async (req, res, nex) => {
  try {
    const { titale, img, desc, user } = req.body;
    const exituser = await User.findById(user).populate("blogs");
    if (!exituser) {
      res.status(400).json({ massage: "unabel user" });
    }
    if (titale && img && desc && user) {
      const blog = new Blog({
        titale,
        img,
        desc,
        user,
      });
      const sisson = await mongoose.startSession();
      sisson.startTransaction();
      await blog.save({ sisson });
      exituser.blogs.push(blog);
      await exituser.save({ sisson });
      await sisson.commitTransaction();
      res.status(200).json(exituser);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.update = async (req, res, nex) => {
  try {
    const id = req.params.id;
    const { titale, desc } = req.body;
    const blog = await Blog.findByIdAndUpdate(id, {
      titale,
      desc,
    });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};
module.exports.get = async (req, res, nex) => {
  try {
    const id = req.params.id;

    const blogs = await Blog.findById(id);
    if (!blogs) {
      return res.status(500).json({ massage: "blog no avalivable" });
    }
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteBlog = async (req, res, next) => {
  let blog;
  const id = req.params.id;
  try {
    blog = await Blog.findByIdAndDelete(id);

    const removeuser = await User.findById(blog.user);
    await removeuser.blogs.pull(blog._id);
    await removeuser.save();
    if (!blog) {
      return res.status(404).json({ message: "Blog not available" });
    }

    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.user = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("blogs");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
