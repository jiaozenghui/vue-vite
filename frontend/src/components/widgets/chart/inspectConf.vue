<script setup lang="ts">
import {getCurrentInstance, ref } from 'vue';
const {
  proxy: { $nextTick, $forceUpdate },
}: any = getCurrentInstance();
const { proxy }: any = getCurrentInstance();
    defineProps({
        ItemInfo: {} as any
    })
const value = ref('请选择');
let treeData = ref([
  {
    title: '本机容器',
    key: '0-0',
    children: [
      {
        title: '虚拟设备',
        key: '0-0-0',
        children: [
          { title: 'ping', key: '0-0-0-0', inspctps: [
              {label: 'Ping 192.168.1', value: '192.168.1', idd: '1',
                m_indicators: [
                  {label: '服务器成功率', value: 'server_success_rate', idd: '1'},
                  {label: '平均响应时间(s)', value: 'avarage_res', idd: '2'},
                  {label: '抖动s', value: 'vibrate', idd: '3'}
                ]
              },
              {label: 'Ping 192.168.2', value: '192.168.2', idd: '2',
                m_indicators: [
                  {label: 'SDR类型()', value: 'server_success_rate', idd: '1'},
                  {label: '传感器类型()', value: 'avarage_res', idd: '2'},
                  {label: '传感器名称()', value: 'vibrate', idd: '3'}
                ]
              },
              {label: 'Ping 192.168.3', value: '192.168.3', idd: '3'},
              {label: 'Ping 192.168.4', value: '192.168.4', idd: '4'},
              {label: 'Ping 192.168.5', value: '192.168.5', idd: '5'},
              {label: 'Ping 192.168.6', value: '192.168.6', idd: '6'},
              {label: 'Ping 192.168.7', value: '192.168.7', idd: '7'},
              {label: 'Ping 192.168.8', value: '192.168.8', idd: '8'},
              {label: 'Ping 192.168.9', value: '192.168.10.8', idd: '9'},
              {label: 'Ping 191.168.1', value: '191.168.1', idd: '10'},
              {label: 'Ping 191.168.2', value: '191.168.2', idd: '11'},
              {label: 'Ping 191.168.3', value: '191.168.3', idd: '12'},
              {label: 'Ping 191.168.1', value: '191.168.1', idd: '13'},
              {label: 'Ping 191.168.2', value: '191.168.2', idd: '14'},
              {label: 'Ping 191.168.3', value: '192.168.3', idd: '15'}
          ]},
          { title: 'url', key: '0-0-0-1', inspctps:[] },
        ],
      },
      {
        title: '服务器硬件',
        key: '0-0-1',
        children: [
          { key: '0-0-1-0', title: '云打印服务器-硬件' },
          { key: '0-0-1-1', title: 'B0629虚拟化服务器HPE DL580G9' }
      ],
      },
    ],
  }
]);
let inspctps = ref([]);
let visible = ref(false)

function hide() {
  visible.value = false;
};

function selecNode(keys:any,{ expanded, node }:any) {
  init();
  inspctps.value = node.inspctps
}

  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  
  let Pcheck:any = ref({});
  function checkInspectP(item:any) {
    if (Pcheck.value[item.idd]) return;
    Pcheck.value ={};
    Pcheck.value[item.idd] = true;

    m_indicators.value = item.m_indicators;
    m_indicatorCheck.value = {};
  }
  const m_indicators:any= ref([]);

  let m_indicatorCheck:any = ref({});
  function checkIndicator(item:any) {
    if (m_indicatorCheck.value[item.idd]) return;
    m_indicatorCheck.value ={};
    m_indicatorCheck.value[item.idd] = true;
    inspectValue.value = item.value;

    hide();
  }
  function init() {
    inspctps.value = [];
    m_indicators.value = [];
    Pcheck.value ={};
    m_indicatorCheck.value ={};

  }
  function inspectClick() {
    //!visible.value && init();
  }
  let inspectValue:any = ref('请选择');
</script>

<template>
<div class="drop-dwon-container">
  <a-popover class="pop"  v-model:visible="visible" placement="bottomRight" title="" trigger="click">
      <template #content>
        <div class="menu">
          <div class="group-title">
            <p>组</p>
            <p>监测点</p>
            <p>指标</p>
          </div>
          <div class="content">
            <div class="menu-item">
              <a-tree v-model:expandedKeys="expandedKeys" :tree-data="treeData" @select="selecNode">
                <template #title="{ key: treeKey, title }">
                  <a-dropdown :trigger="['contextmenu']">
                    <span>{{ title }}</span>
                    <template #overlay>
                      <a-menu >
                        <a-menu-item key="1">1st menu item</a-menu-item>
                        <a-menu-item key="2">2nd menu item</a-menu-item>
                        <a-menu-item key="3">3rd menu item</a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </template>
              </a-tree>
            </div>
            <div class="menu-item">
              <ul class="liitem">
                <li v-for="item in inspctps" @click="checkInspectP(item)" :class="{actived:Pcheck[item.idd]}"  :key="item.idd">
                  {{item.label}}
                </li>
              </ul>
            </div>
            <div class="menu-item">
              <ul class="liitem">
                <li v-for="item in m_indicators"  @click="checkIndicator(item)" :class="{actived:m_indicatorCheck[item.idd]}"  :key="item.idd">
                  {{item.label}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <a-button @click="inspectClick()" class="inspect-chose">{{inspectValue}}</a-button>
    </a-popover>
</div>
  
</template>

<style lang="less" >
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background-color: #99a9bf;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: #d3dce6;
}

.ant-popover-inner {
  background: #333 !important;
  color: #fff;
  padding: 10px;
}
.ant-popover-inner-content {
  padding: 0px 16px 10px;
}
.ant-tree {
  background: transparent !important;
  color: #fff;
}
.menu {
    height: 300px;
    width: 500px;
    background: #333;
    color: #fff;
    .content {
      display: flex;
      justify-content: space-around;
      border:1px solid rgb(223, 207, 207);
    }

    .group-title {
      display: flex;
      justify-content: space-around;
    }
      .menu-item {
        width: 33%;
        height: 280px;
        background: transparent;
        overflow: auto;
        border-right: 1px solid rgb(223, 207, 207);
        &:last-child {
          border: none;
        }
        .liitem{
          li {
            padding: 2px 8px;
            &:hover, &:focus, &.actived {
              background: rgb(126, 109, 109);
              cursor: pointer;
            }
          }
        }

    }

}
.inspect-chose {
      width: 180px;
      background: none !important;
      color: #fff;
    }
</style>
