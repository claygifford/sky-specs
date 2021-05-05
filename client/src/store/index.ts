import { createStore } from 'vuex'
import maintenance from '../store/modules/maintenance'
import navigation from './modules/navigation'
import farm from './modules/farm'

const store = createStore({
    modules: {
        maintenance,
        navigation,
        farm
    }
})

export default store