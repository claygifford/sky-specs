"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
class App {
    constructor(port, controllers) {
        this.port = port;
        this.app = express();
        this.app.use(cors());
        this.initializeMiddlewares();
        this.mountRoutes();
        this.initializeControllers(controllers);
        this.app.use(express.static(path.join(__dirname, 'dist')));
        this.app.use(express.static('public'));
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    mountRoutes() {
        const router = express.Router();
        router.get(['/home', '/dashboard', '/maintenance'], (req, res) => {
            //res.sendFile(__dirname + '/index.html');
            //res.sendFile(path.resolve(__dirname, '.../public/index.html'));
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });
        this.app.use('/', router);
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            console.log(`initializeControllers ${controller.router}`);
            this.app.use('/api', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map