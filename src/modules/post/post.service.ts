import { PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"


const getAllPostService = async () => {
    const result = await prisma.post.findMany();
    return result;
}

// get single post 

const getSinglePostService = async (postId: string) => {
   return await prisma.$transaction(async (tnx) => {
    
    await tnx.post.update({
        where: {
            id: postId
        },
        data: {
            view: {
                increment: 1
            }
        }
    })

    const postData = await tnx.post.findUnique({
        where: {
            id: postId
        }
    })

    return postData;

   })
    
}

const createPostService = async (postData: any, user: any) => {
     const result = await prisma.post.create({
        data: {
            ...postData,
            authorId: user.id
        }
     })
     return result;
}

const updatePostService = async (postId: string, postData: any) => {
    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: postData
    })
    return result;
}

const postUpdateStatusService = async (postId: string, status: PostStatus) => {
    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            status
        }
    })
    return result;
}

const deletePostService = async (postId: string) => {
    const result = await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return result;
}

export const postService = {
    createPostService,
    getAllPostService,
    getSinglePostService,
    updatePostService,
    postUpdateStatusService,
    deletePostService
}
