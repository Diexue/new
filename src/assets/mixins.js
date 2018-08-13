import router from "../router";

export const mixins={
  created(){

  },
  methods:{
    goBack(){
      router.go(-1)
    }
  }
}