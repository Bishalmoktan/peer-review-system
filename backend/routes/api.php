<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/assignments', [AssignmentController::class, 'getAllAssignments']);
Route::get('/assignment/{id}', [AssignmentController::class, 'getAssignmentDetails']);
Route::get('/assignments/{user_id}', [AssignmentController::class, 'getAssignmentsOfUser']);
Route::get('reviews/{assignmentId}', [ReviewController::class, 'getReviewsByAssignment']);




Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    
    // assignments
    Route::get('review-assignment', [AssignmentController::class, 'getAllAssignmentsForReview']);
    Route::post('create-assignment', [AssignmentController::class, 'createAssignment']);
    Route::post('update-assignment/{id}', [AssignmentController::class, 'update']);
    Route::delete('delete-assignment/{id}', [AssignmentController::class, 'destroy']);
    
    // reviews
    Route::post('create-review/{assignmentId}', [ReviewController::class, 'store']);
    Route::put('update-review/{id}', [ReviewController::class, 'update']);
    Route::delete('delete-review/{id}', [ReviewController::class, 'destroy']);
});
