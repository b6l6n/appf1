import { defineStore } from 'pinia';

export const useF1Store = defineStore('f1', {
  state: () => ({
    selectedYear: null,
    selectedRace: null,
    selectedConstructor: null,
    selectedDriver: null,
  }),
  actions: {
    setYear(year) {
      this.clearSelections(); // Vacía localStorage al elegir un nuevo año
      this.selectedYear = year;
      localStorage.setItem('year', JSON.stringify(year));
    },
    setRace(race) {
      this.selectedRace = race;
      localStorage.setItem('race', JSON.stringify(race));
    },
    setConstructor(constructor) {
      this.selectedConstructor = constructor;
      localStorage.setItem('constructor', JSON.stringify(constructor));
    },
    setDriver(driver) {
      this.selectedDriver = driver;
      localStorage.setItem('driver', JSON.stringify(driver));
    },
    clearSelections() {
      this.selectedYear = null;
      this.selectedRace = null;
      this.selectedConstructor = null;
      this.selectedDriver = null;
      localStorage.removeItem('year');
      localStorage.removeItem('race');
      localStorage.removeItem('constructor');
      localStorage.removeItem('driver');
    },
  },
});

