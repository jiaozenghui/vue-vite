<template>
  <a-form
    class="custom-form"
    ref="formRef"
    name="dynamic_form_nest_item"
    :label-col="{ style: { width: ItemInfo.labelWidth} }"
    :wrapper-col="{style: { width: ItemInfo.wrapperWidth} }"
    :model="ItemInfo"
    @finish="onFinish"
    :style="ItemInfo.styles"
  >
    <a-space
      v-for="(item, index) in ItemInfo.items"
      :key="item.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['sights', index, 'value']"
        :rules="{
          required: true,
          message: 'Missing sight',
        }"
      >
      <template  #label>
        <a-input
          v-model:value="item.label"
          :bordered="false"
          style="text-overflow: ellipsis;"
          placeholder="edit title here" />
      </template>

      <draggable :list="item.controls" :disabled="false"  group="comp" item-key="idd"  class="colDraggable">
          <template #item="{element}">
                <component
                    :key="element.idd"
                    :is="conf_c[element.comp_name]"
                    :ItemInfo="element"
                    @click="layClick($event, element)"
                ></component>
          </template>
      </draggable>
      <p class="empty_tip" style="" v-if="item.controls.length <=0">drag one control here</p>
      </a-form-item>
      <MinusCircleOutlined v-if="ItemInfo.items.length > 1" @click="removeSight(item)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addSight">
        <PlusOutlined />
        Add sights
      </a-button>
    </a-form-item>
    <a-form-item>
      <footer :style="{'text-align': ItemInfo.footAlign}">
        <draggable :list="ItemInfo.footers" :disabled="false"  group="comp" item-key="idd"  class="colDraggable">
            <template #item="{element}">
                  <component
                      :key="element.idd"
                      :is="conf_c[element.comp_name]"
                      :ItemInfo="element"
                      @click="layClick($event, element)"
                  ></component>
            </template>
          </draggable>
          <p class="empty_tip" style="" v-if="ItemInfo.footers.length <=0">edit footer here</p>
      </footer>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, watch, getCurrentInstance } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import LButton from "@/components/basics/lbuttons/LButton.vue";
import LIcon from "@/components/basics/licons/LIcon.vue";
import LInput from "@/components/basics/linputs/LInput.vue";
import draggable from "vuedraggable";
interface Sights {
  value: string;
  price: string;
  id: number;
}
export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    LButton,
    LIcon,
    LInput,
    draggable
  },
  props:{
      ItemInfo: {} as any
  },
  setup(props:any) {
    const { proxy }: any = getCurrentInstance();
    const areas = [
      { label: 'Beijing', value: 'Beijing' },
      { label: 'Shanghai', value: 'Shanghai' },
    ];

    const sights = {
      Beijing: ['Tiananmen', 'Great Wall'],
      Shanghai: ['Oriental Pearl', 'The Bund'],
    };
    const conf_c:any = ref({
      LButton: LButton,
      LIcon:LIcon,
      LInput:LInput
    })
    const formRef = ref<FormInstance>();
    const dynamicValidateForm = reactive<{ sights: Sights[]; area: string }>({
      sights: [],
      area: undefined,
    });
    watch(
      () => dynamicValidateForm.area,
      () => {
        dynamicValidateForm.sights = [];
      },
    );
    const removeSight = (item: Sights) => {
      let index = props.ItemInfo.items.indexOf(item);
      if (index !== -1) {
        props.ItemInfo.items.splice(index, 1);
      }
    };
    const layClick=(e:any, element:any)=> {
      proxy.$ldrawer({confs: {
        visible:true,
        element: element
      }})
      e = e|| window.event;
      e.stopPropagation();
    }
    const addSight = () => {
      props.ItemInfo.items =props.ItemInfo.items? props.ItemInfo.items:[];
      props.ItemInfo.items.push({
        value: undefined,
        price: undefined,
        id: Date.now(),
        controls: []
      });
    };
    const onFinish = values => {
      console.log('Received values of form:', values);
      console.log('dynamicValidateForm:', dynamicValidateForm);
    };
    props.ItemInfo.footers= [];
    addSight();
    return {
      formRef,
      dynamicValidateForm,
      onFinish,
      removeSight,
      addSight,
      areas,
      sights,
      conf_c,
      layClick
    };
  },
});
</script>
<style lang="less" scoped>
.custom-form {
    min-width: 400px;
    border: 1px dashed #dcd4d4;
    padding: 30px;
}
:deep(.ant-form-item-control-input-content) {
  position:relative;
}
:deep(.ant-row) {
  .ant-col {
    border: none !important;
  }
  
}
.empty_tip {
  position: absolute;
  top: 3px;
  color: #c1b5b5;
}
  .colDraggable {
    min-height: 30px;
    min-width: 200px;
  }
  footer {
    position: relative;
    border: 1px dashed #ece4e4;
  }
</style>

