// ----------------------------------------------------------
// IMPORT
// ----------------------------------------------------------
import { PrismaClient } from "@prisma/client";

// ----------------------------------------------------------
// ENVIROMENT
// ----------------------------------------------------------
const isProd = process.env.NODE_ENV === 'production';

const prisma = new PrismaClient({
    log: isProd ? [{ emit: "event", level: "error" }] : [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
    ]
});

// ----------------------------------------------------------
// REGISTER EVENT HANDLER (DYNAMIC)
// ----------------------------------------------------------
const logEvents = {
    query: (e) => console.log(`Query: ${e.query} - Duration: ${e.duration}ms`),
    error: (e) => console.log(e),
    warn: (e) => console.log(e),
    info: (e) => console.log(e)
};

// ----------------------------------------------------------
// CONNECT EVENT LOGGING
// ----------------------------------------------------------
Object.keys(logEvents).forEach((level) => {
    prisma.$on(level, logEvents[level]);
});

// ----------------------------------------------------------
// MAKE SURE TO DISCONNECT PRISMA WHEN THE APPLICATION IS CLOSED
// ----------------------------------------------------------
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

// ----------------------------------------------------------
// EXPORT
// ----------------------------------------------------------
export default prisma;