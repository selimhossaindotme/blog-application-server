import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
    postId: string;
    content: string;
    authorId: string;
    parentId?: string;
}) => {
    // check if the post exists
     await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    // check if the parent comment exists if parentId is provided
    if (payload.parentId) {
         await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }



    const result = await prisma.comment.create({
        data: payload
    })

    return result;
}

const getCommentById = async (commentId: string) => {
    const commentData = await prisma.comment.findUnique({
        where: {
            id: commentId
        },
        include: {
            replies: {
                where: {
                    parentId: commentId
                }
            },
            post: true
        }

    });

    return commentData;
}

const getCommentsByAuthorId = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId: authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: true,
            replies: true
        }
    });

    return comments;
}

export const commentService = {
    createComment,
    getCommentById,
    getCommentsByAuthorId
}