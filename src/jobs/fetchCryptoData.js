import axios from "axios";
import CryptoPrice from "../models/CryptoPrice.js";

const COINS = ["bitcoin", "matic-network", "ethereum"];
const COINGECKO_API = "https://api.coingecko.com/api/v3";

async function fetchCryptoData() {
  try {
    const promises = COINS.map(async (coinId) => {
      const response = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      });

      const data = response.data[coinId];
      return new CryptoPrice({
        coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        priceChange24h: data.usd_24h_change,
      }).save();
    });

    await Promise.all(promises);
    console.log("Crypto data updated successfully");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

export default fetchCryptoData;
