<script setup lang="ts">
import HomeContent from '@theme/HomeContent.vue';
import HomeFeatures from '@theme/HomeFeatures.vue';
import HomeHero from '@theme/HomeHero.vue';
import HomeSearch from './SearchBar.vue';
</script>

<template>
  <HomeHero />
  <main class="home">
    <div class="theme-default-content">
      <HomeSearch />
      <HomeFeatures />
      <HomeContent />
    </div>
  </main>
</template>
