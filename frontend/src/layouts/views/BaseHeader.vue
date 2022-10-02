<script setup lang="ts">
    import { ref } from 'vue';
    import { useStore } from "vuex";
    const store = useStore();
    
    const activeKey = ref('layout');
    </script>
    
    <template>
        <div class="header">
            <div class="header_logo fl">
                <a href="/">LenovoEdge</a>
            </div>
            <div class="header_nav fl">
                <ul>
                    <li>
                        <a  class="nav_current">数据概览</a>
                    </li>
                    <li>
                        <a >故障管理</a>
                    </li>
                    <li>
                        <a >告警管理</a>
                    </li>
                    <li>
                        <a >应用管理</a>
                    </li>
                    <li>
                        <a >日志管理</a>
                    </li>
                    <li>
                        <a >用户管理</a>
                    </li>
                    <li>
                        <a >资源管理</a>
                    </li>
                </ul>
            </div>
            <div class="header_myself fr">
                <p>用户：管理员</p>
                <a  data-toggle="modal" data-target=".bs-example-modal-sm">注销 &nbsp;<span class="caret"></span></a>
            </div>
        </div>
    </template>
    
    <style lang="less" scoped>
        .header{
            width: 100%;
            height: 80px;
            background: #030829;
            padding:0 20px 0 80px;
        }
        .header>.header_logo{
            padding:10px 10px 10px 0px;
            a {
                font-size: 36px;
            }
        }
        .header>.header_logo>a{
            display: block;
        }
        .header>.header_logo>a>img{
            width:260px;
        }

        .header>.header_nav{
            margin-left: 20px;
        }
        .header>.header_nav>ul>li{
            float: left;
            margin-right: 6px;
            position: relative;
        }
        .header>.header_nav>ul>li>a{
            display: block;
            height: 80px;
            padding:0 30px;
            line-height: 80px;
            color:#fff;
        }
        .header>.header_nav>ul>li>a:hover{
            border-bottom: 4px solid #4b8df8;
            box-shadow: -10px 0px 15px #034c6a inset,
            0px -10px 15px #034c6a inset,
            10px 0px 15px #034c6a inset,
            0px 10px 15px #034c6a inset;
        }
        .header>.header_nav>ul>li>img{
            float: left;
            position: absolute;
            top: 33px;
            left:10px;
        }
        .header>.header_nav>ul>li>a.nav_current{
            border-bottom: 4px solid #4b8df8;
            box-shadow: -10px 0px 15px #034c6a inset,
            0px -10px 15px #034c6a inset,
            10px 0px 15px #034c6a inset,
            0px 10px 15px #034c6a inset;
        }

        .header>.header_myself{
            width: 90px;
            text-align: center;
        }
        .header>.header_myself>p{
            color:#fff;
            font-size: 13px;
            margin-top: 15px;
        }
        .header>.header_myself>a{
            color:#fff;
            font-size: 13px;
        }

        /*äºŒçº§èœå• å¼€å§‹*/
        .header>.header_nav>ul>li>ul>li>a{
            display: block;
            padding:8px 10px;
            background-color: #030829;
            color:#fff;
            font-size: 14px;
        }
        .header>.header_nav>ul>li>ul{
            display: none;
            width: 100px;
            position: absolute;
            top:80px;
            left: 0px;
            z-index: 1000;
        }
        .header>.header_nav>ul>li>ul>li>a:hover{
            background-color: #4b8df8;
        }
        .header>.header_nav>ul>li>ul>li{
            position: relative;
            z-index: 1000;
        }
        .header>.header_nav>ul>li>ul>li>ul{
            display: none;
            width: 100px;
            position: absolute;
            top:0;
            left: 100px;;
        }
        .header>.header_nav>ul>li>ul>li>ul>li>a{
            display: block;
            padding:8px 10px;
            background-color: #030829;
            color:#fff;
            font-size: 14px;
        }
        .header>.header_nav>ul>li>ul>li>ul>li>a:hover{
            background-color: #4b8df8;
        }
    </style>
    