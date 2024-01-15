const toySchema = require("../model/toy.schema");

/**
 * (Create)
 * for creating new toy
 */
const createToy = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      sellerName,
      sellerEmail,
      sellerImage,
      toyImage,
      category,
      subcategory,
      inStock,
      description,
      price,
    } = req.body;
    const newToy = new toySchema({
      name: name,
      sellerName: sellerName,
      sellerEmail: sellerEmail,
      sellerImage: sellerImage,
      toyImage: toyImage,
      category: category,
      subcategory: subcategory,
      inStock: inStock,
      description: description,
      price: price,
    });
    await newToy.save();
    res.status(200).json(newToy);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (read)
 * for getting all toys
 * getting all toys by email, category and subCategory
 */
const getToys = async (req, res) => {
  try {
    const category = req.query.category;
    const subcategory = req?.query?.subcategory;
    const email = req?.query?.email;
    //console.log(email);

    if (email) {
      if (category) {
        const toysByCategory = await toySchema.find({
          category: req.query.category,
          sellerEmail: req.query.email,
        });

        if (subcategory) {
          const toysBySubcategory = await toySchema.find({
            category: req.query.category,
            subcategory: req?.query?.subcategory,
            sellerEmail: req.query.email,
          });
          res.status(200).json(toysBySubcategory);
        } else {
          res.status(200).json(toysByCategory);
        }
      } else {
        console.log("here");
        const toysByEmail = await toySchema.find({
          sellerEmail: req.query.email,
        });
        return res.status(200).json(toysByEmail);
      }
    }

    if (category && !email) {
      const toysByCategory = await toySchema.find({
        category: req.query.category,
      });

      if (subcategory) {
        console.log("in");
        const toysBySubcategory = await toySchema.find({
          category: req.query.category,
          subcategory: req?.query?.subcategory,
        });
        console.log(toysByCategory);
        res.status(200).json(toysBySubcategory);
      } else {
        res.status(200).json(toysByCategory);
      }
    }

    if (!email && !category) {
      const toys = await toySchema.find();

      res.status(200).json(toys);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (read)
 * for getting single toy
 */
const getSingleToy = async (req, res) => {
  try {
    console.log("ggg" + req.params.id);
    const id = req.params.id;
    const toySingle = await toySchema.findById(id).exec();
    //const toySingle = await toySchema.find({ _id:id });
    console.log(toySingle);
    res.status(200).json(toySingle);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (read)
 * for getting toys by category and subcategory
 */


/**
 * (Update)
 * for updating single toy
 */
const updateToy = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id;
    const toyUpdate = await toySchema.findById(id).exec();

    toyUpdate.name = req?.body?.name;
    toyUpdate.sellerName = req?.body?.sellerName;
    toyUpdate.sellerEmail = req?.body?.sellerEmail;
    toyUpdate.sellerImage = req?.body?.sellerImage;
    toyUpdate.toyImage = req?.body?.toyImage;
    toyUpdate.category = req?.body?.category;
    toyUpdate.subcategory = req?.body?.subcategory;
    toyUpdate.inStock = req?.body?.inStock;
    toyUpdate.save();
    console.log("pp"+ toyUpdate);
    res.status(200).json(toyUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (delete)
 * for delete single toy
 */
const deleteToy = async (req, res) => {
  try {
    const toyDelete = await toySchema.deleteOne({ _id: req.params.id });
    res.status(200).json(toyDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getToys,
  getSingleToy,
  updateToy,
  deleteToy,
  createToy,
};
