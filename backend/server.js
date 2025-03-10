require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getCachedVideos, scrapeVideos } = require("./videoScraper"); // Import video scraper functions
const shopifyRoutes = require("./shopifyServer"); // Import Shopify routes

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Video Scraper API Route
app.get("/api/scrape-videos", async (req, res) => {
    const cachedVideos = getCachedVideos();
    if (cachedVideos) {
        return res.json({ videos: cachedVideos }); // Serve cached videos
    }

    const videos = await scrapeVideos();
    if (videos.length > 0) {
        res.json({ videos });
    } else {
        res.status(500).json({ error: "Failed to scrape videos" });
    }
});

// ✅ Shopify API Routes
app.use("/api", shopifyRoutes);

// ✅ Root Route (Health Check)
app.get("/", (req, res) => {
    res.send("🚀 Backend is running for Legend Cookhouse!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
