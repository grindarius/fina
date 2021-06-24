<template>
  <div class="getting-started-page">
    <section id="getting-started" class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Getting Started
          </h1>
        </div>
      </div>
    </section>
    <section id="what-is-fina" class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            What is FINA
          </h1>
          <p class="subtitle is-indented">
            FINA (pronounced FIN-NA), short for Fabulous and Interactive Numerical Analysis Calculator,
            is a tool to learn Numerical Analysis. Since I found so many struggles learning this subject.
            So I decided to make this a Web App for people who wanted to study it.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GettingStartedPage extends Vue {}
</script>
