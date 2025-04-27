"use client";
import { useEffect, useState } from "react";
import AssignmentCard, { AssignmentCardProps } from "./assignment-card";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const PendingReviewsPage = () => {
  const [assignments, setAssignments] = useState<AssignmentCardProps[]>([]);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const res = await api.get("/api/review-assignment");
        setAssignments(res.data.assignments);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    getAssignments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">New Assignments</h1>
      <div className="space-y-6">
        {assignments.map((review) => (
          <AssignmentCard key={review.id} {...review} />
        ))}

        {assignments.length === 0 && <p>No assignments available to review.</p>}
      </div>
    </div>
  );
};

export default PendingReviewsPage;
