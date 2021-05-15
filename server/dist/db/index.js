"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Db {
    constructor(host, port, user, database, password) {
        this.pool = new pg_1.Pool({
            host: host,
            post: port,
            user: user,
            database: database,
            password: password
        });
    }
    query(text, params) {
        return this.pool.query(text, params);
    }
}
exports.default = Db;
//# sourceMappingURL=index.js.map