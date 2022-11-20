<script setup lang="ts">
    import axios from "axios";
    import G6 from '@antv/g6';
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;

    let graph:any;
    const props = defineProps({
        height: {
            type: Number,
            default: document.documentElement.clientHeight
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
    function init() {
      const height =  props.height
      const width =  props.width

      graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu"
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"]
        }
      });


      readData();
    }
    function readData() {
      if (props.data) {
        graph.read(props.data);
      }
    }


    onMounted(()=>{
        debugger
      init();  
      $nextTick(()=>{
      })
      $forceUpdate();
    })

    </script>
    
    <template>
        <div id ="graph-container"></div>
    </template>
    
    <style lang="less">
        #graph-zone {

        }
    </style>
    