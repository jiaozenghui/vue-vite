<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import {ColorPicker} from "vue3-colorpicker";
import { toRefs } from 'vue'
import "vue3-colorpicker/style.css";
    const props = defineProps({
        styleItems: {} as any,
        colStyleItems: {} as any
    })
    const {styleItems, colStyleItems} = toRefs(props);
    const labelCol= { style: { width: '60px' } };
    const wrapperCol= { span: 14 };

</script>

<template>
  <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="高">
      <a-input v-model:value="styleItems['min-height']" />
    </a-form-item>
    <a-form-item label="上边距">
      <a-input v-model:value="styleItems['margin-top']" />
    </a-form-item>
    <a-form-item label="下边距">
      <a-input v-model:value="styleItems['margin-bottom']" />
    </a-form-item>
    <a-form-item label="左边距">
      <a-input v-model:value="styleItems['margin-left']" />
    </a-form-item>
    <a-form-item label="右边距">
      <a-input v-model:value="styleItems['margin-right']" />
    </a-form-item>
    <a-form-item label="背景色">
      <color-picker v-model:pureColor="styleItems['background-color']" pickerType="chrome" format="rgb" shape="square"/>
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
