const express = require('express');
// const app = require('../app');
const router = express.Router();
const { newProduct, getAllProducts, updatProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
router.route("/products").get(getAllProducts)
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updatProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews")
    .get(getAllReviews)
    .delete(isAuthenticatedUser, deleteReview)
module.exports = router;