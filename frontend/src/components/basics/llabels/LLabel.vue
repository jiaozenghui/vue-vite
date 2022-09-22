
<script setup lang="ts">
    import {getCurrentInstance } from 'vue';
    const { proxy }: any = getCurrentInstance();
        defineProps({
            ItemInfo: {} as any
        })
    </script>
    <template>
      <label :id="ItemInfo.idd" :style="ItemInfo.styles">
        {{ItemInfo.value}}
      </label>
    </template>
    <style lang="less" scoped>
        label {
            outline: 1px dashed rgb(191, 210, 220);
        }
    </style>