const User = require("../model/user.schema");
//var jwt = require("jsonwebtoken");

/**
 * (Create)
 * for creating new user
 */
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(200).send({ message: "user already exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (read)
 * for getting all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (read)
 * for getting single users
 */
const getSingleUsers = async (req, res) => {
  63;
  try {
    console.log(req.params.email);
    const singleUser = await User.findOne({ email: req.params.email });
    console.log(singleUser);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (Update)
 * for updating single users
 */
const updateUser = async (req, res) => {
  try {
    const userUpdate = await User.findOne({ email: req.params.email });
    userUpdate.name = req?.body?.name;
    userUpdate.email = req?.body?.email;
    userUpdate.password = req?.body?.password;
    userUpdate.image = req?.body?.image;
    userUpdate.save();
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (delete)
 * for delete single users
 */
const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.deleteOne({ email: req.params.email });
    res.status(200).json(userDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

////jwt token sending
//const getJwtToken = async (req, res) => {
//  const user = req.body;
////  //console.log(user);
////  const singleUser = await User.findOne({ email: user.email });
////  //console.log(singleUser);
////  const role = singleUser?.role
////console.log(role)

//  const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
//    expiresIn: "5h",
//  });
//  console.log(token);

//  res.send({ token });
//};

module.exports = {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
  createUser,
  getJwtToken,
};
