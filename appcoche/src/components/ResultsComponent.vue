<template>
    <div class="results">
      <h2 class="results__title">Año {{ selectedYear }}</h2>
      <h2 class="results__title">Resultados del GP {{ selectedRace?.raceName }}</h2>
  
      <div v-if="podium.length" class="results__podium">
        <h3>Top 3</h3>
        <ul class="results__list">
          <li v-for="result in podium" :key="result.position" class="results__item">
            <strong>{{ result.position }}º</strong> - 
            {{ result.Driver.givenName }} {{ result.Driver.familyName }} ({{ result.Constructor.name }})
          </li>
        </ul>
      </div>
  
      <div class="results__selection">
        <h3>Tu Selección</h3>
        <p><strong>Año:</strong> {{ selectedYear }}</p>
        <p><strong>Carrera:</strong> {{ selectedRace?.raceName }}</p>
        <p><strong>Constructor:</strong> {{ selectedConstructor?.name }}</p>
        <p><strong>Piloto:</strong> {{ selectedDriver?.givenName }} {{ selectedDriver?.familyName }}</p>
      </div>
  
      <p v-if="!podium.length" class="results__loading">Cargando resultados...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useF1Store } from '../stores/useF1Store';
  
  const store = useF1Store();
  const podium = ref([]);
  
  const selectedYear = computed(() => store.selectedYear);
  const selectedRace = computed(() => store.selectedRace);
  const selectedConstructor = computed(() => store.selectedConstructor);
  const selectedDriver = computed(() => store.selectedDriver);
  
  const fetchResults = async () => {
    if (!selectedRace.value) return;
  
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedRace.value.season}/${selectedRace.value.round}/results.json`);
      const data = await response.json();
  
      // Obtener los 3 primeros puestos
      const results = data.MRData.RaceTable.Races[0]?.Results || [];
      podium.value = results.slice(0, 3);
    } catch (error) {
      console.error('Error al obtener resultados:', error);
    }
  };
  
  onMounted(fetchResults);
  </script>
  
  <style scoped>
  .results {
    text-align: center;
    padding: 20px;
  }
  
  .results__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .results__podium, .results__selection {
    margin: 20px 0;
  }
  
  .results__list {
    list-style: none;
    padding: 0;
  }
  
  .results__item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .results__loading {
    font-style: italic;
  }
  </style>
  