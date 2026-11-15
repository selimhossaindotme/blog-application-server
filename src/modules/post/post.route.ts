import { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { postController } from "./post.controller";

const router = Router();


router.get("/", postController.getAllPosts);
router.get("/:id", postController.getSinglePost);
router.put("/:id", 
    auth(UserRole.User),
    postController.updatePost);

// post update status route
router.patch("/:id/status", 
    auth(UserRole.Admin, UserRole.User),
    postController.updatePostStatus
);
router.post("/", 
    auth(UserRole.User, UserRole.Admin),
    postController.createPost
)

// delete post route
router.delete("/:id",
    auth(UserRole.Admin, UserRole.User),
    postController.deletePost
)

const postRouter : Router = router;

export default postRouter;