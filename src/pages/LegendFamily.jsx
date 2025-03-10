import React, { useState, useEffect } from "react";

const LegendFamily = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                console.log("Fetching videos from API...");
                const response = await fetch("https://legendwebapp.onrender.com/api/scrape-videos");
                if (!response.ok) throw new Error("Failed to fetch videos from API");

                const data = await response.json();
                if (!data.videos || data.videos.length === 0) throw new Error("No videos found from API");

                setVideos(data.videos);
            } catch (apiError) {
                console.error("API Error:", apiError.message);
                setError(apiError.message);

                // 🔄 Try loading from `videosCache.json`
                console.log("Trying to load videos from cache...");
                try {
                    const cacheResponse = await fetch("/videosCache.json");
                    if (!cacheResponse.ok) throw new Error("Failed to load cached videos");

                    const cacheData = await cacheResponse.json();
                    if (!cacheData.videos || cacheData.videos.length === 0) throw new Error("No cached videos available");

                    setVideos(cacheData.videos);
                    setError(null);
                    console.log("✅ Loaded videos from cache");
                } catch (cacheError) {
                    console.error("Cache Error:", cacheError.message);
                    setError("Could not fetch videos from API or cache.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="legend-family">
            <h1>Legend Family Videos</h1>
            <p>Watch the latest videos of our Legend Cookhouse!</p>

            {loading && <p>Loading videos... Please wait.</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <div className="video-grid">
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div key={index} className="video-item">
                            <iframe
                                src={video.embedUrl}
                                title={`Video ${index + 1}`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))
                ) : (
                    !loading && <p>No videos found. Try again later.</p>
                )}
            </div>

            <style jsx>{`
                .legend-family {
                    text-align: center;
                    padding: 6rem 2rem 2rem;
                    background-color: #f8f8f8;
                }
                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .video-item {
                    background: white;
                    padding: 10px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                iframe {
                    width: 100%;
                    height: 200px;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default LegendFamily;
