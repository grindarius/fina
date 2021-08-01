<template>
  <footer class="footer">
    <div class="container has-text-centered">
      <p class="subtitle is-6">
        Made with 🧠 and all these awesome tools!
      </p>
      <nav class="breadcrumb is-centered has-bullet-separator" aria-label="breadcrumb">
        <ul>
          <li>
            <a href="https://github.com/lucpotage/vue-katex">Vue Katex</a>
          </li>
          <li>
            <a href="https://mathjs.org/">Mathjs</a>
          </li>
          <li>
            <a href="https://www.typescriptlang.org/">Typescript</a>
          </li>
          <li>
            <a href="https://www.fastify.io/">Fastify</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FooterComponent extends Vue {}
</script>

<style scoped lang="scss">
@import '../../variables';

.footer {
  background-color: rgb(255, 255, 255);
  border-top: 2px solid $gray-border;
}
</style>
