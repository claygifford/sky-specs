export default class Order {
    constructor(
        public name: string,
        public type: string,
        public id: string,
        public status: string,
        public turbineId: number,
        public date: string,
        public active: boolean,
        public description: string,
        public favorite: boolean) {}    
}