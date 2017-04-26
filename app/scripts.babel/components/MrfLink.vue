<template>
  <div>
    <input type="text" v-bind:value="mrfUri"></input>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Bus from './../bus.js';

  //TODO: need to handle a default case, but prolly it have to be done on the mrfOption component
  const getMarfeelUrlBasis = ({ protocol, host }) => `${protocol}//localhost.marfeel.com/${host}/`;
  const formatter = queriesList => `?${queriesList.join('&')}`;
  const getUrlPath = urlType => {
    //TODO: 'index' can change, need to be parametric
    switch (urlType) {
      case 'MarfeelTouch':
        return 'index.html'
      case 'AMP':
        return 'index.amp.html'
      case 'Single Item':
        return 'index/item.html'
      default:
        return 'index.html'
    }
  };
  const getQueryParams = (invalidateNum, urlType, envParams) => {
    let queries = [];
    if(invalidateNum) {
      queries.push(`invalidate=${invalidateNum}`)
    }
    //TODO: need to pass the article here
    if(urlType === 'Single Item') {
      queries.push(`item=`)
    }
    //TODO: refactor this
    if(envParams.mrfdev) {
      queries.push(`marfeeldev=true`)
    }
    if(envParams.mrfgarda) {
      queries.push(`marfeelgarda=off`)
    }
    if(envParams.mrfbm) {
      queries.push(`marfeelbm=off`)
    }
    if(envParams.mrfads) {
      queries.push(`marfeelads=off`)
    }
    if(envParams.mrfdevice) {
      queries.push(`deviceType=off`)
    }
    if(envParams.deepLinking) {
      queries.push(`articleUri=`)
    }
    return formatter(queries);
  };
  const getMarfeelUrlContext = ({ invalidate, urlType, envParams }) =>
    `${getUrlPath(urlType)}${getQueryParams(invalidate, urlType, envParams)}`;

  const vueComponent = {
    data() {
      return {
        mrfUri: '',
        mrfUriParams: {
          invalidate: null,
          urlType: 'MarfeelTouch',
          envParams: {}
        }
      }
    },
    created() {
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
        this.mrfUri = getMarfeelUrlBasis(new URL(tabs[0].url));
      });
    }
  };
  //TODO: how can i bind a sibling component? probably the emit pattern is not correct here
  // Bus.$on('invalidate', function (val) {
  //   Vue.set(vueComponent.mrfUriParams, 'invalidate', val);
  // });
  // Bus.$on('urlType', function (val) {
  //   Vue.set(vueComponent.mrfUriParams, 'urlType', val);
  // });
  // Bus.$on('envParams', function (val) {
  //   Vue.set(vueComponent.mrfUriParams, 'envParams', val);
  // });

  export default vueComponent;
</script>
<style>
</style>
