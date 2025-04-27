"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteAssignment({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await api.delete(`/api/delete-assignment/${id}`);
      toast.success(`${title} has been deleted`);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-2">
          <TrashIcon />
          Delete
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  ">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Assignment</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to do this? <br />
            <span className="font-semibold text-indigo-500"> {title}</span> will
            be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4">
          <div className="flex items-center justify-between w-full">
            <DialogClose>
              <Button
                variant={"ghost"}
                className="hover:bg-white hover:text-black transition"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleDelete} variant={"destructive"}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
