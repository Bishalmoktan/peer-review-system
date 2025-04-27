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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export interface AssignmentCardProps {
  id: string;
  title: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  user: User;
}

const AssignmentCard = ({
  id,
  title,
  file_path,
  user,
}: AssignmentCardProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const handleOpenPdf = () => {
    setIsPdfOpen(true);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
  };

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`api/create-review/${id}`, {
        rating,
        feedback,
      });
      toast.success("Feedback submitted successfully.");
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden bg-white">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Submitted by {user.name}
              </p>
            </div>
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
              onClick={toggleFeedback}
              className="flex items-center"
            >
              Feedback
              {showFeedback ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {showFeedback && (
          <div className="p-5 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <h3 className="font-medium text-gray-800 mb-3">
              Rate this assignment
            </h3>

            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-all duration-100",
                      (hoveredRating || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0
                  ? `${rating} star${rating > 1 ? "s" : ""}`
                  : "Select rating"}
              </span>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="feedback"
                className="text-sm font-medium text-gray-700"
              >
                Your feedback
              </label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts about this assignment..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                onClick={handleSubmit}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
              >
                Submit Feedback
              </Button>
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
