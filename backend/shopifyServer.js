require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
const GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE}/api/2023-10/graphql.json`;

router.get("/shopify-products", async (req, res) => {
    try {
        const response = await axios.post(
            GRAPHQL_ENDPOINT,
            { query: `{ products(first: 10) { edges { node { id title description } } } }` },
            { headers: { "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN, "Content-Type": "application/json" } }
        );
        res.json({ products: response.data.data.products.edges });
    } catch (error) {
        console.error("Shopify fetch error:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

module.exports = router;
