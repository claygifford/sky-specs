import App from './app';
import FarmController from './farm/farm-controller';
import MaintenanceController from './maintenance/maintenance-controller';
import Db from './db';

const db = new Db(
    process.env.DBHOST,
    process.env.DBPORT || 5432,
    process.env.DBUSER,
    process.env.DBDATABASE,
    process.env.DBPASSWORD
);

const app = new App(
    process.env.PORT || 4000,
    [
        new FarmController(db),
        new MaintenanceController(db)
    ]
);

app.listen();