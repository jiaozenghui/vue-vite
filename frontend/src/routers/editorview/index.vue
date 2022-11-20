<script setup lang="ts">
    import axios from "axios";
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;
    import G6Editor from "@/components/G6Editor/index.vue";

    const data = ref({"nodes":[{"id":"node2","size":30,"label":"2","x":694.8909996890718,"y":-75.46208346288677,"type":"node"},{"name":"背景图片节点","label":"背景图片节点","size":["170","34"],"type":"node","x":401.40938271604944,"y":336.8627160493826,"shape":"customNode","color":"#1890ff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","stateImage":"/static/img/ok.463ab0e4.svg","backImage":"/static/img/bg.9a8b47e5.jpg","inPoints":[[0,0.5]],"outPoints":[[1,0.5]],"offsetX":68,"offsetY":17,"id":"node2"},{"name":"双输出节点","label":"双输出节点","size":["170","34"],"type":"node","x":-42.04246913580255,"y":34.29580246913579,"shape":"customNode","color":"#1890ff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","stateImage":"/static/img/ok.463ab0e4.svg","inPoints":[[0,0.5]],"outPoints":[[1,0.4],[1,0.6]],"offsetX":58,"offsetY":18,"id":"node9"},{"name":"双输出节点","label":"双输出节点","size":["170","34"],"type":"node","x":-185.61975308641973,"y":415.6864197530865,"shape":"customNode","color":"#1890ff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","stateImage":"/static/img/ok.463ab0e4.svg","inPoints":[[0,0.5]],"outPoints":[[1,0.4],[1,0.6]],"offsetX":80,"offsetY":19,"id":"node79"},{"name":"大型节点","label":"大型节点","size":["340","34"],"type":"node","x":645.7165432098765,"y":90.02913580246914,"shape":"customNode","color":"#1890ff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","stateImage":"/static/img/ok.463ab0e4.svg","inPoints":[[0,0.5]],"outPoints":[[1,0.5]],"offsetX":68,"offsetY":15,"id":"node88"}],"edges":[{"id":"edge49","source":"node9","target":"node2","sourceId":"node9","targetId":"node2","start":{"x":-17,"y":17},"end":{"x":0,"y":-17},"shape":"customEdge","type":"edge","startPoint":{"x":-16.393903284436938,"y":51.79580246913579},"endPoint":{"x":375.7608168646838,"y":319.3627160493826}},{"id":"edge206","source":"node9","target":"node79","sourceId":"node9","targetId":"node79","start":{"x":17,"y":17},"end":{"x":0,"y":-17},"shape":"customEdge","type":"edge","startPoint":{"x":-48.63047197401902,"y":51.79580246913579},"endPoint":{"x":-179.03175024820325,"y":398.1864197530865}}],"groups":[]})

    onMounted(()=>{       
      $nextTick(()=>{
      })
      $forceUpdate();
    })

    </script>
    
    <template>
        <div >
            <g6-editor :data="data"></g6-editor>
        </div>
    </template>
    
    <style lang="less">
        #graph {
          position: relative;
          height: calc(100vh - 200px);
        }
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
    