<template src="./about.html"></template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import FooterComponent from '@/components/footer/footer.vue'

@Component({
  metaInfo () {
    return {
      title: 'About | FINA'
    }
  },
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class AboutPage extends Vue {}
</script>
