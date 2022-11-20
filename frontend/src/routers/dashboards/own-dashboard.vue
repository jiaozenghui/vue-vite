<script setup lang="ts">
    import {getCurrentInstance, ref } from 'vue';
    import Layouts from "@/components/layouts/Layouts.vue"
    import PageLayout from "@/components/PageLayout/index.vue"
    const { proxy }: any = getCurrentInstance();

     const list = ref(JSON.parse(window.localStorage.getItem('test') as any)) as any; 
     const pageLayout = ref('pgl1');
     const pageLayoutType = ref('edit');

     const pageLayouts = ref([
      { value: 'pgl1', label: '页面1' },
      { value: 'pgl2', label: '页面2' },
      { value: 'pgl3', label: '页面3' },
    ]);
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const handleBlur = () => {
      console.log('blur');
    };
    const handleFocus = () => {
      console.log('focus');
    };
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    </script>
    
    <template>
        <div class="main-content" id="main-content">
            <div class="sitch-page">
                <a-select
                    v-model:value="pageLayout"
                    show-search
                    placeholder="Select a person"
                    style="width: 200px"
                    :options="pageLayouts"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                ></a-select>
            </div>
            <div class="page-layout">
                <page-layout v-if="pageLayout" :page-type="pageLayoutType" :id="pageLayout"></page-layout>
            </div>
        </div>
    </template>
    
    <style lang="less">
        .sitch-page {
            display: flex;
            align-items: center;
            height: 60px;
            padding: 20px;
            background-color: #00040D !important;
            border-bottom: 1px solid #3A4249 !important;
        }
        .page-layout {
            background-color: #00040D !important;
        }

    </style>
    