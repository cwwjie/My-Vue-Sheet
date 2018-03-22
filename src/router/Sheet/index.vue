<template>
  <div class="Sheet">
    <mt-header fixed title="Vue-Sheet"></mt-header>

    <div class="Sheet-main">

      <list title="登记表">

        <inputItem 
          input-title="门店名称"
          input-type="input"
          v-bind:isError="shopNameHandle().result === 1 ? false : true"
          v-bind:errorMessage="shopNameHandle().message"
        >

          <input 
            class="weui-input" 
            placeholder="请输入门店的名称"
            type="text" 
            v-model="shopName"
          />
        </inputItem>

        <inputItem 
          input-title="服务日期"
          input-type="select">

          <div 
            class="weui-select"
            v-on:click="serviceDateHandle"
          >{{getServiceDateFormat}}</div>

          <mt-datetime-picker
            ref="serviceDatePicker"
            type="date"
            v-bind:startDate="new Date()"
            v-model="serviceDate">
          </mt-datetime-picker>
        </inputItem>

        <inputItem 
          input-title="服务项目"
          input-type="select">

          <select 
            class="weui-select" 
            v-model="serviceItem">

            <option value="普通洗车">普通洗车</option>
            <option value="项目一">项目一</option>
            <option value="项目二">项目二</option>
          </select>
        </inputItem>

        <inputItem 
          input-title="车牌号码"
          input-type="input"
          v-bind:isError="licensePlateHandle().result === 1 ? false : true"
          v-bind:errorMessage="licensePlateHandle().message"
        >

          <input 
            class="weui-input" 
            placeholder="请输入车牌号码"
            type="text" 
            v-model="licensePlate"
          />
        </inputItem>

        <inputItem 
          input-title="手机号码"
          input-type="input"
          v-bind:isError="mobileHandle().result === 1 ? false : true"
          v-bind:errorMessage="mobileHandle().message"
        >

          <input 
            class="weui-input" 
            placeholder="请输入手机号码"
            type="text" 
            v-model="mobile"
          />
        </inputItem>

        <inputItem 
          input-title="备注"
          input-type="input">

          <input 
            class="weui-input" 
            placeholder="电话可能不是预留电话"
            type="text" 
            v-model="remark"
          />
        </inputItem>
      </list>
      <div class="Sheet-submit">
        <mt-button 
          size="large" 
          type="danger"
          v-if="submitHandle().result !== 1"
          v-on:click="showSubmitError" 
        >提交</mt-button>
        <mt-button 
          size="large" 
          type="primary"
          v-if="submitHandle().result === 1" 
          v-on:click="submitSheet" 
        >提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';

import inputItem from './../../components/InputItem/index.vue';
import list from './../../components/List/index.vue';

import convertDate from './../../utils/convertDate';
import request from './../../utils/request';

export default {
  name: 'Sheet',

  components: {
    inputItem, list
  },

  data: () => ({
    shopName: '',
    serviceDate: new Date(),
    serviceItem: '普通洗车',
    licensePlate: '',
    mobile: '',
    remark: '',
  }),

  methods: {
    shopNameHandle() {
      let shopName = this.shopName;

      if (shopName === '') {
        return request.error('门店名称不能为空!');
      } else {
        return request.success();
      }
    },

    serviceDateHandle() {
      this.$refs.serviceDatePicker.open();
    },

    licensePlateHandle() {
      let licensePlate = this.licensePlate;

      if (licensePlate === '') {
        return request.error('车牌号码不能为空!');
      } else {
        return request.success();
      }
    },

    mobileHandle() {
      let mobile = this.mobile;

      if (mobile === '') {
        return request.error('手机号码不能为空!');
      } else if (/^1[34578]\d{9}$/.test(mobile) === false ) {
        return request.error('手机号码格式不正确!');
      } else {
        return request.success();
      }
    },

    submitHandle() {
      let shopNameHandle = this.shopNameHandle();
      let licensePlateHandle = this.licensePlateHandle();
      let mobileHandle = this.mobileHandle();

      if (shopNameHandle.result !== 1) {
        return shopNameHandle
      }

      if (licensePlateHandle.result !== 1) {
        return licensePlateHandle
      }

      if (mobileHandle.result !== 1) {
        return mobileHandle
      }

      return request.success();
    },

    showSubmitError() {
      let errorMessage = this.submitHandle().message;
      Toast({
        message: errorMessage,
        duration: 1200
      });
    },

    submitSheet() {
      Indicator.open('正在提交...');
    }
  },

  computed: {
    getServiceDateFormat() {
      return convertDate.dateToFormat(this.serviceDate);
    }
  }  
}

</script>

<style scoped lang="less">

.Sheet {
  position: relative;
  min-height: 100%;
  background-color: #f5f5f9;

  .Sheet-main {
    padding-top: 50px;
  }

  .Sheet-submit {
    padding: 20px;
  }
}

</style>
