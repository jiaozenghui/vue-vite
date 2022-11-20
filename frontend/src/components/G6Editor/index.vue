<script setup lang="ts">
    import axios from "axios";
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;
    import G6Zone from "@/components/G6Zone/index.vue";
    import ToolBar from "@/components/ToolBar/index.vue";
    import NodePanel from "@/components/NodePanel/index.vue";

    const { proxy }: any = getCurrentInstance();
    defineProps({
        height: {
            type: Number,
            default: document.documentElement.clientHeight - 42
        },
        width: {
            type: Number,
            default: document.documentElement.clientWidth
        },
        data: {
            type: Object,
            default: {}
        }
    });

    onMounted(()=>{       
      $nextTick(()=>{
      })
      $forceUpdate();
    })
    function layClick(e:any, element:any) {

      proxy.$ldrawer({confs: {
        element: element,
        dataChange: function(data:any) {
        }
      }}).show();
      e = e|| window.event;
      e.stopPropagation();
      
    }
    </script>
    
    <template>
        <div class="editor">
            <tool-bar></tool-bar>
            <div class="graph-content">
                <node-panel></node-panel>
                <g6-zone :height="height" :width="width"  :data="data"></g6-zone>
            </div>           
        </div>
    </template>
    
    <style lang="less">
        .editor {
            position: relative;
            width: 100%;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
        .graph-content {
            position: relative;
        }
    </style>
    