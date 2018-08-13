<template>
    <div class="slot-page">
        <slot-text>
            <div>替换的默认-->slot</div>
            <div slot="first">替换的->first-slot</div>

        </slot-text>
    </div>
</template>

<script>
    import slot from '../../components/slot-text/index'
  export default {
    name: 'slot',
    props: {},
    data() {
      return {}
    },
    created() {
    },
    computed: {},
    methods: {},
    watch: {},
    components: {
      'slot-text':slot
    }
  }
</script>

<style scoped>

</style>