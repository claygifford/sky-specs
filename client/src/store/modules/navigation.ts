export default {
  namespaced: true,
  state: {
    mobileMenuOpen: false
  },
  actions: {
    setMobileMenuOpen({commit}: any, value: any) {
      commit('SET_MOBILE_MENU_OPEN', value);
    }
  },
  mutations: {
    SET_MOBILE_MENU_OPEN(state: any, value: any) {
      state.mobileMenuOpen = value;
    }
  }
}
