import { Address } from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, phone } = req.body;
    await Address.create({
      address,
      phone,
      user: req.user._id,
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

export const fetchAllAddress = async (req, res) => {
  try {
    const allAddress = await Address.find({ user: req.user._id });
    res.json({
      allAddress,
    });
  } catch (error) {
    res.status(500).json({
      message: `address not got ${error.message}`,
    });
  }
};

export const getSingleAddress = async (req, res) => {
  try {
    const singleAddress = await Address.findById(req.params.id);
    if (!singleAddress) {
      return res.status(402).json({
        success: false,
        message: `Id in params are required`,
      });
    }
    res.json({
      singleAddress,
    });
  } catch (error) {
    res.status(500).json({
      message: `Single address not got ${error.message}`,
    });
  }
};

export const deleteAddress = async  (req, res) =>{
    try { 
        const delAddress= await Address.findOne({
            _id:req.params.id,
            user: req.user._id
        }).deleteOne()
        res.status(201).json({
            success:true,
            message:`address deleted`
        })
    } catch (error) {
    res.status(500).json({
      message: `address not deleted ${error.message}`,
    });
    }
}