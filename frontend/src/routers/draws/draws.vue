<script setup lang="ts">
import { ref } from 'vue';
import create from "./../../utils/create"
import button from "../../components/buttons/Button.vue"
import LeftSide from "./../../components/LeftSide.vue"
import draggable from "vuedraggable";

import Layouts from "@/components/layouts/Layouts.vue"

interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const list=ref([]);
function addbtn(item) {
    create(button,{title: item.title});
}
const chooseDrggC = ref(false);

</script>

<template>
  <div class="main-content">
    <div class="left-side">
      <left-side></left-side>
    </div>
    <div class="content">
        <draggable
            class="zone"
            :list="list"
            item-key="idd"
            :group="{ name: 'comp', pull: '' }"
            :disabled="false" 
        >
            <template #item="{element}">
              <div class="drag-div" :class="{actived:chooseDrggC}" @click="chooseDrggC=!chooseDrggC" v-if="element.comp_name == 'Layouts'">
                  <layouts   :itemInfo="element"></layouts>
              </div>
            </template>
        </draggable>
            <p class="emptyInfo">Please drag one layout first</p>
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
        padding: 10px;
        background: rgb(215, 216, 214);
        height: calc(100vh - 118px);
        .zone {
          background: #fff;
          height: 100%;
          position: relative;
          .emptyInfo {
              position: absolute;
              top: 50%;
              text-align: center;
              width: 100%;
              transform: translateY(-50%);
              color: #b2aaaa;
              font-size: 16px;
          }
          .drag-div {
            &:hover {
              border: 1px dashed @antPromaryCorlor;
            }
            &:focus, &:active, &.actived {
              border: 1px solid @antPromaryCorlor;
            }
          }
        }
    }
    .right-side {
        flex: 0 0 auto;
    }
  }
</style>
