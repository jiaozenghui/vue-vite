<template>
  <div :style="ItemInfo.styles">
    <a-table   :columns="ItemInfo.columns" :pagination="false" :data-source="ItemInfo.data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted  } from 'vue';
import type { TableProps, TableColumnType } from 'ant-design-vue';
import axios from "axios";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

let columns: TableColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

export default defineComponent({
  props:{
    ItemInfo: {} as any
  },
  setup(props) {
    onMounted(()=>{
      if (window.location.href.indexOf('view') >-1) {
        if (props.ItemInfo.ajaxUrl) {
          axios.get('./../../'+props.ItemInfo.ajaxUrl).then((res:any) => {
            let data = res.data.data;
            props.ItemInfo.data = data;
          })
        }
      }
    })
    const changeData = (e:any) => {
      if (e.type =="data_change") {
        let data = e.data.data.data;
        data.forEach((item:any, index:any)=>{
          item['key']= index;
        })
        props.ItemInfo['data'] = data;
      } else if (e.type =="column_change"){
        props.ItemInfo.columns = JSON.parse(e.data);
        columns = JSON.parse(e.data);
      }
    }
    return {
      columns,
      changeData
    };
  },
});
</script>
<style lang="less" scoped>
  :deep(.ant-table) {
    background: none;
  }
  :deep(.ant-table-thead > tr > th) {
    color: #61d2f7;
    background: none;
    font-weight: 600;
  }
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover) {
    background: none !important;
  }
  :deep(.ant-table-tbody > tr > td) {
      border-bottom: 1px dashed #404040;
      background: none !important;
      color: #fff !important;
  }
:deep(.ant-table-tbody > tr.ant-table-row:hover) {
  :deep(td) {
    background: none !important;
  }
  box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
  background: none;
  cursor: pointer;
}
</style>

