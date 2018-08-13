<template>
    <div class="login-page">
     <div @click="go">{{data}}</div>
    </div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  import * as types from '../../store/mutation_types'
    export default {
        name: 'login',
      data(){
          return{
            data:'登录'
          }
      },
      created(){
          console.log('t->',this.hasLogin,this.$route.query.redirect)
      },
      computed:{
        ...mapGetters([
          'hasLogin'
        ])
      },
      methods:{
          go(){
            // this.$store.state.hasLogin=true;
            this.$store.commit(types.HASLOGIN,true);
            sessionStorage.setItem('hasLogin',true);
            this.data='登录成功';
            this.$router.push({path:this.$route.query.redirect})
          }
      }
    }
</script>

<style scoped>

</style>
