import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level:"info",
    format: format.json(),
    transports: [
        new transports.File({filename: "logs/error.log", level:"error"}),
        new transports.Console(),
    ],
});

export default logger;