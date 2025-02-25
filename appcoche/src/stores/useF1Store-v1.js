import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useF1Store = defineStore('f1Store', () => {
  const selectedYear = ref(localStorage.getItem('selectedYear') || null);
  const selectedRace = ref(localStorage.getItem('selectedRace') || null);
  const selectedConstructor = ref(localStorage.getItem('selectedConstructor') || null);
  const selectedDriver = ref(localStorage.getItem('selectedDriver') || null);

  const setYear = (year) => {
    selectedYear.value = year;
    localStorage.setItem('selectedYear', year);
  };

  const setRace = (race) => {
    selectedRace.value = race;
    localStorage.setItem('selectedRace', race);
  };

  const setConstructor = (constructor) => {
    selectedConstructor.value = constructor;
    localStorage.setItem('selectedConstructor', constructor);
  };

  const setDriver = (driver) => {
    selectedDriver.value = driver;
    localStorage.setItem('selectedDriver', driver);
  };

  return { selectedYear, selectedRace, selectedConstructor, selectedDriver, setYear, setRace, setConstructor, setDriver };
});
