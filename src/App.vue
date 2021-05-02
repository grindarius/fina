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
          <b-navbar-item href="/significant-digits">
            Significant Digits
          </b-navbar-item>
          <b-navbar-item href="/decimal-points">
            Decimal Points
          </b-navbar-item>
          <b-navbar-item href="/bisection">
            Bisection Method
          </b-navbar-item>
          <b-navbar-item href="/false-position">
            False Position Method
          </b-navbar-item>
          <b-navbar-item href="/fixed-point-iteration">
            Fixed Point Iteration Method
          </b-navbar-item>
          <b-navbar-item href="/newton">
            Newton's Method
          </b-navbar-item>
          <b-navbar-item href="/secant">
            Secant Method
          </b-navbar-item>
          <b-navbar-item href="/gauss-seidel">
            Gauss Seidel Method
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Second Semester">
          <b-navbar-item href="/jacobi">
            Jacobi Method
          </b-navbar-item>
          <b-navbar-item href="/divided-difference">
            Newton's Divided Difference
          </b-navbar-item>
          <b-navbar-item href="/forward-difference">
            Newton's Forward Difference
          </b-navbar-item>
          <b-navbar-item href="/backward-difference">
            Newton's Backward Difference
          </b-navbar-item>
          <b-navbar-item href="/lagrange">
            Lagrange Polynomial
          </b-navbar-item>
          <b-navbar-item href="/regression">
            Regression Equation
          </b-navbar-item>
          <b-navbar-item href="/trapezoidal">
            Trapezoidal Rule
          </b-navbar-item>
          <b-navbar-item href="/simpson-one-third">
            Simpson's 1/3 Rule
          </b-navbar-item>
          <b-navbar-item href="/simpson-three-eights">
            Simpson's 3/8 Rule
          </b-navbar-item>
          <b-navbar-item href="/romberg">
            Romberg's Method
          </b-navbar-item>
          <b-navbar-item href="/euler">
            Euler's Method
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item href="/about">
          About
        </b-navbar-item>
        <b-navbar-item href="/sources">
          Sources
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view/>
  </div>
</template>
