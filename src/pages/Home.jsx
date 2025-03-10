import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dish1 from '../assets/LoMeinComboDishes/C25. Chicken Lo Mein.avif';
import dish2 from '../assets/GuyanesChowMeinNoodle/D12.avif';
import dish3 from '..//assets/GuyaneseStyleChineseFriedRice/C11. Chicken Fried Rice.avif';

import CustomerReviews from '../pages/CustomerReviews';
import heroVideo from '../assets/restaurant_hero.mp4';

// ✅ Import Founder Image
import founderImage from '../assets/rupe-standing.jpeg';

// Import Menu Icons
import caribbeanIcon from "../assets/menu-icons/chicken-soup.png";
import guyaneseIcon from "../assets/menu-icons/spaghetti.png";
import aLaCarteIcon from "../assets/menu-icons/rice-1.png";
import saladsIcon from "../assets/menu-icons/salad.png";
import soupIcon from "../assets/menu-icons/soup.png";
import dessertIcon from "../assets/menu-icons/dessert.png";

import storyImage1 from '../assets/legend_cookhouse_outside.jpg';
import storyImage2 from '../assets/legend_cookhouse_night.jpg';
import storyImage3 from '../assets/legend_cookhouse_dining.jpeg';
import storyImage4 from '../assets/legend_cookhouse_food.jpg';

const slideshowImages = [storyImage1, storyImage2, storyImage3, storyImage4];

const menuOptions = [
    { 
        name: "Caribbean Delights", 
        icon: caribbeanIcon, 
        description: "Experience the bold, vibrant flavors of the Caribbean! From jerk-seasoned meats to slow-cooked curries, every bite takes you on a journey through the islands. Our dishes are crafted using authentic spices and time-honored techniques, ensuring a taste that feels like home. 🇬🇾",
        link: "/menu#caribbean" 
    },
    { 
        name: "Guyanese Chinese", 
        icon: guyaneseIcon, 
        description: "A true fusion of East and West, our Guyanese Chinese cuisine brings together traditional Chinese flavors with rich Caribbean influences. Stir-fried noodles, fried rice, and aromatic seasonings create a one-of-a-kind dining experience you won’t find anywhere else!",
        link: "/menu#guyanese" 
    },
    { 
        name: "A La Carte", 
        icon: aLaCarteIcon, 
        description: "Customize your meal with our **signature dishes**. Whether you're craving perfectly grilled meats, sizzling seafood, or vegetarian delights, our à la carte menu lets you mix and match your favorites to craft your perfect meal.",
        link: "/menu#a_la_carte" 
    },
    { 
        name: "Salads & Veggies", 
        icon: saladsIcon, 
        description: "Fresh, crisp, and packed with flavor, our salads and vegetable-based dishes offer a light yet satisfying way to enjoy the **rich produce of the Caribbean**. We use farm-fresh ingredients, tangy dressings, and bold seasonings to make healthy eating taste incredible.",
        link: "/menu#salads" 
    },
    { 
        name: "Soup", 
        icon: soupIcon, 
        description: "Comfort in a bowl. Our soups are slow-simmered to perfection, blending rich broths, hearty meats, and fresh vegetables for a warm and flavorful experience. Try our legendary seafood soup or classic chicken noodle for a taste of home.",
        link: "/menu#soup" 
    },
    { 
        name: "Dessert", 
        icon: dessertIcon, 
        description: "End your meal on a sweet note with **Guyanese-inspired desserts**. From fluffy sponge cakes to rich, creamy pastries, our desserts bring a taste of tradition with every bite. A true indulgence for those who love tropical flavors.",
        link: "/menu#desserts" 
    }
];

