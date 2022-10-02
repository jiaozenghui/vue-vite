<script setup lang="ts">
    import draggable from "vuedraggable";
    import { reactive, ref } from 'vue';
    import { useStore } from "vuex";
    import LButton from "@/components/basics/lbuttons/LButton.vue";
    import LIcon from "@/components/basics/licons/LIcon.vue";
    import LForm from "@/components/templates/forms/LForm.vue";
    import LInput from "@/components/basics/linputs/LInput.vue";
    import LTabel from "@/components/templates/tables/LTabel.vue";
    import LChart from "@/components/charts/echarts/LChart.vue";
    import LCard from "@/components/templates/cards/LCard.vue";
    import {getCurrentInstance, ComponentInternalInstance } from 'vue';
     
    const { proxy }: any = getCurrentInstance();
        defineProps({
            itemInfo: {} as any
        });
        const store = useStore();
        const state = reactive<{
          gutters: { [key: number]: number };
          colCounts: { [key: number]: number };
          vgutters: { [key: number]: number };
        }>({
          gutters: {},
          colCounts: {},
          vgutters: {},
        });
        [0, 8, 16, 24, 32, 40, 48].forEach((value: number, i: number) => {
          state.gutters[i] = value;
        });
        [0, 8, 16, 24, 32, 40, 48].forEach((value, i) => {
          state.vgutters[i] = value;
        });
        [1, 2, 3, 4, 6, 8, 12].forEach((value, i) => {
          state.colCounts[i-1] = value;
        });
        const conf_c:any = ref({
          LButton: LButton,
          LIcon:LIcon,
          LForm:LForm,
          LInput:LInput,
          LTabel:LTabel,
          LChart: LChart,
          LCard:LCard
        })
        let checkConf = ref({}) as any;
        function checkForResize(e:any) {
          if(e.comp_name == 'LChart') {
            
          }
          if (e.comps) {
    
          }
        }
        function layClick(e:any, element:any) {
          checkConf.value[element.idd]=ref(!checkConf.value[element.idd]);
          proxy.$ldrawer({confs: {
            visible:true,
            element: element
          }})
          e = e|| window.event;
          e.stopPropagation();
          
        }
    </script>
    
    <template>
        <a-row :style="{'min-height': itemInfo.styles['min-height']}"  :gutter="[state.gutters[0], state.vgutters[0]]">
          
          <a-col
            v-for="col in itemInfo.cols"
            :key="col.idd"
            :span="col.span"
          >
            <draggable :list="col.comps" :disabled="false"  group="comp" item-key="idd" :style="itemInfo.col_styles"  class="colDraggable">
                <template #item="{element}">
                  <div class="drag-div" :class="{actived:checkConf[element.idd]}" @click="layClick($event,element)" v-if="element.comp_name == 'Layouts'">
                      <layouts :itemInfo="element"></layouts>
                  </div>
                    <component
                        v-else
                        :key="element.idd"
                        :is="conf_c[element.comp_name]"
                        :ItemInfo="element"
                        @click="layClick($event, element)"
                    ></component>
                </template>
            </draggable>
          </a-col>
        </a-row>
    </template>
    
    <style lang="less" scoped>
    .ant-row {
        height: 100%;
        border: 1px dashed rgb(241, 238, 238);
        :deep(.ant-col) {
            background: transparent;
            border-right: 1px dashed rgb(238, 235, 235);
            &:last-child {
                border-right: none;
            }
            .drag-div {
              width: 100%;
            }
            .colDraggable {
              height: 100%;
              width: 100%;
            }
        }
    }
    </style>
    