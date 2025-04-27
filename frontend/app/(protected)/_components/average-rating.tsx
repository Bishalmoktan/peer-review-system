import { Star } from "lucide-react";
import type { Review } from "@/types/reviews";

const AverageRating = ({ feedbacks }: { feedbacks: Review[] }) => {
  const totalRatings = feedbacks.length;
  const sumRatings = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);

  const average = totalRatings ? (sumRatings / totalRatings).toFixed(1) : "0.0";

  const filledStars = Math.round(parseFloat(average));

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-sm flex justify-center items-center flex-col gap-4">
      <h2 className="text-5xl">{average}</h2>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className="h-10 w-10"
            fill={idx < filledStars ? "currentColor" : "none"}
            color="hsl(var(--primary))"
          />
        ))}
      </div>
      <div className="text-xl">{totalRatings} Ratings</div>
    </div>
  );
};

export default AverageRating;
