require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const axios = require("axios");

puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());

const CACHE_FILE = path.join(__dirname, "videosCache.json");
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// ✅ Function to Get Cached Videos
const getCachedVideos = () => {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const fileContent = fs.readFileSync(CACHE_FILE, "utf-8");
            if (!fileContent.trim()) {
                console.warn("⚠️ Warning: videosCache.json is empty.");
                return null;
            }
            const cacheData = JSON.parse(fileContent);
            if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
                console.log("✅ Serving cached videos...");
                return cacheData.videos;
            }
        }
    } catch (error) {
        console.error("❌ Error reading cache file:", error);
    }
    return null;
};

// ✅ Function to Save Videos to Cache
const saveVideosToCache = (videos) => {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), videos }, null, 2));
};

// ✅ Scrape Function (Must Be Defined Before Calling setInterval)
const scrapeVideos = async () => {
    try {
        console.log("🔄 Updating video cache...");
        const hashtag = "legendcookhouse";
        const browser = await puppeteer.launch({
            executablePath: process.env.CHROME_BIN || puppeteer.executablePath(),
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        );

        const [tiktokVideos, youtubeVideos] = await Promise.all([
            scrapeTikTok(page, hashtag),
            scrapeYouTube(page, hashtag),
        ]);

        await browser.close();

        const videos = [...tiktokVideos, ...youtubeVideos];
        saveVideosToCache(videos); // ✅ Save to cache
        console.log("✅ Video cache updated!");

        return videos;
    } catch (error) {
        console.error("Scraping error:", error);
        return [];
    }
};

// ✅ TikTok Scraper
const scrapeTikTok = async (page, hashtag) => {
    try {
        console.log("🔍 Scraping TikTok...");
        await page.goto(`https://www.tiktok.com/tag/${hashtag}`, { waitUntil: "networkidle2" });

        return await page.evaluate(() =>
            Array.from(document.querySelectorAll('a[data-e2e="challenge-video-card"]')).map((link) => ({
                embedUrl: link.href,
            }))
        );
    } catch (error) {
        console.error("Refresh The Page!!", error);
        return [];
    }
};

// ✅ YouTube Scraper
const scrapeYouTube = async (page, hashtag) => {
    try {
        console.log("🔍 Scraping YouTube...");
        await page.goto(`https://www.youtube.com/results?search_query=%23${hashtag}`, { waitUntil: "networkidle2" });

        const videos = await page.evaluate(() =>
            Array.from(document.querySelectorAll("a#video-title"))
                .map((link) => {
                    const videoId = new URL(link.href).searchParams.get("v");
                    return videoId ? { embedUrl: `https://www.youtube.com/embed/${videoId}`, videoId } : null;
                })
                .filter((video) => video !== null)
        );

        // ✅ List of Unwanted Video IDs
        const excludedVideos = ["TO2yEJgJKRw", "JXAWPz8BwD0"];

        // ✅ Filter out unwanted videos
        const filteredVideos = videos.filter((video) => !excludedVideos.includes(video.videoId));

        console.log("📌 YouTube Videos Scraped (Filtered):", filteredVideos);
        return filteredVideos;
    } catch (error) {
        console.error("❌ YouTube scraping failed:", error);
        return [];
    }
};

// ✅ API Route to Fetch Videos
app.get("/api/scrape-videos", async (req, res) => {
    const cachedVideos = getCachedVideos();
    if (cachedVideos) {
        return res.json({ videos: cachedVideos });
    }

    const videos = await scrapeVideos();
    if (videos.length > 0) {
        res.json({ videos });
    } else {
        res.status(500).json({ error: "Failed to scrape videos" });
    }
});

// ✅ Start Background Task for Periodic Scraping (Corrected)
setInterval(scrapeVideos, CACHE_DURATION);

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Backend is running with optimized caching for video scraping.");
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
