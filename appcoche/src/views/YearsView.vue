<template>
    <div class="years-view">
      <h1 class="years-view__title">Elige un año de la Fórmula 1</h1>
      <YearsComponent />
    </div>
  </template>
  
  <script setup>
  import YearsComponent from '../components/YearsComponent.vue';
  </script>
  
  <style scoped>
  .years-view {
    text-align: center;
    padding: 20px;
  }
  
  .years-view__title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  </style>
  