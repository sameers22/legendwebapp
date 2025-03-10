require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getCachedVideos, scrapeVideos } = require("./videoScraper");
const shopifyRoutes = require("./shopifyServer");

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", shopifyRoutes);
app.get("/api/scrape-videos", async (req, res) => {
    const cachedVideos = getCachedVideos();
    if (cachedVideos) return res.json({ videos: cachedVideos });

    const videos = await scrapeVideos();
    res.json({ videos });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
