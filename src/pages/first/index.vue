<template>
    <div class="index-page">
      <div @click="go">显示</div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <input type="file"/>
       <div @click="add">+</div>
        <div @click="del">-</div>
        <div>{{count}}</div>
        <div>{{$store.state.count}}</div>
        <calendar :calendarData="calendarData"></calendar>
        <div @click="goBack">返回</div>
    </div>

</template>

<script>
  import { Actionsheet } from 'mint-ui';
  import {mapGetters} from 'vuex';
  import {mixins} from "../../assets/mixins";
  import {calendar} from 'cs-calendar';
  // import calendar from '@/components/calendar/index'
  import 'cs-calendar/dist/cs-calendar.min.css'
    export default {
      name: 'index',
      mixins:[mixins],
      data(){
        return{
          calendarData:{
            width:375,
            bg:"#ef66ee",
            preColor:"#efefef"
          },
          sheetVisible:false,
          actions:[
            {name:"dd",method:this.getCamera},
            {name:"dd",method:this.getLibrary},
          ],
          touches: {
            moveTag: 0,
            moveOffset: 0,
            touchStartTime: 0,
            isTouchEvent: false,
            allowClick: false,
            isDraging: false
          }
        }
      },
      created(){
        // this.goBack()
        console.log('kkk-->',calendar)
      },
      mounted(){
        console.log('$el',this.$el);
        this.$el.addEventListener('touchstart', this.touch);
        this.$el.addEventListener('touchmove', this.touch);
        this.$el.addEventListener('touchend', this.touch);
        this.$el.addEventListener('click', (e) => {
          if (!this.touches.allowClick) {
            e.preventDefault();
          }
        });
        window.addEventListener('resize', this.resizeSlides);
      },
      computed:{
        ...mapGetters([
          'hasLogin',
          'count'
        ])
      },
      watch:{
          count:function (val,oldVal) {
            console.log('val-->',val,oldVal)
          }
      },
      methods:{
        touch(event){
          var event = event || window.event;

          var oInp = document.getElementById("inp");
          var distance,clientX_start,clientX_end,
            minRange=20;
          this.clientX_start;
          this.direction;

          this.callbackFun=function(){
            if(this.direction=='ltr') {
              console.log('从左往右');
            }
            else if(this.direction=='rtl'){
              console.log('从右往左');
            }
          }
          switch(event.type){
            case "touchstart":
              clientX_start=event.touches[0].clientX;
              this.clientX_start=clientX_start;
              break;
            case "touchend":
              this.callbackFun();
              break;
            case "touchmove":
              event.preventDefault();

              clientX_end = event.changedTouches[0].clientX;
              //判断移动的方向
              distance=clientX_end-this.clientX_start;
              if(this.clientX_start+minRange<clientX_end) {
                this.direction='ltr';
              }
              else if(this.clientX_start-minRange>clientX_end){
                this.direction='rtl';
              }
              break;
          }
        },
        resizeSlides(e){
          console.log('ja',e)
        },
        go(){
            this.sheetVisible=true
          },
        getCamera() {
          console.log('a-->')
        },
        getLibrary(){
          console.log('测试-->')
        },
        add(){
          this.$store.dispatch('add',1)
        },
        del(){
          this.$store.dispatch('del',1)
        }
      },
      components:{
        calendar
      }
    }
</script>

<style scoped>

</style>
