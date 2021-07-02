<template src="./about.html"></template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  metaInfo () {
    return {
      title: 'About | FINA'
    }
  }
})
export default class AboutPage extends Vue {}
</script>
