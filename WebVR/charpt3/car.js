(function () {

    var eleList = [];
    var renderer = null;
    var scene = null;
    var camera = null;
    var textureList = [];
    var car = {
        drawCube: function ( { width, height, depth, x = 0, y = 0, z = 0, shadow = true, color = 0x4e5dad }) {
            /*let cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth ),
                new THREE.MeshLambertMaterial({
                    color: color
                })
            );
            shadow && ( cube.castShadow = true );
            cube.position.set( x, y, z );
            return cube;*/
            let material;
            let loader = new THREE.TextureLoader();
            loader.load(
                'texture/car.jpg',
                function (texture) {
                    material = new THREE.MeshLambertMaterial({
                        map: texture
                    });
                    let cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth ),
                        material
                    );
                    shadow && ( cube.castShadow = true );
                    cube.position.set( x, y, z );
                    scene.add( cube );
                    renderer.render( scene,camera );
                }
            );
        },
        drawWheel: function ( radius, tube, rs, ts, x = 0, y = 0, z = 1, color = 0x2d2d2b ) {
            /*let wheel = new THREE.Mesh( new THREE.TorusGeometry( radius, tube, rs, ts ),
                new THREE.MeshLambertMaterial({
                    color: color
                })
            );
            wheel.castShadow = true;
            wheel.position.set( x, y, z );
            return wheel;*/
            let material;
            let loader = new THREE.TextureLoader();
            loader.load(
                'texture/tai.jpg',
                function (texture) {
                    material = new THREE.MeshLambertMaterial({
                        map: texture
                    });
                    let wheel = new THREE.Mesh( new THREE.TorusGeometry( radius, tube, rs, ts ), material);
                    wheel.position.set( x, y, z);
                    scene.add( wheel );
                    renderer.render(scene, camera);
                }
            );
        },
        drawWindow: function ( width, height, color = 0xbcd4e4, x = 0, y = .3 , z = 1 ) {
            let material;
            let loader = new THREE.TextureLoader();
            loader.load(
                'texture/glass.jpg',
                function (texture) {
                    material = new THREE.MeshPhongMaterial({
                        specular: 0xffffff,
                        emissive: 0xffffff,
                        emissiveIntensity: 0.4,
                        shininess:1000,
                        map: texture
                    });
                    let window = new THREE.Mesh(new THREE.PlaneGeometry( width,height), material);
                    window.position.set( x, y, z);
                    scene.add( window );
                    renderer.render(scene, camera);
                }
            );
            //let window = new THREE.Mesh(new THREE.PlaneGeometry( width,height), material);
            //window.position.set( x, y, z);

        },
        drawGeometry: function ( color = 0x4e5dad ){
            let geometry = new THREE.Geometry();

            geometry.vertices.push( new THREE.Vector3( -1.55, 1, 1));
            geometry.vertices.push( new THREE.Vector3( -1.55, 1, -1));
            //bottom
            geometry.vertices.push( new THREE.Vector3( -1.55, 0,1));
            geometry.vertices.push( new THREE.Vector3( -1.55, 0, -1));

            geometry.vertices.push( new THREE.Vector3( -2.35, 0,1));
            geometry.vertices.push( new THREE.Vector3( -2.35, 0, -1));
            //注意这里的点是向量，所以在画面的时候要注意
            geometry.faces.push( new THREE.Face3( 0, 4, 2 ));
            geometry.faces.push( new THREE.Face3( 1, 3, 5 ));
            geometry.faces.push( new THREE.Face3( 0, 5, 4));
            geometry.faces.push( new THREE.Face3( 0, 1, 5));

            geometry.faces.push( new THREE.Face3( 1, 3, 2 ));
            geometry.faces.push( new THREE.Face3( 1, 0, 2 ));
            geometry.faces.push( new THREE.Face3( 3, 5, 4 ));
            geometry.faces.push( new THREE.Face3( 3, 2, 4 ));
            // face4 mesh THREE.MeshFaceMaterial has been removed
            console.log( geometry.position );
            return new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({
                color: color
            }));
        },
        drawCar: function () {
            //body
            //eleList.push( this.drawCube( { width: 3, height: 2, depth: 2}) );
            //eleList.push( this.drawCube( { width: .05, height: 2, depth:2, color: 0x4e5dad, x: -1.525} ));

            //head
           // eleList.push( this.drawGeometry());
            eleList.push( this.drawCube( { width: .8, height: 1, depth: 2, x: -1.95, y: -0.5 } ));

            //window
           // eleList.push( this.drawWindow( 1.8, .7));

            //wheels
            //eleList.push( this.drawWheel(  .25,.18, 4, 30, -1.4, -1, -0.5) );
            //eleList.push( this.drawWheel( .25,.18, 4, 30, .8, -1, -0.5) );
            //eleList.push( this.drawWheel(  .25,.18, 4, 30, -1.4, -1) );
            //eleList.push( this.drawWheel( .25,.18, 4, 30, .8, -1) );

             //this.drawWheel(  .25,.18, 4, 30, -1.4, -1, -0.5) ;
             //this.drawWheel( .25,.18, 4, 30, .8, -1, -0.5) ;
             //this.drawWheel(  .25,.18, 4, 30, -1.4, -1) ;
             //this.drawWheel( .25,.18, 4, 30, .8, -1) ;
        }

    };

    function init() {

        //render
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( 800, 400 );
        renderer.setClearColor( 0xcccccc );
        document.body.appendChild( renderer.domElement );

        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;
        //renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        //scence
        scene = new THREE.Scene();

        //camera
        camera = new THREE.PerspectiveCamera( 45, 8 / 4, 1, 1000 );
        camera.position.set( -5, 0, 5);
        camera.lookAt( new THREE.Vector3( 0, 0, 0) );
        eleList.push( camera );
        car.drawCar();
        addFloor();
        addLight( );
        //add to scene
        console.log( eleList);
        eleList.map(function ( ele ) {
            scene.add( ele )
        });
        car.drawWindow( 1.8, .7);

        car.drawWheel(  .25,.18, 4, 30, -1.4, -1, -0.5) ;
        car.drawWheel( .25,.18, 4, 30, .8, -1, -0.5) ;
        car.drawWheel(  .25,.18, 4, 30, -1.4, -1) ;
        car.drawWheel( .25,.18, 4, 30, .8, -1) ;

       car.drawCube( { width: 3, height: 2, depth: 2});
       car.drawCube( { width: .05, height: 2, depth:2, color: 0x4e5dad, x: -1.525} );


        renderer.render(scene, camera);
        //渲染阴影 shadowMap.enable 替代 shadowMapEnable
    }

    //light

    function addLight( ) {
        let ambientLight = new THREE.AmbientLight( 0xffffff );
        let pointLight = new THREE.PointLight( 0x00ff00, 0.1, 1);
        pointLight.position.set( 0, .3, 1.2 );

        let direct = new THREE.DirectionalLight( 0xffff00 );
        direct.position.set( -4, 8, 2);

        //spotLight方法函数有变化，需要重新进行文档查询
        var spotLight = new THREE.SpotLight( 0xffff00, 1, 100, Math.PI / 6, .5, 2 );
        spotLight.position.set(-8, 5, 3);
        spotLight.target.position.set( 0, 0, 0 );
        spotLight.castShadow = true;

        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 3;
        spotLight.shadow.camera.fov = 30;

        //添加阴影摄像机
        //var helper = new THREE.CameraHelper( spotLight.shadow.camera );
       //eleList.push(helper);


        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        eleList.push(spotLight);
       // eleList.push(direct);
        eleList.push(pointLight);
        eleList.push( ambientLight )
    }

    function  addFloor() {

        let material;
        let loader = new THREE.TextureLoader();
        loader.load(
            'texture/desk.jpg',
            function (texture) {
                material = new THREE.MeshLambertMaterial({
                    map: texture
                });

        let floor = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10, 26, 16 ),
            new THREE.MeshLambertMaterial({
                color: 0xcccccc,
                map: texture
            })
        );
        floor.rotation.x = - Math.PI / 2 ;
        floor.position.y = -1.45;
        floor.receiveShadow = true;
        scene.add(floor);
                renderer.render(scene,camera);
    })
    }
    new THREE.MeshFaceMaterial();
    
    function  changeMaterial( mesh, material) {
        let loader = new THREE.TextureLoader();
        loader.load(
            material.path,
            function (texture) {
                mesh.material = material.material;
                renderer.render( scene, camera );
            }
        )
    }
    init();
})();
