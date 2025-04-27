<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AssignmentController extends Controller
{
    public function getAllAssignments(){
        $assignments = Assignment::orderBy('created_at', 'desc')->get();
        return response() -> json([
            'success' => true,
            'assignments' => $assignments
        ]);
    }

    public function getAllAssignmentsForReview(){
        $assignments = Assignment::where('user_id', '!=', Auth::id())  ->with('user')  -> orderBy('created_at', 'desc')->get();
        return response() -> json([
            'success' => true,
            'assignments' => $assignments
        ]);
    }

    public function getAssignmentsOfUser($user_id){
        $assignments = Assignment::where("user_id", "=", $user_id) -> with('reviews.reviewer') -> orderBy('created_at', 'desc') ->get();
        return response() -> json([
            'success' => true,
            'assignments' => $assignments
        ]);
    }

    public function getAssignmentDetails($id){
        $assignment = Assignment::findOrFail($id);
        return response() -> json([
            'success' => true,
            'assignment' => $assignment
        ]);
    }

    public function createAssignment(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|mimes:pdf|max:20480',
        ]);

        $filePath = $request->file('file')->store('assignments', 'public');

        $assignment = Assignment::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'file_path' => $filePath,
        ]);

        return response()->json($assignment, 201);
    }

    public function update(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);

        if ($assignment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }


        $request->validate([
            'title' => 'sometimes|string|max:255',
            'file' => 'sometimes|mimes:pdf|max:20480',
        ]);

        if ($request->filled('title')) {
            $assignment->title = $request->title;
        }

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($assignment->file_path);
            $assignment->file_path = $request->file('file')->store('assignments', 'public');
        }

        $assignment->save();

        return response()->json($assignment);
    }

    public function destroy($id)
    {
        $assignment = Assignment::findOrFail($id);

        if ($assignment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        Storage::disk('public')->delete($assignment->file_path);
        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}
