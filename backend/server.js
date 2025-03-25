require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const axios = require("axios");
const nodemailer = require("nodemailer"); // ✅ Import Nodemailer


puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());

const CACHE_FILE = path.join(__dirname, "videosCache.json");
// CACHE_DURATION is no longer used since we don't refresh the cache automatically
// const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// ✅ Function to Get Cached Videos (always serves if file exists)
const getCachedVideos = () => {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const fileContent = fs.readFileSync(CACHE_FILE, "utf-8");
            if (!fileContent.trim()) {
                console.warn("⚠️ Warning: videosCache.json is empty.");
                return null;
            }
            const cacheData = JSON.parse(fileContent);
            console.log("✅ Serving cached videos...");
            return cacheData.videos;
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

// ✅ Scrape Function
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

    // If there's no cached videos, scrape and serve new videos.
    const videos = await scrapeVideos();
    if (videos.length > 0) {
        res.json({ videos });
    } else {
        res.status(500).json({ error: "Failed to scrape videos" });
    }
});

/* ===============================
   Shopify Backend Setup
   =============================== */
   const SHOPIFY_STORE = "legendchefsauce.com"; // Your store domain
   const SHOPIFY_STOREFRONT_API_TOKEN = "9b6753d3ac3c6dd5ceb5960d4e84da0a"; // Replace with your token
   const GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE}/api/2023-10/graphql.json`;
   
   // Fetch Products from Shopify API
   app.get("/api/shopify-products", async (req, res) => {
       try {
           const response = await axios.post(
               GRAPHQL_ENDPOINT,
               {
                   query: `
                       {
                           products(first: 10) {
                               edges {
                                   node {
                                       id
                                       title
                                       description
                                       featuredImage {
                                           url
                                       }
                                       variants(first: 1) {
                                           edges {
                                               node {
                                                   id
                                                   price {
                                                       amount
                                                       currencyCode
                                                   }
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }
                   `,
               },
               {
                   headers: {
                       "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
                       "Content-Type": "application/json",
                   },
               }
           );
   
           const products = response.data.data.products.edges.map(({ node }) => ({
               id: node.id,
               title: node.title,
               description: node.description,
               image: node.featuredImage?.url || "",
               price: node.variants.edges[0]?.node.price.amount || "N/A",
               currency: node.variants.edges[0]?.node.price.currencyCode || "USD",
               variantId: node.variants.edges[0]?.node.id || "",
           }));
   
           res.json({ products });
       } catch (error) {
           console.error("❌ Error fetching Shopify products:", error.response?.data || error.message);
           res.status(500).json({ error: "Failed to fetch products" });
       }
   });
   
   // Shopify Checkout Route
   app.post("/api/shopify-checkout", async (req, res) => {
       try {
           const { items } = req.body;
           const response = await axios.post(
               GRAPHQL_ENDPOINT,
               {
                   query: `
                       mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]!) {
                           checkoutCreate(input: { lineItems: $lineItems }) {
                               checkout {
                                   webUrl
                               }
                               userErrors {
                                   field
                                   message
                               }
                           }
                       }
                   `,
                   variables: {
                       lineItems: items.map(item => ({
                           variantId: item.variantId,
                           quantity: item.quantity,
                       })),
                   },
               },
               {
                   headers: {
                       "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
                       "Content-Type": "application/json",
                   },
               }
           );
   
           if (response.data.data.checkoutCreate.userErrors.length > 0) {
               console.error("❌ Shopify Checkout Error:", response.data.data.checkoutCreate.userErrors);
               return res.status(400).json({ error: "Shopify Checkout Error", details: response.data.data.checkoutCreate.userErrors });
           }
   
           res.json({ checkoutUrl: response.data.data.checkoutCreate.checkout.webUrl });
       } catch (error) {
           console.error("❌ Error creating checkout:", error.response?.data || error.message);
           res.status(500).json({ error: "Failed to create checkout" });
       }
   });
   
   // Direct Checkout Link Route (No API)
   app.post("/api/shopify-direct-checkout", async (req, res) => {
       try {
           const { items } = req.body;
           const cartQuery = items.map(item => `${item.variantId.split('/').pop()}:${item.quantity}`).join(",");
           const checkoutUrl = `https://${SHOPIFY_STORE}/cart/${cartQuery}`;
           res.json({ checkoutUrl });
       } catch (error) {
           console.error("❌ Error generating checkout link:", error.message);
           res.status(500).json({ error: "Failed to generate checkout link" });
       }
   });
   


   // ✅ Nodemailer Configuration (New Addition)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

// ✅ Reservation Notification Route (New Addition)
app.post("/api/reserve", async (req, res) => {
    const { email, name, reservationDetails } = req.body;

    if (!email || !name || !reservationDetails) {
        return res.status(400).json({ error: "Please provide name, email, and reservation details." });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: "New Table Reservation",
            text: `New Reservation:\nName: ${name}\nEmail: ${email}\nDetails: ${reservationDetails}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reservation successful and notification email sent!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send reservation notification." });
    }
});


   /* ===============================
      Root Route & Server Startup
      =============================== */
   app.get("/", (req, res) => {
       res.send("Backend is running with video scraping caching and Shopify integration.");
   });

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
