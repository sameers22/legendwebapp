import React, { useEffect } from "react";

const CustomerReviews = () => {
    useEffect(() => {
        // ✅ Re-initialize Elfsight widgets when component mounts
        if (window.ElfsightApp) {
            window.ElfsightApp.reload();
        }
    }, []);

    return (
        <section className="testimonials">
            {/* ✅ Insert Elfsight Google Reviews Widget */}
            <div className="elfsight-app-c2833e17-5821-465c-8820-7e3c3620ec01" data-elfsight-app-lazy></div>
        </section>
    );
};

export default CustomerReviews;
