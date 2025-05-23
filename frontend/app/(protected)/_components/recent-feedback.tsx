"use client";

import { useEffect, useState } from "react";
import { FeedbackCard } from "./feedback-card";
import { Review } from "@/types/reviews";
import { api } from "@/lib/api";

const adjectives = [
  "Swift",
  "Bright",
  "Silent",
  "Gentle",
  "Bold",
  "Clever",
  "Eager",
  "Fierce",
  "Honest",
  "Keen",
  "Lively",
  "Mighty",
  "Noble",
  "Polite",
  "Quiet",
  "Wise",
];

const nouns = [
  "Falcon",
  "Tiger",
  "Dolphin",
  "Phoenix",
  "Panda",
  "Eagle",
  "Wolf",
  "Fox",
  "Owl",
  "Hawk",
  "Lynx",
  "Raven",
  "Badger",
  "Beaver",
  "Koala",
  "Otter",
];

// Sample feedback comments
const feedbackComments = [
  "The platform is intuitive and easy to navigate. I especially like the dashboard layout.",
  "Great experience overall. The response time could be improved slightly.",
  "Excellent customer service! My issue was resolved promptly.",
  "The new features are a game-changer. Very impressed with the latest update.",
  "User-friendly interface but I found a few bugs in the checkout process.",
  "Love the design and functionality. Would recommend to others.",
  "The mobile app works flawlessly. Great job on the responsive design!",
  "Solid performance and reliability. Haven't experienced any downtime.",
];

// Generate a random name
function generateRandomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

function generateRandomSeed() {
  return Math.random().toString(36).substring(2, 8);
}

const RecentFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Review[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("/api/recent-feedbacks");
        setFeedbacks(res.data.feedbacks);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Recent Feedbacks</h2>
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          name={generateRandomName()}
          rating={feedback.rating}
          comment={feedback.feedback}
          avatarSeed={generateRandomSeed()}
        />
      ))}

      {feedbacks.length === 0 && <p>No feedback available.</p>}
    </div>
  );
};

export default RecentFeedback;
