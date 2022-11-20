<script setup lang="ts">
    import { ref } from 'vue';
    
    const element = ref(JSON.parse(window.localStorage.getItem('big-bg-style') as any)) as any; 
    </script>
    
    <template>
        <a-layout>
          <div class="big-view-layout-content" :style="element.styles">
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
      .big-view-layout-content {
        background-image: linear-gradient(160deg, #1a1f24 20%,#496f7e 80%);
        min-height: 100vh;
        background: url(./../../assets/images/bg.jpg) no-repeat;
        background-size: cover;
        display: flex;
        .main-view {
            display: flex;
            flex: auto;
            height: 100%;
            position: relative;
            .content {
            flex: 1 1 auto;
            min-height: 100vh;
            box-sizing: border-box;
            padding: 0 10px 20px;

            .zone {
                background: transparent;
            }
            :deep(label) {
                outline: none !important;
            }
            }
        }
      }


    </style>
    