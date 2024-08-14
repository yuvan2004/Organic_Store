import React from 'react';
import '../style/about.css'; // Assuming you have a CSS file for styling

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
                <p>Welcome to [ Organic Store ]</p>
            </div>
            <div className="about-content">
                <p>
                    At [ Organic Store ], we are passionate about providing high-quality, organic products that promote health and well-being. Our mission is to offer a wide range of organic foods, skincare products, and eco-friendly household items that are safe for you and the environment.
                </p>
                <h2>Our Story</h2>
                <p>
                    Our journey began with a simple belief: that everyone deserves access to pure, natural products free from harmful chemicals and additives. We started [ Organic Store ] with the vision of creating a space where customers can shop with confidence, knowing that every item we carry is carefully curated to meet the highest standards of quality and sustainability.
                </p>
                <h2>Our Values</h2>
                <ul>
                    <li><strong>Quality:</strong> We believe in offering only the best organic products, sourced from trusted suppliers who share our commitment to purity and excellence.</li>
                    <li><strong>Sustainability:</strong> We are dedicated to promoting eco-friendly practices and reducing our environmental footprint. From packaging to product selection, sustainability is at the heart of everything we do.</li>
                    <li><strong>Community:</strong> We support local farmers and artisans, and we are committed to giving back to our community through various initiatives and partnerships.</li>
                    <li><strong>Transparency:</strong> We believe in being open and honest with our customers. That's why we provide clear information about the sourcing, ingredients, and benefits of all our products.</li>
                </ul>
                <h2>Why Choose Us?</h2>
                <p>
                    At [ Organic Store ], we are more than just a store—we are a community of like-minded individuals who value health, wellness, and sustainability. Whether you're looking for millets,oils and nuts, natural skincare products, or eco-friendly household items, we have something for everyone. Our knowledgeable staff is always here to help you find the perfect products to meet your needs.
                </p>
                <h2>Our Promise</h2>
                <p>
                    We are committed to providing our customers with the highest level of service and satisfaction. We stand by the quality of our products and are always here to answer any questions you may have.
                </p>
                <p>
                    Thank you for choosing [ Organic Store ]. Together, we can make a positive impact on our health, our community, and our planet.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
