(function () {

    var eleList = [];

    var car = {
        drawCube: function ( { width, height, depth, x = 0, y = 0, z = 0, color = 0x4e5dad }) {
            let cube = new THREE.Mesh( new THREE.CubeGeometry( width, height, depth ),
                new THREE.MeshBasicMaterial({
                    color: color
                })
            );
            cube.position.set( x, y, z );
            return cube;
        },
        drawWheel: function ( radius, tube, rs, ts, x = 0, y = 0, z = 0.5, color = 0x2d2d2b ) {
            let wheel = new THREE.Mesh( new THREE.TorusGeometry( radius, tube, rs, ts ),
                new THREE.MeshBasicMaterial({
                    color: color
                })
            );
            wheel.position.set( x, y, z );
            return wheel;
        },
        drawWindow: function ( width, height, color = 0xbcd4e4, x = 0, y = .3 , z = .5 ) {
            let window = new THREE.Mesh(new THREE.PlaneGeometry( width,height),
                new THREE.MeshBasicMaterial({
                    color: color
                }));
            window.position.set( x, y, z);
            return window;
        },
        drawGeometry: function ( color = 0x4e5dad ){
            let geometry = new THREE.Geometry();

            geometry.vertices.push( new THREE.Vector3( -1.55, 1,.5));
            geometry.vertices.push( new THREE.Vector3( -1.55, 1, -.5));
            //bottom
            geometry.vertices.push( new THREE.Vector3( -1.55, 0,.5));
            geometry.vertices.push( new THREE.Vector3( -1.55, 0, -.5));

            geometry.vertices.push( new THREE.Vector3( -2.35, 0,.5));
            geometry.vertices.push( new THREE.Vector3( -2.35, 0, -.5));
            //注意这里的点是向量，所以在画面的时候要注意
            geometry.faces.push( new THREE.Face3( 0, 4, 2 ));
            geometry.faces.push( new THREE.Face3( 1, 3, 5 ));
            geometry.faces.push( new THREE.Face3( 0, 4, 5));
            geometry.faces.push( new THREE.Face3( 0, 1, 5));

            // face4 mesh THREE.MeshFaceMaterial has been removed
            return new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({
                color: color
            }));
        },
        drawCar: function () {
            //body
            eleList.push( this.drawCube( { width: 3, height: 2, depth: 1}) );
            eleList.push( this.drawCube( { width: .05, height: 2, depth:1, color: 0x4e5dad, x: -1.525} ));

            //head
            eleList.push( this.drawGeometry());
            eleList.push( this.drawCube( { width: .8, height: 1, depth: 1, x: -1.95, y: -0.5 } ));

            //window
            eleList.push( this.drawWindow( 1.8, .7));

            //wheels
            eleList.push( this.drawWheel(  .25,.15, 4, 30, -1.4, -1) );
            eleList.push( this.drawWheel( .25,.15, 4, 30, .8, -1) );
        }

    };

    function init() {

        //render
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( 800, 400 );
        renderer.setClearColor( 0xffffff );
        document.body.appendChild( renderer.domElement );

        //scence
        var scene = new THREE.Scene();

        //camera
        var camera = new THREE.PerspectiveCamera( 45, 8 / 4, 1, 1000 );
        camera.position.setZ( 5 );

        eleList.push( camera );
        car.drawCar();
        eleList.map(function ( ele ) {
            scene.add( ele )
        });
        renderer.render(scene, camera);
    }

    init();
})();
