"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class FarmController {
    constructor(db) {
        this.db = db;
        this.path = '/farm';
        this.router = express.Router();
        this.turbines = [
            {
                name: 'Turbine 1',
                id: 1,
                capacity: '52',
                health: 'medium',
                location: '42.3315509,-83.0466403',
                status: 'Active',
                energy: 250
            },
            {
                name: 'Turbine 2',
                id: 2,
                capacity: '70',
                health: 'high',
                location: '42.2681569,-83.7312291',
                status: 'Active',
                energy: 550
            },
            {
                name: 'Turbine 3',
                id: 3,
                capacity: '33',
                health: 'low',
                location: '41.7189392,-83.7129935',
                status: 'Active',
                energy: 400
            }
        ];
        this.getTurbines = (request, response) => {
            response.send(this.turbines);
        };
        this.getTurbine = (request, response) => {
            var turbine = this.turbines.find(t => t.id === +request.query.id);
            console.log(request.query.id + ' turbine ' + turbine);
            response.send(turbine);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path + '/getTurbines', this.getTurbines);
        this.router.get(this.path + '/getTurbine', this.getTurbine);
    }
}
exports.default = FarmController;
//# sourceMappingURL=farm-controller.js.map