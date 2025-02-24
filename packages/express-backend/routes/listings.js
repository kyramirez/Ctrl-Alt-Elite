import express from 'express';
import Listing from '../models/listing.js';

const router = express.Router();

// get all the listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.json(listings);
    } catch (error) {
        console.error("Failed to retrieve listings:", error);
        res.status(500).json({ message: "Failed to retrieve listings" });
    }
});

export default router;