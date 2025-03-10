require("dotenv").config();
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const CACHE_FILE = path.join(__dirname, "videosCache.json");
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const getCachedVideos = () => {
    if (fs.existsSync(CACHE_FILE)) {
        const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
        if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
            return cacheData.videos;
        }
    }
    return null;
};

const saveVideosToCache = (videos) => {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), videos }, null, 2));
};

const scrapeVideos = async () => {
    try {
        console.log("🔄 Updating video cache...");
        const hashtag = "legendcookhouse";
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0");

        const [tiktokVideos, youtubeVideos] = await Promise.all([
            scrapeTikTok(page, hashtag),
            scrapeYouTube(page, hashtag),
        ]);

        await browser.close();

        const videos = [...tiktokVideos, ...youtubeVideos];
        saveVideosToCache(videos);
        return videos;
    } catch (error) {
        console.error("Scraping error:", error);
        return [];
    }
};

const scrapeTikTok = async (page, hashtag) => {
    try {
        await page.goto(`https://www.tiktok.com/tag/${hashtag}`, { waitUntil: "networkidle2" });
        return await page.evaluate(() =>
            Array.from(document.querySelectorAll('a[data-e2e="challenge-video-card"]')).map(link => ({
                embedUrl: link.href
            }))
        );
    } catch (error) {
        console.error("TikTok scraping failed:", error);
        return [];
    }
};

const scrapeYouTube = async (page, hashtag) => {
    try {
        await page.goto(`https://www.youtube.com/results?search_query=%23${hashtag}`, { waitUntil: "networkidle2" });
        return await page.evaluate(() =>
            Array.from(document.querySelectorAll('a#video-title')).map(link => ({
                embedUrl: `https://www.youtube.com/embed/${new URL(link.href).searchParams.get("v")}`
            }))
        );
    } catch (error) {
        console.error("YouTube scraping failed:", error);
        return [];
    }
};

module.exports = { getCachedVideos, scrapeVideos };
