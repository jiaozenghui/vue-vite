<script setup lang="ts">
    import axios from "axios";
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;
    import LIcon from "@/components/basics/licons/LIcon.vue";
    const activeKey = ref(['1']);
    const icon_list = ref(["AreaChartOutlined","PieChartOutlined","BarChartOutlined","DotChartOutlined","LineChartOutlined","RadarChartOutlined","HeatMapOutlined","FallOutlined",]);
    onMounted(()=>{       
      $nextTick(()=>{
      })
      $forceUpdate();
    })

    </script>
    
    <template>
        <div class="itempannel">
            <a-collapse v-model:activeKey="activeKey">
                <a-collapse-panel key="1" header="文本">
                    <a-row  :gutter="16">
                        <a-col v-for="item in icon_list" :span="8" >
                            <p  class="icon-container" >
                                <l-icon   :key="item" :ItemInfo="{'type_value': item}"></l-icon>
                            </p>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="设备">
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="组" >
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="4" header="子拓扑图" >
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="5" header="区域" >
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                        <a-col :span="8">
                            <p>card content</p>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
        </a-collapse>
        </div>
    </template>
    
    <style lang="less">
        :deep(.ant-collapse-content-box ){
            padding: 0 16px 10px !important;
        }
        .itempannel {
            height: 100%;
            z-index: 2;
            background: #f7f9fb;
            width: 200px;
            padding-top: 8px;
            border-right: 1px solid #e6e9ed;
            position: absolute;
            .icon-container {
                font-size: 20px;
                border:1px solid #eee;
                text-align: center;
                margin-top: 10px;
            }
        }
    </style>
    