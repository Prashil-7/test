"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const uitls_1 = require("./uitls");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
const PORT = process.env.PORT;
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputChecks = zod_1.z.object({
        username: zod_1.z
            .string()
            .min(3, 'Username must be at least 3 characters long')
            .max(20, 'Username must be at most 20 characters long'),
        //.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        password: zod_1.z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(100, 'Password must be less than 100 characters long')
        // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .regex(/[0-9]/, 'Password must contain at least one number')
        // .regex(/[\W_]/, 'Password must contain at least one special character'),
    });
    // Example usage
    const result = inputChecks.safeParse(req.body);
    if (!result.success) {
        console.error(result.error.format());
    }
    else {
        console.log('Valid input:', result.data);
    }
    const { username, password } = req.body;
    try {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const userExits = yield db_1.userModel.findOne({ username });
        // if(userExits){
        //      return res.status(500).json({
        //         msg:"u are already exits"
        //      })
        // }
        if (userExits) {
            res.json({ msg: "u are already registered" });
        }
        yield db_1.userModel.create({ username,
            password: hashPassword });
        res.json({ msg: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({
            msg: "u are invalid credentials"
        });
        console.log(`error in signup${error}`);
    }
}));
// app.post("/api/v1/signin" , async (req,res)=>{
//       const { username, password } =req.body;
//       try {
//         const user = await userModel.findOne({username})
//         if(!user) {res.json({msg:"u are not signn up"});}
//     const passwordMatch = await bcrypt.compare(password , user?.password!);
//     if(!passwordMatch){
//         res.json({msg:"password incorrect"})
//     }
//          const existingUser = await userModel.findOne({username , password: passwordMatch});
//          try {
//             if(existingUser) {
//              const token =   jwt.sign({id: existingUser._id},
//                process.env.JWT_SECRET!)
//                  res.status(200).json({token})
//             }
//          } catch (error) {
//             res.json({msg:"err"})
//             console.log(`the err ${error}`);
//          }
//       } catch (error) {
//         res.json({msg:"invalid info"})
//         console.log(`the err in signin ${error}`);
//       }
//     }) 
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.userModel.findOne({ username });
        if (!user) {
            res.status(400).json({ msg: "You are not signed up" });
        }
        //@ts-ignore
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ msg: "Password incorrect" });
        }
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ msg: "JWT_SECRET is not defined" });
        }
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // optional: token expiration
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ msg: "Server error during signin" });
    }
}));
//@ts-ignore
app.post("/api/v1/content", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //todso bananna
    const { title, link, } = req.body;
    try {
        yield db_1.contentModel.create({
            link, title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        res.json({
            msg: "u are contend added"
        });
    }
    catch (error) {
        res.json({ msg: "u are contend no added" });
        console.log(`the err ${error}`);
    }
}));
//@ts-ignore
app.get("/api/v1/content", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //view all tosdos
    //@ts-ignore 
    const userId = req.userId;
    try {
        const content = yield db_1.contentModel.find({ userId }).populate("userId", "username");
        res.json({ content });
    }
    catch (error) {
    }
}));
//@ts-ignore
app.delete("/api/v1/content", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({ mag: "u ar econtent now deleted" });
}));
//@ts-ignore
app.post("/api/v1/brain/share", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    const hash = (0, uitls_1.random)(10);
    if (share) {
        const exitingUser = yield db_1.linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (exitingUser) {
            res.json({
                hash: exitingUser.hash
            });
            return;
        }
        yield db_1.linkModel.create({
            hash, //@ts-ignore
            userId: req.userId
        });
        res.json({ hashlink: hash });
    }
    else {
        yield db_1.linkModel.deleteOne({
            userId: req.userId
        });
    }
    res.json({
        msg: "u are shared link  removed"
    });
}));
app.get("/api/v1/brain/:sharedLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharedLink;
    console.log("hte reach");
    const link = yield db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.json({
            mag: " link is not found"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({ msg: 'user not found err happen our side' });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.listen(PORT, () => {
    console.log(`the port running on ${PORT}`);
});
