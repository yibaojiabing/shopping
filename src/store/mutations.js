import {
    ADD_COUNT,
    ADD_TO_CART
} from './mutation-types'

export default {
    [ADD_COUNT](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state,payload){
        state.cartList.push(payload)
    },
    // addCartType(state, payload) {
    //     payload.count = 1
    //     payload.checked = false
    //     state.cartLists.push(payload)
    // },
    // deleteCart(state, payload) {
    //     state.cartLists = state.cartLists.filter(item => item.iid !== payload)
    // }
}