<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
    defineProps({
        styleItems: {
            height: '60px',
            'margin-left': '0px',
            'margin-right': '0px',
            'background-color': 'transparent'
        } as any,
        colStyleItems: {
          display: 'flex',
          'justify-content': 'flex-start',
          'align-items': 'flex-start'
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
      <color-picker v-model:value="styleItems['background-color']"/>
    </a-form-item>
    <a-form-item label="水平对齐">
      <a-input v-model:value="colStyleItems['justify-content']" />
    </a-form-item>
    <a-form-item label="垂直对齐">
      <a-input v-model:value="colStyleItems['align-items']" />
    </a-form-item>
  </a-form>
</template>

<style scoped>
</style>
