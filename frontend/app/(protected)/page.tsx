"use client";

import { useEffect, useState } from "react";
import AverageRating from "./_components/average-rating";
import Ratings from "./_components/ratings";
import RecentFeedback from "./_components/recent-feedback";
import { Review } from "@/types/reviews";
import { api } from "@/lib/api";

const DashboardPage = () => {
  const [feedbacks, setFeedbacks] = useState<Review[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("/api/all-feedbacks");
        if (res.data.success) {
          setFeedbacks(res.data.feedbacks);
        }
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-4 mb-7">
        <Ratings feedbacks={feedbacks} />
        <AverageRating feedbacks={feedbacks} />
      </div>

      <RecentFeedback />
    </section>
  );
};

export default DashboardPage;
