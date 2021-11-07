
const log = (req, res, next) => {
    console.log(`[REQUEST LOGGER]: ${req.originalUrl}`);
    next();
}

module.exports = { log }
