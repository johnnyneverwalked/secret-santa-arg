const router = require("express").Router();
const {Connection} = require("../Connection");
const {response} = require("../Response");


const redactedStr = "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>";

router.get("/folder/:folder/file/:file", async (req, res) => {
    try {
        const db = await Connection.open();
        const folder = req.params.folder;
        const file = req.params.file.replace(".txt", "");

        const config = await db.collection("config")
            .findOne({});

        let contents = "";
        switch (folder) {
            case "employees":
                const personFile = await db.collection("personel")
                    .findOne({lastName: file});
                if (!personFile) {
                    break;
                }

                contents = Object.keys(personFile).map(key => `${key}: ${personFile[key]}`).join("<br>")
                break;
            case "logs" :
                const log = await db.collection("logs")
                    .findOne({title: file});
                if (!log) {
                    break;
                }
                if (log.level > config.level) {
                    contents = redactedStr;
                    break;
                }
                contents = `${log.title}<br>${log.text}<br>${log.date}`;
                break;
            default:
                if (file !== "passage") {
                    break;
                }
                contents = `... And while they enjoyed their last supper together, Jesus at his <span class='${config.hint2 ? 'glitch' : ''}' data-text='33'>3< 3rd ></span> and final year stood up and said:
"Cast but a glance at riches, and they are gone, for they will surely sprout wings and fly off to the skies like an eagle".
He poured some < <span class='${config.hint2 ? 'glitch' : ''}' data-text='pink'>< රෝස ></span> > wine into his glass and continued:
"<span class='${config.hint2 ? 'glitch' : ''}' data-text='Rubies'>< රූබි ></span> are but mere trinkets in front of the true riches of the heart, faith, a clear path to God.
That is where the answer lies".<br>
[John:14]`
        }


        res.status(200).json(response.success(contents));
    } catch (e) {
        console.error(e);
        res.status(500).json(response.error(e.message, e));
    }
});

router.get("/folder/:folder", async (req, res) => {
    try {
        const db = await Connection.open();
        const folder = req.params.folder;

        let contents = [];
        switch (folder) {
            case "employees":
                const files = await db.collection("personel")
                    .find({})
                    .toArray()

                for (let i = 0; i < 2; i++) {
                    contents.push(redactedStr);
                }
                contents.push(...files.map(f => `${f.lastName}.txt`));
                for (let i = 0; i < 7; i++) {
                    contents.push(redactedStr);
                }
                break;
            case "logs" :
                const config = await db.collection("config")
                    .findOne({});
                const logs = await db.collection("logs")
                    .find({})
                    .toArray();
                contents = logs.map(log => {
                    if (log.level > config.level) {
                        return redactedStr;
                    }
                    return `${log.title}.txt`;
                })
        }


        res.status(200).json(response.success(contents));
    } catch (e) {
        console.error(e);
        res.status(500).json(response.error(e.message, e));
    }
});

module.exports = router;
