<script setup lang="ts">
    import {getCurrentInstance, ref } from 'vue';
    import Layouts from "@/components/layouts/Layouts.vue"
    import PageLayout from "@/components/PageLayout/index.vue"
    const { proxy }: any = getCurrentInstance();

    let visible = ref(false);

    const formState:any = ref({
      name: ''
    });

    let curPageLayout = ref({} as any);
    let pageList = window.localStorage.getItem('pages')? JSON.parse(window.localStorage.getItem('pages') as any): [];
     const list = ref(pageList) as any; 
     if (list.value.length >0) {
      curPageLayout.value = list.value[0];
      }
     const curPage = ref('0');
     const pageLayoutType = ref('edit');

     const pageLayouts:any =ref([]);

    const handleChange = (value: string) => {
      curPageLayout.value = list.value.filter((item:any)=> item.id == value)[0];
      //pageLayouts.value = list
    };
    const handleBlur = () => {
      console.log('blur');
    };
    const handleFocus = () => {
      console.log('focus');
    };
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    let mode = ref('view');
    function changeMode() {
      mode.value = mode.value== 'edit'? 'view': 'edit';
    }

    function showAddModal() {
      visible.value = true;
    }
    function updatePage() {
      let pages = JSON.parse(window.localStorage.getItem('pages') as any);
      pages.forEach((item:any)=>{
        if (item.id == curPageLayout.value.id) {
          item.layouts = curPageLayout.value.layouts;
          return;
        }
      });
      window.localStorage.setItem('pages', JSON.stringify(pages));
    }
    function addPage() {
      let pages:any = window.localStorage.getItem('pages')? JSON.parse(window.localStorage.getItem('pages') as any): [];
      let newItem = {
        name: formState.value.name,
        type: 'stastic',
        id: pages.length.toString(),
        layouts: []
      };
      pages.push(newItem);
      window.localStorage.setItem('pages', JSON.stringify(pages));
      curPageLayout.value = newItem;
      list.value = pages;
      visible.value = false;
    }


    </script>
    
    <template>
        <div class="main-content" id="main-content">
            <div class="sitch-page">
              <div>
                <a-select
                    v-model:value="curPageLayout.id"
                    show-search
                    placeholder="Select a person"
                    style="width: 200px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                <a-select-option v-for="item in list"  :value="item.id">{{item.name}}</a-select-option>
              </a-select>
                <a-button @click="changeMode()" class="view-layout-edit" size="samll" >
                    {{mode=='view'? '编辑': '浏览'}}
                  </a-button>
                  <a-button class="view-layout-edit" @click="showAddModal()" size="samll" >
                    新增
                  </a-button>
              </div>


                <div class="edit-btn-c">
                  <a-button class="pre-view" size="samll" >
                    预览
                  </a-button>
                  <a-button class="save-view-layout" @click="updatePage()" size="samll" >
                    保存
                  </a-button>
                </div>


            </div>
            <div class="page-layout">
                <page-layout :mode="mode" :layouts="curPageLayout.layouts" v-if="curPageLayout.id" :page-type="pageLayoutType" :id="curPageLayout.id"></page-layout>
            </div>
        </div>

        <a-modal
          v-model:visible="visible"
          title="Modal"
          ok-text="确认"
          cancel-text="取消"
          @ok="addPage()"
        >
          <a-form :model="formState" >
            <a-form-item label="Activity name">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-form>
        </a-modal>
    </template>
    
    <style lang="less">
    .ant-btn {
      color: #eee !important;
      border-color: #9b9494 !important;
      background: transparent !important;
    }
    .ant-select-selector {
      background-color: #816d6d !important;
      border: 1px solid #9b9494 !important;
      color: #fff;
    }
        .sitch-page {
            display: flex;
            align-items: center;
            height: 60px;
            padding: 20px 0;
            background-color: #18181c !important;
            border-bottom: 1px solid #3A4249 !important;
            justify-content: space-between;
            .pre-view {
              margin-right: 15px;
            }
            .view-layout-edit {
              margin-left: 12px;
            }

        }
        .page-layout {
            background-color: #00040D !important;
        }

    </style>
    