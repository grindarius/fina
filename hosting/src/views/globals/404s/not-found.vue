<template>
  <div class="not-found-page">
    <section class="hero is-sailor-blue is-fullheight">
      <div class="hero-body">
        <div class="container">
          <img src="@/assets/rocket.png" alt="FINA" class="fina-logo">
          <h1 class="title is-1 has-text-centered">
            We cannot find what you're looking for :(
          </h1>
          <p class="subtitle has-text-centered">
            Sorry for the inconvience.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotFoundPage extends Vue {}
</script>

<style lang="scss" scoped>
img {
  display: block;
  margin: 50px auto;
  width: 200px;
}
</style>
