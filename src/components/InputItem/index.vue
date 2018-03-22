<template>
  <div v-bind:class="propsToClass">

    <div class="weui-cell__hd">
      <label class="weui-label">{{inputTitle}}</label>
    </div>

    <div class="weui-cell__bd">
      <slot/>
    </div>

    <div 
      class="weui-cell__ft" 
      v-if="isError"
      v-on:click="showError"
    >
      <i class="weui-icon-warn"></i>
    </div>
  </div>
</template>

<script>

import { Toast } from 'mint-ui';

export default {
  name: 'InputItem',

  props: [ 'inputTitle', 'inputType', 'isError',  'errorMessage'],

  computed: {
    propsToClass: function (props) {
      let className = 'weui-cell';
      
      if (props.inputType === 'select') {
        className += ' weui-cell_select weui-cell_select-after'
      } 

      if (props.isError) {
        className += ' weui-cell_warn'
      }

      return className;
    }
  },

  methods: {
    showError() {
      Toast({
        message: this.errorMessage,
        duration: 1200
      });
    }
  }
}

</script>

<style scoped lang="less">

</style>
