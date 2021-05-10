//import { Pool } from 'pg';

class Db {
    constructor(host, port, user, database, password) {
        // this.pool = new Pool({
        //     host: host,
        //     post: port,
        //     user: user,
        //     database: database,
        //     password: password
        // });
    }
    private pool;
    
    public query(text, params?) {
        return this.pool.query(text, params);
    }
}

export default Db;