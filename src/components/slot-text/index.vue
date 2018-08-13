<template>
    <div class="slot-component">
        <div class="">测试的slot</div>
        <slot name="first">
            <div>第一个slot</div>
        </slot>
        <slot>
            <div>默认的slot</div>
        </slot>
        <div>slot结束</div>
    </div>
</template>

<script>
  export default {
    name: 'slot-component',
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