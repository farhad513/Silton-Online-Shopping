const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");

// Create a new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const
        { shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice }
            = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
});


// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHander("Order not found", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});

// get my  Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
        return next(new ErrorHander("Order not found", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});




// Get all Orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
})

// Update Orders
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHander("Order not found with this id", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("your order has already been delivered", 400))
    };

    order.orderItems.forEach(async (ord) => {
        await updateStock(ord.product, ord.quantity)
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    })
});


async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// Delete Order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHander("Order not found with this id", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true
    })
})