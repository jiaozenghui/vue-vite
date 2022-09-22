<script setup lang="ts">
    import {getCurrentInstance, ref } from 'vue';
    import Layouts from "@/components/layouts/Layouts.vue"
    const { proxy }: any = getCurrentInstance();

     const list = ref(JSON.parse(window.localStorage.getItem('big') as any)) as any; 
    </script>
    
    <template>
        <div  v-for="element in list" :style="element.styles"   >
            <layouts :itemInfo="element"></layouts>
        </div>
    </template>
    
    <style lang="less">
        .main-view {
            flex: auto;
            .ant-row {
                border: none !important;
                .ant-col {
                    border-right: none !important;
                }
            }
        }
    </style>
    