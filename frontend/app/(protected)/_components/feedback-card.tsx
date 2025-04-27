import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface FeedbackCardProps {
  name: string;
  rating: number;
  comment: string;
  avatarSeed: string;
}

export function FeedbackCard({
  name,
  rating,
  comment,
  avatarSeed,
}: FeedbackCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback
            className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
            style={{
              backgroundColor: `hsl(${
                Number.parseInt(avatarSeed, 36) % 360
              }, 70%, 95%)`,
            }}
          >
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-lg text-gray-800">{name}</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating
                      ? "fill-primary text-primary"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-500">{comment}</p>
        </div>
      </div>
    </div>
  );
}
