import { Star } from "lucide-react";

const AverageRating = () => {
  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-sm flex justify-center items-center flex-col gap-4">
      <h2 className="text-5xl">4.3</h2>
      <div className="flex items-center">
        <Star className="h-10 w-10 fill-primary text-primary" />
        <Star className="h-10 w-10 fill-primary text-primary" />
        <Star className="h-10 w-10 fill-primary text-primary" />
        <Star className="h-10 w-10 fill-primary text-primary" />
        <Star className="h-10 w-10 fill-primary text-primary" />
      </div>
      <div className="text-xl">50 Ratings</div>
    </div>
  );
};

export default AverageRating;
