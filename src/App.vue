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
import { NavbarMenu } from '@/types'

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class App extends Vue {
  get firstSemesterNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'Significant Digits', path: '/docs/significant-digits' },
      { name: 'Decimal Points', path: '/docs/decimal-points' },
      { name: 'Bisection Method', path: '/docs/bisection' },
      { name: 'False Position Method', path: '/docs/false-position' },
      { name: 'Fixed Point Iteration Method', path: '/docs/fixed-point-iteration' },
      { name: 'Newton\'s Method', path: '/docs/newton' },
      { name: 'Secant Method', path: '/docs/secant' },
      { name: 'Gauss Seidel Method', path: '/docs/gauss-seidel' }
    ]
  }

  get secondSemesterNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'Jacobi Method', path: '/docs/jacobi' },
      { name: 'Newton\'s Divided Difference', path: '/docs/divided-difference' },
      { name: 'Newton\'s Forward Difference', path: '/docs/forward-difference' },
      { name: 'Newton\'s Backward Difference', path: '/docs/backward-difference' },
      { name: 'Lagrange Polynomial', path: '/docs/lagrange' },
      { name: 'Regression Equation', path: '/docs/regression' },
      { name: 'Trapezoidal Rule', path: '/docs/trapezoidal' },
      { name: 'Simpson\'s 1/3 Rule', path: '/docs/simpsons-one-third' },
      { name: 'Simpson\'s 3/8 Rule', path: '/simpsons-three-eights' },
      { name: 'Romberg\'s Method', path: '/docs/romberg' },
      { name: 'Euler\'s Method', path: '/docs/euler' }
    ]
  }

  get miscellaneousNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'About', path: '/about' },
      { name: 'Sources', path: '/sources' }
    ]
  }
}
</script>
