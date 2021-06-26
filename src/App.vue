<template>
  <div id="app">
    <b-navbar class="is-sailor-blue" :fixed-top="true" wrapper-class="container" :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/rocket.png" alt="FINA">
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-dropdown label="First Semester">
          <b-navbar-item v-for="navbar in firstSemesterNavbarMenu" :key="navbar.name + navbar.path" tag="router-link" :to="{ path: navbar.path }">
            {{ navbar.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Second Semester">
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

import { Vue, Component } from 'vue-property-decorator'
import FooterComponent from '@/components/footer/footer.vue'
import { firstSemesterPages, secondSemesterPages, miscellaneousPages } from '@/constants'
import { getFirstLevelPage } from '@/services'
import { PageComponent } from '@/types'

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class App extends Vue {
  get firstSemesterNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(firstSemesterPages)
  }

  get secondSemesterNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(secondSemesterPages)
  }

  get miscellaneousNavbarMenu (): Array<PageComponent> {
    return getFirstLevelPage(miscellaneousPages)
  }
}
</script>
