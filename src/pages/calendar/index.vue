<template>
    <div class="calendar-page">
        <calendar :calendarData="calendarData"@selectDate="selectDate"></calendar>
    </div>
</template>

<script>
    import calendar from '@/components/calendar/index'
  export default {
    name: '',
    props: {},
    data() {
      return {
        calendarData:{
          width:375,
          bg:"green",
          // preColor:'#ccc',
          showprecolor:true,//是否显示当日之前的日期的浅色
          // moreSelect:true,//是否显示两个日期的选择范围
          // selectMinDate:{year:2018,month:6,date:29},
          // selectMaxDate:{year:2018,month:7,date:26},
          // preBan:true
        },
      }
    },
    created() {
    },
    computed: {},
    methods: {
      selectDate(e){
        console.log('数据',e)
      }
    },
    watch: {},
    components: {
      calendar
    }
  }
</script>

<style scoped>

</style>