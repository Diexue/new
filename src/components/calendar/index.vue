<template>
    <div class="calendar":style="{width:listWidth * 7+'px'}">
        <div class="c-head-box">
            <div :style="{width:listWidth+'px'}"@click="_change('del')">
                <div class="iconfont icon-left"></div>
            </div>
            <div class="c-date">{{year}}年{{month}}月</div>
            <div :style="{width:listWidth+'px'}"@click="_change('add')">
                <div class="iconfont icon-right"></div>
            </div>
        </div>
        <div class="week-box">
            <div v-for="item in weekArr" :style="{height:listWidth+'px',width:listWidth+'px',lineHeight:  listWidth +'px'}">{{item}}</div>
        </div>
        <div class="date-box">
            <div v-for="(item ,index) in arr" class="date-list"@click="_select(item,month,year)"
                 :style="{height:listWidth+'px',width:listWidth+'px',lineHeight:  listWidth +'px',marginLeft:(index==0?listWidth*marLet:0)+'px'}">
                <div class="date-list-bg"
                     :style="!moreSelect&&year==selectDate.year&&month==selectDate.month&&item==selectDate.date?{background:bg,borderRadius:'50%'}:
                     moreSelect&&scount==1&&year==clickYear1&&month==clickMonth1&&item==clickDate1?{background:bg,borderBottomLeftRadius:'50%',borderTopLeftRadius:'50%' }:
                     moreSelect&&scount==2?selectMinDate.year==year&&selectMinDate.month==month&&selectMinDate.date==item?{background:bg,borderBottomLeftRadius:'50%',borderTopLeftRadius:'50%' }:
                     new Date(selectMinDate.year,selectMinDate.month,selectMinDate.date).getTime()<new Date(year,month,item).getTime()&& new Date(year,month,item).getTime()<new Date(selectMaxDate.year,selectMaxDate.month,selectMaxDate.date).getTime()?{background:bg }:
                     new Date(year,month,item).getTime()==new Date(selectMaxDate.year,selectMaxDate.month,selectMaxDate.date).getTime()?{background:bg,borderBottomRightRadius:'50%',borderTopRightRadius:'50%' }:'':''"></div>
                <div class="date-list-text":style="(!moreSelect||moreSelect&&scount==1)&&year==clickYear1&&month==clickMonth1&&item==clickDate1||
                moreSelect&&scount==2&&(new Date(selectMinDate.year,selectMinDate.month,selectMinDate.date).getTime()<=new Date(year,month,item).getTime()&&
                new Date(year,month,item).getTime()<=new Date(selectMaxDate.year,selectMaxDate.month,selectMaxDate.date).getTime())?{color:color }:preColor&&year==today.year&&month==today.month&&item<today.date?{color:preColor}:''">{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    var arr;
  export default {
    name: '',
    props: ['calendarData'],
    data() {
      return {
        listWidth: null,
        lastDay: null,
        firstDay: null,
        weekArr: ['日', '一', '二', '三', '四', '五', '六'],
        year: null,
        month:null,
        today:null,
        clickYear:null,
        clickYear1:null,
        clickMonth:null,
        clickMonth1:null,
        clickDate:null,
        clickDate1:null,
        moreSelect:null,
        clickMinYear:null,
        clickMaxYear:null,
        clickMinMonth:null,
        clickMaxMonth:null,
        clickMinDate:null,
        clickMaxDate:null,
        selectDate:null,
        selectMinDate:null,
        selectMaxDate:null,
        scount:null,
        preBan:null,
        bg:null,
        styleObject:null
      }
    },
    created() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      this.dataTime(year,month,date);
      //日历总宽度
      let width = this.calendarData.width;
      // 是否显示两个日期选择的范围
      this.moreSelect = this.calendarData.moreSelect ? this.calendarData.moreSelect : null;
      //今日之前的浅色
      this.preColor= this.calendarData.preColor?this.calendarData.preColor:null;
      //今天之前的日期是否可以点击选择
      this.preBan=this.calendarData.preBan?this.calendarData.preBan:false;
      //选中的背景色，默认#ef5350
      this.bg=this.calendarData.bg?this.calendarData.bg:'#ef5350';
      //  选中的颜色，默认#fff
      this.color=this.calendarData.color?this.calendarData.color:'#fff';
      //单一选择的日期
      this.selectDate=this.calendarData.selectDate?this.calendarData.selectDate:{year:2018,month:6,date:-1};
      //范围选中的第一天的日期对象{year,month,date}
      this.selectMinDate=this.calendarData.selectMinDate?this.calendarData.selectMinDate:null;
      //范围选中的最后一天的日期对象{year,month,date}
      this.selectMaxDate=this.calendarData.selectMaxDate?this.calendarData.selectMaxDate:null;
      //当显示两个日期选择的范围并且存在选中第一天和最后一天的情况下scount=2
      this.scount=this.moreSelect&&this.selectMaxDate&&this.selectMinDate?2:null;
      //日历格子宽高
      this.listWidth=width/8;
      //当月第一天星期几
      this.marLet=this.firstDay;
      this.today={year:year,month:month+1,date:date};
      console.log('dj-->',this.year,this.month,this.selectMinDate,this.marLet);
    },
    computed: {

    },
    methods: {
      dataTime: function (year,month,date) {
        var date = new Date(year, month, date);
        var nyear = date.getFullYear();
        var nmonth = date.getMonth();
        var nmonths = date.getMonth() + 1;
        //获取当月的天数（当月的最后一天）
        var lastDay= new Date(nyear, nmonths, 0).getDate();
        arr=[];
        for (var i = 1; i < lastDay + 1; i++) {
          arr.push(i);
        }
        this.year=nyear;
        this.month=nmonths;
        this.getDate=date.getDate();
        this.lastDay=lastDay;
        this.firstDay=new Date(year, month, 1).getDay();
        this.arr=arr;
      },
      _change(way){
        let month=this.month-1;
        if (way=='add') month+=1;
        else if(way=='del') month-=1;
        this.dataTime(this.year,month,1);
        this.marLet=this.firstDay;
      },
      _select(date,month,year){
        let today = this.today;
        if(this.preBan){
          var condition = year < today.year || year == today.year && month < today.month || year == today.year && month == today.month && date < today.date;
        }else{
          var condition=false
        }
        if (this.moreSelect){
          let count = this.scount + 1;
          if (count > 2) {
            count = 1;
            this.clickDate=null;
            this.clickMonth=null;
          }
          if (!condition) {
            if (count === 1) {
              this.clickMonth1=month;
              this.clickDate1=date;
              this.clickYear1=year;
              this.scount=count;
              this.selectMinDate={year:year,month:month,date,date}
            } else if (count === 2) {
              this.clickMonth=month;
              this.clickDate=date;
              this.clickYear=year;
              this.scount=count;
              this._checkValue(this.clickYear,this.clickMonth,this.clickDate,this.clickYear1,this.clickMonth1,this.clickDate1);
              this.$emit('selectDate',`${this.selectMinDate.year}/${this.selectMinDate.month}/${this.selectMinDate.date}-${this.selectMaxDate.year}/${this.selectMaxDate.month}/${this.selectMaxDate.date}`)
            }
          }
        }else{
          if(!condition){
            this.clickMonth1=month;
            this.clickDate1=date;
            this.clickYear1=year;
            this.selectDate={year:year,month:month,date:date};
            this.$emit('selectDate',`${this.selectDate.year}/${this.selectDate.month}/${this.selectDate.date}`)
          }
        }
      },
      _checkValue(y,m,d,y1,m1,d1,compare){
        var minValue,maxValue;
        var minCondition = y < y1 || y == y1 && m < m1 || y == y1 && m == m1 && d < d1;
        if(minCondition) {
          minValue={year:y,month:m,date:d};
          maxValue={year:y1,month:m1,date:d1};
        }else{
          minValue={year:y1,month:m1,date:d1};
          maxValue={year:y,month:m,date:d};
        }
        this.selectMinDate=minValue;
        this.selectMaxDate=maxValue;
      }
    },
    watch: {},
    components: {}
  }
</script>

<style scoped>
@import "../../assets/iconfont.css";
    .calendar{
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .c-head-box{
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .c-date{
        flex: 1;
    }
    .week-box,.date-box{
        display: flex;
        align-items: center;
        text-align: center;
        width: 100%;
        flex-wrap:wrap;
        /*margin-top: 8px;*/
    }
    .date-list{
        margin-top: 10px;
    }
    .date-list-bg{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        /*background: red;*/
    }
    .date-list-text{
        width: 100%;
        height: 100%;
        margin: -100% auto 0;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        /*border-bottom-left-radius: 10px;*/
    }
</style>