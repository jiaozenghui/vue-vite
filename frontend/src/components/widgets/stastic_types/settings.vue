<script setup lang="ts">
    import { reactive, toRaw } from 'vue';
    import type { UnwrapRef } from 'vue';
    import {ColorPicker} from "vue3-colorpicker";
    import { toRefs } from 'vue'
    import "vue3-colorpicker/style.css";
        const props = defineProps({
            element: {} as any
        })
        const labelCol= { style: { width: '60px' } };
        const wrapperCol= { span: 14 };
    
    </script>
    
    <template>
      <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="选择视图">
        <a-select
            ref="select"
                v-model:value="element.type" 
                style="width: 120px"
            >
             <a-select-option value="default">页面1</a-select-option>
            <a-select-option value="primary">页面2</a-select-option>
        </a-select>
    </a-form-item>

      </a-form>
    </template>
    
    <style scoped>
    </style>
    