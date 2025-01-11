import mongoose from "mongoose";

const cryptoPriceSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  priceChange24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CryptoPrice  = mongoose.model("CryptoPrice", cryptoPriceSchema);

export default CryptoPrice;