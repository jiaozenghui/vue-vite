<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";

import Layouts from "@/components/layouts/Layouts.vue"
import {getCurrentInstance } from 'vue';
 const { proxy }: any = getCurrentInstance();

interface DataItem {
  title: string;
}
const list=ref([]);
const checkConf = ref({}) as any;

const chooseDrggC = ref(false);

function checkConfFn($event:any, element:any) {
  checkConf.value[element.idd]=ref(!checkConf.value[element.idd]);
  proxy.$ldrawer({confs: {
    visible:true,
    element: element
  }})
}
</script>

<template>
  <div class="main-content" id="main-content">
    <div class="content">
        <draggable
            class="zone"
            :list="list"
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
            <p class="emptyInfo" v-if="list.length <=0">Please drag one layout first in here</p>
    </div>
    <div id="set-container" class="right-side"></div>
  </div>
</template>

<style lang="less" scoped>
  .main-content {
    display: flex;
    .left-side {
        flex: 0 0 260px;
    }
    .content {
        flex: 1 1 auto;
        border: 2px dashed #eee;
        background: rgb(215, 216, 214);
        height: calc(100vh - 80px);
        box-sizing: border-box;
        .emptyInfo {
            position: absolute;
            top: 50%;
            text-align: center;
            width: calc(100% - 4px);
            transform: translateY(-50%);
            color: #b2aaaa;
            font-size: 16px;
        }
    }
    .right-side {
        flex: 0 0 auto;
    }
  }
</style>
