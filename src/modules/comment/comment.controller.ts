import { NextFunction, Request, Response } from "express";
import catchAsync from "../shared/catchAsync";
import { commentService } from "./comment.service";
import sendResponse from "../shared/sendResponse";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: User not authenticated."
        })
    }
    req.body.authorId = user.id; // Set the authorId to the authenticated user's ID

    const result = await commentService.createComment(req.body);
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Comment created successfully",
        data: result
    })
})

const getCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const result = await commentService.getCommentById(commentId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comment retrieved successfully",
        data: result
    })
})

const getCommentsByAuthorId = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {authorId} = req.params;
    if(!authorId){
        throw new Error("author is missing")
    }
    const result = await commentService.getCommentsByAuthorId(authorId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comments retrieved successfully",
        data: result
    })
})


export const commentController = {
    createComment,
    getCommentById,
    getCommentsByAuthorId
}