"use client";

import { api } from "@/lib/api";
import { Assignment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";

export default function SubmissionPage() {
  const [data, setData] = useState<Assignment[]>([]);

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
    <div className="mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Assignments</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
