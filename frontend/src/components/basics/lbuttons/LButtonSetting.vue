<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import {ColorPicker} from "vue3-colorpicker";
import { toRefs } from 'vue'
import "vue3-colorpicker/style.css";
    const props = defineProps({
        styleItems: {} as any,
        colStyleItems: {} as any,
        element: {} as any
    })
    const {styleItems, colStyleItems} = toRefs(props);
    const labelCol= { style: { width: '60px' } };
    const wrapperCol= { span: 14 };

</script>

<template>
  <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="类型">
        <a-select
            ref="select"
                v-model:value="element.type" 
                style="width: 120px"
            >
             <a-select-option value="default">default</a-select-option>
            <a-select-option value="primary">primary</a-select-option>
            <a-select-option value="dashed">dashed</a-select-option>
            <a-select-option value="link">link</a-select-option>
            <a-select-option value="text">text</a-select-option>
            <a-select-option value="ghost">ghost</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item label="形状">
        <a-select
            ref="select"
                v-model:value="element.shape" 
                style="width: 120px"
            >
             <a-select-option value="default">default</a-select-option>
            <a-select-option value="circle">circle</a-select-option>
            <a-select-option value="round">round</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item label="危险">
        <a-switch v-model:checked="element.danger" />
    </a-form-item>
    <a-form-item label="Loading">
        <a-switch v-model:checked="element.loading" />
    </a-form-item>
    <a-form-item label="大小">
        <a-select
            ref="select"
                v-model:value="element.size" 
                style="width: 120px"
            >
             <a-select-option value="large">large</a-select-option>
            <a-select-option value="middle">middle</a-select-option>
            <a-select-option value="small">small</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item label="宽">
      <a-input v-model:value="styleItems['width']" />
    </a-form-item>
    <a-form-item label="高">
      <a-input v-model:value="styleItems['height']" />
    </a-form-item>
<!--     <a-form-item label="背景色">
      <color-picker v-model:pureColor="styleItems['background-color']" pickerType="chrome" format="rgb" shape="square"/>
    </a-form-item> -->
    <a-form-item label="上边距">
      <a-input v-model:value="styleItems['margin-top']" />
    </a-form-item>
    <a-form-item label="下边距">
      <a-input v-model:value="styleItems['margin-bottom']" />
    </a-form-item>
    <a-form-item label="左边距">
      <a-input v-model:value="styleItems['margin-left']" />
      <area-chart-outlined />
    </a-form-item>
    <a-form-item label="右边距">
      <a-input v-model:value="styleItems['margin-right']" />
    </a-form-item>
  </a-form>
</template>

<style scoped>
</style>
