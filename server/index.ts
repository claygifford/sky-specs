import App from './app';
import * as express from 'express';
import FarmController from './farm/farm-controller';
import MaintenanceController from './maintenance/maintenance-controller';
console.log(`In index`);

const app = new App(
    process.env.PORT || 4000,
    [
        new FarmController(),
        new MaintenanceController()
    ]
);

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