<script setup lang="ts">
import {getCurrentInstance, onMounted, ref, defineExpose } from 'vue';
import * as echarts from 'echarts'
const { proxy }: any = getCurrentInstance();
import elementResizeDetectorMaker from "element-resize-detector";
import axios from "axios";
const {
  proxy: { $nextTick, $forceUpdate },
}: any = getCurrentInstance();
let myChart:any;
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
    const props = defineProps({
        ItemInfo: {} as any
    })
    onMounted(()=>{
        const erd = elementResizeDetectorMaker();
        myChart = echarts.init(main.value);


        if (window.location.href.indexOf('view') >-1) {
            if (props.ItemInfo.ajaxUrl) {
                axios.get('./../../'+props.ItemInfo.ajaxUrl).then((res:any) => {
                    let data = res.data.data;
                    if (props.ItemInfo.chart_type == 'line' ) {
                        currentOptions = option;
                        currentOptions.series.pop(0);
                        currentOptions.series.pop(0);
                        currentOptions.series[0].data = data;
                    } else if (props.ItemInfo.chart_type == 'circle') {
                        currentOptions = circle_option;
                        currentOptions.series[0].data[0].value = data.total -data.use;
                        currentOptions.series[0].data[1].value = data.use;
                    } else if (props.ItemInfo.chart_type == 'interval') {
                        currentOptions= bar_option;
                        currentOptions.series[0].data = data;
                    }
                    myChart.setOption(currentOptions);  
                })
            }
        } else {
            option && myChart.setOption(option);    
        }
        window.onresize = () => {
            myChart.resize();

        }
        $nextTick(()=>{
            erd.listenTo(main.value, function () {
                myChart.resize();
            })
            erd.listenTo(props.ItemInfo.styles, function () {
                myChart.resize();
            })
        })
        $forceUpdate();
    })
    
    let currentOptions:any=option;
    const changeData = (e:any) => {

        if (e.type == 'data_change') {
            if (currentType == 'line') {
                currentOptions = option;
            } else if(currentType == 'circle'){
                currentOptions = circle_option;
            } else if (currentType == 'interval') {
                currentOptions = bar_option;
            }
            if(currentType == 'line') {
                currentOptions.series = [{
                name: 'CPU',
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
                data: [ ["2021-01-04 08:14:36", 80],["2021-01-04 08:14:46", 96],["2021-01-04 08:20:46", 93],["2021-01-04 08:22:46", 90] ]
            }
            ]
            } else if(currentType == 'line'){
                currentOptions.series = [{

                type: 'pie',
                radius: ['60%', '70%'],
                color: '#37A2DA',
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 2,
                    name: '剩余',
                    label: {
                        normal: {
                            formatter: '40%',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff',
                            }
                        }
                    }
                }, {
                    value: 3,
                    name: '使用',
                    label: {
                        normal: {
                            formatter: function(params:any) {
                                return '使用率' + Math.round(3 / 5 * 100) + '%'
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
            } else if(currentType == 'interval') {
                currentOptions = bar_option;
                currentOptions.series[0].data = [60, 80, 22, 18, 18, 25, 60, 21, 18, 90, 15, 50];
            }

        } else if (e.type == 'type_change') {
            currentType = e.data;
            if (currentType == 'line') {
                currentOptions = option;
            } else if(currentType == 'circle'){
                currentOptions = circle_option;
            } else if(currentType == 'interval'){
                currentOptions = bar_option;
            }
        }

      myChart.clear();
      myChart.setOption(currentOptions);
    }
    defineExpose({
        changeData,
    })
</script>

<template>
    <div ref="main" :style="ItemInfo.styles" id="main"></div>
</template>

<style scoped>
    #main {
        padding: 0 15px;
        position: relative;
        z-index: 10;
    }
</style>
