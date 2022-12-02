<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import { usePokeStore } from '@/store/pokemon';
  
  const pokeStore = usePokeStore();
  const { page } = storeToRefs(pokeStore)
  const { getPaginatedPokemons } = pokeStore;
</script>

<template>
<div class="flex justify-between items-center">
  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl">
    Pokedex
  </h1>
  <div class="inline-flex rounded-md shadow-sm">
    <button 
      :disabled="(page === 1)" 
      @click="getPaginatedPokemons(undefined, page-1)" 
      class="py-2 px-4 text-sm font-medium bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 "
    >
      Prev
    </button>
    <button @click="getPaginatedPokemons(undefined, page+1)" class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 ">
      Next
    </button>
  </div>
</div>
</template>