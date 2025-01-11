import CryptoPrice from '../models/CryptoPrice.js';

export const getCryptoStats = async (req, res) => {
    try {
        const { coin } = req.query;
        
        if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter' });
        }

        const latestData = await CryptoPrice.findOne({ coinId: coin })
            .sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the specified coin' });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.priceChange24h
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCryptoDeviation = async (req, res) => {
    try {
        const { coin } = req.query;
        
        if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter' });
        }

        const prices = await CryptoPrice.find({ coinId: coin })
            .sort({ timestamp: -1 })
            .limit(100)
            .select('price');

        if (prices.length === 0) {
            return res.status(404).json({ error: 'No data found for the specified coin' });
        }

        const priceValues = prices.map(p => p.price);
        const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
        const squaredDiffs = priceValues.map(price => Math.pow(price - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b) / squaredDiffs.length;
        const standardDeviation = Math.sqrt(avgSquaredDiff);

        res.json({
            deviation: Number(standardDeviation.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// module.exports = {
//     getCryptoStats,
//     getCryptoDeviation
// };

