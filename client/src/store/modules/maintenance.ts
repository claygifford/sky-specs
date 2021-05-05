import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: []
  },
  actions: {
    async loadOrders({commit}: any) {
      try {       
        const resp = await axios.get('/api/maintenance/getOrders');
        commit('SET_ORDERS', resp.data);
      } catch (error) {
          throw new Error(`API ${error}`);
      }
    },

    async deleteOrder({commit}: any, id: number) {
      try {       
        await axios.post('/api/maintenance/deleteOrder', {id: id});
        //commit('SET_ORDERS', resp.data);
      } catch (error) {
          throw new Error(`API ${error}`);
      }
    },

    async getOrdersForTurbine({commit}: any, id: number) {
      try {       
        const resp = await axios.get('/api/maintenance/getOrdersForTurbine', { params: { id: id } });
        return resp.data;
      } catch (error) {
        throw new Error(`API ${error}`);
      }
    },

    async createOrder({commit}: any, order: any) {
      try {       
        const resp = await axios.post('/api/maintenance/createOrder', order);
        commit('ADD_ORDER', resp.data);
        return resp.data;
      } catch (error) {
        throw new Error(`API ${error}`);
      }
    }
  },
  mutations: {
    SET_ORDERS(state: any, orders: any) {
      state.orders = orders;
    },

    ADD_ORDER(state: any, order: any) {      
      state.orders = [...state.orders, order];
    }
  }
}
