<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import type { UnwrapRef } from 'vue';
    import {ColorPicker} from "vue3-colorpicker";
    import { toRefs } from 'vue'
    import "vue3-colorpicker/style.css";
    import axios from "axios";
        const props = defineProps({
            styleItems: {} as any,
            element: {} as any
        })
        const {styleItems} = toRefs(props);
        const labelCol= { style: { width: '60px' } };
        const wrapperCol= { span: 14 };
        props.element['column_test']=ref(JSON.stringify(props.element.columns));

        function exportData() {
            loadData()
        }
        function columnChange() {
            props.element['column_test']&&emits('change', {type: 'column_change', data: props.element['column_test']})
        }
        const emits = defineEmits(['change']);
        const loadData = () => {
            axios.get(props.element.ajaxUrl).then((res:any) => {
                emits('change', {type: 'data_change', data:res})
            })
        }

    </script>
    
    <template>
      <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="width">
          <a-input v-model:value="styleItems['width']" />
        </a-form-item>
        <a-form-item label="wrapperWidth">
          <a-input v-model:value="element['wrapperWidth']" />
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
        <a-form-item label="表头">
            <a-textarea
                v-model:value="element['column_test']"
                placeholder=""
                :change="columnChange()"
                :auto-size="{ minRows: 3, maxRows: 55 }"
            />
        </a-form-item>
        <a-form-item label="数据">
            <a-input v-model:value="element['ajaxUrl']" />    <a-button @click="exportData()">导入数据</a-button>
        </a-form-item>
      </a-form>
    </template>
    
    <style scoped>
    </style>
    