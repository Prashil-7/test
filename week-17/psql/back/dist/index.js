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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client('postgresql://neondb_owner:npg_6VSrbN3vQuAj@ep-plain-queen-a1392g4f-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
pgClient.connect();
app.post('/sign', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        // its query is cause some sql injection effects
        //  const insertQuery = `INSERT INTO users (email, username, password) VALUES ('${username}', '${email}' , '${password}')`;
        // const response = pgClient.query(insertQuery);
        //solution to add in DB 
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1 ,$2, $3)`;
        const values = [username, email, password];
        const dbRes = yield pgClient.query(insertQuery, values);
        res.json({ msg: "u are signup" });
    }
    catch (error) {
        return res.status(404).json({ msg: " uare credential ar enot corrects" });
    }
}));
app.listen(3000);
