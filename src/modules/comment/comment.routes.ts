import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth, UserRole } from "../../middleware/auth";

const router: Router = Router();

router.post("/",
    auth(UserRole.User, UserRole.Admin),
    commentController.createComment
)

router.get("/:id", commentController.getCommentById);

router.get("/author/:authorId", 
    
    commentController.getCommentsByAuthorId);

export const commentRouter = router;

