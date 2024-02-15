const User = require("../model/user.schema");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.status(201).send({ message: "User already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

const getSingleUsers = async (req, res) => {
  try {
    const singleUser = await User.findOne({ email: req.params.email });
    res.status(200).json(singleUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching single user");
  }
};

const updateUser = async (req, res) => {
  try {
    const userUpdate = await User.findOne({ email: req.params.email });
    Object.assign(userUpdate, req.body);
    await userUpdate.save();
    res.status(200).json(userUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  try {
   const userDelete = await User.deleteOne({ _id: req.params.id });
   res.status(200).json(userDelete);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

const getJwtToken = async (req, res) => {
  try {
    const token = jwt.sign(req.body, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn: "5h",
    });
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating JWT token");
  }
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
  createUser,
  getJwtToken,
};
