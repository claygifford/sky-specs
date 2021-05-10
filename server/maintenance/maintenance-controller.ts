import * as express from 'express';
import Db from '../db';
import Order from './order';

class MaintenanceController {
  public path = '/maintenance';
  public router = express.Router();
  
  private orders: Order[] = [
    { 
        name: 'fix blade 1',
        type: 'Corrective maintenance',
        id: 1,
        turbineId: 1,
        status: 'Completed',
        date: 'May 1st, 2021',
        active: true,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic? Commodi cumque similique id tempora molestiae deserunt at suscipit, dolor voluptatem, numquam, harum consequatur laboriosam voluptas tempore aut voluptatum alias?
        Tempor ultrices proin nunc fames nunc ut auctor vitae sed. Eget massa parturient vulputate fermentum id facilisis nam pharetra. Aliquet leo tellus.
        Turpis ac nunc adipiscing adipiscing metus tincidunt senectus tellus.
        Semper interdum porta sit tincidunt. Dui suspendisse scelerisque amet metus eget sed. Ut tellus in sed dignissim.`,
        favorite: false
    },
    { 
      name: 'lubrication',
      type: 'Preventive maintenance',
      id: 2,
      turbineId: 2,
      status: 'Completed',
      date: 'May 2nd, 2021',
      active: false,
      description: 'the description',
      favorite: false
    },
    { 
      name: 'SpySpec scan',
      type: 'Analysis maintenance',
      id: 3,
      turbineId: 3,
      status: 'Completed',
      date: 'May 3rd, 2021',
      active: false,
      description: 'the description',
      favorite: true
    }
  ];
  
  constructor(public db: Db) {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path + '/getOrders', this.getOrders);
    this.router.get(this.path + '/getOrdersForTurbine', this.getOrdersForTurbine);
    this.router.post(this.path + '/createOrder', this.createOrder);
    this.router.post(this.path + '/deleteOrder', this.deleteOrder);
  }
 
  getOrders = async (request: express.Request, response: express.Response) => {
    // try {
    //   const { rows } = await this.db.query('select * from orders');
    //   response.send(rows);
    // } catch (err) {
    //   throw err;
    // }
    
    response.send(this.orders);
  }

  getOrdersForTurbine = async (request: express.Request, response: express.Response) => {
    // try {
    //   var id = +request.query.id;
    //   const { rows } = await this.db.query('select * from orders where turbineid = $1', [id]);
    //   response.send(rows);
    // } catch (err) {
    //   throw err;
    // }
    console.log('total orders ' + this.orders.length);

    var orders = this.orders.filter(t => +t.turbineId === +request.query.id);
    console.log(request.query.id + ' orders ' + orders.length);
    response.send(orders);
  }

  createOrder = (request: express.Request, response: express.Response) => {

    const order: Order = request.body;

    order.id = 4;    
    order.active = true;
    order.date = (new Date()).toDateString();
    order.status = 'Created';
    order.favorite = false;

    this.orders.push(order);

    console.log(order + ' : orders : ' + this.orders.length);

    response.send(order);
    //response.sendStatus(200);
  }

  deleteOrder = (request: express.Request, response: express.Response) => {
    const {id} = request.body;
    console.log(id + ' : id ready to delete');
    this.orders = this.orders.filter(o => o.id != id);
    response.sendStatus(200);
  }
}
export default MaintenanceController;