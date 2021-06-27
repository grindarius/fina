<template>
  <div id="app">
    <b-navbar class="is-sailor-blue" :fixed-top="true" wrapper-class="container" :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/rocket.png" alt="FINA">
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/docs' }">
          Getting started
        </b-navbar-item>
        <b-navbar-dropdown label="First semester">
          <b-navbar-item v-for="navbar in firstSemesterNavbarMenu" :key="navbar.name + navbar.path" tag="router-link" :to="{ path: navbar.path }">
            {{ navbar.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Second semester">
          <b-navbar-item v-for="navbar in secondSemesterNavbarMenu" :key="navbar.name + navbar.path" tag="router-link" :to="{ path: navbar.path }">
            {{ navbar.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item v-for="navbar in miscellaneousNavbarMenu" :key="navbar.name + navbar.path" tag="router-link" :to="{ path: navbar.path }">
          {{ navbar.name }}
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- * Actual page displays here -->
    <router-view />

  </div>
</template>
<script lang="ts">

import FooterComponent from '@/components/footer/footer.vue'
import { firstSemesterPages, miscellaneousPages, secondSemesterPages } from '@/constants'
import { getFirstLevelPage } from '@/services'
import { PageComponent } from '@/types'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  metaInfo () {
    return {
      title: 'Learn Numerical Analysis | FINA'
    }
  },
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class App extends Vue {
  get firstSemesterNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(firstSemesterPages).slice(1)
  }

  get secondSemesterNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(secondSemesterPages)
  }

  get miscellaneousNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(miscellaneousPages)
  }
}
</script>
