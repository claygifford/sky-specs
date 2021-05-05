"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const farm_controller_1 = require("./farm/farm-controller");
const maintenance_controller_1 = require("./maintenance/maintenance-controller");
console.log(`In index`);
const app = new app_1.default(process.env.PORT || 4000, [
    new farm_controller_1.default(),
    new maintenance_controller_1.default()
]);
app.listen();
// var app = express();
// app.get('/', function (req, res) {
//     res.json({
//         message: 'Hello World!'
//        });
// });
// var port = 5000;
// app.listen( port, function() {
//     console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
// });
//app.listen();
//# sourceMappingURL=index.js.map