const router = require("express").Router();
const {Connection} = require("../Connection");
const {response} = require("../Response");


router.get("/", async (req, res) => {
    try {
        const db = await Connection.open();

        const config = await db.collection("config")
            .findOne({});

        return res.json(response.success(config));
    } catch (e) {
        console.error(e);
        res.status(500).json(response.error(e.message, e));
    }
});

module.exports = router;
