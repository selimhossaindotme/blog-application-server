import { Router } from "express";
import postRouter from "../modules/post/post.route";
import { commentRouter } from "../modules/comment/comment.routes";

const router : Router = Router();

const moduleRoutes = [
    {
        path: '/post',
        route: postRouter
    },
    {
        path: '/comment',
        route: commentRouter
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;