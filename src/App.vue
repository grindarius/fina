<template>
  <div id="app">
    <b-navbar class="is-sailor-blue" wrapper-class="container">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/rocket.png" alt="FINA">
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-dropdown label="First Semester">
          <b-navbar-item tag="router-link" :to="{ path: '/significant-digits' }">
            Significant Digits
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/decimal-points' }">
            Decimal Points
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/bisection' }">
            Bisection Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/false-position' }">
            False Position Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/fixed-point-iteration' }">
            Fixed Point Iteration Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/newton' }">
            Newton's Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/secant' }">
            Secant Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/gauss-seidel' }">
            Gauss Seidel Method
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Second Semester">
          <b-navbar-item tag="router-link" :to="{ path: '/jacobi' }">
            Jacobi Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/divided-difference' }">
            Newton's Divided Difference
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/forward-difference' }">
            Newton's Forward Difference
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/backward-difference' }">
            Newton's Backward Difference
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/lagrange' }">
            Lagrange Polynomial
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/regression' }">
            Regression Equation
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/trapezoidal' }">
            Trapezoidal Rule
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/simpson-one-third' }">
            Simpson's 1/3 Rule
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/simpson-three-eights' }">
            Simpson's 3/8 Rule
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/romberg' }">
            Romberg's Method
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/euler' }">
            Euler's Method
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item tag="router-link" :to="{ path: '/about' }">
          About
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/sources' }">
          Sources
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view/>
  </div>
</template>
