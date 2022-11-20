<script setup lang="ts">
import { ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import {ColorPicker} from "vue3-colorpicker";
import { toRefs } from 'vue'
import "vue3-colorpicker/style.css";
import axios from "axios";
    const props = defineProps({
        styleItems: {} as any,
        colStyleItems: {} as any,
        element: {} as any
    })
    const {styleItems, colStyleItems} = toRefs(props);
    const labelCol= { style: { width: '60px' } };
    const wrapperCol= { span: 14 };

    const loadData = () => {
      axios.get(props.element.ajaxUrl).then((res:any) => {
        emits('change', {type: 'data_change', data:res})
      })
    }
    const emits = defineEmits<{
      (e: 'change', data: any): void
    }>()

    function exportData() {
      loadData()
    }
    function typeChange(type:any) {
      emits('change', {type: 'type_change', data: type})
    }
</script>

<template>
  <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="标题">
      <a-input v-model:value="element['title']" />
    </a-form-item>
    <a-form-item label="类型">
        <a-select
            ref="select"
            v-model:value="element['chart_type']" 
            style="width: 120px"
            @change="typeChange($event)"
        >
             <a-select-option value="line">线形图</a-select-option>
            <a-select-option value="circle">饼图</a-select-option>
            <a-select-option value="interval">横柱图</a-select-option>
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
    <a-form-item label="数据">
      <a-input v-model:value="element['ajaxUrl']" />    <a-button @click="exportData()">导入数据</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
</style>
