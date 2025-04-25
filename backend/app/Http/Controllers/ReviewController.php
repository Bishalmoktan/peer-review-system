<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, $assignmentId)
    {
        $request->validate([
            'feedback' => 'required|string',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $review = Review::create([
            'assignment_id' => $assignmentId,
            'reviewer_id' => Auth::id(),
            'feedback' => $request->feedback,
            'rating' => $request->rating,
        ]);

        return response()->json($review, 201);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($review->reviewer_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'feedback' => 'sometimes|string',
            'rating' => 'sometimes|numeric|min:1|max:5',
        ]);

        $review->update($request->only(['feedback', 'rating']));

        return response()->json($review);
    }

    public function getReviewsByAssignment($assignmentId)
    {
        $reviews = Review::where('assignment_id', $assignmentId)
            ->get();

        return response()->json($reviews);
    }




    public function destroy($id)
    {
        $review = Review::findOrFail($id);

        if ($review->reviewer_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted']);
    }
}
