// import libraries
import cors from "cors";
import express from "express";
import cookieParser from 'cookie-parser';

// import middlewares
import ErrorHandler from "./middlewares/error-handler.middleware.js";
import NotFound from "./middlewares/not-found.middleware.js";

// import routes
import api from "./api.js";

// init express
const app = express();

// cors config
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

// start middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// routes
app.get("/", (req, res) => res.status(200).json({ message: "Ok" }));
app.use("/api", api);

// end middlewares
app.use(NotFound);
app.use(ErrorHandler);

// export
export default app;