import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default createStore({
    state:{
        cartList: []
    },
    mutations,
    actions,
    getters,
    modules:{

    }
})



// import Vue from 'vue'
// import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'

// Vue.use(Vuex)
// const state = {
//     cartList: []
// }
// const store = new Vuex.Store({
//     state,
//     mutations,
//     actions
// })

// export default store