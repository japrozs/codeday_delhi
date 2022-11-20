"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../../middleware/isAuth");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const User_1 = require("../../entities/User");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: "storage",
        filename: async (_, _file, callback) => {
            const name = await (0, uuid_1.v4)();
            callback(null, name + ".jpg");
        },
    }),
    fileFilter: (_, file, callback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("image")) {
            callback(null, true);
        }
        else {
            callback(new Error("Not an image"));
        }
    },
});
router.post("/avatar", isAuth_1.expressIsAuth, upload.single("file"), async (req, res) => {
    var _a;
    await User_1.User.update({
        id: req.session.userId,
    }, {
        imgUrl: `http://localhost:4000/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`,
    });
    console.log(req.file);
    return res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=avatar.js.map