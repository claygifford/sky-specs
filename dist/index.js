"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const farm_controller_1 = require("./farm/farm-controller");
const maintenance_controller_1 = require("./maintenance/maintenance-controller");
const db_1 = require("./db");
const db = new db_1.default(process.env.DBHOST, process.env.DBPORT || 5432, process.env.DBUSER, process.env.DBDATABASE, process.env.DBPASSWORD);
const app = new app_1.default(process.env.PORT || 4000, [
    new farm_controller_1.default(db),
    new maintenance_controller_1.default(db)
]);
app.listen();
//# sourceMappingURL=index.js.map