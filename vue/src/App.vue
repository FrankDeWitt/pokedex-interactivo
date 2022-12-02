<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePokeStore } from '@/store/pokemon';
  
  const pokeStore = usePokeStore();
  const { getPokemonData } = pokeStore;
  const { pokemonData } = storeToRefs(pokeStore);

  onMounted(async () => {
    await getPokemonData();
  })
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="pokemon in pokemonData" :key="pokemon.id">
      <PokemonCard>
        <template v-slot:image>
          <img 
            class="w-full sm:w-20"
            :src="pokemon.sprite" 
            :alt="pokemon.name"
          >
        </template>
        <template v-slot:body>
          <p class="text-2xl font-normal capitalize">{{pokemon.name}}</p>
          <div class="grid grid-cols-3 gap-3">
            <div 
              class="rounded-full border-2 border-red-700 bg-red-200 px-2 w-20 capitalize"
              v-for="type in pokemon.types" :key="type"
            >
                <span class="text-red-700">{{ type }}</span>
            </div>
          </div>
        </template>
        <template v-slot:aside>
          <p class="text-gray-500">#{{pokemon.id}}</p>
        </template>
      </PokemonCard>
    </div>
  </div>
  </template>
