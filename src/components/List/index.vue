<template>
  <div>
    <div class="weui-cells__title" v-if="title">{{title}}</div>
    <div class="weui-cells weui-cells_form">
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'List',

  props: [ 'title' ],
}

</script>

<style scoped lang="less">

</style>
