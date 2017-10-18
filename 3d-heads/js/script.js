window.onload = function () {


	var width = window.innerWidth;
	var height = window.innerHeight;	
	var canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.set(0, 0, 500);

	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);
	var axisHelper = new THREE.AxisHelper( 5 );
	scene.add( axisHelper );

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	
	var loader = new THREE.OBJLoader2(manager);
	loader.setMaterial()

	// load a resource
	loader.load(
			// resource URL
			'obj/test.obj',
			// Function when resource is loaded
			function ( object ) {
				object.position.set(0,0,0);
				scene.add( object );
			}
	);


	renderer.render(scene, camera);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var controls = new THREE.OrbitControls( camera );

	animate();

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}
}