const {
    getToys,
    getSingleToy,
    createToy,
    updateToy,
    deleteToy,
  } = require("../controllers/toy.controller");
const {verifyJWT, verifyAdmin}=require("../middlewares/auth");

  const router = require("express").Router();

  router.get("/", getToys);
  router.get("/:id", getSingleToy);
  router.post("/", verifyJWT, verifyAdmin, createToy);
  router.put("/:id", updateToy);
  router.delete("/:id",verifyJWT, verifyAdmin, deleteToy);

  module.exports = router;
