"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config.js");
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const login_1 = __importDefault(require("./routes/login"));
const playlist_1 = __importDefault(require("./routes/playlist"));
const song_1 = __importDefault(require("./routes/song"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://localhost:5173',
        'http://localhost:80',
        'https://localhost:80',
        'http://localhost:443',
        'https://localhost:443',
        'http://localhost:5500',
        'https://localhost:5500'
    ],
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/login", login_1.default);
app.use("/user", user_1.default);
app.use("/playlist", playlist_1.default);
app.use("/song", song_1.default);
app.listen(8080);
