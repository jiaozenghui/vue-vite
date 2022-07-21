<template>
  <a-drawer
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
  >

    <template #footer>
      <a-button style="margin-right: 8px" @click="">Cancel</a-button>
      <a-button type="primary" @click="">Submit</a-button>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref} from 'vue';

  defineProps({
      drawer_conf: {} as any
  })
</script>