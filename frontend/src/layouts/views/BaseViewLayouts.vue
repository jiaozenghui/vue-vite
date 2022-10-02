<script setup lang="ts">
    import BaseHeader from "./BaseHeader.vue"
    import LMenu from "../LMenu.vue"
    import { ref } from 'vue';
    
    
    </script>
    
    <template>
        <a-layout>
          <base-header></base-header>
          <div class="view-layout-content">
            <nav style="margin-top: -70px; background: #001529;">
              <l-menu></l-menu>
            </nav>
            <div class="main-view">
              <div class="content">
                <router-view ></router-view>
              </div>
            </div>
          </div>
        </a-layout>
    </template>
    
    <style lang="less">
      .fl{
          float: left;
      }
      .fr{
          float: right;
      }
      .view-layout-content {
        background-image: linear-gradient(160deg, #1a1f24 20%,#496f7e 80%);
        min-height: calc(100vh - 80px);
        display: flex;
      }
      .main-view {
        display: flex;
        flex: auto;
        height: 100%;
        position: relative;
        .content {
          flex: 1 1 auto;
          box-sizing: border-box;
          padding: 20px;
          .zone {
            background: transparent;
          }
        }
      }

    </style>
    