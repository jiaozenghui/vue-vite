<script setup lang="ts">
    import { ref } from 'vue';
    import draggable from "vuedraggable";
    import { useRouter } from 'vue-router';
    import Layouts from "@/components/layouts/Layouts.vue"
    import {getCurrentInstance } from 'vue';
     const { proxy }: any = getCurrentInstance();
     const { push} = useRouter();
     defineProps({
        ItemInfo: {} as any
    })
    interface DataItem {
      title: string;
    }
    const list=ref([]) as any;
    const checkConf = ref({}) as any;
    
    const chooseDrggC = ref(false);
    
    function checkConfFn($event:any, element:any) {
      checkConf.value[element.idd]=ref(!checkConf.value[element.idd]);
      proxy.$ldrawer({confs: {
        visible:true,
        element: element
      }})
    }
    function preview() {
      window.localStorage.setItem('test', JSON.stringify(list._rawValue));
      
      push('/view/views')
    }
    </script>
    
    <template>
        <a-card :title="ItemInfo.title" :style="ItemInfo.styles" :bordered="ItemInfo.bordered">
            <draggable
            class="zone"
            :list="ItemInfo.list"
            item-key="idd"
            :group="{ name: 'comp', pull: '' }"
            :disabled="false" 
        >
            <template #item="{element}">
              <div class="drag-div" :style="element.styles"  :class="{actived:checkConf[element.idd]}" @click="checkConfFn($event, element)" v-if="element.comp_name == 'Layouts'">
                  <layouts :itemInfo="element"></layouts>
              </div>
            </template>
        </draggable>
        </a-card>
    </template>
    
    <style lang="less" scoped>
        .zone {
            min-height: 100px;
        }

        .ant-card {
            background: rgb(247 201 168 / 10%) !important;
            border: none !important;
            :deep(.ant-card-head-title) {
                color: #fff;
                padding: 10px 0;
            }
            :deep(.ant-card-body) {
                padding: 0 15px 15px;
            }
            :deep(.ant-card-head) {
                border: none !important;
                padding: 0 15px;
                min-height: 0;
            }
        }
    </style>
    