<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import { useRouter } from 'vue-router';
import Layouts from "@/components/layouts/Layouts.vue"
import {getCurrentInstance } from 'vue';
import { func } from 'vue-types';
 const { proxy }: any = getCurrentInstance();
 const { push} = useRouter();

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
  }}).show();
  $event = $event|| window.event;
  $event.stopPropagation();
}
function preview() {
  window.localStorage.setItem('test', JSON.stringify(list._rawValue));
  
  push('/view/views')
}
function bigPreview() {
  window.localStorage.setItem('big', JSON.stringify(list._rawValue));
  
  push('/view/big/views')
}
const pageObj = ref({
    comp_name: 'LZone',
    styles: {}
  }) as any;
function changebg(e:any, element:any) {
  window.localStorage.setItem('big-bg-style', JSON.stringify(pageObj._rawValue));
      proxy.$ldrawer({confs: {
        idd: 'zone1',
        element: element
      }}).show();
      e = e|| window.event;
      e.stopPropagation();
}

</script>

<template>
  <div class="main-content" id="main-content">
    <a-button style="position: absolute;right: 80px;top: 6px;" @click="bigPreview()">大屏预览</a-button>
    <a-button style="position: absolute;right: 0;top: 6px;" @click="preview()">预览</a-button>
    <div class="content">
        <draggable
            class="zone"
            :list="list"
            item-key="idd"
            :style="pageObj.styles"
            @click="changebg($event,pageObj)"
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
    <div id="set-container" class="right-side">
    </div>
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
        min-height: calc(100vh - 80px);
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
        position: relative;

    }
  }
</style>
