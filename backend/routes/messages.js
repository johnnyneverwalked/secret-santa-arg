const router = require("express").Router();
const {Connection} = require("../Connection");
const {response} = require("../Response");


router.post("/", async (req, res) => {
    try {
        const db = await Connection.open();

        await db.collection("messages")
            .insertOne({
                email: req.body.email,
                name: req.body.name,
                message: req.body.message,
            });

        return res.status(201).json(response.success());
    } catch (e) {
        console.error(e);
        res.status(500).json(response.error(e.message, e));
    }
});

module.exports = router;
