const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    labels: { type: String, required: true},
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    img: { type: String, required: true },
    hoverImg: { type: String},
    categories: { type: Array, required: true},
    size: { type: String },
    color: { type: String },
    group: { type: String },
    inStock: { type: Boolean, required: true},
    fastDelivery: { type: Boolean },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);


