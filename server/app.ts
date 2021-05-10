import * as express from 'express';
import * as bodyParser from 'body-parser';
import path = require('path');
import * as cors from 'cors';

class App {
  public app: express.Application;

  constructor(public port: any, controllers) {
    this.app = express();
    this.app.use(cors());
    this.initializeMiddlewares();
    this.mountRoutes();
    this.initializeControllers(controllers);
    this.app.use(express.static(path.join(__dirname, 'dist')));
    this.app.use(express.static('public'));
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private mountRoutes (): void {    
    const router = express.Router();        
    router.get(['/home', '/dashboard', '/maintenance'], (req, res) => {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
    this.app.use('/', router);
  }

  private initializeControllers(controllers) {
    controllers.forEach(controller => {
      console.log(`initializeControllers ${controller.router}`);
      this.app.use('/api', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
  }
}

export default App;