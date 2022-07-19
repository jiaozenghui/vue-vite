<script setup lang="ts">
import { ref } from 'vue';
import create from "./../../utils/create"
import LeftSide from "./../../components/LeftSide.vue"
import draggable from "vuedraggable";

import Layouts from "@/components/layouts/Layouts.vue"

interface DataItem {
  title: string;
}
const list=ref([]);
const checkConf = ref({}) as any;
function addbtn(item) {
    create(button,{title: item.title});
}
const chooseDrggC = ref(false);
function checkConfFn ($event:any, idd:any) {
  checkConf.value[idd]=ref(!checkConf.value[idd])
}
</script>

<template>
  <div class="main-content">
    <div class="content">
        <draggable
            class="zone"
            :list="list"
            item-key="idd"
            group="comp"
        >
            <template #item="{element}">
              <div class="drag-div" :class="{actived:checkConf[element.idd]}" @click="checkConfFn($event, element.idd)" v-if="element.comp_name == 'Layouts'">
                  <layouts :itemInfo="element"></layouts>
              </div>
            </template>
        </draggable>
            <p class="emptyInfo" v-if="list.length <=0">Please drag one layout first in here</p>
    </div>
    <div class="right-side"></div>
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
