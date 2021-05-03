// import { reject } from 'core-js/fn/promise'
import {
    ADD_COUNT,
    ADD_TO_CART
} from './mutation-types'

export default{
    addCart(context,payload){
        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct){//数量+1
            context.commit(ADD_COUNT,oldProduct)
            resolve("当前的商品数量+1")
        }else{//添加新的商品
            payload.count = 1
            context.commit(ADD_TO_CART,payload)
            resolve("添加了新的商品")
        }
        })
    }
}