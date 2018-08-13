import * as types from './mutation_types';
export default{
  add_club:({commit},index)=>{
    commit(types.ADD_CLUB,index)
  },
  add:({commit},n)=>{
    commit(types.ADD,n)
  },
  del:({commit},n)=>{
    commit(types.DEL,n)
  }
}
