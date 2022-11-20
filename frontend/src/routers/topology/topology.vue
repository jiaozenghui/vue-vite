<script setup lang="ts">
    import axios from "axios";
    import * as d3 from 'd3';
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;
    import { req, baseURL } from '@/utils/base';
    import { setCookie } from '@/utils/cookie';
    import { addEvent } from '@/utils/event';
    import "d3-graphviz"

    let graph:any={};
    let main = ref();
    let spinShow = false;
    let CI_LAYER = 'ci_layer';
    let CI_GROUP = 'ci_group';
    let originciLayerList:any= [];
    let  originciGroupList:any= [];
    let  currentciGroup:any= [];
    let  currentciLayer:any= [];
    let  ciLayerList:any= [];
    let  ciGroupList:any= [];
    let originCITypesByLayerWithAttr:any= [];
    let ciTypesName:any= {};
    let currentStatus:any= ['created', 'dirty'];


    
    async function getInitGraphData () {
      spinShow = true
      let [ciResponse, _ciLayerList, _ciGroupList]:any = await Promise.all([
        req.get(`/ci-types?group-by=group&with-attributes=yes&status=${['created', 'dirty'].toString()}`),
        req.get(`/base-key/categories/${CI_LAYER}`),
        req.get(`/base-key/categories/${CI_GROUP}`),
        //getAllCITypesByLayerWithAttr(['created', 'dirty']),
        //getEnumCodesByCategoryId(CI_LAYER),
        //getEnumCodesByCategoryId(CI_GROUP)
      ])
      if (ciResponse.statusCode === 'OK' && _ciLayerList.statusCode === 'OK' && _ciGroupList.statusCode === 'OK') {
        originciLayerList = _ciLayerList.data
        originciGroupList = _ciGroupList.data
        originCITypesByLayerWithAttr = ciResponse.data
        // currentciGroup = originciGroupList.map(item => item.codeId)
        currentciGroup =
          currentciGroup.length > 0 ? currentciGroup : originciGroupList.map((item:any) => item.codeId)
        currentciLayer = currentciLayer.length > 0 ? currentciLayer : [_ciLayerList.data[0].codeId]

        // 初始化自动填充数据
        let allCiTypesWithAttr:any = []
        let allCiTypesFormatByCiTypeId = {}
        ciResponse.data.forEach((layer:any) => {
          layer.ciTypes &&
            layer.ciTypes.forEach((_:any )=> {
              ciTypesName[_.ciTypeId] = _.name
              allCiTypesWithAttr.push(_)
              allCiTypesFormatByCiTypeId[_.ciTypeId] = _
            })
        })
        allCiTypesWithAttr = allCiTypesWithAttr
        allCiTypesFormatByCiTypeId = allCiTypesFormatByCiTypeId

        newInitGraph()
      }
    }
    async function newInitGraph () {
      let graph1:any;
      const graphEl:any = document.getElementById('graph');
      const initEvent = () => {
        graph1 = d3.select('#graph');
        graph1
          .on('dblclick.zoom', null)
          .on('wheel.zoom', null)
          .on('mousewheel.zoom', null)

        graph['graphviz'] = graph1
          .graphviz({useWorker: true})
          .zoom(true)
          .fit(true)
          .height(window.innerHeight-30)
          .width(graphEl.offsetWidth)
          .attributer(function (d:any) {
            if (d.attributes.class === 'edge') {
              const keys = d.key.split('->')
              const from = keys[0].trim()
              const to = keys[1].trim()
              d.attributes.from = from
              d.attributes.to = to
            }

            if (d.tag === 'text') {
              const key = d.children[0].text
              //d3.select(this).attr('text-key', key)
            }
          })
      }
      initEvent()
      $nextTick(() => {
        renderGraph()
      })
    }
    function loadImage (nodesString:any) {
      ;(nodesString.match(/image=[^,]*(files\/\d*|png)/g) || [])
        .filter((value:any, index:any, self:any) => {
          return self.indexOf(value) === index
        })
        .map((keyvaluepaire:any) => keyvaluepaire.substr(7))
        .forEach((image:any) => {
          graph.graphviz.addImage(image, '48px', '48px')
        })
    }

    function renderGraph () {
      let nodesString = genDOT()
      loadImage(nodesString)
      graph.graphviz
        .on('initEnd', (e:any) => {
          e= e|| window.event
          graph.graphviz.renderDot(nodesString, ()=>{
            shadeAll()
            addEvent('svg', 'mouseover', (e:any) => {
              shadeAll()
              e.preventDefault()
              e.stopPropagation()
            })
            addEvent('.node', 'mouseover', handleNodeMouseover)
            addEvent('svg', 'mouseover', handleSvgMouseover)
          }).transition();

          //_this.addEvent('.node', 'click', handleNodeClick)
        })
      spinShow = false
    }


    async function handleNodeMouseover (e:any) {
      e.preventDefault()
      e.stopPropagation()
      d3.selectAll('g').attr('cursor', 'pointer')
      var g = e.currentTarget
      var nodeName = g.firstElementChild.textContent.trim()
      shadeAll()
      colorNode(nodeName)
    }

    function colorNode (nodeName:any) {
      d3.selectAll('g[from="' + nodeName + '"] path')
        .attr('stroke', 'red')
        .attr('stroke-opacity', '1')
      d3.selectAll('g[from="' + nodeName + '"] text').attr('fill', 'red')
      d3.selectAll('g[from="' + nodeName + '"] polygon')
        .attr('stroke', 'red')
        .attr('fill', 'red')
        .attr('fill-opacity', '1')
        .attr('stroke-opacity', '1')
      d3.selectAll('g[to="' + nodeName + '"] path')
        .attr('stroke', 'green')
        .attr('stroke-opacity', '1')
      d3.selectAll('g[to="' + nodeName + '"] text').attr('fill', 'green')
      d3.selectAll('g[to="' + nodeName + '"] polygon')
        .attr('stroke', 'green')
        .attr('fill', 'green')
        .attr('fill-opacity', '1')
        .attr('stroke-opacity', '1')
    }

    function handleSvgMouseover (e:any) {
      shadeAll()
      e.preventDefault()
      e.stopPropagation()
    }


    function genDOT () {
      const status = currentStatus
      const groups = currentciGroup
      const layers = currentciLayer
      const data = originCITypesByLayerWithAttr
      var groupSet = new Set(groups)
      var layerSet = new Set()
      var ciTypeSet = new Set()
      var statusSet = new Set(status)
      var refSet = new Set()
      var groupDot = '{ node[];'
      groups.forEach((group:any, index:any) => {
        if (index === groups.length - 1) {
          groupDot += '"' + group + '"[penwidth=0]}; '
        } else {
          groupDot += '"' + group + '"->'
        }
      })
      layers.forEach((layer:any) => {
        layerSet.add(layer.codeId)
      })
      var dot = ''
      var statusColors = new Map([
        ['created', 'black'],
        ['notCreated', 'green4'],
        ['dirty', 'dodgerblue'],
        ['deleted', 'firebrick3']
      ])
      dot =
        'digraph{bgcolor="transparent";ranksep=1.1;nodesep=.7;size="11,8";rankdir=TB\nNode [fontname=Arial, shape="ellipse", fixedsize="true", width="1.1", height="1.1", color="transparent" ,fontsize=12];\nEdge [fontname=Arial, minlen="1", color="#7f8fa6", fontsize=10];\n'
      data.forEach((dataGroup:any) => {
        if (groupSet.has(dataGroup.codeId)) {
          dot +=
            '{rank=same;\n"' +
            dataGroup.codeId +
            '"[id="' +
            dataGroup.codeId +
            '";class="group";label="' +
            dataGroup.value +
            '";tooltip="' +
            dataGroup.value +
            '"];\n'
          dataGroup.ciTypes.forEach((ciType:any) => {
            if (
              layerSet.has(ciType.codeId) &&
              statusSet.has(ciType.status) &&
              currentciLayer.includes(ciType.ciLayer)
            ) {
              dot +=
                '"' +
                ciType.ciTypeId +
                '"[id="' +
                ciType.ciTypeId +
                '",label="' +
                ciType.name +
                '";tootip="' +
                ciType.description +
                '";class="ci";class="ci";' +
                'fontcolor="' +
                statusColors.get(ciType.status) +
                '";image="/wecmdb/fonts/' +
                ciType.imageFile +
                '";labelloc="b"]\n'
              ciTypeSet.add(ciType.ciTypeId)
              ciType.attributes.forEach(attr => {
                if (attr.inputType === 'ref' || attr.inputType === 'multiRef') {
                  refSet.add(attr)
                }
              })
            }
          })
          dot += '}\n'
        }
      })
      refSet.forEach((ref:any) => {
        if (ciTypeSet.has(ref.referenceId) && statusSet.has(ref.status)) {
          dot +=
            '"' +
            ref.ciTypeId +
            '"->"' +
            ref.referenceId +
            '"[taillabel="' +
            ref.referenceName +
            '";labeldistance=3;fontcolor="' +
            statusColors.get(ref.status) +
            '"]\n'
        }
      })
      dot += groupDot + '}'
      return dot
    }
    function shadeAll () {

      d3.selectAll('g path')
        .attr('stroke', '#7f8fa6')
        .attr('stroke-opacity', '.2')
      d3.selectAll('g polygon')
        .attr('stroke', '#7f8fa6')
        .attr('stroke-opacity', '.2')
        .attr('fill', '#7f8fa6')
        .attr('fill-opacity', '.2')
      d3.selectAll('.edge text').attr('fill', '#7f8fa6')
      d3.selectAll('g ellipse')
        .attr('stroke', 'transparent')
        .attr('fill-opacity', '.2')
    }
    onMounted(()=>{
        req.post(`/login`, {
            password: "YWRtaW4=",
            username: "admin"
        }).then((res:any)=>{
            const { statusCode, data } = res;
            if (statusCode === 'OK') {
                let localStorage = window.localStorage
                setCookie(data)
                getInitGraphData();
            }

           
        })
        
        $nextTick(()=>{
        })
        $forceUpdate();
    })

    </script>
    
    <template>
        <div >
            <div class="graph-container" ref="main" id="graph"></div>
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
    