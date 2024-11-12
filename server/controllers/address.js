import { Address } from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, phone } = req.body;
    await Address.create({
      user: req.user._id,
      address,
      phone,
    });

    res.json({
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchAllAddress = async(req,res) =>{
  try {
    const allAddresses = await Address.find({ user: req.user._id });
    
    res.json({ allAddresses });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    
    res.json({ address });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    await address.deleteOne()
    
    res.json({ message: "Address deleted successfully" });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}