"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, FileText, Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api } from "@/lib/api";

export default function UpdateSubmission() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("id"); // Fetch ID from URL

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch existing assignment details
  useEffect(() => {
    if (!assignmentId) return;

    const fetchAssignment = async () => {
      try {
        setLoadingData(true);
        const response = await api.get(`/api/assignment/${assignmentId}`);
        const data = response.data.assignment;
        setTitle(data.title);
        // File can't be preloaded as a File object, only title will show
      } catch (err) {
        setError("Failed to load assignment data.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        setFile(null);
        return;
      }
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (file) {
        formData.append("file", file);
      }

      const response = await api.post(
        `/api/update-assignment/${assignmentId}`,
        formData
      );

      if (!response) {
        throw new Error("Failed to update assignment");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Assignment</CardTitle>
          <CardDescription>
            Update your assignment details. You can upload a new PDF (optional).
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your assignment has been updated successfully. Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of your assignment"
                maxLength={255}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload New PDF (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : "Drag and drop or click to upload"}
                  </p>
                  <p className="text-xs text-gray-400">PDF only, max 20MB</p>

                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-primary cursor-pointer"
                    onClick={() => document.getElementById("file")?.click()}
                    disabled={isSubmitting}
                  >
                    Select File
                  </Button>
                </div>
              </div>
            </div>

            {file && (
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  disabled={isSubmitting}
                >
                  Remove
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !title}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Assignment"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
