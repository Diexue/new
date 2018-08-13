import * as types from './mutation_types';
export default{
  [types.ADD_CLUB](state,index){
    console.log('state->',state)
  },
  [types.HASLOGIN](state,bool){
    state.hasLogin=bool
  },
  [types.ADD](state,n){
    state.count+=n
  },
  [types.DEL](state,n){
    state.count-=n
  }
}
