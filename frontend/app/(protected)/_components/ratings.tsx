import { Review } from "@/types/reviews";
import { Star } from "lucide-react";

const Ratings = ({ feedbacks }: { feedbacks: Review[] }) => {
  const ratingsCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: feedbacks.filter((feedback) => feedback.rating === star).length,
  }));

  const total = feedbacks.length;

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        {ratingsCount.map((rating) => (
          <div key={rating.star} className="flex items-center gap-3">
            <div className="w-20 text-lg font-medium">{rating.star} Star</div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary" />
            </div>
            <div className="flex-1 h-6 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{
                  width: total ? `${(rating.count / total) * 100}%` : "0%",
                }}
              />
            </div>
            <div className="w-16 text-right text-lg font-medium">
              {rating.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
