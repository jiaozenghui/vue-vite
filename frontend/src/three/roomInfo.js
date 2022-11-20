/**
 * Created by chengyezheng on 2017/7/28.
 */
var RoomInfo = function () {
    var devDataUrl = PublicConstant.urlPath.monitorUrl.devDataUrl;
    var dataRoomUrl =PublicConstant.urlPath.monitorUrl.roomMonDataUrl;
    var temperatureHumidityUrl =PublicConstant.urlPath.monitorUrl.temperatureHumidityUrl;
    var ammterUrl =PublicConstant.urlPath.monitorUrl.ammeter_data;
    var ammter_bUrl =PublicConstant.urlPath.monitorUrl.ammeter_data_b;
    var systemDataRoomUrl =PublicConstant.urlPath.systemUrl.roomDataUrl;
    var systemDeviceUrl =PublicConstant.urlPath.systemUrl.devices;
    var rackUrl =PublicConstant.urlPath.systemUrl.rackUrl;
    var snmModuleUrl = PublicConstant.urlPath.monitorUrl.snmModules;
    var devStatus = PublicConstant.urlPath.monitorUrl.devMonitor;
    var devTable,accTable,snmTable,userName,userId,roomId;
    var room3dObj;
    var wallSpin = PublicConstant.Room3d.WallSpin;
    var floorSpin = PublicConstant.Room3d.FloorSpin;
    var leftDoorSpin = PublicConstant.Room3d.LeftDoorSpin;
    var rightDoorSpin = PublicConstant.Room3d.RightDoorSpin;
    var controlDoorSpin = PublicConstant.Room3d.ControlDoorSpin;
    var windowSpin = PublicConstant.Room3d.WindowSpin;
    var dampTempSpin = PublicConstant.Room3d.dampTempSpin;
    var CabinetDoor = PublicConstant.Room3d.CabinetDoor;
    var UpsDoor = PublicConstant.Room3d.UpsDoor;
    var AmmterDoor = PublicConstant.Room3d.AmmterDoor;
    var unAllocDev = [],curCabinetObj=[];
    var pageX = null,pageY = null;
    var layerIndex = null;

    var fnInitShowPage = function () {
        userName = $.cookie("authorityUserName");
        userId = $.cookie("authorityUserId");
        roomId = $.cookie("roomId");
        fnInitRelate();
        threeStart();
    };
    var fnInitEventPage = function () {
        $("#navTabs").tabs({
            activate : function(event, ui) {
                if($("table").DataTable !=null){
                    $("table").DataTable().draw(false);
                }
            },
        });

        $("#resetScene").on("click",function () {
            $('#canvas-frame').empty();
            threeStart();
        });

        $("#createCabinet").on("click",function () {
            $("#bindContent").empty();
            fnCloseLayer();
            layerIndex = layer.open({
                area: ['600px', '400px'],
                type: 1,
                shade: false,
                title: "创建机柜--并绑定电表",
                content: $('#bindAmmter'),
                btn:["确定"],
                yes: function(index){

                    var flag = 2;
                    if(curCabinetObj !=undefined && curCabinetObj.length !==0){
                        flag = 2- curCabinetObj.children.length;
                    }

                    Validate.fnCabinet(flag,false);
                    var valid = $("#bindAmmter").valid();
                    if(valid){
                        layer.close(index);
                        layerIndex = null;
                        fnConfigDev_operator();
                    }
                },
                cancel: function(index, layero){
                    layerIndex = null;
                }
            });
            var $unbind = $("#bindOption");
            fnUnBindAmmter($unbind);
            $unbind.chosen({search_contains: true,no_results_text:"搜索不存在"});
            $unbind.trigger("liszt:updated");

        });

        $("#dragCabinet").on("click",function () {
            room3dObj.fnDragCabinet();
        });

        $("#bindOption").on("change",function () {
            var $dev = $("#bindContent");
            var flag = 2;
            if(curCabinetObj !=undefined && curCabinetObj.length !==0){
                flag = 2- curCabinetObj.children.length;
            }
            Validate.fnCabinet(flag,true);
            $("#bindAmmter").valid();

            fnConfigDev_change(this,$dev);
        });

        $("#saveDragCabinet").on("click",function () {
            room3dObj.fnSaveDragCabinet();
        });

        $("#roomMessage").on("contextmenu", function(event){
            event.preventDefault();
            return false;
        });
        $("#3dOperator").on("contextmenu", function(event){
            event.preventDefault();
            return false;
        })

        $("#move_cabinet").on("click",function () {
            layerIndex = null;
            fnCloseLayer();
            layerIndex =layer.open({
                title:"移除机柜",
                area: ['400px', '200px'],
                content:"确定移除该机柜?",
                icon: 3,
                skin: 'layer-ext-moon',
                btn:["确定"],
                yes: function(index){
                    layer.close(index);
                    console.info("机柜移除成功..........")
                    fnMoveCabinet();
                    layerIndex = null;
                },
                cancel: function(index, layero){
                    layerIndex = null;
                }
            });
        });

        $("#bind_amm").on("click",function () {
            if(curCabinetObj.length !=0){
                var children = curCabinetObj.children;
                layerIndex = null;
                fnCloseLayer();
                if(children.length ==2){
                    layerIndex =layer.open({
                        title:"提示",
                        area: ['400px', '200px'],
                        content:"该机柜已无可绑定电表",
                        icon: 6,
                        skin: 'layer-ext-moon',
                        btn:["关闭"],
                        yes: function(index){
                            layer.close(index);
                            layerIndex = null;
                        },
                        cancel: function(index, layero){
                            layerIndex = null;
                        }
                    });
                }else{
                    $("#bindContent").empty();
                    layerIndex =layer.open({
                        area: ['600px', '400px'],
                        type: 1,
                        title: "绑定电表",
                        content: $('#bindAmmter'),
                        btn:["确定"],
                        yes: function(index){
                            Validate.fnCabinet(2-children.length,true);
                            var valid = $("#bindAmmter").valid();
                            if(valid){
                                layer.close(index);
                                fnBindAmmter_operator();
                                layerIndex = null;
                            }
                        },
                        cancel: function(index, layero){
                            layerIndex = null;
                        }
                    });
                    var $unbind = $("#bindOption");
                    fnUnBindAmmter($unbind);
                    $unbind.chosen({search_contains: true,no_results_text:"搜索不存在"});
                    $unbind.trigger("liszt:updated");
                }
            }

        });

        $("#unbind_amm").on("click",function () {
            if(curCabinetObj.length !=0){
                var children = curCabinetObj.children;
                layerIndex = null;
                fnCloseLayer();
                if(children.length ==0){
                    layerIndex =layer.open({
                        title:"提示",
                        area: ['400px', '200px'],
                        content:"该机柜已无可解除绑定电表",
                        icon: 6,
                        skin: 'layer-ext-moon',
                        btn:["关闭"],
                        yes: function(index){
                            layer.close(index);
                            layerIndex = null;
                        },
                        cancel: function(index, layero){
                            layerIndex = null;
                        }
                    });
                }else {
                    var leftAmmter = curCabinetObj.leftAmmeter;
                    var rightAmmter = curCabinetObj.rightAmmeter;
                    var obj = [];
                    if(leftAmmter !=undefined){
                        obj.push(leftAmmter);
                    }

                    if(rightAmmter !=undefined){
                        obj.push(rightAmmter);
                    }
                    var htmlJson = {"data":obj};
                    var htmlStr = doT.template($("#unBindTemplate").text());
                    var html =htmlStr(htmlJson);
                    layerIndex =layer.open({
                        area: ['600px', '300px'],
                        type: 1,
                        title: "解除绑定",
                        content: html,
                        btn:["确定"],
                        yes: function(index){
                            var valid = Validate.fnUnAmmter();
                            if(valid){
                                fnUnBindAmmter_operator();
                                $("#spanId").html("")
                                layer.close(index);
                                layerIndex = null;
                            }else{
                                $("#spanId").html("请选择一项")
                            }
                        },
                        cancel: function(index, layero){
                            layerIndex = null;
                        }
                    });
                    $("input:checkbox").uniform();
                }
            }

        });

        $('#canvas-frame').mousemove(function(event){
            pageX = event.clientX - document.body.scrollLeft - document.documentElement.scrollLeft;
            pageY = event.clientY - document.body.scrollTop - document.documentElement.scrollTop;
        });
    }

    //3d启动
    var threeStart = function () {
        var initOption = {
            antialias: true,
            showHelpGrid: false,
            clearCoolr: 0x112233
        };
        room3dObj = new Room3D.room3D();
        var Aobjects = {
            objects: [
                {//地板
                    show: true,
                    uuid: "",
                    name: 'floor',
                    objType: 'floor',
                    length: 2000,
                    width: 1600,
                    height: 10,
                    rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle]
                    x: 0,
                    y: 0,
                    z: 0,
                    style: {
                        skinColor: 0x8ac9e2,
                        skin: floorSpin,
                    }
                },
                { //墙体
                    show: true,
                    uuid: "",
                    name: 'wall',
                    objType: 'wall',
                    thick: 20,
                    length: 400,
                    height: 340,
                    wallData: [
                        {//wall1 后面的墙
                            uuid: "",
                            name: 'wall',
                            thick: 20,
                            height: 240,
                            skin: wallSpin,
                            startDot: {
                                x: -980,
                                y: 120,
                                z: -780
                            },
                            endDot: {
                                x: 980,
                                y: 120,
                                z: -780
                            },
                        },
                        {//wall2 前面的墙
                            uuid: "",
                            name: 'wall',
                            thick: 20,
                            height: 240,
                            skin: wallSpin,
                            startDot: {
                                x: -980,
                                y: 120,
                                z: 550
                            },
                            endDot: {
                                x: 980,
                                y: 120,
                                z: 550
                            },
                            rotation: [{ direction: 'x', degree: 0 }],
                            childrens: [
                                {
                                    op: '-',
                                    show: true,
                                    uuid: "",
                                    name: 'doorhole',
                                    objType: 'doorhole',
                                    thick: 20,
                                    height: 210,
                                    startDot: {
                                        x: 198,
                                        y: 112,
                                        z: 550
                                    },
                                    endDot: {
                                        x: 402,
                                        y: 112,
                                        z: 550
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorLeft',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 8,
                                    height: 210,
                                    startDot: {
                                        x: 196,
                                        y: 115,
                                        z: 555
                                    },
                                    endDot: {
                                        x: 300,
                                        y: 115,
                                        z: 555
                                    },
                                    skin: leftDoorSpin,
                                },
                                {
                                    show: true,
                                    name: 'doorRight',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 8,
                                    height: 210,
                                    startDot: {
                                        x: 300,
                                        y: 115,
                                        z: 555
                                    },
                                    endDot: {
                                        x: 404,
                                        y: 115,
                                        z: 555
                                    },
                                    skin: rightDoorSpin,
                                },
                                // {
                                //     show: true,
                                //     name: 'doorControl',
                                //     uuid: "",
                                //     objType: 'cube',
                                //     thick: 10,
                                //     height: 39,
                                //     startDot: {
                                //         x: 120,
                                //         y: 160,
                                //         z: 565
                                //     },
                                //     endDot: {
                                //         x: 160,
                                //         y: 160,
                                //         z: 565
                                //     },
                                //     skin: controlDoorSpin,
                                // },

                                {
                                    op: '-',
                                    show: true,
                                    uuid: "",
                                    name: 'windowHole',
                                    objType: 'windowHole',
                                    thick: 20,
                                    height: 160,
                                    startDot: {
                                        x: -550,
                                        y: 112,
                                        z: 550
                                    },
                                    endDot: {
                                        x: 50,
                                        y: 112,
                                        z: 550
                                    },
                                },
                            ]
                        },
                        {//wall3 左边墙
                            uuid: "",
                            name: 'wall',
                            thick: 20,
                            height: 240,
                            skin: wallSpin,
                            startDot: {
                                x: 980,
                                y: 120,
                                z: -780
                            },
                            endDot: {
                                x: 980,
                                y: 120,
                                z: 550
                            },
                        },
                        {//wall4 右边墙
                            uuid: "",
                            name: 'wall',
                            thick: 20,
                            height: 240,
                            skin: wallSpin,
                            startDot: {
                                x: -980,
                                y: 120,
                                z: -780
                            },
                            endDot: {
                                x: -980,
                                y: 120,
                                z: 550
                            },
                        }
                    ],
                    style: {
                        skinColor: 0x8ac9e2
                    }

                },
                {//玻璃
                    show: true,
                    name: 'windowGlass',
                    uuid: "",
                    objType: 'glasses',
                    width: 600,
                    height: 160,
                    pic:"./static/jquery/three/img/white.png",
                    transparent: true,
                    opacity: 0.7,
                    position: { x: -250, y: 112, z: 560 },
                    rotation: { x: 0, y: 0 * Math.PI, z: 0 },
                    blending: false,
                },
            ]
        }
        room3dObj.init3D('canvas-frame', initOption, Aobjects);
        room3dObj.start();

        fnGetRoomObj();

    };

    //创建机房实体--ajax
    var fnGetRoomObj = function () {
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: dataRoomUrl+"?datatype=qryalldev&drid="+roomId,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetData_CallBack(paramArray) {
            if(paramArray.code===0){
                var deviceObjs = paramArray.data.deviceObjs;
                var rackObjs = paramArray.data.rackObjs;
                var airI = -1;
                var upsI = -1;
                // if(deviceObjs.length !=0){
                    for(var i=0;i<deviceObjs.length;i++){
                        var devObj = deviceObjs[i];
                        var devCatetoryId = devObj.devCatetoryId;
                        if(devCatetoryId ==3){
                            airI++;
                        }
                        if(devCatetoryId ==5){
                            upsI++;
                        }
                        switch (devCatetoryId){
                            case 1:
                                fnSetDampTemp(devObj);
                                break;
                            case 10:
                                fnSetIoDev(devObj);
                                break;
                            // case 15:
                            case 16:
                            case 3:
                                fnSetAir(devObj, airI);
                                break;
                            case 5:
                            case 15:
                                fnSetUps(devObj,upsI);
                                break;
                        }
                    }

                    for(var i=0;i<rackObjs.length;i++){
                        var rackObj = rackObjs[i];
                        var uuid = rackObj.rackId;
                        var x = rackObj.XAxis;
                        var y = rackObj.YAxis;
                        var z = rackObj.ZAxis;
                        var leftAmmeter = rackObj.leftAmmeter
                        var rigetAmmeter = rackObj.rigetAmmeter;
                        var left = fnGetAmmterMessage(deviceObjs,leftAmmeter);
                        var riget = fnGetAmmterMessage(deviceObjs,rigetAmmeter);
                        var cabinetObj = fnSetCabinet(uuid,x,y,z,left,riget);
                        room3dObj.fnSetCabiniet(cabinetObj);
                    }
                // }
            }
        }
    };

    //查看左右电表信息
    var fnGetAmmterMessage = function (deviceObjs,ammeter) {
        var data = null;
        for(var i=0;i<deviceObjs.length;i++){
            var devObj = deviceObjs[i];
            var uuid = devObj.devId;
            if(uuid ==ammeter){
                data = devObj;
            }
        }
        return data;
    }

    var fnInitRelate =function () {
        // var drId = $("#roomMessage").find(".pricing-active .drId").text();
        // if(devTable != undefined){
        //     devTable.fnClearTable();
        // }
        // if(accTable != undefined){
        //     accTable.fnClearTable();
        // }
        // if(snmTable != undefined){
        //     snmTable.fnClearTable();
        // }
        fnInitDevTable(roomId);
        fnInitInterAccessTable(roomId);
        fnInitSnmTable(roomId);
    }

    //初始化关联设备--数据
    var fnInitDevTable = function (drId) {
        //相关设备信息
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: systemDeviceUrl+"?operator=qrydev_droom&dataRoomId="+drId,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetDevData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetDevData_CallBack(paramArray) {
            if(paramArray.code===0){
                var aaData = paramArray.data;
                var title =[
                    {"sTitle":"ID","mData":"devId","bVisible":false},
                    {"sTitle":"devCatetoryId","mData":"devCatetoryId","bVisible":false},
                    {"sTitle":"所属接入间","mData":"accRoom","bVisible":true},
                    {"sTitle":"所属SNM模块","mData":"snmModule","bVisible":true},
                    {"sTitle":"名称","mData":"devName","bVisible":true},
                    {"sTitle":"设备编码","mData":"devNo","bVisible":true},
                    {"sTitle":"设备类型","mData":"devType","bVisible":true},
                    {"sTitle":"投入时间","mData":"startTime","bVisible":true},
                    {"sTitle":"上次通信时间","mData":"lastContactTime","bVisible":true},
                    {"sTitle":"通信地址","mData":"comAddr","bVisible":true},
                    {"sTitle":"SNMP地址","mData":"snmpIp","bVisible":true},
                ];
                var dataParam = $.extend(true,{},PublicConstant.Table_Default_Options,{
                    "aaData":aaData,
                    "aoColumns":title,
                    "scrollX": true,
                    "aoColumnDefs":[
                        {"aTargets":[4],"mRender":function(data,type,full){
                            return "<a href='javascript:;' onclick=\"RoomInfo.fnClickDevImg('"+full.devId+"','"+full.devCatetoryId+"','"+full.devTypeId+"')\">"+data+"</a>"
                        }},

                        //{"bVisible":false,"aTargets":[2,3,4]}
                    ],
                });
                if(devTable != undefined){
                    // devTable.fnDestroy();
                    // $('#roomRelateDevTable').empty();
                    devTable.clear();
                    devTable.rows.add(aaData);
                    devTable.draw(false);
                }else{
                    devTable = CommonJS.$DataTable(dataParam ,"roomRelateDevTable",title);
                }

            }
        }
    };

    //初始化接入间--数据
    var fnInitInterAccessTable = function (drId) {
        //相关接入间信息
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: systemDataRoomUrl+"?operator=qryaccroom&drid="+drId,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetDevData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetDevData_CallBack(paramArray) {
            if(paramArray.code===0){
                var aaData = paramArray.data;
                var title = [
                    { "sTitle": "ID", "mData": "id" ,"bVisible":false},
                    { "sTitle": "名称", "mData": "accName" ,"bVisible":true},
                    { "sTitle": "省份", "mData": "provinceName" ,"bVisible":true},
                    { "sTitle": "城市", "mData": "cityName","bVisible":true},
                    { "sTitle": "地理位置", "mData": "position","bVisible":true},
                    { "sTitle": "最大终端设备数", "mData": "userDevMax" ,"bVisible":false},
                ];
                var dataParam = $.extend(true,{},PublicConstant.Table_Default_Options,{
                    "aaData":aaData,
                    "scrollX": true,
                    "aoColumns":title,
                });
                if(accTable != undefined){
                    // accTable.fnDestroy();
                    // $('#roomRelateInterAccessTable').empty();
                    accTable.clear();
                    accTable.rows.add(aaData);
                    accTable.draw(false);
                }else{
                    accTable = CommonJS.$DataTable(dataParam ,"roomRelateInterAccessTable",title);
                }

            }
        }
    }

    //初始化snm--数据
    var fnInitSnmTable = function (drId) {
        //相关snm模块信息
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: snmModuleUrl+"?datatype=dataroomsnmwithoutpage&drid="+drId,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetDevData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetDevData_CallBack(paramArray) {
            if(paramArray.code===0){
                var aaData = paramArray.data.aaData;
                // var title = PublicConstant.Snm_Columns;
                var aoComluns = paramArray.data.aoComluns;
                var showFlags = paramArray.data.showFlags;
                var title = [];
                for(var i=0;i<aoComluns.length;i++){
                    title[i] =  { "sTitle": aoComluns[i].value,"mData":aoComluns[i].key,"bVisible":showFlags[i],};
                }
                var dataParam = $.extend(true,{},PublicConstant.Table_Default_Options,{
                    "aaData":aaData,
                    "aoColumns":title,
                    "scrollX": true,
                    "aoColumnDefs":[
                        {"aTargets":[1],"mRender":function(data,type,full){
                            var subHtml = "<span class='label label-important'>未分配</span>";
                            if(data){
                                subHtml = "<span class='label label-success'>已分配</span>";
                            }
                            return subHtml;
                        }},
                        {"aTargets":[2],"mRender":function(data,type,full){
                            var subHtml = "<i class='icon-off' style='color: rgb(255, 0, 0); font-size: 15px;'>离线</i>";
                            if(data){
                                subHtml = "<i class='icon-play-circle' style='color: rgb(0, 255, 0); font-size: 15px'>在线</i>";
                            }
                            return subHtml;
                        }},
                    ],
                });
                if(snmTable != undefined){
                    // snmTable.fnDestroy();
                    // $('#roomRelateSnmTable').empty();
                    snmTable.clear();
                    snmTable.rows.add(aaData);
                    snmTable.draw(false);
                }else{
                    snmTable = CommonJS.$DataTable(dataParam ,"roomRelateSnmTable",title);
                }
            }
        }
    }

    var fnClickDevImg = function (devId,devCatetoryId,devTypeId) {
        /*点击设备图片跳转链接*/
        $.cookie("devId", devId, {
            expires: 1
        });
        $.cookie("devTypeId", devTypeId, {
            expires: 1
        });
        $.cookie("devCatetoryId", devCatetoryId, {
            expires: 1
        });
        window.location.href = PublicConstant.fnGetDevMonitorPage(devCatetoryId);
        // window.location.href = "./alertdev_details?devnumcode=" + encodeURI(devcode);
    };

    var fnClickInterImg = function (drId) {
        /*点击设备图片跳转链接*/
        $.cookie("drId", drId, {
            expires: 1
        });
        window.location.href = "roomInfo";
    };

    //获取空调相关--位置信息
    var fnSetAir  = function (devObj,p) {
        var air3D = null;
        switch (p){
            case 0:
                air3D = PublicConstant.Room3d.ari3D_leftUp(devObj);
                break;
            case 1:
                air3D = PublicConstant.Room3d.ari3D_rightUp(devObj);
                break;
            case 2:
                air3D = PublicConstant.Room3d.ari3D_leftDown(devObj);
                break;
            case 3:
                air3D = PublicConstant.Room3d.ari3D_rightDown(devObj);
                break;
        }
        room3dObj.fnSetAir(air3D);

    }

    //获取机柜和电表信息
    var fnSetCabinet = function (uuid,x,y,z,leftAmmeter,rightAmmeter) {
        var lAmmter = null;
        var rAmmter = null;
        if(leftAmmeter !=null){
            lAmmter = {
                show: true,
                name: 'cabinet_ammter',
                shellname:'left',
                uuid: leftAmmeter.devId,
                devObj:leftAmmeter,
                length: 12,
                height: 15,
                width: 5,
                rotation: { x: 0, y: Math.PI, z: 0 },
                blending: false,
                x: x-23,
                y: y + 79,
                z: z+36,
                style: {
                    skinColor: 0xfefefe,
                    skin: AmmterDoor
                }
            };

        }
        if(rightAmmeter !=null) {
            rAmmter = {
                show: true,
                name: 'cabinet_ammter',
                shellname:'right',
                uuid: rightAmmeter.devId,
                devObj: rightAmmeter,
                length: 12,
                height: 15,
                width: 5,
                rotation: { x: 0, y: Math.PI, z: 0 },
                blending: false,
                x: x+23,
                y: y + 79,
                z: z+36,
                style: {
                    skinColor: 0xfefefe,
                    skin: AmmterDoor
                }
            };
        }

        var cabinetObj = {
            show: true,
            name: 'cabinet',
            uuid: uuid,
            length: 60,
            height: 200,
            width: 70,
            rotation: { x: 0, y: Math.PI, z: 0 },
            blending: false,
            leftAmmeter:lAmmter,
            rightAmmeter:rAmmter,
            x: x,
            y: y,
            z: z,
            style: {
                skinColor: 0xfefefe,
                skin: CabinetDoor
            }
        };
        return cabinetObj;
    }

    //获取UPS信息
    var fnSetUps = function (devObj,upsI) {
        var z = 0;
        if(upsI % 2 == 0 ){
            z=upsI+150*upsI;
        }else{
            z=upsI-150*upsI;
        }
        var upsObj = {
            show:true,
            name: 'ups',
            shellname:'ups',
            uuid: devObj.devId,
            devObj:devObj,
            length: 66,
            height: 200,
            width: 70,
            rotation: { x: 0, y: Math.PI, z: 0 },
            blending: false,
            x: 900,
            y: 105,
            z: z,
            style: {
                skinColor: 0xfefefe,
                skin: UpsDoor
            }
        };

        room3dObj.fnSetUps(upsObj);
    };

    //获取门禁
    var fnSetIoDev = function (devObj) {
        var ioObj = {
            show: true,
            name: 'doorControl',
            uuid: devObj.devId,
            objType: 'cube',
            length: 50,
            height: 39,
            width: 10,
            devObj:devObj,
            rotation: { x: 0, y: Math.PI, z: 0 },
            blending: false,
            x: 140,
            y: 160,
            z: 565,
            style: {
                skinColor: 0xfefefe,
                skin: controlDoorSpin,
            }
        };
        room3dObj.fnSetDampTemp(ioObj);
    }

    //获取温湿度
    var fnSetDampTemp = function (devObj) {
        var dampObj = {
            show: true,
            name: 'dampTemp',
            uuid: devObj.devId,
            objType: 'cube',
            length: 10,
            height: 39,
            width: 50,
            devObj:devObj,
            rotation: { x: 0, y: Math.PI, z: 0 },
            blending: false,
            x: -970,
            y: 160,
            z: 0,
            style: {
                skinColor: 0xfefefe,
                skin: {
                    skin_fore: {
                        imgUrl:"./static/jquery/three/img/damp.png"
                    },
                }
            }
        };
        room3dObj.fnSetDampTemp(dampObj);
    }

    //显示点击电表的信息
    var fnLookAmmterMessage = function (devObj) {
        if(devObj !=null){
            var devCatetoryId = devObj.devCatetoryId;
            var devTypeId = devObj.devTypeId;
            var url =null;
            var width = 0,height = 0;
            switch (devCatetoryId){
                case 1:
                    url = devDataUrl+"dataCategory=analog&isLatest=true&devId="+devObj.devId+"&devTypeId="+devTypeId;
                    width = 320;
                    height = 110;
                    fnShowDeviceMessage(devObj,url,width,height);
                    break;
                case 5:
                case 15:
                    url = dataRoomUrl+"?datatype=qryups&devid="+devObj.devId+"&devTypeId="+devTypeId;
                    width = 320;
                    height = 210;
                    fnShowDeviceMessage(devObj,url,width,height);
                    break;
                case 2:
                    // url = PublicConstant.fnAmmeterTypeUrl_monitor(devTypeId);
                    url = dataRoomUrl+"?datatype=qryammeter&devid="+devObj.devId+"&devTypeId="+devTypeId;
                    // switch (parseInt(devTypeId)){
                    //     case 3:
                    //         url = dataRoomUrl+"?datatype=qryammeter&ammtype=ammetera&devid="+devObj.devId+"&devTypeId="+devTypeId;
                    //         break;
                    //     case 4:
                    //         url = dataRoomUrl+"?datatype=qryammeter&ammtype=ammeterb&devid="+devObj.devId+"&devTypeId="+devTypeId;
                    //         break;
                    // }
                    width = 320;
                    height = 110;
                    fnShowDeviceMessage(devObj,url,width,height);
                    break;
                case 16:
                case 3:
                    url = dataRoomUrl+"?datatype=qrypex&devid="+devObj.devId+"&devTypeId="+devTypeId;
                    width = 320;
                    height = 150;
                    fnShowDeviceMessage(devObj,url,width,height);
                    break;
                case 10:
                    url = devDataUrl+"dataCategory=status&devId="+devObj.devId+"&devTypeId="+devTypeId,
                    // url = devStatus+"?operator=device_status&devId="+devObj.devId+"&devTypeId="+devObj.devTypeId;
                    fnShowIoMessage(devObj,url);
                    break;

            };

        }
    };

    //显示门禁信息
    var fnShowIoMessage = function (devObj,url) {
        //相关设备信息
        var devData=[
            // [{"name":"名称:","displayName":devObj.devName}],
            // [{"name":"设备编码:","displayName":devObj.devNo}],
            // [{"name":"设备类型:","displayName":devObj.devType}],
            // [{"name":"上次通信时间:","displayName":devObj.lastContactTime}],
        ];

        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: url,
            async: false,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetData_CallBack(paramArray){
            if(paramArray.code==0){
                var fieldName = paramArray.data.titles;
                var latestData = paramArray.data.properties;
                for(var i=0;i<fieldName.length;i++){
                    var displayName = "";
                    if(latestData.length !=0 && latestData[0] !=""){
                        displayName = latestData[i];
                    }
                    var data = [{"name":fieldName[i]+":","displayName":displayName}];
                    devData.push(data);
                }
            }
        };
        var htmlJson = {"data":devData};
        var htmlStr = doT.template($("#devInfoTemplate").text());
        var html = "<div  class='form-horizontal'>"+htmlStr(htmlJson)+"</div>";
        layer.msg(html,
            {
                // title:"设备信息",
                // btn: ['确定'],
                time: 0,
                area: ['300px', '80px'],
                offset: [pageY/2+250+'px',pageX/2+280+'px']
            });
    };

    //显示温湿度信息
    var fnShowDeviceMessage = function (devObj,url,width,height) {
        //相关设备信息
        var devData=[
            // [{"name":"名称:","displayName":devObj.devName}],
            // [{"name":"设备编码:","displayName":devObj.devNo}],
            // [{"name":"设备类型:","displayName":devObj.devType}],
            // [{"name":"上次通信时间:","displayName":devObj.lastContactTime}],
        ];

        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: url,
            async: false,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetData_CallBack(paramArray){
            if(paramArray.code==0){
                var fieldName = paramArray.data.fieldName;
                var latestData = paramArray.data.latestData;
                for(var i=0;i<fieldName.length;i++){
                    var displayName = "";
                    if(latestData.length !=0){
                        displayName = latestData[i];
                    }

                    var data = [{"name":fieldName[i]+":","displayName":displayName}];
                    devData.push(data);
                }
            }
        };
        fnCloseLayer();
        var htmlJson = {"data":devData};
        var htmlStr = doT.template($("#devInfoTemplate").text());
        var html = "<div  class='form-horizontal'>"+htmlStr(htmlJson)+"</div>";
        layer.msg(html,
            {
                // title:"设备信息",
                // btn: ['确定'],
                time: 0,
                area: [width+'px', height+'px'],
                offset: [pageY/2+230+'px',pageX/2+250+'px']
            });
    }

    //关闭最新弹出框
    var fnCloseLayer = function () {
        if(layerIndex ==null){
            layer.close(layer.index);
        }
    }


    //获取未绑定机柜电表
    var fnUnBindAmmter = function ($room) {
        //相关设备信息
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'get',
            url: rackUrl+"?operator=qryunalloc&drid="+roomId,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fnGetData_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);

        function fnGetData_CallBack(paramArray){
            $room.empty();
            if(paramArray.code==0){
                unAllocDev = paramArray.data;
                for(var i=0;i<unAllocDev.length;i++){
                    var devId = unAllocDev[i].devId;
                    var devName = unAllocDev[i].devName;
                    var html = "<option value='"+devId+"'>"+devName+"</option>";
                    $room.append(html);
                }
                $room.chosen({search_contains: true,no_results_text:"搜索不存在"});
                $room.trigger("liszt:updated");

            }
        }
    }

    //设备下拉框--事件处理
    var fnConfigDev_change = function (that,$dev){
        var devNoArray = $(that).val();
        var devData = {"data":[]};
        if(devNoArray !=null){
            for(var i=0;i<unAllocDev.length;i++){
                var devId = unAllocDev[i].devId;
                if(devNoArray[devNoArray.length-1] == devId){
                    devData={"data":[
                        [{"name":"名称:","displayName":unAllocDev[i].devName}],
                        [{"name":"设备编码:","displayName":unAllocDev[i].devNo}],
                        [{"name":"设备类型:","displayName":unAllocDev[i].devType}],
                        [{"name":"启用时间:","displayName":unAllocDev[i].startTime}],
                        [{"name":"通信时间:","displayName":unAllocDev[i].lastContactTime}],
                        [{"name":"通信地址:","displayName":unAllocDev[i].comAddr}],
                        [{"name":"SNMP地址:","displayName":unAllocDev[i].snmpIp}],
                    ]};
                }
            }
        }
        var devHtmlStr = doT.template($("#ConfigTemplate").text());
        $dev.html(devHtmlStr (devData));
    }

    //为机柜绑定电表设备--ajax方法
    var fnConfigDev_operator = function () {
        var devId = $("#bindOption").val();
        var rackClass = new PublicConstant.RackClass();
        rackClass.drid = roomId;
        rackClass.XAxis = 300;
        rackClass.YAxis = 105;
        rackClass.ZAxis = 700;
        if(devId !=null){
            if(devId.length ==2){
                rackClass.leftAmmeter = devId[0];
                rackClass.rightAmmeter = devId[1];
            }else if(devId.length ==1){
                rackClass.leftAmmeter = devId[0];
            }
        }
        var rackObj = JSON.stringify(rackClass);
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'post',
            url: rackUrl,
            data:{
                "operator":"update",
                "rackObj":rackObj,
            },
            processData: true,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fn_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);
        function fn_CallBack(paramArray) {
            $("#bindAmmterModal").modal("hide");
            $("#bindOption").empty();
            $("#bindContent").empty();
            if(paramArray.code===0){
                var rack = paramArray.data.tSysRack;
                var x = rack.xAxis;
                var y = rack.yAxis;
                var z = rack.zAxis;
                var leftAmmeter = paramArray.data.leftAmmeter;
                var rightAmmeter = paramArray.data.rightAmmeter;
                var uuid = rack.id;
                var cabinetObj = fnSetCabinet(uuid,x,y,z,leftAmmeter,rightAmmeter);
                room3dObj.fnSetCabiniet(cabinetObj);
                CommonJS.fnMessageSuccess("机柜创建成功,位置未分配,请重新移动,确认信息.");
            }else{
                CommonJS.fnMessageError("机柜创建成功失败,请确认信息.");
            }
        }
    }

    //更新机柜信息
    var fnUpdateCabinet = function (rackId,leftAmmeter,rightAmmeter,x,y,z) {
        var rackClass = new PublicConstant.RackClass();
        rackClass.drid = roomId;
        rackClass.XAxis = x;
        rackClass.YAxis = y;
        rackClass.ZAxis = z;
        if(leftAmmeter !=undefined){
            rackClass.leftAmmeter = leftAmmeter.devObj.devId;
        }
        if(rightAmmeter !=undefined){
            rackClass.rightAmmeter = rightAmmeter.devObj.devId;
        }
        if(rackId !=null){
            rackClass.id = rackId;
        }
        var rackObj = JSON.stringify(rackClass);
        var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
            type: 'post',
            url: rackUrl,
            data:{
                "operator":"update",
                "rackObj":rackObj,
            },
            processData: true,
            success: function (data, textStatus, jqXHR) {
                if(textStatus==="success"){
                    fn_CallBack(data);
                }
            },
            error: function (xhr, textStatus, error) {

            },
        });
        $.ajax(ajaxParam);
        function fn_CallBack(paramArray) {
            if(paramArray.code===0){
                CommonJS.fnMessageSuccess("机柜移动位置状态保存成功,请确认消息.");
            }else{
                CommonJS.fnMessageError("机柜移动位置状态保存失败,请确认消息.");
            }
        }
    };

    //右键绑定和取消 绑定电表
    var fnUnBindAmmter_event = function (event,object) {
        event.preventDefault();
        curCabinetObj = object;
        //捕获页

        layerIndex = layer.open({
            area: ['300px', '105px'],
            type: 1,
            shade: false,
            title: false,
            content: $("#3dOperator"),
            cancel: function(index, layero){
                layerIndex = null;
            }
        });
    }

    //移除机柜
    var fnMoveCabinet = function () {
        if(curCabinetObj.length !=0 && curCabinetObj !=undefined){
            var rackid = curCabinetObj.uuid;
            var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
                type: 'delete',
                url: rackUrl+"?operator=delete&rackid="+rackid,
                processData: true,
                success: function (data, textStatus, jqXHR) {
                    if(textStatus==="success"){
                        fn_CallBack(data);
                    }
                },
                error: function (xhr, textStatus, error) {

                },
            });
            $.ajax(ajaxParam);
            function fn_CallBack(paramArray) {
                if(paramArray.code===0){
                    CommonJS.fnMessageSuccess("机柜删除成功,请确认消息.");
                    room3dObj.fnMoveCabinet(curCabinetObj);
                    curCabinetObj = [];
                }else{
                    CommonJS.fnMessageError("机柜删除失败,请确认消息.");
                }
            }
        }
    }

    //绑定电表
    var fnBindAmmter_operator = function () {
        if(curCabinetObj.length !=0){
            var selected = $("#bindOption").val();
            var id = curCabinetObj.uuid;
            var leftAmmter = curCabinetObj.leftAmmeter;
            var rightAmmter = curCabinetObj.rightAmmeter;
            var position = curCabinetObj.position;
            var rackClass = new PublicConstant.RackClass();
            rackClass.id = id;
            rackClass.drid = roomId;
            rackClass.XAxis = position.x;
            rackClass.YAxis = position.y;
            rackClass.ZAxis = position.z;
            if(selected.length ==1){
                if(leftAmmter ==null){
                    rackClass.leftAmmeter = parseInt(selected[0]);
                    if(rightAmmter !=null){
                        rackClass.rightAmmeter = rightAmmter.devObj.devId;
                    }
                }else{
                    rackClass.leftAmmeter = leftAmmter.devObj.devId;
                    rackClass.rightAmmeter = parseInt(selected[0]);
                }

            }

            if(selected.length ==2){
                rackClass.leftAmmeter = parseInt(selected[0]);
                rackClass.rightAmmeter = parseInt(selected[1]);
            }

            var rackObj = JSON.stringify(rackClass);
            var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
                type: 'post',
                url: rackUrl,
                data:{
                    "operator":"update",
                    "rackObj":rackObj,
                },
                processData: true,
                success: function (data, textStatus, jqXHR) {
                    if(textStatus==="success"){
                        fn_CallBack(data);
                    }
                },
                error: function (xhr, textStatus, error) {

                },
            });
            $.ajax(ajaxParam);
            function fn_CallBack(paramArray) {
                if(paramArray.code===0){
                    room3dObj.fnMoveCabinet(curCabinetObj);
                    var rack = paramArray.data.tSysRack;
                    var x = rack.xAxis;
                    var y = rack.yAxis;
                    var z = rack.zAxis;
                    var leftAmmeter = paramArray.data.leftAmmeter;
                    var rightAmmeter = paramArray.data.rightAmmeter;
                    var uuid = rack.id;
                    var cabinetObj = fnSetCabinet(uuid,x,y,z,leftAmmeter,rightAmmeter);
                    room3dObj.fnSetCabiniet(cabinetObj);
                    CommonJS.fnMessageSuccess("绑定电表成功,请确认消息.");
                }else{
                    CommonJS.fnMessageError("绑定电表失败,请确认消息.");
                }
            }
        }
    }

    //解除绑定电表
    var fnUnBindAmmter_operator = function () {
        if(curCabinetObj.length !=0){
            var leftCheck = $("#left").is(':checked');
            var rightCheck = $("#right").is(':checked');

            var id = curCabinetObj.uuid;
            var leftAmmter = curCabinetObj.leftAmmeter;
            var rightAmmter = curCabinetObj.rightAmmeter;
            var position = curCabinetObj.position;
            var rackClass = new PublicConstant.RackClass();
            rackClass.id = id;
            rackClass.drid = roomId;
            rackClass.XAxis = position.x;
            rackClass.YAxis = position.y;
            rackClass.ZAxis = position.z;

            if(leftCheck){
                rackClass.leftAmmeter = null;
            }else if(leftAmmter !=null){
                rackClass.leftAmmeter = leftAmmter.devObj.devId
            }
            if(rightCheck){
                rackClass.rightAmmeter = null;
            }else if(rightAmmter !=null){

                rackClass.rightAmmeter = rightAmmter.devObj.devId
            }
            var rackObj = JSON.stringify(rackClass);
            var ajaxParam = $.extend(true,{},PublicConstant.Ajax_Option,{
                type: 'post',
                url: rackUrl,
                data:{
                    "operator":"update",
                    "rackObj":rackObj,
                },
                processData: true,
                success: function (data, textStatus, jqXHR) {
                    if(textStatus==="success"){
                        fn_CallBack(data);
                    }
                },
                error: function (xhr, textStatus, error) {

                },
            });
            $.ajax(ajaxParam);
            function fn_CallBack(paramArray) {
                if(paramArray.code===0){
                    room3dObj.fnMoveCabinet(curCabinetObj);
                    var rack = paramArray.data.tSysRack;
                    var x = rack.xAxis;
                    var y = rack.yAxis;
                    var z = rack.zAxis;
                    var leftAmmeter = paramArray.data.leftAmmeter;
                    var rightAmmeter = paramArray.data.rightAmmeter;
                    var uuid = rack.id;
                    var cabinetObj = fnSetCabinet(uuid,x,y,z,leftAmmeter,rightAmmeter);
                    room3dObj.fnSetCabiniet(cabinetObj);
                    CommonJS.fnMessageSuccess("解除绑定的电表成功,请确认消息.");
                }else{
                    CommonJS.fnMessageError("解除绑定的失败,请确认消息.");
                }
            }
        }
    }


    window.onresize = function () {
        /*浏览器大小变化--刷新操作*/
        fnOnResize();
    };

    function fnOnResize(){
        /*刷新操作--刷新元素*/
    }




    return{
        init:function () {
            fnInitShowPage();
            fnInitEventPage();
        },
        fnClickDevImg:fnClickDevImg,
        fnClickInterImg:fnClickInterImg,
        fnUpdateCabinet:fnUpdateCabinet,
        fnLookAmmterMessage:fnLookAmmterMessage,
        fnCloseLayer:fnCloseLayer,
        fnUnBindAmmter_event:fnUnBindAmmter_event,
    }

}();