"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import AssignmentCard, { AssignmentCardProps } from "./assignment-card";

const FeedbackPage = () => {
  const [data, setData] = useState<AssignmentCardProps[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`/api/assignments/${user?.id}`);
        setData(res.data.assignments);
      } catch (error) {
        toast.error("Error fetching the assignments");
        setData([]);
      }
    };

    if (user) {
      getData();
    }
  }, [user]);
  return (
    <div className="py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Assignments</h1>
      <div className="space-y-4">
        {data.map((assignment) => (
          <AssignmentCard key={assignment.id} {...assignment} />
        ))}

        {data.length === 0 && <p>No assignment submitted.</p>}
      </div>
    </div>
  );
};

export default FeedbackPage;
