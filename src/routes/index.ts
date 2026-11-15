import { Router } from "express";
import postRouter from "../modules/post/post.route";

const router : Router = Router();

const moduleRoutes = [
    {
        path: '/post',
        route: postRouter
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;