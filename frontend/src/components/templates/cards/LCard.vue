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
    const changeData = (e:any) => {
        
    }
    defineExpose({
        changeData,
    })
    </script>
    
    <template>
        <a-card class="border" :title="ItemInfo.title" :style="ItemInfo.styles" :bordered="ItemInfo.bordered">
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
        .border {
            border: 1px solid #0bc4e9 !important;
            background: rgba(0,72,115,0.28) !important;
            &:hover{
                box-shadow:-5px 0px 2px rgba(255,255,255,0.1), 0px 5px 2px rgba(255,255,255,0.1);
                background: rgba(255,255,255,0.1);
                &::before{
                    width: 0%;
                }
                &::after{
                    height: 0%;
                }
            }
            &::before {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: calc(100% + 2px);
                    bottom: -1px;
                    top: -1px;
                    left: 10%;
                    border-bottom: 1px solid #007297;
                    border-top: 1px solid #007297;
                    transition: all 0.5s;
                }
                &::after {
                    content: '';
                    position: absolute;
                    width: calc(100% + 2px);
                    height: 80%;
                    left: -1px;
                    right: -1px;
                    top: 10%;
                    border-left: 1px solid #007297;
                    border-right: 1px solid #007297;
                    transition: all 0.5s;
                }

        }
    </style>
    