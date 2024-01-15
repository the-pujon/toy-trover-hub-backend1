const {
    getToys,
    getSingleToy,
    createToy,
    updateToy,
    deleteToy,
  } = require("../controllers/toy.controller");

  const router = require("express").Router();

  router.get("/", getToys);
  router.get("/:id", getSingleToy);
  router.post("/", createToy);
  router.patch("/:id", updateToy);
  router.delete("/:id", deleteToy);

  module.exports = router;
