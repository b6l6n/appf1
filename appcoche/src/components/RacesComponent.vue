<template>
    <div class="races">
      <h2 class="races__title">Carreras de {{ selectedYear }}</h2>
  
      <ul v-if="races.length" class="races__list">
        <li v-for="race in races" :key="race.round" class="races__item" @click="selectRace(race)">
          {{ race.raceName }} - {{ race.Circuit.circuitName }}
        </li>
      </ul>
  
      <p v-else class="races__loading">Cargando carreras...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useF1Store } from '../stores/useF1Store';
  import { useRouter } from 'vue-router';
  
  const store = useF1Store();
  const router = useRouter();
  const races = ref([]);
  
  const selectedYear = computed(() => store.selectedYear);
  
  const fetchRaces = async () => {
    if (!selectedYear.value) return;
  
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedYear.value}.json`);
      const data = await response.json();
      races.value = data.MRData.RaceTable.Races;
    } catch (error) {
      console.error('Error al obtener carreras:', error);
    }
  };
  
  const selectRace = (race) => {
    store.setRace(race);
    router.push('/constructors');
  };
  
  onMounted(fetchRaces);
  </script>
  
  <style scoped>
  .races {
    text-align: center;
    padding: 20px;
  }
  
  .races__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .races__list {
    list-style: none;
    padding: 0;
  }
  
  .races__item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  .races__item:hover {
    background-color: #f0f0f0;
  }
  
  .races__loading {
    font-style: italic;
  }
  </style>
  