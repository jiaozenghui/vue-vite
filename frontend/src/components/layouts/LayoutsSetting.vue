<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';

    defineProps({
        styleItems: {
            
        } as any
    })

    const labelCol= { style: { width: '60px' } };
    const wrapperCol= { span: 14 };

</script>

<template>
  <a-form :model="styleItems" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="高">
      <a-input v-model:value="styleItems.height" />
    </a-form-item>
    <a-form-item label="左边距">
      <a-input v-model:value="styleItems['margin-left']" />
    </a-form-item>
    <a-form-item label="右边距">
      <a-input v-model:value="styleItems['margin-right']" />
    </a-form-item>
    <a-form-item label="背景色">
      <a-input v-model:value="styleItems['background-color']" />
    </a-form-item>
  </a-form>
</template>

<style scoped>
</style>
