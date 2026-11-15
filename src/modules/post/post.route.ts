import { Router } from "express";

const router = Router();


// router.post("/", )

router.get("/", (req, res) => {
    res.send("Welcome to the Post API");
});

const postRouter : Router = router;

export default postRouter;