<template>
    <div class="index2-page">index2</div>
</template>

<script>
    export default {
        name: 'index2',
        props: {},
        data() {
            return {}
        },
        created() {
          function timeout(ms) {
            return new Promise((resolve, reject) => {
              setTimeout(resolve, ms, 'done');
            });
          }

          timeout(100).then((value) => {
            console.log('0-->',value);
          });
        },
        computed: {},
        methods: {},
        watch: {},
        components: {}
    }
</script>

<style scoped>

</style>
