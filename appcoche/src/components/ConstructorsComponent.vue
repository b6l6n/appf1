<template>
    <div class="constructors">
      <h2 class="constructors__title">Constructores del GP {{ selectedRace?.raceName }}</h2>
  
      <ul v-if="constructors.length" class="constructors__list">
        <li v-for="constructor in constructors" :key="constructor.constructorId" class="constructors__item" @click="selectConstructor(constructor)">
          {{ constructor.name }} ({{ constructor.nationality }})
        </li>
      </ul>
  
      <p v-else class="constructors__loading">Cargando constructores...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useF1Store } from '../stores/useF1Store';
  import { useRouter } from 'vue-router';
  
  const store = useF1Store();
  const router = useRouter();
  const constructors = ref([]);
  
  const selectedRace = computed(() => store.selectedRace);
  
  const fetchConstructors = async () => {
    if (!selectedRace.value) return;
  
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedRace.value.season}/${selectedRace.value.round}/results.json`);
      const data = await response.json();
      
      // Filtrar los constructores que quedaron en el top 10
      const results = data.MRData.RaceTable.Races[0]?.Results || [];
      const topConstructors = results
        .slice(0, 10)
        .map((result) => result.Constructor);
  
      // Evitar duplicados
      constructors.value = Array.from(new Map(topConstructors.map(c => [c.constructorId, c])).values());
    } catch (error) {
      console.error('Error al obtener constructores:', error);
    }
  };
  
  const selectConstructor = (constructor) => {
    store.setConstructor(constructor);
    router.push('/drivers');
  };
  
  onMounted(fetchConstructors);
  </script>
  
  <style scoped>
  .constructors {
    text-align: center;
    padding: 20px;
  }
  
  .constructors__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .constructors__list {
    list-style: none;
    padding: 0;
  }
  
  .constructors__item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  .constructors__item:hover {
    background-color: #f0f0f0;
  }
  
  .constructors__loading {
    font-style: italic;
  }
  </style>
  