const Home = () => {

    
        // ✅ Slideshow State
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [nextImageIndex, setNextImageIndex] = useState(1);
    
        // ✅ Change slideshow images every 4 seconds
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
                setNextImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
            }, 4000);
    
            return () => clearInterval(interval);
        }, []);


    return (
        <div className="home-page">

                <div className="hero">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="hero-overlay">
                        <h1>
                            <span className="legend">LEGEND</span>
                            <span className="cookhouse">COOKHOUSE</span>
                        </h1>
                        <p>
                            The best Guyanese, Caribbean & American fusion cuisine restaurant and bar
                            located in South Ozone Park/Richmond Hill, NYC.
                        </p>
                        <div className="buttons">
                            <Link to="/menu" className="btn">PLACE YOUR ORDER</Link>
                            <Link to="/contact" className="btn btn-alt">VISIT US</Link>
                        </div>
                    </div>
                    <div className="fade-bottom"></div>
                </div>



                            {/* ✅ Our Story Section with Slideshow */}
            <section className="our-story">
                <div className="story-images">
                    {/* ✅ Main Slideshow Image */}
                    <img src={slideshowImages[currentImageIndex]} alt="Legend Cookhouse" className="story-img img1 fade-in" />
                    {/* ✅ Overlapping Slideshow Image */}
                    <img src={slideshowImages[nextImageIndex]} alt="Legend Cookhouse" className="story-img img2 fade-in" />
                </div>
                <div className="story-text">
                    <h2>Welcome To The Legend Cookhouse Restaurant</h2>
                    <p>
                        <strong>LEGEND COOKHOUSE</strong> is the best <strong>Guyanese-American fusion cuisine</strong> restaurant and bar located in <strong>South Ozone Park/Richmond Hill, NYC</strong>. We provide a <strong>satisfying fine dining experience</strong>, offering the best and most popular **Guyanese food dishes**.
                    </p>
                    <p>
                        Our menu is inspired by the flavors of the <strong>Caribbean, South America, and the United States</strong>, carefully crafted to bring <strong>bold, authentic flavors</strong> to every dish. Whether you're looking for a <strong>quick bite, a family meal, or a night out</strong>, we’ve got you covered!
                    </p>
                    <p>
                        At <strong>Legend Cookhouse</strong>, we take pride in creating a <strong>warm, family-friendly atmosphere</strong>. Our goal is to keep <strong>Guyanese culinary traditions alive</strong> while also introducing new generations to our <strong>rich food culture</strong>.
                    </p>
                </div>
            </section>



            {/* ✅ Menu Options Section */}
            <section className="menu-options">
                <h2>Our Menu Options</h2>
                <div className="menu-flow">
                    {menuOptions.map((option, index) => (
                        <div key={index} className="menu-node">
                            <Link to={option.link} className="menu-item">
                                <img src={option.icon} alt={option.name} className="menu-icon" />
                                <h3>{option.name}</h3>
                                <p className="menu-description">{option.description}</p>
                            </Link>
                            {index < menuOptions.length - 1 && <div className="menu-connector"></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Dishes Section */}
            <section className="featured-section">
                <h2>Menu Highlights</h2>
                <div className="featured-grid">
                    <div className="dish">
                        <img src={dish1} alt="Signature Spiced Chicken" />
                        <h3>Chicken Lo Mein</h3>
                    </div>
                    <div className="dish">
                        <img src={dish2} alt="Gourmet Shrimp Delight" />
                        <h3>Shrimp ChowMein Noodle</h3>
                    </div>
                    <div className="dish">
                        <img src={dish3} alt="Chef’s Special Rice Bowl" />
                        <h3>Chicken Fried Rice</h3>
                    </div>
                </div>
                <Link to="/menu" className="btn">View Full Menu</Link>
            </section>


                       {/* ✅ Founder Section (After Menu Highlights) */}
                       <section className="founder-section">
                <div className="founder-content">
                    {/* ✅ Founder Image */}
                    <div className="founder-image">
                        <img src={founderImage} alt="Rupe Harricharan - Founder of Legend Cookhouse" />
                    </div>

                    {/* ✅ Founder Description */}
                    <div className="founder-text">
                        <h3>ABOUT THE FOUNDER</h3>
                        <h2>Meet Rupe Harricharan</h2>
                        <p>
                        Over two decades of dedication creating and designing services ensuring elevated experiences in the food and beverage industry. Our company is headed by Rupnarine Harricharan Also known as (Mr. Rupe or Mr. Legend) is currently utilizing over 20 years of the lives of families. Providing food preparation techniques from professionals to save families money and maintain control of their budget.
                        </p>
                        <p>
                        Our variety of sauces is bringing joy and happiness to the community and want to extend this feelings to everyone in North America. Customers can add diversity and great taste to their cooking. The cooking system developed via the sauces created to avoid wasting money on experimental taste and expensive chefs.
                        </p>
                        <p>
                        Rupe holds a Bachelor of Arts in accounting and economics from Queens College, City University of New York. Along with a developed career in accounting and taxation with prestige Accounting Firms, Financial Firms and Banks.
                        </p>
                        <p>
                        When he is not working, he enjoys exploring new restaurants and bars, beers, vodka and wine as well as participating in cricket matches and other sports.
                        </p>
                    </div>
                </div>
            </section>

            {/* Visit Us Section */}
            <section className="visit-us">
                <h2>Visit Us</h2>
                <p>Come and experience our flavors in person! Find us at:</p>
                <p><strong>Legend Cookhouse, 13511 Rockaway Blvd, Queens, NY</strong></p>

                {/* Google Maps Embed */}
                <div className="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.12291551076032!2d-73.80296798584818!3d40.67470380960766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2672388b8efd1%3A0x845e0126ebd0b8b!2sLegend%20Cookhouse!5e0!3m2!1sen!2sus!4v1741354079338!5m2!1sen!2sus"
                        width="100%" 
                        height="450" 
                        style={{ border: "0" }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="testimonials">
                {/* Customer Testimonials */}
                <CustomerReviews />
            </section>

            {/* Social Media Section */}
            <section className="social-media">
                <h2>Follow Us</h2>
                <p>Stay updated with our latest offers and events!</p>
                <div className="social-icons">
    <a href="https://facebook.com/legendcookhouse" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook"></i> Facebook
    </a>
    <a href="https://instagram.com/legendcookhouse" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i> Instagram
    </a>
    <a href="https://tiktok.com/@legendcookhouse" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-tiktok"></i> TikTok
    </a>
</div>

            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Legend Cookhouse. All rights reserved.</p>
            </footer>

            {/* Styles */}
            <style jsx>{`
                .home-page {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    width: 100vw;  /* Ensure it spans the entire viewport width */
                    position: absolute;
                    left: 0;
                    right: 0;
                }
                .hero {
                    position: relative;
                    width: 100%;
                    height: 1000px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover; /* Ensures video covers the entire hero section */
                    z-index: -1;
                }

                .hero-overlay {
                    position: absolute;
                    text-align: center;
                    color: white;
                    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
                    max-width: 90%;
                    padding: 20px;
                }

                .hero-overlay h1 {
                    font-size: 4rem;
                    font-weight: bold;
                    line-height: 1.1;
                }

                .hero-overlay .legend {
                    color: white;
                }

                .hero-overlay .cookhouse {
                    color: transparent;
                    -webkit-text-stroke: 2px yellow; /* Outline Effect */
                    font-weight: bold;
                }

                .hero-overlay p {
                    font-size: 1.2rem;
                    margin-top: 10px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* ✅ FADE EFFECT (Smooth Transition) */
                .fade-bottom {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100px;
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, #f8f8f8 100%);
                }

                .buttons {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                .btn {
                    background: black;
                    color: yellow;
                    padding: 12px 20px;
                    text-transform: uppercase;
                    font-weight: bold;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                    text-decoration: none;
                    border-radius: 25px;
                }

                .btn-alt {
                    background: transparent;
                    color: white;
                    border: 2px solid white;
                }

                .btn:hover {
                    background: yellow;
                    color: black;
                }

                .btn-alt:hover {
                    background: white;
                    color: black;
                }

                .our-story {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 15% 20rem;
                    background-color: #f8f8f8;
                    gap: 30px;
                }

                .story-images {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .story-img {
                    width: 100%;
                    max-width: 400px;
                    border-radius: 10px;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
                    transition: opacity 1s ease-in-out;
                    position: absolute;
                }

                .img1 {
                    z-index: 2;
                    animation: fadeIn 1s ease-in-out;
                }

                .img2 {
                    z-index: 1;
                    top: 80px;
                    left: 40px;
                }

                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1s forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .story-text {
                    flex: 1;
                    text-align: left;
                    max-width: 600px;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                }

                .story-text h2 {
                    font-size: 2rem;
                    color: #d35400;
                    margin-bottom: 15px;
                }

                .story-text p {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 10px;
                    line-height: 1.5;
                }

                /* ✅ Responsive Design */
                @media (max-width: 768px) {
                    .our-story {
                        flex-direction: column;
                        text-align: center;
                    }

                    .story-images {
                        display: flex;
                        justify-content: center;
                    }

                    .img2 {
                        position: static;
                        transform: translateY(0);
                        margin-top: -40px;
                    }

                    .story-text {
                        text-align: center;
                    }
                }

                /* ✅ MENU OPTIONS SECTION */
                .menu-options {
                    text-align: center;
                    padding: 4rem 5%;
                    background-color: #f8f8f8;
                }

                .menu-flow {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }

                .menu-node {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 300px;
                }

                .menu-item {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    text-decoration: none;
                    color: black;
                    width: 100%;
                    transition: transform 0.2s ease-in-out, box-shadow 0.3s;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                }

                .menu-item:hover {
                    transform: scale(1.05);
                    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
                }

                .menu-icon {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
                }

                .menu-description {
                    font-size: 14px;
                    color: gray;
                    margin-top: 5px;
                }

                /* ✅ Connectors between menu items */
                .menu-connector {
                    width: 2px;
                    height: 40px;
                    background: gray;
                    margin: 5px 0;
                    position: relative;
                }

                .founder-section {
                    display: flex;
                    justify-content: center;
                    padding: 5rem 5%;
                    background-color: #f9f9f9;
                }

                .founder-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 50px;
                    max-width: 1200px;
                    width: 100%;
                }

                .founder-image {
                    flex: 1;
                    max-width: 40%;
                    display: flex;
                    justify-content: center;
                }

                .founder-image img {
                    width: 100%;
                    max-width: 350px;
                    border-radius: 12px;
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
                }

                .founder-text {
                    flex: 1;
                    text-align: left;
                    max-width: 55%;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                }

                .founder-text h3 {
                    font-size: 1rem;
                    color: #d35400;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }

                .founder-text h2 {
                    font-size: 2rem;
                    color: #222;
                    margin-bottom: 15px;
                }

                .founder-text p {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 10px;
                    line-height: 1.5;
                }

                /* ✅ Responsive Design */
                @media (max-width: 1024px) {
                    .founder-content {
                        flex-direction: column;
                        text-align: center;
                    }

                    .founder-text {
                        max-width: 100%;
                        text-align: center;
                    }

                    .founder-image {
                        max-width: 100%;
                        margin-bottom: 20px;
                    }
                }

                .featured-section, .visit-us, .testimonials, .social-media {
                    padding: 2rem;
                    background-color: #f8f8f8;
                }
                .featured-grid {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }
                .dish img, .map {
                    width: 200px;
                    height: 150px;
                    border-radius: 10px;
                }
                .testimonial {
                    background-color: #f0f0f0;
                    padding: 1rem;
                    margin: 10px auto;
                    max-width: 400px;
                    border-radius: 10px;
                }
                .social-icons a {
                    display: inline-block;
                    margin: 0 10px;
                    text-decoration: none;
                    color: #d35400;
                }
                .footer {
                    background-color: #222;
                    color: white;
                    padding: 1rem;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
};

export default Home;
