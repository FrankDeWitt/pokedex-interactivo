<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col h-50 bg-white text-black shadow-lg rounded-md sm:h-20 sm:flex-row">
    <div class=" order-1 sm:mx-0">
      <slot name="image"></slot>
    </div>
    <div class="flex flex-col order-1 px-2 py-3 items-start justify-between sm:px-0">
      <slot name="body"></slot>
    </div>
    <div class="ml-auto p-3 sm:order-1">
      <slot name="aside"></slot>
    </div>
  </div>
</template>