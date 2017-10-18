window.onload = function () {


	var width = window.innerWidth;
	var height = window.innerHeight;	
	var canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0xffbb00);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.set(0, 0, 500);

	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);



	function createCube () {

	var size = Math.random() * 30;
	var geometry = new THREE.BoxGeometry( size , size, size );

	for ( var i = 0; i < geometry.faces.length; i += 2 ) {
		var hex = (Math.random() * 0xffffff) | 0x1234ff;

		geometry.faces[ i ].color.setHex( hex );
		geometry.faces[ i + 1 ].color.setHex( hex );
	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	cube = new THREE.Mesh( geometry, material );
	cube.position.x = Math.random() * 2000 - 1000;
	cube.position.y = Math.random() * 2000 - 1000;
	cube.position.z = Math.random() * 2000 - 1000;
	scene.add( cube );
	}



	renderer.render(scene, camera);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var controls = new THREE.OrbitControls( camera );

	animate();

	function animate() {
		setTimeout(createCube, 1000);
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}
}