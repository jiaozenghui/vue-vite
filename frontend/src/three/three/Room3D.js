/**
 * Created by Mars on 2017/10/13.
 */
var Room3D = function () {
    var radius = 100, theta = 0;
    var room3dObj = null;
    var dbclick =0;
    var room3D = function () {

    }

    //初始化3D模型参数
    room3D.prototype.init3D =  function (id,option,json) {
        //参数处理
        this.option = new Object();
        this.option.antialias = option.antialias || true;
        this.option.clearCoolr = option.clearCoolr || 0x1b7ace;
        this.option.showHelpGrid = option.showHelpGrid || false;
        //对象
        this.id = id;
        this.width = $("#" + id).width();
        this.height = $("#" + id).height();
        this.renderer = null;//渲染器
        this.scene = null;//场景
        this.camera = null;//摄像机
        this.selected=null;
        this.objects = [];
        this.mouseClick = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.controls = null;//鼠标控制器
        this.trsnaformControls = null;//鼠标控制器
        this.dragcontrols = null;
        this.objList = json.objects;//对象列表
        this.eventList = json.events;//事件对象列表
        this.dragList = [];
        this.objectStatusList = {};
        this.clickList = [];
        var that = this;

    };

    //开始搭建场景
    room3D.prototype.start = function () {
        var that = this;
        if (Detector.webgl) {
            room3dObj = that;
            that.initThree(that.id);
            that.initCamera();
            that.initScene();

            that.initHelpGrid();
            that.initLight();
            //添加3D对象
            $.each(that.objList, function (index,obj) {
                that.InitAddObject(obj);
            });
            that.initMouseCtrl();
            that.animation();
        } else {
            layer.open({
                title: '提示',
                icon:2,
                content: '您当前的浏览器不支持WebGL,请更换高版本浏览器...'
            });
        }
    };

    //初始化渲染器
    room3D.prototype.initThree = function () {
        var that = this;
        that.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: that.option.antialias });
        that.renderer.setSize(that.width, that.height);
        $("#" + that.id).append(that.renderer.domElement);
        that.renderer.setClearColor(that.option.clearCoolr, 1.0);
        that.renderer.shadowMap.enabled = true;
        that.renderer.shadowMapSoft = true;
        //事件
        that.renderer.domElement.addEventListener('mousedown', that.onDocumentMouseDown, false);
        that.renderer.domElement.addEventListener('mousemove', that.onDocumentMouseMove, false);
    }

    //初始化摄像机
    room3D.prototype.initCamera = function () {
        var that = this;
        that.camera = new THREE.PerspectiveCamera(45, that.width / that.height, 1, 100000);
        that.camera.name = 'mainCamera';
        that.camera.position.x =0;
        that.camera.position.y =2000;
        that.camera.position.z =1800;
        that.camera.up.x = 0;
        that.camera.up.y =1;
        that.camera.up.z =0;
        that.camera.lookAt({ x: 100, y: 0, z: 100 });
        that.objects.push(that.camera);
        that.dragList.push(that.camera);
        that.clickList.push(that.camera);
    }

    //创建场景
    room3D.prototype.initScene=function() {
        var that = this;
        that.scene = new THREE.Scene();
    }

    //创建场景
    room3D.prototype.initHelpGrid = function () {
        var that = this;
        if (that.option.showHelpGrid) {
            var helpGrid = new THREE.GridHelper(1000, 50);
            that.scene.add(helpGrid);
        }
    }

    //灯光布置
    room3D.prototype.initLight = function () {
        /*
         AmbientLight: 环境光，基础光源，它的颜色会被加载到整个场景和所有对象的当前颜色上。
         PointLight：点光源，朝着所有方向都发射光线
         SpotLight ：聚光灯光源：类型台灯，天花板上的吊灯，手电筒等
         DirectionalLight：方向光，又称无限光，从这个发出的光源可以看做是平行光.
         */
        var that = this;
        var light = new THREE.AmbientLight(0xcccccc);
        light.position.set(0, 0,0);
        that.scene.add(light);
        var light2 = new THREE.PointLight(0x555555);
        light2.shadow.camera.near =1;
        light2.shadow.camera.far = 5000;
        light2.position.set(0, 350, 0);
        light2.castShadow = true;//表示这个光是可以产生阴影的
        that.scene.add(light2);

    }

    //创建鼠标控制器
    room3D.prototype.initMouseCtrl=function() {
        var that = this;
        that.controls = new THREE.OrbitControls(that.camera,that.renderer.domElement);
        that.controls.addEventListener('change', that.updateControls);

    }

    //控制器回调
    room3D.prototype.updateControls = function () {
        var that = this;
        // that.controls.update();
    }

    //控制器回调
    room3D.prototype.updateTransformControls = function () {
        var that = this;
        // that.trsnaformControls.update();
    }

    //循环渲染界面
    room3D.prototype.animation = function () {
        var that = room3dObj;
        if (TWEEN != null && typeof (TWEEN) != 'undefined') {
            TWEEN.update();
        }
        requestAnimationFrame(that.animation);
        that.renderer.render(that.scene, that.camera);
    }

    //添加对象到场景中
    room3D.prototype.addObject = function (obj) {
        var that = room3dObj;
        that.scene.add(obj);
        that.objects.push(obj);
    }
    
    /* 添加对象*/
    room3D.prototype.InitAddObject = function (obj) {
        var that = this;
        if (obj.show == null || typeof (obj.show) == 'undefined' || obj.show) {
            var tempObj = null;
            switch (obj.objType) {
                case 'floor':
                    tempObj = that.CreateFloor(obj);
                    that.addObject(tempObj);
                    break;
                case 'wall':
                    that.CreateWall(that,obj);
                    break;
                case 'glasses':
                    that.createGlasses(that, obj);
                    break;
                case 'cube':
                    tempObj = that.createCube(that, obj);
                    that.addObject(tempObj);
                break;
            }
        }
    }

    //创建地板
    room3D.prototype.CreateFloor = function (obj) {
        var that = this;
        var cube = that.createCube(that, obj);
        return cube;
    };

    //创建墙体
    room3D.prototype.CreateWall = function (that, obj) {
        if (that == null) {
            that = this;
        }
        var _commonThick = obj.thick || 40;//墙体厚度
        var _commonLength = obj.length || 100;//墙体厚度
        var _commonHeight = obj.height || 300;//强体高度
        var _commonSkin = obj.style.skinColor || 0x8ac9e2;
        //建立墙面
        $.each(obj.wallData, function (index, wallobj) {
            var wallLength = _commonLength;
            var wallWidth = wallobj.thick||_commonThick;
            var positionX = ((wallobj.startDot.x||0) + (wallobj.endDot.x||0)) / 2;
            var positionY = ((wallobj.startDot.y || 0) + (wallobj.endDot.y || 0)) / 2;
            var positionZ = ((wallobj.startDot.z || 0) + (wallobj.endDot.z || 0)) / 2;
            //z相同 表示x方向为长度
            if (wallobj.startDot.z == wallobj.endDot.z) {
                wallLength = Math.abs(wallobj.startDot.x - wallobj.endDot.x);
                wallWidth = wallobj.thick || _commonThick;
            } else if (wallobj.startDot.x == wallobj.endDot.x) {
                wallLength = wallobj.thick || _commonThick;
                wallWidth = Math.abs(wallobj.startDot.z - wallobj.endDot.z);
            }
            var cubeobj = {
                length: wallLength,
                width: wallWidth,
                height: wallobj.height || _commonHeight,
                rotation: wallobj.rotation,
                x: positionX,
                y: positionY,
                z: positionZ,
                uuid: wallobj.uuid,
                name:wallobj.name,
                style: {
                    skinColor: _commonSkin,
                    skin:wallobj.skin
                }
            }
            var _cube = that.createCube(that, cubeobj);
            if (that.commonFunc.hasObj(wallobj.childrens) && wallobj.childrens.length > 0) {
                $.each(wallobj.childrens, function (index, walchildobj) {
                    var _newobj = that.CreateHole(that, walchildobj);
                    _cube = that.mergeModel(that, walchildobj.op, _cube, _newobj);
                });
            }
            that.addObject(_cube);

        });
    }

    //挖洞
    room3D.prototype.CreateHole = function (that, obj) {
        if (that == null) {
            that = this;
        }
        var _commonThick =  40;//墙体厚度
        var _commonLength =  100;//墙体厚度
        var _commonHeight =  300;//强体高度
        var _commonSkin = 0x8ac9e2;
        //建立墙面
        var wallLength = _commonLength;
        var wallWidth = obj.thick || _commonThick;
        var positionX = ((obj.startDot.x || 0) + (obj.endDot.x || 0)) / 2;
        var positionY = ((obj.startDot.y || 0) + (obj.endDot.y || 0)) / 2;
        var positionZ = ((obj.startDot.z || 0) + (obj.endDot.z || 0)) / 2;
        //z相同 表示x方向为长度
        if (obj.startDot.z == obj.endDot.z) {
            wallLength = Math.abs(obj.startDot.x - obj.endDot.x);
            wallWidth = obj.thick || _commonThick;
        } else if (obj.startDot.x == obj.endDot.x) {
            wallLength = obj.thick || _commonThick;
            wallWidth = Math.abs(obj.startDot.z - obj.endDot.z);
        }
        var cubeobj = {
            length: wallLength,
            width: wallWidth,
            height: obj.height || _commonHeight,
            rotation: obj.rotation,
            x: positionX,
            uuid: obj.uuid,
            name: obj.name,
            y: positionY,
            z: positionZ,
            style: {
                skinColor: _commonSkin,
                skin: obj.skin
            }
        }
        var _cube = that.createCube(that, cubeobj);
        return _cube;
    }

    //创建玻璃
    room3D.prototype.createGlasses = function (that, obj) {
        var that = room3dObj;
        var tmpobj = that.createPlaneGeometry(that, obj);
        that.addObject(tmpobj);
        obj.rotation.y = Math.PI + obj.rotation.y;
        var tmpobj2 = that.createPlaneGeometry(that, obj);
        that.addObject(tmpobj2);
    }

    //创建二维平面-长方形
    room3D.prototype.createPlaneGeometry = function (that,obj) {
        var  options = obj;
        if (typeof options.pic == "string") {//传入的材质是图片路径，使用 textureloader加载图片作为材质
            var loader = new THREE.TextureLoader();
            loader.setCrossOrigin(this.crossOrigin);
            var texture = loader.load(options.pic, function () { }, undefined, function () { });
        } else {
            var texture = new THREE.CanvasTexture(options.pic)
        }
        var MaterParam = {//材质的参数
            map: texture,
            overdraw: true,
            side: THREE.FrontSide,
            //              blending: THREE.AdditiveBlending,
            transparent: options.transparent,
            //needsUpdate:true,
            //premultipliedAlpha: true,
            opacity: options.opacity
        }
        if (options.blending) {
            MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
        }
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(options.width, options.height, 1, 1),
            new THREE.MeshBasicMaterial(MaterParam)
        );
        plane.position.x = options.position.x;
        plane.position.y = options.position.y;
        plane.position.z = options.position.z;
        plane.rotation.x = options.rotation.x;
        plane.rotation.y = options.rotation.y;
        plane.rotation.z = options.rotation.z;
        return plane;
    }

    //创建盒子体
    room3D.prototype.createCube = function (that, obj) {
        if (that == null) {
            that = this;
        }
        var _length = obj.length || 1000;//默认1000
        var _width = obj.width || _length;
        var _height = obj.height || 10;
        var _x = obj.x || 0, _y = obj.y || 0, _z = obj.z || 0;
        var skinColor = obj.style.skinColor || 0x98750f;
        var cubeGeometry = new THREE.BoxGeometry(_length, _height, _width, 0, 0, 1);

        //六面颜色
        for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
            var hex = skinColor || Math.random() * 0x531844;
            cubeGeometry.faces[i].color.setHex(hex);
            cubeGeometry.faces[i + 1].color.setHex(hex);
        }
        //六面纹理
        var skin_upobj = {
            vertexColors: THREE.FaceColors
        }
        var skin_downobj = skin_upobj,
            skin_foreobj = skin_upobj,
            skin_behindobj = skin_upobj,
            skin_leftobj = skin_upobj,
            skin_rightobj = skin_upobj,
            skin_ammterobj = skin_upobj;
        var skin_opacity = 1;
        if (obj.style != null && typeof (obj.style) != 'undefined' && obj.style.skin != null && typeof (obj.style.skin) != 'undefined') {
            //透明度
            if (obj.style.skin.opacity != null && typeof (obj.style.skin.opacity) != 'undefined') {
                skin_opacity = obj.style.skin.opacity;
                console.log(skin_opacity)
            }
            skin_upobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_up, cubeGeometry, 4);
            skin_downobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_down, cubeGeometry, 6);
            skin_foreobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_fore, cubeGeometry, 0);
            skin_behindobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_behind, cubeGeometry, 2);
            skin_leftobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_left, cubeGeometry, 8);
            skin_rightobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_right, cubeGeometry, 10);
            // skin_ammterobj = that.createSkinOptionOnj(that, _length, _width, obj.style.skin.skin_ammter, cubeGeometry, 12);

        }
        var cubeMaterialArray = [];
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_foreobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behindobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_upobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_downobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_rightobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_leftobj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_ammterobj));
        var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.uuid = obj.uuid;
        cube.name = obj.name;
        cube.position.set(_x, _y, _z);
        if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
            $.each(obj.rotation, function (index, rotationobj) {
                switch (rotationobj.direction) {
                    case 'x':
                        cube.rotateX(rotationobj.degree);
                        break;
                    case 'y':
                        cube.rotateY(rotationobj.degree);
                        break;
                    case 'z':
                        cube.rotateZ(rotationobj.degree);
                        break;
                    case 'arb':
                        cube.rotateOnAxis(new THREE.Vector3(rotationobj.degree[0], rotationobj.degree[1], rotationobj.degree[2]), rotationobj.degree[3]);
                        break;
                }
            });
        }
        var name = obj.name;
        if(name =="dampTemp" || name =="aircondition" || name =="cabinet_ammter" || name =="cabinet" || name =="doorControl" || name=="ups"){
            cube.userData =obj.devObj;
            that.clickList.push(cube);
        }
        if(name =="cabinet"){
            cube.leftAmmeter = obj.leftAmmeter;
            cube.rightAmmeter = obj.rightAmmeter;
        }

        if(obj.name =="cabinet_ammter"){
            cube.shellname = obj.shellname;
        }
        return cube;
    }

    //创建皮肤参数对象
    room3D.prototype.createSkinOptionOnj = function (that, flength, fwidth, obj, _cube, _cubefacenub) {
        if (that.commonFunc.hasObj(obj)) {
            if (that.commonFunc.hasObj(obj.imgUrl)) {
                return {
                    map: that.createSkin(flength, fwidth, obj),transparent:true
                }
            } else {
                if (that.commonFunc.hasObj(obj.skinColor)) {
                    _cube.faces[_cubefacenub].color.setHex(obj.skinColor);
                    _cube.faces[_cubefacenub + 1].color.setHex(obj.skinColor);
                }
                return {
                    vertexColors: THREE.FaceColors
                }
            }
        } else {
            return {
                vertexColors: THREE.FaceColors
            }
        }
    }

    //创建皮肤
    room3D.prototype.createSkin = function (flength,fwidth,obj) {
        var imgwidth = 128,imgheight=128;
        if (obj.width != null&& typeof (obj.width) != 'undefined') {
            imgwidth = obj.width;
        }
        if (obj.height != null && typeof (obj.height) != 'undefined') {
            imgheight = obj.height;
        }
        var texture = new THREE.TextureLoader().load(obj.imgUrl);
        var _repeat = false;
        if (obj.repeatx != null && typeof (obj.repeatx) != 'undefined' && obj.repeatx==true) {
            texture.wrapS = THREE.RepeatWrapping;
            _repeat = true;
        }
        if (obj.repeaty != null && typeof (obj.repeaty) != 'undefined' && obj.repeaty == true) {
            texture.wrapT = THREE.RepeatWrapping;
            _repeat = true;
        }
        if (_repeat) {
            texture.repeat.set(flength / imgheight, fwidth / imgheight);
        }
        return texture;
    }

    //通用方法
    room3D.prototype.commonFunc={
        //判断对象
        hasObj: function (obj) {
            if (obj != null && typeof (obj) != 'undefined') {
                return true;
            }else{
                return false;
            }
        },
        //查找对象
        findObject: function (objname) {
            var that = room3dObj;
            console.log('findObject');
            var findedobj = null;
            $.each(that.objects, function (index,obj) {
                if (obj.name != null && obj.name != '') {
                    if (obj.name == objname) {
                        findedobj = obj;
                        return true;
                    }
                }
            });
            return findedobj;
        },
    }

    //模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上
    room3D.prototype.mergeModel = function (that, mergeOP, fobj, sobj) {
        if (that == null) {
            that = this;
        }
        var fobjBSP = new ThreeBSP(fobj);
        var sobjBSP = new ThreeBSP(sobj);
        // var sobjBSP = new ThreeBSP(sobj);
        var resultBSP = null;
        if (mergeOP == '-') {
            resultBSP = fobjBSP.subtract(sobjBSP);
        } else if (mergeOP == '+') {
            var subMesh = new THREE.Mesh(sobj);
            sobj.updateMatrix();
            fobj.geometry.merge(sobj.geometry, sobj.matrix);
            // resultBSP = fobjBSP.union(sobjBSP);
            return fobj;
        } else if (mergeOP == '&') {//交集
            resultBSP = fobjBSP.intersect(sobjBSP);
        } else {
            that.addObject(sobj);
            return fobj;
        }
        var cubeMaterialArray = [];
        for (var i = 0; i < 1; i++) {
            cubeMaterialArray.push(new THREE.MeshLambertMaterial({
                // map: that.createSkin(128, 128, {
                //     imgUrl: './static/jquery/three/img/door_right.png'
                // }),
                vertexColors: THREE.FaceColors
            }));
        }
        var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
        var result = resultBSP.toMesh(cubeMaterials);
        result.material.shading = THREE.FlatShading;
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.uuid= fobj.uuid+mergeOP+sobj.uuid;
        result.name=fobj.name+mergeOP+sobj.name;
        result.material.needsUpdate = true;
        result.geometry.buffersNeedUpdate = true;
        result.geometry.uvsNeedUpdate = true;
        var hex = 0x8ac9e2;
        result.geometry.faces[i].color.setHex(hex);
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }

    //设置温湿度
    room3D.prototype.fnSetDampTemp = function (obj) {
        var that = this;
        var tempObj = that.createCube(that, obj);
        that.addObject(tempObj);
        // that.clickList.push(tempObj);
    };

    //设置空调
    room3D.prototype.fnSetAir = function (obj) {
        var that = this;
        var tempObj = that.createCube(that, obj);
        that.addObject(tempObj);
        // that.clickList.push(tempObj);
    };

    //设置机柜
    room3D.prototype.fnSetCabiniet = function (obj) {
        var that = this;
        var tempObj = that.createCube(that, obj);
        that.addObject(tempObj);
        // var group = new THREE.Group();

        var lAmmter = obj.leftAmmeter;
        var rAmmter = obj.rightAmmeter;
        if(lAmmter !=null){
            var Ammtercube = that.createCube(that, lAmmter);
            // Ammtercube.children.push("left");
            that.addObject(Ammtercube);
            tempObj.children.push(Ammtercube);
            // group.add(Ammtercube);
            // that.dragList.push(Ammtercube);
        }
        if(rAmmter !=null){
            var Ammtercube = that.createCube(that, rAmmter);
            // Ammtercube.children.push("right");
            that.addObject(Ammtercube);
            // that.dragList.push(Ammtercube);
            // group.add(Ammtercube);
            tempObj.children.push(Ammtercube);
        }

        // group.add(tempObj);
        // that.scene.add(group);
        that.dragList.push(tempObj);

    };

    //设置UPS
    room3D.prototype.fnSetUps = function (obj) {
        var that = this;
        var tempObj = that.createCube(that, obj);
        that.addObject(tempObj);
    };

    //移除机柜
    room3D.prototype.fnMoveCabinet = function (obj) {
        var that = room3dObj;
        var leftAmmter = obj.leftAmmeter;
        var rightAmmter = obj.rightAmmeter;
        var children = obj.children;
        if(children.length !=0){
            for(var i=0;i<children.length;i++){
                that.scene.remove(children[i]);
                that.clickList.removeByValue(children[i]);
            }
        }
        that.scene.remove(obj);
        that.clickList.removeByValue(obj);
        that.dragList.removeByValue(obj);
    }

    //移动机柜
    room3D.prototype.fnDragCabinet = function () {
        var that = this;
        that.trsnaformControls = new THREE.TransformControls(that.camera,that.renderer.domElement);
        that.trsnaformControls.setSize(0.4);
        that.trsnaformControls.setMode('translate');
        that.scene.add(that.trsnaformControls);

        //拖拽控件对象
        that.dragcontrols = new THREE.DragControls(that.dragList,that.camera,that.renderer.domElement );
        that.dragcontrols.addEventListener( 'dragstart', function ( event ) { that.dragcontrols.enabled = false; } );
        that.dragcontrols.addEventListener( 'dragend', function ( event ) { that.dragcontrols.enabled = true; } );


        //拖拽控件对象设置鼠标事件
        that.dragcontrols.addEventListener('hoveron',function (event ) {
            that.dragcontrols.enabled = false;
            var name = event.object.name;
            var children = event.object.children;
            // var  group = new THREE.Group();

            if(name =="cabinet"){
                that.dragcontrols.enabled = true;
                if(children.length !=0){
                    // that.trsnaformControls.attach(children[0]);
                    // group.add(children[0])
                }
                // group.add(event.object);
                that.trsnaformControls.attach(event.object);
            }
        } );
        //
        that.dragcontrols.addEventListener('hoveroff',function (event ) {
            //控件对象transformControl与选中的对象object绑定
            var name = event.object.name;
            if(name=="cabinet"){
                that.dragcontrols.enabled = false;
                that.trsnaformControls.detach();
                var uuid = event.object.uuid;
                var position = event.object.position;
                var children = event.object.children;
                if(children.length !=0){
                    for(var i=0;i<children.length;i++){
                        children[i].translate( position.x-23, 184, position.z+36);
                        if(children[i].shellname =='left'){
                            children[i].position.x =  position.x-23;
                            children[i].position.y =  184;
                            children[i].position.z =  position.z+36;
                        }
                        if(children[i].shellname =="right"){
                            children[i].position.x =  position.x+23;
                            children[i].position.y =  184;
                            children[i].position.z =  position.z+36;
                        }

                        that.scene.add(children[i]);
                    }
                }
                that.objectStatusList[uuid] = event.object;
                // RoomInfo.fnUpdateCabinet(uuid,null,position.x,105,position.z);
            }
        });
    }

    //保存移动机柜状态
    room3D.prototype.fnSaveDragCabinet = function () {
        var that = this;
        //拖拽控件对象
        that.trsnaformControls.dispose();
        that.dragcontrols.enabled = false;
        if(that.objectStatusList !=undefined){
           $.each(that.objectStatusList,function (key,val) {
               RoomInfo.fnUpdateCabinet(key,val.leftAmmeter,val.rightAmmeter,val.position.x,105,val.position.z);
           });
            that.objectStatusList = {};
            that.dragcontrols.dispose();
            that.dragcontrols = new THREE.DragControls([],that.camera,that.renderer.domElement );
        }

    }


    //数组操作
    Array.prototype.removeByValue = function(val) {
        for(var i=0; i<this.length; i++) {
            if(this[i] == val) {
                this.splice(i, 1);
                break;
            }
        }
    }

    //鼠标按下事件
    room3D.prototype.onDocumentMouseDown = function (event) {
        dbclick++;
        var that = room3dObj;
        setTimeout(function () { dbclick =0}, 500);

        // if(event.button == 0){
        //     var rect = that.renderer.domElement.getBoundingClientRect();
        //     that.mouseClick.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
        //     that.mouseClick.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;
        //     that.raycaster.setFromCamera(that.mouseClick, that.camera);
        //     var intersects = that.raycaster.intersectObjects(that.clickList, true);
        //     if (intersects.length > 0) {
        //         var selected = intersects[0].object;
        //         console.info("................" + selected.name);
        //         RoomInfo.fnLookAmmterMessage(selected.userData);
        //     }
        //
        // }
        if(event.button == 2){
            var rect = that.renderer.domElement.getBoundingClientRect();
            that.mouseClick.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
            that.mouseClick.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;
            that.raycaster.setFromCamera(that.mouseClick, that.camera);
            var intersects = that.raycaster.intersectObjects(that.clickList, true);
            if (intersects.length > 0) {
                var selected = intersects[0].object;
                if(selected.name=="cabinet"){
                    RoomInfo.fnUnBindAmmter_event(event,selected);
                }
            }
        }

    }

    //鼠标移动事件
    var moveList =null;
    room3D.prototype.onDocumentMouseMove = function (event) {
        event.preventDefault();
        var that = room3dObj;
        var rect = that.renderer.domElement.getBoundingClientRect();
        that.mouseClick.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
        that.mouseClick.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;
        that.raycaster.setFromCamera(that.mouseClick, that.camera);
        var intersects = that.raycaster.intersectObjects(that.clickList, true);
        if(null ==moveList){
            RoomInfo.fnCloseLayer();
        }
        if (intersects.length > 0) {
            var selected = intersects[0].object;
            var uuid = selected.geometry.uuid;
            var position = selected.position;

            if(uuid !=moveList){
                RoomInfo.fnLookAmmterMessage(selected.userData,position);
            }
            moveList = uuid;
        }else{
            moveList =null;
        }

    }


    return{
        room3D:room3D,
    }
}();
