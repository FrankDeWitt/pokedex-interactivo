import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core'

import { getApiRoute } from '@/config/getApiRoute';
import { getErrorMessage, paginatePokemons } from '@/utils';

import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import { pokemon } from './api'

export const usePokeStore = defineStore('pokemon', () => {


  const page: Ref<number> = ref(1);
  const isFetchingPokemons: Ref<boolean> = ref(false);
  const fetchingPokemonError: Ref<string> = ref('');
  const pokemonDataBase: Ref<NamedAPIResource[]> = ref([]);
  const pokemonDataBaseFiltered: Ref<NamedAPIResource[]> = ref([]);
  const pokemonData: Ref<Pokemon[]> = ref([]);
  
  const searchPokemon = async (pokemonSearched: string) => {
    if(!pokemonSearched) {
      getPaginatedPokemons();
      return
    }
    pokemonDataBaseFiltered.value = pokemonDataBase.value.filter(pokemonApi =>
      Object.keys(pokemonApi).some(() => 
        pokemonApi['name'].toLowerCase().includes(pokemonSearched.toLowerCase())
      )
    );
    getPaginatedPokemons(pokemonDataBaseFiltered.value);
  };

  const fetchPokemons = async () => {
      const data = await getPokemons();
      pokemonDataBase.value = data?.value.results;
      getPaginatedPokemons();
  };

  const getPokemons = async () => {
    const url = getApiRoute(pokemon, { params: {}, query: { offset: 0, limit: 100000 }});
    const { error, data } = await useFetch(url).get().json()

    if (error.value) {
      fetchingPokemonError.value = getErrorMessage(error);
    } else {
      return data;
    }
  };

  const getPaginatedPokemons = async (arrayToFilter = pokemonDataBase.value, goToPage: number = 1) => {
    const promises = paginatePokemons(arrayToFilter, 24, goToPage).map(async (pokemon: any) => {
      return await getPokemonData(pokemon.url);
    });
    console.log("🚀 ~ file: pokemon.ts:56 ~ getPaginatedPokemons ~ goToPage", goToPage)
    page.value = goToPage;
    pokemonData.value = await Promise.all(promises);
    isFetchingPokemons.value = false
  }

  const getPokemonData = async (url: string) => {
    isFetchingPokemons.value = true
    const { error, data } = await useFetch(url).get().json()
    if (error.value) {
      fetchingPokemonError.value = getErrorMessage(error);
    } else {
      return data.value;
    }
  };

  return {
    searchPokemon,
    fetchPokemons,
    getPaginatedPokemons,
    page,
    isFetchingPokemons,
    fetchingPokemonError,
    pokemonData,
  };
});
