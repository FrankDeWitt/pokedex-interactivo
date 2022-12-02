<script setup lang="ts">
  import { ref } from 'vue'
  import { watchDebounced } from '@vueuse/core'

  import { usePokeStore } from '@/store/pokemon';
  
  const pokeStore = usePokeStore();
  const { searchPokemon } = pokeStore;

  const input = ref('')

  watchDebounced(input, () => {
    searchPokemon(input.value)
  }, { debounce: 1000, maxWait: 5000 })

</script>

<template>
  <div class="flex items-center">   
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-black dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </div>
      <input 
        v-model="input" 
        type="text" 
        id="searchBar" 
        class="bg-white text-black shadow-lg rounded-md block w-full pl-10 p-2.5 focus:outline-none" 
        placeholder="Search Pokemon...">
    </div>
</div>
</template>