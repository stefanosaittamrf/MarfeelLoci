<template>
  <div>
    <div v-for="(value, key) in config">
      <h4>{{key}}</h4>
      <div v-if="key === 'invalidate'">
        <input type="number" v-model="invalidate" v-bind:min="value[0]" v-bind:max="value[value.length - 1]">
        {{invalidate}}
      </div>
      <div v-else-if="key === 'envParams'" v-for="(v,k) in value">
        <div>
          <h5>{{k}}</h5>
          <div v-if="v.length > 1" v-for="type in v">
            <input type="radio" v-model="envParams[k]" v-bind:name="k" v-bind:id="type" v-bind:value="type">
            <label v-bind:for="type">{{type}}</label>
          </div>
          <div v-else>
            <input type="checkbox" v-model="envParams[k]" v-bind:name="k" v-bind:id="type" v-bind:value="type">
            <label v-bind:for="type">{{type}}</label>
          </div>
        </div>
      </div>
      <div v-else-if="key === 'types'" v-for="v in value">
        <div>
          <input type="radio" v-model="urlType" name="type" v-bind:id="v" v-bind:value="v">
          <label v-bind:for="v">{{v}}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Bus from './../bus.js';

  export default {
    data() {
      return {
        invalidate: null,
        urlType: null,
        envParams: {}
      }
    },
    watch: {
      invalidate: function(val, oldVal) {
        Bus.$emit('invalidate', val);
      },
      urlType: function(val, oldVal) {
        Bus.$emit('urlType', val);
      },
      envParams: {
        handler: function(val, oldVal) {
          Bus.$emit('envParams', val);
        },
        deep: true
      }
    },
    created() {
      Object.keys(this.config.envParams).forEach(k => {
        Vue.set(this.envParams, k, '');
      });
    },
    props: {
      config: Object,
      required: true
    }
  }
</script>
<style>
h4 {
  text-transform: capitalize;
}
</style>
