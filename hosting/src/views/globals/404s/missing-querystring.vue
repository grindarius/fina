<template>
  <div class="missing-query-in-answer-page">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">
            {{ pun }}
          </h1>
          <img src="@/assets/missing-query.png" width="200px" height="200px" alt="Missing Querystring">
          <h1 class="title is-2">
            The page you are trying to access needs a <b>querystring</b> to work properly.
          </h1>
          <h1 class="subtitle is-4">
            Choose from the menu on the left side to keep navigating further :)
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  metaInfo () {
    return {
      title: 'You shall not pass! | FINA'
    }
  }
})
export default class MissingQueryInAnswerPage extends Vue {
  puns: Array<string> = [
    'You shall not pass!',
    'Looks like you ain\'t got a ticket',
    'Look mom, no ticket!',
    'Construction zone ahead.',
    'The road is closed today sadly.',
    'Not today brother.'
  ]

  get pun (): string {
    return this.puns[Math.floor(Math.random() * this.puns.length - 1)]
  }
}
</script>
