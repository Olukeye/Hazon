const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");


const getAllProduct = async (req, res) => {
        try {
            const allProduct = await Product.find()
            res.status(200).json(allProduct.reverse())
        } catch (error) {
            res.status(500).json(err)
        }
    }

const createProduct = async (req, res, fields) => {
   
    const{ name, description, price, category , quantity, shipping } = req.body;
  
    
      const product = new Product({
        name, description, price, category , quantity, shipping ,
      })
        
      await product.save();
  
  
      res.status(StatusCodes.CREATED).json({ product});
}

const updateProduct = async (req, res, next) => {
    
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
                { $set: req.body }, { new: true });
                return res.status(201).json({
                    message: "update successful",
                    product: updatedProduct,
                });
        }catch (err) {
            return next(err);
        }
    } 


    const deleteProduct = async (req, res, next) => {
            let product = req.product 
            product.remove((err) => {
                if(err) {
                    return res.status(400).json({
                        error: 'oops! sorry you cant delete...'
                    })
                }
                res.json({
                    message: "deleted product successfully"
                })
           }
        } 



module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
