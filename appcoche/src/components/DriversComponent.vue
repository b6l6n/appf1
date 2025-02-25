<template>
    <div class="drivers">
      <h2 class="drivers__title">
        Pilotos de {{ selectedConstructor?.name }} en el GP {{ selectedRace?.raceName }}
      </h2>
  
      <ul v-if="drivers.length" class="drivers__list">
        <li v-for="driver in drivers" :key="driver.driverId" class="drivers__item" @click="selectDriver(driver)">
          {{ driver.givenName }} {{ driver.familyName }} ({{ driver.nationality }})
        </li>
      </ul>
  
      <p v-else class="drivers__loading">Cargando pilotos...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useF1Store } from '../stores/useF1Store';
  import { useRouter } from 'vue-router';
  
  const store = useF1Store();
  const router = useRouter();
  const drivers = ref([]);
  
  const selectedRace = computed(() => store.selectedRace);
  const selectedConstructor = computed(() => store.selectedConstructor);
  
  const fetchDrivers = async () => {
    if (!selectedRace.value || !selectedConstructor.value) return;
  
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedRace.value.season}/${selectedRace.value.round}/results.json`);
      const data = await response.json();
  
      // Filtrar los pilotos del constructor seleccionado
      const results = data.MRData.RaceTable.Races[0]?.Results || [];
      drivers.value = results
        .filter(result => result.Constructor.constructorId === selectedConstructor.value.constructorId)
        .map(result => result.Driver);
    } catch (error) {
      console.error('Error al obtener pilotos:', error);
    }
  };
  
  const selectDriver = (driver) => {
    store.setDriver(driver);
    router.push('/results');
  };
  
  onMounted(fetchDrivers);
  </script>
  
  <style scoped>
  .drivers {
    text-align: center;
    padding: 20px;
  }
  
  .drivers__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .drivers__list {
    list-style: none;
    padding: 0;
  }
  
  .drivers__item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  .drivers__item:hover {
    background-color: #f0f0f0;
  }
  
  .drivers__loading {
    font-style: italic;
  }
  </style>
  