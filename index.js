// import libraries
import app from "./src/app.js";
import 'dotenv/config';

// config server
const host = process.env.SERVER_HOST || "0.0.0.0";
const port = process.env.SERVER_PORT || 3000;

// start
app.listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
});