import React, { useState } from "react";
import AIChatSidebar from "./AIChatSidebar";
import "../styles/LandingPage.css";
import { Link } from 'react-router-dom';
const benefits = [
  {
    img: "https://www.gastropune.com/wp-content/uploads/2024/07/Untitled-design-2024-07-16T121912.448-1024x614.png",
    quote: "Healthy lifestyle improves productivity and focus"
  },
  {
    img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    quote: "Track habits and stay consistent every day"
  },
  {
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    quote: "Prevent health issues with early insights"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBnx-o3awJ_T6ukyBAY0xKXzbfotJ9OEtrVJRnPNh&s",
    quote: "Personalized AI recommendations for you"
  },
  {
    img: "data:image/jpeg;base64,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",
    quote: "Stay motivated and achieve your goals"
  }
];

const features = [
  {
    name: "Dashboard",
    description: "Visualize real-time metrics and monitor your health progress at a glance."
  },
  {
    name: "Daily Health Tracking",
    description: "Log your daily habits, meals, workouts, and wellness activities consistently."
  },
  {
    name: "History & Analytics",
    description: "Analyze your past data and identify patterns to make informed health decisions."
  },
  {
    name: "AI-powered Reports",
    description: "Get personalized insights and recommendations generated by AI based on your data."
  },
  {
    name: "Smart AI Assistant",
    description: "Receive real-time suggestions, reminders, and guidance from an intelligent assistant."
  },
  {
    name: "Secure Authentication",
    description: "Your personal health data is protected with top-notch security and privacy measures."
  }
];

export default function LandingPage() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="landing-page">
      {/* AI Chat */}
      <AIChatSidebar userLoggedIn={userLoggedIn} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>Transform Your Health with AI</h1>
          <p className="hero-subtitle">
            Track, analyze, and improve your lifestyle with real-time insights,
            intelligent reports, and personalized recommendations.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">Get Started</Link>
<Link to="/login" className="secondary-btn">Login</Link>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeR95N0_zOJ0pDLFRicBGZcf5ukvlq6asY1g&s"
            alt="health"
          />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
        <h2>Why Your Health Matters</h2>

        <div className="benefit-carousel">
          {benefits.map((b, idx) => (
            <div key={idx} className="benefit-item">
              <img src={b.img} alt={`Benefit ${idx}`} />
              <p className="quote">{b.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
<section className="features">
  <h2>Powerful Features</h2>

  <div className="feature-carousel">
    {features.map((f, idx) => (
      <div key={idx} className="feature-card">
        <h3>{f.name}</h3>
        <p>{f.description}</p>
      </div>
    ))}
  </div>
</section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Health Journey Today</h2>
      <Link to="/register" className="primary-btn">Join Now</Link>
      </section>
    </div>
  );
}
