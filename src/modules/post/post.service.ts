import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"


const getAllPostService = async (
    {
        page,
        limit,
        sortBy,
        sortOrder,
        filters,
        tags = [],
        isFeatured
    }: {
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: string;
        filters: Record<string, string>;
        tags: string[] | [];
        isFeatured?: boolean | undefined;
    }
) => {
    const { searchTerm } = filters;
    const skip = (page - 1) * limit;
    const andCondition: PostWhereInput[] = [];

   if (searchTerm) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    tags: {
                        has: searchTerm
                    }
                }
            ]
        })
   }

   if (tags.length > 0) {
        andCondition.push({
            tags: {
                hasEvery: tags as string[]
            }
        })
    }

    if(typeof isFeatured === "boolean"){
        andCondition.push({
            isFeatured: isFeatured
        })
    }
    
    const result = await prisma.post.findMany({
        where: {
            AND: andCondition,    
        },
         orderBy: {
            [sortBy]: sortOrder
        },
        skip,
        take: limit
    });

    const totalPosts = await prisma.post.count({
        where: {
            AND: andCondition,
        },
         orderBy: {
            [sortBy]: sortOrder
        },
        skip,
        take: limit
       
    })
    return { result, totalPosts };
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
