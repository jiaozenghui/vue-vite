<script setup lang="ts">
    import { reactive, toRaw } from 'vue';
    import type { UnwrapRef } from 'vue';
    import "vue3-colorpicker/style.css";
    import inspectConf from './inspectConf.vue'
    import {ColorPicker} from "vue3-colorpicker";
    import { toRefs } from 'vue'
    import "vue3-colorpicker/style.css";
    import axios from "axios";

        const props = defineProps({
            element: {
                reqParams: {},
                styles: {
                }
            } as any,
        })
        const labelCol= { style: { width: '60px' } };
        const wrapperCol= { span: 14 };
        const emits = defineEmits<{
            (e: 'change', data: any): void
        }>()
        const loadData = () => {
            axios.get(props.element.reqParams.ajaxUrl).then((res:any) => {
                debugger
                emits('change', {type: 'data_change', data:res})
            })
        }

        function exportData() {
            loadData()
        }

    </script>
    
    <template>
        <div class="conf-zone">
            <div class="zone-item">
                <p class="title">名称</p>
                <a-input v-model:value="element.reqParams['chart_name']" />
            </div>
            <div class="zone-item">
                <p class="title">背景色</p>
                <color-picker v-model:pureColor="element.styles['background-color']" pickerType="chrome" format="rgb" shape="square"/>
            </div>

            <div class="zone-item data-zone" style="margin-top:30px">
                <p class="title">数据配置</p>
            </div>
            <div class="zone-item">
                <p class="title">监控项</p>
                <inspect-conf></inspect-conf>
            </div>
            <div class="zone-item">
                <p class="title">时间范围</p>
            <a-select
                ref="select"
                    v-model:value="element.reqParams.time" 
                    style="width: 180px"
                >
                <a-select-option value="default">1小时</a-select-option>
                <a-select-option value="primary">2小时</a-select-option>
                <a-select-option value="dashed">4小时</a-select-option>
                <a-select-option value="link">半天</a-select-option>
                <a-select-option value="text">1天</a-select-option>
            </a-select>
            </div>
            <div class="zone-item">
                <a-input v-model:value="element.reqParams['ajaxUrl']" />    <a-button @click="exportData()">接入数据</a-button>
            </div>

            

        </div>

    </template>
    
    <style lang="less" scoped>
    :deep(.current-color) {
        border: 2px solid #eee;
    }
    .conf-zone {
        padding: 10px;
        width: 200px;
        .zone-item {
            margin: 10px 0;
        }
        .data-zone {
            font-size: 18px;
        }
        .title {
            color: #fff;
            margin-bottom: 5px;
        }
    }
    </style>
    