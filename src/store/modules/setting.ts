import { defineStore } from 'pinia';

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => ({
    fold: false,
    refresh: false,
  }),
});

export default useLayOutSettingStore;
