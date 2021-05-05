import axios from 'axios'

export default {
  namespaced: true,
  state: {
    turbines: []
  },
  actions: {
    async loadTurbines({commit}: any) {
      try {       
        const resp = await axios.get('api/farm/getTurbines');
        commit('SET_TURBINES', resp.data);
      } catch (error) {
          throw new Error(`API ${error}`);
      }
    },

    async getTurbine({commit}: any, id: number) {
      try {       
        const resp = await axios.get(`api/farm/getTurbine`, { params: { id: id } });
        commit('SET_TURBINE', resp.data);
        return resp.data;
      } catch (error) {
        throw new Error(`API ${error}`);
      }
    }
  },
  mutations: {
    SET_TURBINES(state: any, turbines: any) {
      state.turbines = turbines;
    },
    SET_TURBINE(state: any, turbine: any) {
      state.turbine = turbine;
    },
  }
}
