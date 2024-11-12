import sendMail from "../middleware/sendMail.js";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

export const newOrderCod = async (req, res) => {
  try {
    const { method, phone, address } = req.body;

    const cart = await Cart.find({ user: req.user._id }).populate("product");

    let subTotal = 0;

    cart.forEach((i) => {
      const itemSubTotal = i.product.price * i.quantity;
      subTotal += itemSubTotal;
    });

    const items = await Cart.find({ user: req.user._id })
      .select("-_id")
      .select("-user")
      .select("-__V");

    const order = await Order.create({
      user: req.user._id,

      method,
      phone,
      address,
      subTotal,
      items,
    });

    for (let i of order.items) {
      let product = await Product.findOne({
        _id: i.product,
      });

      product.$inc("stock", -1 * i.quantity);
      product.$inc("sold", +i.quantity);

      await product.save();
    }

    await Cart.find({ user: req.user._id }).deleteMany();

    await sendMail(
      req.user.email,
      "New Order Received",
      `Thank you for shopping of ₹ ${subTotal} from our Plateform
        Your order will be delivred soon`
    );

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.json({ orders: orders.reverse() });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOrderAdmin = async(req,res) =>{
  try {
    if(req.user.role !== "admin") return res.status(403).json({
      message: "This is admin route"
    })
    const orders = await Order.find();
    
    res.json({ orders: orders.reverse() });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    
  }
}

export const getMyOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    res.json({ order });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "This is admin route",
      });
    }

    const order = await Order.findById(req.params.id);

    if (order.status === "Pending") {
      order.status = "Processing";

      await sendMail(
        req.user.email,
        "Lets negotiate",
        "Your order is in processing and it will be delivered soon"
      );

      await order.save();

      return res.json({
        message: "order status updated",
      });
    }

    if (order.status === "Processing") {
      order.status = "Shipped";

      await sendMail(
        req.user.email,
        "Lets negotiate",
        "Your order is Shipped and it will be delivered soon"
      );

      await order.save();

      return res.json({
        message: "order status updated",
      });
    }

    if (order.status === "Shipped") {
      order.status = "Out for delivery";

      await sendMail(
        req.user.email,
        "Lets negotiate",
        "Your order is Out for delivery and it will be delivered soon"
      );

      await order.save();

      return res.json({
        message: "order status updated",
      });
    }

    if (order.status === "Out for delivery") {
      order.status = "Delivered";

      await sendMail(
        req.user.email,
        "Lets negotiate",
        "Your order is Delivered Thank you for shopping"
      );

      await order.save();

      return res.json({
        message: "order status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const newOrderOnline = async(req,res) =>{
  try {
    if(req.user.role!== "admin") return res.status(403).json({
      message: "This is admin route"
    })
    const order = await Order.findByIdAndUpdate(req.params.id, { paymentStatus: "paid" }, { new: true });
    
    res.json({ order });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    
  }
}
