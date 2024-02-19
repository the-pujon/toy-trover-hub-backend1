const router = require("express").Router();
const {
  getAllUsers,
  getSingleUsers,
  createUser,
  updateUser,
  deleteUser,
  getJwtToken,
} = require("../controllers/user.controller");
const { verifyJWT, verifyAdmin } = require("../middlewares/auth");

router.get("/", verifyJWT, verifyAdmin, getAllUsers);
router.get("/:email", getSingleUsers);
router.put("/", createUser);
router.patch("/:email", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, verifyAdmin, deleteUser);
router.post("/jwt", getJwtToken);

module.exports = router;
