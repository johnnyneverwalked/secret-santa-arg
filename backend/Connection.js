const MongoClient = require('mongodb').MongoClient

class Connection {

    static async open() {
        try {
            if (this.db) {
                return this.db;
            }
            console.log("Connecting to mongo...");
            this.db = (await MongoClient.connect(this.url)).db("Arg");
            console.log("Connection successful!");
            return this.db;
        } catch (e) {
            console.error(e);
        }
    }

}

Connection.db = null;
Connection.url = process.env.DB_URI;

module.exports = { Connection }
