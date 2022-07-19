<script setup lang="ts">
import BaseHeader from "./BaseHeader.vue"
</script>

<template>
    <a-layout>
      <base-header></base-header>
      <a-layout-content
        :style="{ background: '#fff', margin: 0, minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
</template>

<style scoped>
</style>
