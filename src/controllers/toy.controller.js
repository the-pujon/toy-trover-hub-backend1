const toySchema = require("../model/toy.schema");

const createToy = async (req, res) => {
  try {
    const newToy = new toySchema(req.body);
    await newToy.save();
    res.status(201).json(newToy);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating toy");
  }
};

const getToys = async (req, res) => {
  try {
    const { category, subcategory, email } = req.query;

    if (email) {
      if (category) {
        const toys = await toySchema.find({ category, sellerEmail: email });
        if (subcategory) {
          const toysBySubcategory = await toySchema.find({
            category,
            subcategory,
            sellerEmail: email,
          });
          res.status(200).json(toysBySubcategory);
        } else {
          res.status(200).json(toys);
        }
      } else {
        const toysByEmail = await toySchema.find({ sellerEmail: email });
        res.status(200).json(toysByEmail);
      }
    } else if (category) {
      const toys = await toySchema.find({ category });
      if (subcategory) {
        const toysBySubcategory = await toySchema.find({
          category,
          subcategory,
        });
        res.status(200).json(toysBySubcategory);
      } else {
        res.status(200).json(toys);
      }
    } else {
      const toys = await toySchema.find();
      res.status(200).json(toys);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching toys");
  }
};

const getSingleToy = async (req, res) => {
  try {
    const toySingle = await toySchema.findById(req.params.id);
    res.status(200).json(toySingle);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching single toy");
  }
};

const updateToy = async (req, res) => {
  try {
    const toyUpdate = await toySchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(toyUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating toy");
  }
};

const deleteToy = async (req, res) => {
  try {
  const toyDelete =  await toySchema.findByIdAndDelete(req.params.id);
  res.status(200).json(toyDelete);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting toy");
  }
};

module.exports = {
  getToys,
  getSingleToy,
  updateToy,
  deleteToy,
  createToy,
};
