<script setup lang="ts">
    import {getCurrentInstance, onMounted, ref, defineExpose } from 'vue';
    import * as echarts from 'echarts'
    const { proxy }: any = getCurrentInstance();
    import elementResizeDetectorMaker from "element-resize-detector";
    import axios from "axios";
    import chinaJson from  '@/assets/map/china.json'
    const {
      proxy: { $nextTick, $forceUpdate },
    }: any = getCurrentInstance();
    let myChart:any;
    
        let currentType ='line';
        const main = ref();
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
                    zoom: 1,
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
            myChart = echarts.init(main.value);
            initEcharts("china", "中国");
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
        
    </script>
    
    <template>
        <div class="main" :style="ItemInfo.styles">
            <a-button @click='initEcharts("china", "中国")' class="back-btn">返回</a-button>
            <div ref="main" style="height:100%; width:100%"  id="main"></div>
        </div>
        
    </template>
    
    <style lang="less" scoped>
        #main {
            padding: 0 15px;
            position: relative;
            z-index: 10;
            .back-btn {
                position: absolute;
                left: 5px;
                top: 5px;
            }
        }
    </style>
    