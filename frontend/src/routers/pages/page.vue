<script setup lang="ts">
    import {getCurrentInstance, onMounted, ref } from 'vue';
    import * as echarts from 'echarts'
    import draggable from "vuedraggable";
    import { useRouter } from 'vue-router';
    import Layouts from "@/components/layouts/Layouts.vue"
    import LCard from "@/components/templates/cards/LCard.vue";
    import elementResizeDetectorMaker from "element-resize-detector";
    import axios from "axios";
    import chinaJson from  '@/assets/map/china.json'
    const {
      proxy: { $nextTick, $forceUpdate },
    }: any = getCurrentInstance();
    let myChart:any;
    let cpuChart:any;
    let memChart:any;
    let totalChart:any;
    let ststicChart:any;
    let Chart5:any;
    let Chart6:any;
    var labelimg = "";

    let chart5option = {
        /*backgroundColor: "#0E233E",*/
        "grid": {
            "left": "6%",
            "bottom": "0"
        },
        "legend": {
            "data": [
                "日本",
                "韩国",
                "美国",
                "澳大利亚",
                "俄罗斯",
                "法国",
                "英国"
            ],
            "top": "0",
            "icon": "circle",
            "textStyle": {
                "color": "#0DCAD2"
            }
        },
        "color": [
            "#534EE1",
            "#ECD64F",
            "#00E4F0",
            "#44D16D",
            "#124E91",
            "#BDC414",
            "#C8CCA5"
        ],
        "tooltip": {
            "position": "top",
        },
        "xAxis": {
            "type": "category",
            "data": [
                "日本",
                "韩国",
                "美国",
                "澳大利亚",
                "俄罗斯",
                "法国",
                "英国"
            ],
            "axisLabel": {
                "show": false,
                "color": "#999999",
                "fontSize": 16
            },
            "axisTick": {
                "show": false
            },
            "axisLine": {
                "show": false
            },
            "splitLine": {
                "show": false
            }
        },
        "yAxis": {
            "type": "value",
            "axisLabel": {
                "show": false,
                "color": "#999999",
                "fontSize": 16
            },
            "axisTick": {
                "show": false
            },
            "axisLine": {
                "show": false
            },
            "splitLine": {
                "show": false
            }
        },
        "series": [{
            "name": "日本",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "stack": "a",
            "type": "bar"
        },
            {
                "name": "韩国",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "name": "美国",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "name": "澳大利亚",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "name": "俄罗斯",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "name": "法国",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "name": "英国",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
            {
                "type": "pictorialBar",
                "name": "提示框值",
                "data": [{
                    "name": "",
                    "value": 868,
                    "label": {
                        "show": true,
                        "position": "top",
                        formatter: function(params:any) {
                            var index = params.dataIndex;
                            var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                            return str;
                        },
                        "rich": {
                            "a": {
                                "fontSize": 18,
                                "color": "#534EE1",
                                "align": "center",
                                "height": 40
                            },
                            "c": {
                                "fontSize": 18,
                                "color": "#fff",
                                "padding": [
                                    -2,
                                    0,
                                    2,
                                    0
                                ],
                                "backgroundColor": {
                                    "image": labelimg
                                },
                                "align": "center",
                                "verticalAlign": "bottom",
                                "height": 50,
                                "lineHeight": 40,
                                "width": 100
                            }
                        }
                    },
                    "itemStyle": {
                        "normal": {
                            "color": {
                                "type": "linear",
                                "x": 0,
                                "y": 0,
                                "x2": 0,
                                "y2": 1,
                                "colorStops": [{
                                    "offset": 0,
                                    "color": "rgba(83,78,225,1)"
                                },
                                    {
                                        "offset": 1,
                                        "color": "rgba(83,78,225,0)"
                                    }
                                ],
                                "global": false
                            }
                        }
                    }
                },
                    {
                        "name": "",
                        "value": 306,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params:any) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#ECD64F",
                                    "align": "center",
                                    "height": 40
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(236,214,79,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(236,214,79,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                    {
                        "name": "",
                        "value": 162,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params:any) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#00E4F0",
                                    "align": "center",
                                    "height": 40
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(0,228,240,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(0,228,240,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                    {
                        "name": "",
                        "value": 362,
                        "label": {
                            "show": true,
                            formatter: function(params:any) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "position": "top",
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#44D16D",
                                    "align": "center",
                                    "height": 40
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(68,209,109,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(68,209,109,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                    {
                        "name": "",
                        "value": 460,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#124E91",
                                    "align": "center",
                                    "height": 30
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(18,78,145,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(18,78,145,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                    {
                        "name": "",
                        "value": 606,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params:any) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#BDC414",
                                    "align": "center",
                                    "height": 30
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(189,196,20,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(189,196,20,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                    {
                        "name": "",
                        "value": 506,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params:any) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#C8CCA5",
                                    "align": "center",
                                    "height": 30
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -4,
                                        0,
                                        8,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 45,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(200,204,165,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(200,204,165,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    }
                ],
                "stack": "a",
                "symbol": "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z"
            }
        ]
    }
    let colors = ['rgb(46, 199, 201)', 'rgb(90, 177, 239)', 'rgb(255, 185, 128)'];

let chart6option = {
    color: colors,

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: function(params:any) {
            // 系列
            let html = params[0].name + "<br>";

            for (var i = 0; i < params.length; i++) {

                // 获取每个系列对应的颜色值
                html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

                // 通过判断指定系列增加 % 符号
                if (option.series[params[i].seriesIndex].type == "line") {
                    html += params[i].seriesName + ": " + params[i].value + "%<br>";
                } else {
                    html += params[i].seriesName + ": " + params[i].value + "<br>";
                }
            }
            return html;
        }
    },
    grid: {
        right: '20%'
    },
    toolbox: {
        feature: {
            dataView: {
                show: true,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    legend: {
        textStyle: {
            color: '#fff'
        },
        data: ['下单量', '付款量', '平均值']
    },
    // 缩放组件
    /*dataZoom: {
        type: 'slider'
    },*/
    xAxis: [{
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            formatter: '{value} 万',
            textStyle: {
                color: "#ffffff" //X轴文字颜色
            }
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        name: '下单量',
        min: 0,
        max: 250,
        position: 'right',
        axisLine: {
            lineStyle: {
                color: colors[0]
            }
        },
        axisLabel: {
            formatter: '{value} 万'
        }
    },
        {
            type: 'value',
            name: '付款量',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value} 万'
            }
        },
        {
            type: 'value',
            name: '平均值',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value} 万'
            }
        }
    ],
    series: [{
        name: '下单量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        itemStyle: {
            normal: {
                barBorderRadius: 2
            }
        }
    },
        {
            barGap: '-50%', // 增加偏移量使重叠显示
            name: '付款量',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
                normal: {
                    barBorderRadius: 2
                }
            }
        },
        {
            name: '平均值',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        }
    ]
};
    let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {

                //icon: 'vertical',
                data: ['总击杀', '总助攻', '总死亡'],
                //align: 'center',
                // right: '35%',
                top: '0',
                textStyle: {
                    color: "#fff"
                },
                // itemWidth: 15,
                // itemHeight: 15,
                itemGap: 20,
            },
            grid: {
                left: '0',
                right: '20',
                top: '30',
                bottom: '20',
                containLabel: true
            },
            xAxis: [{
                type: 'time',
                boundaryGap: false,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(255,255,255,1)',
                        fontSize: 11
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }, {




            }],
            yAxis: [{
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '总击杀',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(24, 163, 64, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(24, 163, 64, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#cdba00',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12
                    }
                },
                data: [ ["2021-01-04 08:14:36", 60],["2021-01-04 08:14:46", 56],["2021-01-04 08:20:46", 23],["2021-01-04 08:22:46", 40] ]
            }, {
                name: '总助攻',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(39, 122,206, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(39, 122,206, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#277ace',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12
                    }
                },
                data: [ ["2021-01-04 08:14:36", 25],["2021-01-04 08:14:46", 96],["2021-01-04 08:20:46", 53],["2021-01-04 08:22:46", 47] ]
            }, {
                name: '总死亡',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(39, 122,206, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(39, 122,206, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#67E0E3',
                        borderColor: 'rgba(10,148,236,0.5)',
                        borderWidth: 12
                    }
                },
                data: [ ["2021-01-04 08:14:36", 30],["2021-01-04 08:14:46", 66],["2021-01-04 08:20:46", 53],["2021-01-04 08:22:46", 50] ]
            }]
    };
    let columns:any = [{"title":"数据中心","dataIndex":"datacenter_name"},{"title":"部署方式","dataIndex":"deploy_type"},{"title":"检测","dataIndex":"timestamp"}]
let tbdata = [
        {
            "resource_type": "host",
            "deploy_type": "docker",
            "resource_name": "k3sserver-1",
            "enabled": true,
            "timestamp": "2022-09-22T08:51:47Z",
            "detection_type": "application",
            "datacenter_name": "mec",
            "status": true
        },
        {
            "resource_type": "host",
            "deploy_type": "system",
            "resource_name": "k3sserver-1",
            "enabled": true,
            "timestamp": "2022-09-22T08:49:23Z",
            "detection_type": "application",
            "datacenter_name": "mec",
            "status": true
        }
    ];
    var v2 = 33 //胜利
    var v1 = 12 //战败
    var v3 = v1 + v2 //总消费 
    let circle_option = {
        tooltip: {
            trigger: 'item',
        },
        series: [{

            type: 'pie',
            radius: ['80%', '70%'],
            color: '#37A2DA',
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: v2,
                name: '胜利',
                label: {
                    normal: {
                        formatter: v2 + '',
                        textStyle: {
                            fontSize: 20,
                            color: '#fff',
                        }
                    }
                }
            }, {
                value: v1,
                name: '战败',
                label: {
                    normal: {
                        formatter: function(params:any) {
                            return '胜率' + Math.round(v2 / v3 * 100) + '%'
                        },
                        textStyle: {
                            color: '#aaa',
                            fontSize: 12
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,.2)'
                    },
                    emphasis: {
                        color: '#fff'
                    }
                },
            }]
        }]
    };
    let bar_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            "legend": {

                "data": [{
                        "name": "Victory"
                    },
                    {
                        "name": "Defeat"
                    },
                    {
                        "name": "胜率"
                    }
                ],
                "top": "0%",
                "textStyle": {
                    "color": "rgba(255,255,255,1)", //图例文字
                    "fontSize": "16"
                }
            },

            "xAxis": [{
                "type": "category",

                data: ['BLG', 'VG', 'FPX', 'EDG', 'RNG', 'LGD', 'WE', 'SN', 'IG', 'V5', 'JDG', 'TES'],
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgb(255,255,255)",
                        fontSize: '16',
                    },
                },

            }, ],
            "yAxis": [{
                    "type": "value",
                    "name": "次数",
                    "min": 0,
                    "interval": 10,
                    "axisLabel": {
                        "show": true,

                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,1)'
                        }
                    }, //左线色
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.5)"
                        }
                    }, //x轴线
                },
                {
                    "type": "value",
                    "name": "胜率",
                    "show": true,
                    "axisLabel": {
                        "show": true,

                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,1 )'
                        }
                    }, //右线色
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)"
                        }
                    }, //x轴线
                },
            ],
            "grid": {
                "top": "10%",
                "right": "30",
                "bottom": "30",
                "left": "30",
            },
            "series": [{
                    "name": "Victory",

                    "type": "bar",
                    "data": [17, 19, 23, 20, 21, 29, 25, 31, 26, 30, 33, 33],
                    "barWidth": "auto",
                    "itemStyle": {
                        "normal": {
                            "color": {
                                "type": "linear",
                                "x": 0,
                                "y": 0,
                                "x2": 0,
                                "y2": 1,
                                "colorStops": [{
                                        "offset": 0,
                                        "color": "#67E0E3"
                                    },

                                    {
                                        "offset": 1,
                                        "color": "#67E0E3"
                                    }
                                ],
                                "globalCoord": false
                            }
                        }
                    }
                },
                {
                    "name": "Defeat",
                    "type": "bar",
                    "data": [
                        22, 22, 22, 18, 18, 25, 22, 21, 18, 19, 15, 12
                    ],
                    "barWidth": "auto",

                    "itemStyle": {
                        "normal": {
                            "color": {
                                "type": "linear",
                                "x": 0,
                                "y": 0,
                                "x2": 0,
                                "y2": 1,
                                "colorStops": [{
                                        "offset": 0,
                                        "color": "#FFDB5C"
                                    },
                                    {
                                        "offset": 1,
                                        "color": "#FFDB5C"
                                    }
                                ],
                                "globalCoord": false
                            }
                        }
                    },
                    "barGap": "0"
                },
                {
                    "name": "胜率",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": [43, 46, 51, 52, 53, 53, 53, 59, 59, 61, 68, 73],
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#48f593",

                        }
                    },
                    "smooth": true
                }
            ]
        };
        let currentType ='line';
        const main = ref();
        const cpu = ref();
        const mem = ref();
        const total = ref();
        const ststic = ref();
        const chart5 = ref();
        const chart6 = ref();
        const props = defineProps({
            ItemInfo: {} as any
        })

        var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

        var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

        var seriesData = [{
        name: '北京',
        value: 100
        }, {
        name: '天津',
        value: 0
        }, {
        name: '上海',
        value: 60
        }, {
        name: '重庆',
        value: 0
        }, {
        name: '河北',
        value: 60
        }, {
        name: '河南',
        value: 60
        }, {
        name: '云南',
        value: 0
        }, {
        name: '辽宁',
        value: 0
        }, {
        name: '黑龙江',
        value: 0
        }, {
        name: '湖南',
        value: 60
        }, {
        name: '安徽',
        value: 0
        }, {
        name: '山东',
        value: 60
        }, {
        name: '新疆',
        value: 0
        }, {
        name: '江苏',
        value: 0
        }, {
        name: '浙江',
        value: 0
        }, {
        name: '江西',
        value: 0
        }, {
        name: '湖北',
        value: 60
        }, {
        name: '广西',
        value: 60
        }, {
        name: '甘肃',
        value: 0
        }, {
        name: '山西',
        value: 60
        }, {
        name: '内蒙古',
        value: 0
        }, {
        name: '陕西',
        value: 0
        }, {
        name: '吉林',
        value: 0
        }, {
        name: '福建',
        value: 0
        }, {
        name: '贵州',
        value: 0
        }, {
        name: '广东',
        value: 597
        }, {
        name: '青海',
        value: 0
        }, {
        name: '西藏',
        value: 0
        }, {
        name: '四川',
        value: 60
        }, {
        name: '宁夏',
        value: 0
        }, {
        name: '海南',
        value: 60
        }, {
        name: '台湾',
        value: 0
        }, {
        name: '香港',
        value: 0
        }, {
        name: '澳门',
        value: 0
        }];

        function initEcharts(pName:any, Chinese_?:any, Json?:any) {
            myChart&&myChart.dispose();
            if (Json) {
                echarts.registerMap(pName, Json);
            } else {
                echarts.registerMap('china', chinaJson);
            }
            
            myChart = echarts.init(main.value);
            var geoCoordMap = {
            '新疆玛纳斯基地': [86.22, 44.30],
            '九江': [116.00, 29.70],
            '新乡': [116.402217, 35.311657],
            ' ': [79.92, 37.12],
            '  ': [86.85, 47.70],
            '若羌县': [88.17, 39.02],
            '上海': [121.4648, 31.2891],
            '东莞': [113.8953, 22.901],
            '东营': [118.7073, 37.5513],
            '中山': [113.4229, 22.478],
            '临汾': [111.4783, 36.1615],
            '临沂': [118.3118, 35.2936],
            '丹东': [124.541, 40.4242],
            '丽水': [119.5642, 28.1854],
            '乌鲁木齐': [87.9236, 43.5883],
            '佛山': [112.8955, 23.1097],
            '保定': [115.0488, 39.0948],
            '兰州': [103.5901, 36.3043],
            '包头': [110.3467, 41.4899],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '南京': [118.8062, 31.9208],
            '南宁': [108.479, 23.1152],
            '南昌': [116.0046, 28.6633],
            '南通': [121.1023, 32.1625],
            '厦门': [118.1689, 24.6478],
            '台州': [121.1353, 28.6688],
            '合肥': [117.29, 32.0581],
            '呼和浩特': [111.4124, 40.4901],
            '咸阳': [108.4131, 34.8706],
            '哈尔滨': [127.9688, 45.368],
            '唐山': [118.4766, 39.6826],
            '嘉兴': [120.9155, 30.6354],
            '大同': [113.7854, 39.8035],
            '大连': [122.2229, 39.4409],
            '天津': [117.4219, 39.4189],
            '太原': [112.3352, 37.9413],
            '威海': [121.9482, 37.1393],
            '宁波': [121.5967, 29.6466],
            '宝鸡': [107.1826, 34.3433],
            '宿迁': [118.5535, 33.7775],
            '常州': [119.4543, 31.5582],
            '广州': [113.5107, 23.2196],
            '廊坊': [116.521, 39.0509],
            '延安': [109.1052, 36.4252],
            '张家口': [115.1477, 40.8527],
            '徐州': [117.5208, 34.3268],
            '德州': [116.6858, 37.2107],
            '惠州': [114.6204, 23.1647],
            '成都': [103.9526, 30.7617],
            '扬州': [119.4653, 32.8162],
            '承德': [117.5757, 41.4075],
            '拉萨': [91.1865, 30.1465],
            '无锡': [120.3442, 31.5527],
            '日照': [119.2786, 35.5023],
            '昆明': [102.9199, 25.4663],
            '杭州': [119.5313, 29.8773],
            '枣庄': [117.323, 34.8926],
            '柳州': [109.3799, 24.9774],
            '株洲': [113.5327, 27.0319],
            '武汉': [114.3896, 30.6628],
            '汕头': [117.1692, 23.3405],
            '江门': [112.6318, 22.1484],
            '沈阳': [123.1238, 42.1216],
            '沧州': [116.8286, 38.2104],
            '河源': [114.917, 23.9722],
            '泉州': [118.3228, 25.1147],
            '泰安': [117.0264, 36.0516],
            '泰州': [120.0586, 32.5525],
            '济南': [117.1582, 36.8701],
            '济宁': [116.8286, 35.3375],
            '海口': [110.3893, 19.8516],
            '淄博': [118.0371, 36.6064],
            '淮安': [118.927, 33.4039],
            '深圳': [114.5435, 22.5439],
            '清远': [112.9175, 24.3292],
            '温州': [120.498, 27.8119],
            '渭南': [109.7864, 35.0299],
            '湖州': [119.8608, 30.7782],
            '湘潭': [112.5439, 27.7075],
            '滨州': [117.8174, 37.4963],
            '潍坊': [119.0918, 36.524],
            '烟台': [120.7397, 37.5128],
            '玉溪': [101.9312, 23.8898],
            '珠海': [113.7305, 22.1155],
            '盐城': [120.2234, 33.5577],
            '盘锦': [121.9482, 41.0449],
            '石家庄': [114.4995, 38.1006],
            '福州': [119.4543, 25.9222],
            '秦皇岛': [119.2126, 40.0232],
            '绍兴': [120.564, 29.7565],
            '聊城': [115.9167, 36.4032],
            '肇庆': [112.1265, 23.5822],
            '舟山': [122.2559, 30.2234],
            '苏州': [120.6519, 31.3989],
            '莱芜': [117.6526, 36.2714],
            '菏泽': [115.6201, 35.2057],
            '营口': [122.4316, 40.4297],
            '葫芦岛': [120.1575, 40.578],
            '衡水': [115.8838, 37.7161],
            '衢州': [118.6853, 28.8666],
            '西宁': [101.4038, 36.8207],
            '西安': [109.1162, 34.2004],
            '贵阳': [106.6992, 26.7682],
            '连云港': [119.1248, 34.552],
            '邢台': [114.8071, 37.2821],
            '邯郸': [114.4775, 36.535],
            '郑州': [113.4668, 34.6234],
            '鄂尔多斯': [108.9734, 39.2487],
            '重庆': [107.7539, 30.1904],
            '金华': [120.0037, 29.1028],
            '铜川': [109.0393, 35.1947],
            '银川': [106.3586, 38.1775],
            '镇江': [119.4763, 31.9702],
            '长春': [125.8154, 44.2584],
            '长沙': [113.0823, 28.2568],
            '长治': [112.8625, 36.4746],
            '阳泉': [113.4778, 38.0951],
            '青岛': [120.4651, 36.3373],
            '韶关': [113.7964, 24.7028]
            };

            var BJData = [
            [{
                name: '新乡'
            }, {
                name: '新乡',
                value: 200
            }],
            [{
                name: '新乡'
            }, {
                name: '呼和浩特',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '哈尔滨',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '石家庄',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '昆明',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '北京',
                value: 100
            }],
            [{
                name: '新乡'
            }, {
                name: '长春',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '重庆',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '贵阳',
                value: 50
            }],
            [{
                name: '新乡'
            }, {
                name: '南宁',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '济南',
                value: 10
            }],
            [{
                name: '新乡'
            }, {
                name: '太原',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '西安',
                value: 60
            }],
            [{
                name: '新乡'
            }, {
                name: '武汉',
                value: 50
            }],
            [{
                name: '新乡'
            }, {
                name: '合肥',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '南京',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '沈阳',
                value: 20
            }],
            [{
                name: '新乡'
            }, {
                name: '成都',
                value: 10
            }]
            ];

            var SHData = [
            [{
                name: '九江'
            }, {
                name: '九江',
                value: 200
            }],

            [{
                name: '九江'
            }, {
                name: '长沙',
                value: 95
            }],
            [{
                name: '九江'
            }, {
                name: '武汉',
                value: 30
            }],
            [{
                name: '九江'
            }, {
                name: '南昌',
                value: 20
            }],
            [{
                name: '九江'
            }, {
                name: '合肥',
                value: 70
            }],
            [{
                name: '九江'
            }, {
                name: '南京',
                value: 60
            }],
            [{
                name: '九江'
            }, {
                name: '福州',
                value: 50
            }],
            [{
                name: '九江'
            }, {
                name: '上海',
                value: 100
            }],
            [{
                name: '九江'
            }, {
                name: '深圳',
                value: 100
            }],

            ];

            var GZData = [
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '新疆玛纳斯基地',
                value: 200
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '  ',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: ' ',
                value: 40
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '呼和浩特',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '昆明',
                value: 40
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '成都',
                value: 10
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '兰州',
                value: 95
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '银川',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '西宁',
                value: 80
            }],

            ];

            var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

            var convertData = function (data:any) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord
                    }, {
                        coord: toCoord
                    }]);
                }
            }
            return res;
            };

            var color = ['#3ed4ff', '#ffa022', '#a6c84c'];
            var series:any = [];
            [
                ['新乡', BJData],
                ['九江', SHData],
                ['新疆', GZData]
            ].forEach(function (item:any, i:any) {
            series.push({
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0] + ' Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val:any) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem:any) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
            });


            var tmpSeriesData = pName === "china" ? seriesData : [];
            var option = {};
            if (pName === "china") {
                option = {
                    title: {
                    text: Chinese_ || pName,
                    left: 'center'
                    },
                    geo: {
                        map: 'china',
                        zoom: 1.2,
                        label: {
                            emphasis: {
                                show: true
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        }
                    },
                    series: series

                };
            } else {

                        let geoCoordMap = {
                            '怀化站': [109.999867,27.518949],
                            '吉首站': [109.741528,28.332629],
                            '张家界站': [110.491722,29.112001],
                            '常德站': [111.701486,29.076683],
                            '益阳站': [112.348741,28.544124],
                            '岳阳站': [113.126486,29.382401],
                            '长沙站': [113.019455,28.200103],
                            '株洲站': [113.163141,27.8418],
                            '湘潭站': [112.91977,27.882141],
                            '邵阳站': [111.467859,27.21915],
                            '娄底站': [112.012438,27.745506],
                            '衡阳站': [112.63809,26.895225],
                            '永州站': [111.577632,26.460144],
                            '郴州站': [113.039396,25.81497]
                        };

                        var goData = [
                            [{
                                name: '怀化站'

                            }, {
                                id: 1,
                                name: '吉首站',
                                value: 60
                            }],
                            [{
                                name: '吉首站'

                            }, {
                                id: 1,
                                name: '张家界站',
                                value: 70
                            }],
                            [{
                                name: '张家界站'

                            }, {
                                id: 1,
                                name: '常德站',
                                value: 77
                            }],
                            [{
                                name: '常德站'

                            }, {
                                id: 1,
                                name: '岳阳站',
                                value: 70
                            }],
                            [{
                                name: '常德站'

                            }, {
                                id: 1,
                                name: '益阳站',
                                value: 65
                            }],
                            [{
                                name: '常德站'

                            }, {
                                id: 1,
                                name: '邵阳站',
                                value: 80
                            }],
                            [{
                                name: '益阳站'

                            }, {
                                id: 1,
                                name: '长沙站',
                                value: 95
                            }],
                            [{
                                name: '益阳站'

                            }, {
                                id: 1,
                                name: '娄底站',
                                value: 72
                            }],
                            [{
                                name: '长沙站'

                            }, {
                                id: 1,
                                name: '株洲站',
                                value: 80
                            }],
                            [{
                                name: '长沙站'

                            }, {
                                id: 1,
                                name: '湘潭站',
                                value: 90
                            }],
                            [{
                                name: '长沙站'

                            }, {
                                id: 1,
                                name: '衡阳站',
                                value: 88
                            }],
                            [{
                                name: '湘潭站'

                            }, {
                                id: 1,
                                name: '娄底站',
                                value: 72
                            }],
                            [{
                                name: '娄底站'

                            }, {
                                id: 1,
                                name: '怀化站',
                                value: 80
                            }],
                            [{
                                name: '邵阳站'

                            }, {
                                id: 1,
                                name: '永州站',
                                value: 74
                            }],
                            [{
                                name: '衡阳站'

                            }, {
                                id: 1,
                                name: '邵阳站',
                                value: 80
                            }],
                            [{
                                name: '衡阳站'

                            }, {
                                id: 1,
                                name: '永州站',
                                value: 74
                            }],
                            [{
                                name: '衡阳站'

                            }, {
                                id: 1,
                                name: '郴州站',
                                value: 70
                            }],
                        ];
                        //值控制圆点大小
                        var backData = [
                            [{
                                name: '吉首站'
                            }, {
                                id: 2,
                                name: '怀化站',
                                value: 80
                            }],
                            [{
                                name: '常德站'

                            }, {
                                id: 1,
                                name: '张家界站',
                                value: 70
                            }],
                            [{
                                name: '岳阳站'

                            }, {
                                id: 1,
                                name: '常德站',
                                value: 77
                            }],
                            [{
                                name: '益阳站'

                            }, {
                                id: 1,
                                name: '常德站',
                                value: 77
                            }],
                            [{
                                name: '邵阳站'

                            }, {
                                id: 1,
                                name: '常德站',
                                value: 77
                            }],
                            [{
                                name: '长沙站'

                            }, {
                                id: 1,
                                name: '益阳站',
                                value: 65
                            }],
                            [{
                                name: '娄底站'

                            }, {
                                id: 1,
                                name: '益阳站',
                                value: 65
                            }],
                            [{
                                name: '株洲站'

                            }, {
                                id: 1,
                                name: '长沙站',
                                value: 95
                            }],
                            [{
                                name: '湘潭站'

                            }, {
                                id: 1,
                                name: '长沙站',
                                value: 95
                            }],
                            [{
                                name: '衡阳站'

                            }, {
                                id: 1,
                                name: '长沙站',
                                value: 95
                            }],
                            [{
                                name: '娄底站'

                            }, {
                                id: 1,
                                name: '湘潭站',
                                value: 90
                            }],
                            [{
                                name: '怀化站'

                            }, {
                                id: 1,
                                name: '娄底站',
                                value: 72
                            }],
                            [{
                                name: '永州站'

                            }, {
                                id: 1,
                                name: '邵阳站',
                                value: 80
                            }],
                            [{
                                name: '邵阳站'

                            }, {
                                id: 1,
                                name: '衡阳站',
                                value: 88
                            }],
                            [{
                                name: '永州站'

                            }, {
                                id: 1,
                                name: '衡阳站',
                                value: 88
                            }],
                            [{
                                name: '郴州站'

                            }, {
                                id: 1,
                                name: '衡阳站',
                                value: 88
                            }],
                        ];

                        var arcAngle = function(data:any) {
                            var j, k;
                            for (var i = 0; i < data.length; i++) {
                                var dataItem = data[i];
                                if (dataItem[1].id == 1) {
                                    j = 0.2;
                                    return j;
                                } else if (dataItem[1].id == 2) {
                                    k = -0.2;
                                    return k;
                                }
                            }
                        }

                        let convertData:any = function(data:any) {
                            var res = [];
                            for (var i = 0; i < data.length; i++) {
                                var dataItem = data[i];
                                var fromCoord = geoCoordMap[dataItem[0].name];
                                var toCoord = geoCoordMap[dataItem[1].name];
                                if (dataItem[1].id == 1) {
                                    if (fromCoord && toCoord) {
                                        res.push([{
                                            coord: fromCoord,
                                        }, {
                                            coord: toCoord,
                                            value: dataItem[1].value //线条颜色
                                        }]);
                                    }
                                } else if (dataItem[1].id == 2) {
                                    if (fromCoord && toCoord) {
                                        res.push([{
                                            coord: fromCoord,
                                        }, {
                                            coord: toCoord
                                        }]);
                                    }
                                }
                            }
                            return res;
                        };

                        var color = ['#fff', '#FF1493', '#00FF00'];
                        let series:any = [];
                        [
                            ['1', goData],
                            ['2', backData]
                        ].forEach(function(item:any, i:any) {
                            series.push({
                                name: item[0],
                                type: 'lines',
                                zlevel: 2,
                                symbol: ['arrow', 'arrow'],
                                //线特效配置
                                effect: {
                                    show: true,
                                    period: 6,
                                    trailLength: 0.1,
                                    symbol: 'arrow', //标记类型
                                    symbolSize: 5
                                },
                                lineStyle: {
                                    normal: {
                                        width: 1,
                                        opacity: 0.4,
                                        curveness: arcAngle(item[1]), //弧线角度
                                        color: '#3ed4ff'
                                    }
                                },
                                data: convertData(item[1])
                            }, {
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                zlevel: 2,
                                //波纹效果
                                rippleEffect: {
                                    period: 2,
                                    brushType: 'stroke',
                                    scale: 3
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#3ed4ff',
                                        position: 'right',
                                        formatter: '{b}'
                                    }
                                },
                                //终点形象
                                symbol: 'circle',
                                //圆点大小
                                symbolSize: function(val:any) {
                                    return val[2] / 8;
                                },
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color: '#3ed4ff'
                                    }
                                },
                                data: item[1].map(function(dataItem:any) {
                                    return {
                                        name: dataItem[1].name,
                                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                    };
                                })

                            });

                        });

                option = {
                title: {
                text: Chinese_ || pName,
                left: 'center'
                },
                geo: {
                    map: pName,
                    zoom: 1.2,
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    roam: true,
                    itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        }
                },
                series: pName == 'hunan'? series: []
            };
            }

            myChart.setOption(option);

            myChart.off("click");

            if (pName === "china") { // 全国时，添加click 进入省级
                myChart.on('click', function (param:any) {
                console.log(param.name);
                //遍历取到provincesText 中的下标  去拿到对应的省js
                for (var i = 0; i < provincesText.length; i++) {
                    if (param.name.indexOf(provincesText[i]) >-1 ) {
                    //显示对应省份的方法
                    showProvince(provinces[i], provincesText[i]);
                    break;
                    }
                }
                });
            } else { // 省份，添加双击 回退到全国
                myChart.on("dblclick", function () {
                initEcharts("china", "中国");
                });
            }
        }
        function showProvince(pName:any, Chinese_?:any) {
            axios.get('./../../src/assets/map/json/province/' + pName + '.json').then((res:any)=>{
                initEcharts(pName,Chinese_,res.data);
            });
        }

            // 加载对应的JS
            function loadBdScript(scriptId:any, url:any, callback:any) {
            var script = document.createElement("script") as any;
            script.type = "text/javascript";
            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
                };
            } else {  // Others  
                script.onload = function () {
                callback();
                };
            }
            script.src = url;
            script.id = scriptId;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        onMounted(()=>{
            const erd = elementResizeDetectorMaker();
            cpuChart = echarts.init(cpu.value);
            memChart = echarts.init(mem.value);
            totalChart = echarts.init(total.value);
            ststicChart = echarts.init(ststic.value);
            Chart5 = echarts.init(chart5.value);
            Chart6 = echarts.init(chart6.value);
            myChart = echarts.init(main.value);
            cpuChart.setOption(option);
            memChart.setOption(circle_option);
            totalChart.setOption(bar_option);
            ststicChart.setOption(bar_option);
            Chart5.setOption(chart5option);
            Chart6.setOption(chart6option);
            initEcharts("china", "中国");
            window.onresize = () => {
                myChart.resize();
    
            }
            $nextTick(()=>{
                erd.listenTo(main.value, function () {
                    myChart.resize();
                    cpuChart.resize();
                    memChart.resize();
                    totalChart.resize();
                })
            })
            $forceUpdate();
        })
    
    </script>
    
    <template>
      <div >
        <div class="drag-div" data-draggable="true" data-v-4c4c3c7e="" draggable="false" style="min-height: 70px; margin-top: 0; background: url(&quot;./../../../src/assets/images/head.gif&quot;) center -60px / 70% 240px no-repeat;"><div class="ant-row" data-v-a3572cfa="" data-v-4c4c3c7e="" style="min-height: 70px; row-gap: 0px;"><div class="ant-col" data-v-a3572cfa=""><div class="colDraggable" data-v-a3572cfa="" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;"><label id="test0" data-draggable="true" data-v-0eae90d4="" data-v-a3572cfa="" draggable="false" class="" style="color: rgb(255, 255, 255); font-size: 30px;">智能运维大数据平台</label></div></div></div></div>
        <div style="height:500px">
        <a-row style="margin-top:20px" gutter="{ xs: 8, sm: 16, md: 24}" type="flex">
            <a-col flex="300px">
                <a-card class="border" title="CPU" >
                    <div style="height:170px; width:100%" ref="cpu" id="cpu"></div>
                </a-card>
                <a-card class="border" style="margin-top:20px" title="IOPS" >
                    <div style="height:170px; width:100%" ref="total" id="total"></div>
                </a-card>
            </a-col>
            <a-col flex="auto">
                <a-card class="border middle-card" title="数据中心" >
                    <div ref="main" style="height:420px; width:100%" id="main"></div>
                </a-card>
            </a-col>
            <a-col flex="300px">

                <a-card class="border" title="统计" >
                    <div style="height:170px; width:100%" ref="chart5" id="chart5"></div>
                </a-card>
                <a-card class="border" style="margin-top:20px" title="存储" >
                    <div style="height:170px; width:100%" ref="mem" id="mem"></div>
                </a-card>
            </a-col>

        </a-row>
    </div>
        <a-row type="flex">
            <a-col flex="300px">
                <a-card class="border" title="内存" >
                    <div style="height:170px; width:100%" ref="ststic" id="static">
                    </div>
                </a-card>
            </a-col>
            <a-col flex="auto">
                <a-card class="border middle-card" title="监控数据" >
                    <a-table   :columns="columns" :pagination="false" :data-source="tbdata">
                        <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'name'">
                            <a>{{ text }}</a>
                        </template>
                        </template>
                    </a-table>
                </a-card>
            </a-col>
            <a-col flex="300px">
                <a-card class="border" title="概率" >
                    <div style="height:170px; width:100%" ref="chart6" id="chart6"></div>
                </a-card>
            </a-col>
        </a-row>
      </div>
    </template>
    
    <style lang="less" scoped>
      .main-content {
        display: flex;
        
        .left-side {
            flex: 0 0 260px;
        }
        :deep(.big-view-layout-content .main-view .content) {
            padding-top: 0;
        }
        .right-side {
            flex: 0 0 auto;
            position: relative;
    
        }
      }
      .ant-row {
            display: flex;
            flex-flow: inherit;
        }
      .ant-card {
            background: rgb(247 201 168 / 10%) !important;
            border: none !important;
            :deep(.ant-card-head-title) {
                color: #fff;
                padding: 10px 0;
            }
            :deep(.ant-card-body) {
                padding: 0 15px 15px;
            }
            :deep(.ant-card-head) {
                border: none !important;
                padding: 0 15px;
                min-height: 0;
            }
        }
        .border {
            border: 1px solid #0bc4e9 !important;
            background: rgba(0,72,115,0.28) !important;
            &:hover{
                box-shadow:-5px 0px 2px rgba(255,255,255,0.1), 0px 5px 2px rgba(255,255,255,0.1);
                background: rgba(255,255,255,0.1);
                &::before{
                    width: 0%;
                }
                &::after{
                    height: 0%;
                }
            }
            &::before {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: calc(100% + 2px);
                    bottom: -1px;
                    top: -1px;
                    left: 10%;
                    border-bottom: 1px solid #007297;
                    border-top: 1px solid #007297;
                    transition: all 0.5s;
                }
                &::after {
                    content: '';
                    position: absolute;
                    width: calc(100% + 2px);
                    height: 80%;
                    left: -1px;
                    right: -1px;
                    top: 10%;
                    border-left: 1px solid #007297;
                    border-right: 1px solid #007297;
                    transition: all 0.5s;
                }

        }
        .middle-card {
            margin: 0 16px;
        }

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
    