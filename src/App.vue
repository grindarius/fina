<template>
  <div id="app">
    <b-navbar class="is-sailor-blue" wrapper-class="container" :mobile-burger="true">
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
    <router-view/>
    <footer class="footer">
      <div class="containter has-text-centered">
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
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NavbarMenu } from '@/types'

@Component
export default class App extends Vue {
  private get firstSemesterNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'Significant Digits', path: '/significant-digits' },
      { name: 'Decimal Points', path: '/decimal-points' },
      { name: 'Bisection Method', path: '/bisection' },
      { name: 'False Position Method', path: '/false-position' },
      { name: 'Fixed Point Iteration Method', path: '/fixed-point-iteration' },
      { name: 'Newton\'s Method', path: '/newton' },
      { name: 'Secant Method', path: '/secant' },
      { name: 'Gauss Seidel Method', path: '/gauss-seidel' }
    ]
  }

  private get secondSemesterNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'Jacobi Method', path: '/jacobi' },
      { name: 'Newton\'s Divided Difference', path: '/divided-difference' },
      { name: 'Newton\'s Forward Difference', path: '/forward-difference' },
      { name: 'Newton\'s Backward Difference', path: '/backward-difference' },
      { name: 'Lagrange Polynomial', path: '/lagrange' },
      { name: 'Regression Equation', path: '/regression' },
      { name: 'Trapezoidal Rule', path: '/trapezoidal' },
      { name: 'Simpson\'s 1/3 Rule', path: '/simpsons-one-third' },
      { name: 'Simpson\'s 3/8 Rule', path: '/simpsons-three-eights' },
      { name: 'Romberg\'s Method', path: '/romberg' },
      { name: 'Euler\'s Method', path: '/euler' }
    ]
  }

  private get miscellaneousNavbarMenu (): Array<NavbarMenu> {
    return [
      { name: 'About', path: '/about' },
      { name: 'Sources', path: '/sources' }
    ]
  }
}
</script>
