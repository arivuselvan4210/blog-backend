const User = require("../module/user");
const bcrypt = require("bcrypt");
module.exports.getall = async (req, res, nex) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ massage: "no users" });
    }
    res.status(200).json({ users });
  } catch (error) {}
};
module.exports.singup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const haspasword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: haspasword,
    });
    const emailchech = await User.findOne({ email });
    if (emailchech) {
      return res.status(401).json({ massage: "please enter valied user" });
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports.singin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const hase = await bcrypt.compare(password, user.password);
      if (hase) {
        return res.status(201).json(user);
      }
      return res.status(402).json({ message: "password incorrected" });
    }
    res.status(404).json({ message: "user null" });
  } catch (error) {
    console.log(error);
  }
};
