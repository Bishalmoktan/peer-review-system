import { Star } from "lucide-react";

const Ratings = () => {
  const ratings = [
    { label: "FIVE", count: 989, percentage: 17 },
    { label: "FOUR", count: "4.5K", percentage: 80 },
    { label: "THREE", count: 50, percentage: 10 },
    { label: "TWO", count: 16, percentage: 5 },
    { label: "ONE", count: 8, percentage: 2 },
  ];

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div key={rating.label} className="flex items-center gap-3">
            <div className="w-20 text-lg font-medium">{rating.label}</div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary" />
            </div>
            <div className="flex-1 h-6 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{ width: `${rating.percentage}%` }}
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
