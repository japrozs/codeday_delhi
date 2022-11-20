import { Router } from "express";
import { expressIsAuth } from "../../middleware/isAuth";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import { User } from "../../entities/User";

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: "storage",
        filename: async (_, _file: any, callback: any) => {
            const name = await v4();
            callback(null, name + ".jpg");
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("image")) {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/avatar",
    expressIsAuth,
    upload.single("file"),
    async (req, res) => {
        await User.update(
            {
                id: req.session.userId,
            },
            {
                imgUrl: `http://localhost:4000/${req.file?.path}`,
            }
        );
        console.log(req.file);
        return res.json({ success: true });
    }
);
export default router;
