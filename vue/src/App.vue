<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePokeStore } from '@/store/pokemon';
  
  const pokeStore = usePokeStore();
  const { fetchPokemons } = pokeStore;
  const { pokemonData, isFetchingPokemons } = storeToRefs(pokeStore);

  onMounted(async () => {
    await fetchPokemons();
  })
</script>

<template>
  <div class="container mx-auto px-4">
    <Header />
    <div class="space-y-3">
      <SearchBar />
      <pokemonPaginator />
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          
          v-for="pokemon in pokemonData" :key="pokemon.id"
        >
          <PokemonCard
            v-if="!isFetchingPokemons" 
          >
            <template v-slot:image>
              <img 
              class="w-full sm:w-20"
              :src="pokemon.sprites.front_default" 
              :alt="pokemon.name"
              >
            </template>
            <template v-slot:body>
              <p class="text-2xl font-normal capitalize">{{pokemon.name}}</p>
              <div class="grid grid-cols-2 gap-2">
                <div 
                  class="rounded-full border-2 border-red-700 bg-red-200 px-2 w-20 capitalize text-center"
                  v-for="types in pokemon.types" :key="types.slot"
                >
                    <span class="text-red-700">{{ types.type.name }}</span>
                </div>
              </div>
            </template>
            <template v-slot:aside>
              <p class="text-gray-500">#{{pokemon.id}}</p>
            </template>
          </PokemonCard>
          <PokemonCardSkeleton v-else />
        </div>
      </div>
    </div>
  </div>
</template>
