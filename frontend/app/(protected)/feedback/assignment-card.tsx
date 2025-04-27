"use client";

import { useState } from "react";
import type { User } from "@/context/UserContext";
import {
  FileText,
  Star,
  ChevronDown,
  ChevronUp,
  X,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export interface AssignmentCardProps {
  id: string;
  title: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  reviews: Review[];
}

interface Review {
  id: string;
  rating: number;
  feedback: string;
  created_at: string;
  reviewer: User;
}

// Generate a random name
function generateRandomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

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

const AssignmentCard = ({
  title,
  file_path,
  reviews = [],
}: AssignmentCardProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [displayedReviews, setDisplayedReviews] = useState(3);

  const handleOpenPdf = () => {
    setIsPdfOpen(true);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const loadMoreReviews = () => {
    setDisplayedReviews((prev) => prev + 3);
  };

  console.log(reviews);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const roundedAvgRating = Math.round(averageRating * 10) / 10;

  return (
    <>
      <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden bg-white">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>

            {reviews.length > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{roundedAvgRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">
                  ({reviews.length})
                </span>
              </Badge>
            )}
          </div>

          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-md mb-4 border border-gray-100">
            <FileText className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {file_path}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleOpenPdf}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Read PDF
            </Button>

            <Button
              variant="outline"
              onClick={toggleReviews}
              className="flex items-center"
              disabled={reviews.length === 0}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Reviews {reviews.length > 0 && `(${reviews.length})`}
              {showReviews ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {showReviews && reviews.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <h3 className="font-medium text-gray-800 mb-3">
              Reviews & Feedback
            </h3>

            <div className="space-y-4">
              {reviews.slice(0, displayedReviews).map((review) => {
                const name = generateRandomName();
                return (
                  <div
                    key={review.id}
                    className="bg-white p-4 rounded-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          {review.reviewer && (
                            <AvatarImage src={""} alt={name} />
                          )}
                          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {format(new Date(review.created_at), "MMM d, yyyy")}
                      </span>
                    </div>

                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-gray-700">{review.feedback}</p>
                  </div>
                );
              })}

              {reviews.length > displayedReviews && (
                <Button
                  variant="ghost"
                  onClick={loadMoreReviews}
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  Show more reviews
                </Button>
              )}

              {reviews.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-gray-500">
              {file_path}
            </DialogDescription>
          </DialogHeader>

          <div className="relative flex-1 w-[80%] md:w-full md:h-full min-h-[60vh] bg-gray-100 rounded-md overflow-hidden">
            {isPdfLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading PDF...</span>
              </div>
            )}

            <iframe
              src={`${process.env.NEXT_PUBLIC_BACKED_URL}/storage/${file_path}`}
              className=" w-full h-full border-0"
              onLoad={handlePdfLoad}
              title={`PDF Viewer - ${title}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignmentCard;
