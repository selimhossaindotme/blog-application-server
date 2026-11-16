import { NextFunction, Request, Response } from "express";
import catchAsync from "../shared/catchAsync";
import { postService } from "./post.service";
import sendResponse from "../shared/sendResponse";
import { PostStatus } from "../../../generated/prisma/enums";


const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
     const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === 'false'
    ? false : undefined
     : undefined;
    const result = await postService.getAllPostService({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy as string || "createdAt",
        sortOrder: sortOrder as string || "desc",
        tags,
        isFeatured,
        filters: filters as Record<string, string>
    });
    
    
    sendResponse(res, { 
        statusCode: 200,
        success: true,
        meta: {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            total: result.totalPosts
        },
        message: "Posts retrieved successfully",
        data: result
    })
})

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const result = await postService.getSinglePostService(postId as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post retrieved successfully",
        data: result
    })
})

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: User not authenticated."
        })
    }

    const result = await postService.createPostService(req.body, user);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: result
    })
})

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const result = await postService.updatePostService(postId as string, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post updated successfully",
        data: result
    })
})

const updatePostStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const { status } = req.body;
    const result = await postService.postUpdateStatusService(postId as string, status as PostStatus);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post status updated successfully",
        data: result
    })
})

// delete post controller
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const result = await postService.deletePostService(postId as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post deleted successfully",
        data: result
    })
})

export const postController = {
    createPost,
    getSinglePost,
    getAllPosts,
    updatePost,
    updatePostStatus,
    deletePost
}
