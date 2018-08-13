<template>
    <div class="index-page">
      <router-link to="/first">first</router-link>
      <router-link to="/second">second</router-link>
        <input type="radio" name="radi" value="1" v-model="student.param"@click="dd"><label>one</label>

        <input type="radio" name="radi" value="2" v-model="student.param"@click="dd"><label>two</label>
        <input type="radio" name="radi" value="4" v-model="student.param"@click="dd"title="测试4"/>

        <input type="radio" name="radi" value="3" v-model="student.param"@click="dd"title="测试3"/>
      <div @click="clear">清除状态</div>
        <aText></aText>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import aText from '@/components/text/index'
    export default {
        name: 'index',
      data(){
          return{
            student:{
              param:'1'
            }
          }
      },
      created(){
        console.log('ojsd',this.count,this.hasLogin)
        console.log('dldldl',this.student)
      },

      computed:{
        ...mapState([
          'count',
          'hasLogin'
        ])
      },
      methods:{
          clear(){
            sessionStorage.removeItem('hasLogin');
          },
        dd(){
            console.log('this-->',this.student)
        }
      },
      components:{
          aText
      }
    }
</script>

<style scoped>

</style>
