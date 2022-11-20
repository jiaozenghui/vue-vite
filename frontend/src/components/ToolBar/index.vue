<script setup lang="ts">
    import axios from "axios";
    import {getCurrentInstance, onMounted, ref } from 'vue';
    const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
    const instance = getCurrentInstance() as any;
    const _this= instance.appContext.config.globalProperties;

    let page:any= {};
    let graph:any = {};
    let redoList:any = [];
    let undoList:any = [];
    let editor: null;
    let command: null;
    let selectedItem: null;
    let multiSelect: false;
    let addGroup: false

    onMounted(()=>{       
      $nextTick(()=>{
      })
      $forceUpdate();
    })

    </script>
    
    <template>
        <div class="toolbar">
            <link
            rel="stylesheet"
            type="text/css"
            href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css"
            />
            <i
            class="command iconfont icon-undo"
            title="撤销"
            :class="undoList.length>0?'':'disable'"
            
            ></i>
            <i
            class="command iconfont icon-redo"
            title="重做"
            :class="redoList.length>0?'':'disable'"
            
            ></i>
            <span class="separator"></span>
            <!-- <i data-command="copy" class="command iconfont icon-copy-o disable" title="复制"></i>
            <i data-command="paste" class="command iconfont icon-paster-o disable" title="粘贴"></i>-->
            <i
            data-command="delete"
            class="command iconfont icon-delete-o"
            title="删除"
            :class="selectedItem?'':'disable'"
            
            ></i>
            <span class="separator"></span>
            <i
            data-command="zoomIn"
            class="command iconfont icon-zoom-in-o"
            title="放大"
            
            ></i>
            <i
            data-command="zoomOut"
            class="command iconfont icon-zoom-out-o"
            title="缩小"
            
            ></i>
            <i
            data-command="autoZoom"
            class="command iconfont icon-fit"
            title="适应画布"
            
            ></i>
            <i
            data-command="resetZoom"
            class="command iconfont icon-actual-size-o"
            title="实际尺寸"
            
            ></i>
            <span class="separator"></span>
            <i
            data-command="toBack"
            class="command iconfont icon-to-back"
            :class="selectedItem?'':'disable'"
            title="层级后置"
            
            ></i>
            <i
            data-command="toFront"
            class="command iconfont icon-to-front"
            :class="selectedItem?'':'disable'"
            title="层级前置"
            
            ></i>
            <span class="separator"></span>
            <span class="separator"></span>
            <i
            data-command="multiSelect"
            class="command iconfont icon-select"
            :class="multiSelect?'disable':''"
            title="多选"
            
            ></i>
            <i
            data-command="addGroup"
            class="command iconfont icon-group"
            title="成组"
            :class="addGroup?'':'disable'"
            
            ></i>
            <i data-command="unGroup" class="command iconfont icon-ungroup disable" title="解组"></i>
            <a-button  type="primary">控制台输出数据</a-button>
        </div>
    </template>
    
    <style lang="less">
        .toolbar {
        box-sizing: border-box;
        padding: 8px 0px;
        width: 100%;
        border: 1px solid #e9e9e9;
        height: 42px;
        z-index: 3;
        box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
        
        }
        .toolbar .command:nth-of-type(1) {
        margin-left: 24px;
        }
        .toolbar .command {
        box-sizing: border-box;
        width: 27px;
        height: 27px;
        margin: 0px 6px;
        border-radius: 2px;
        padding-left: 4px;
        display: inline-block;
        border: 1px solid rgba(2, 2, 2, 0);
        }
        .toolbar .command:hover {
        cursor: pointer;
        border: 1px solid #e9e9e9;
        }
        .toolbar .disable {
        color: rgba(0, 0, 0, 0.25);
        }
        .toolbar .separator {
        margin: 4px;
        border-left: 1px solid #e9e9e9;
        }
    </style>
    