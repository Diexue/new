<template>
    <div class="index-page">
        <h2>测试d的是</h2>
        <router-link to="/page/first">first</router-link>
        <router-link to="/page/second">second</router-link>
        <router-view></router-view>
        <router-view name="second"></router-view>
    </div>
</template>

<script>

  export default {
    name: '',
    props: {},
    data() {
      return {}
    },
    created() {
    },
    computed: {},
    methods: {},
    watch: {},
    components: {}
  }
</script>

<style scoped>

</style>