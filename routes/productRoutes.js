const express = require('express');
const router = express.Router();
const productRoute = require('../controllers/productController');


router.route('/').get(productRoute.getAllProduct);
router.post('/createProduct', productRoute.createProduct);
router.put('/updateProduct/:id', productRoute.updateProduct);
router.delete('/deleteProduct/:id', productRoute.deleteProduct);



module.exports = router;
