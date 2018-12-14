/// CUSTOM SHADER!

var num = 10000;
var radius = 300;
var radius2 = 330;

var mouseX, mouseY;

var slider = document.getElementById("myRange");
var button = document.getElementById("update");
var t = document.getElementById("text");


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 5, 3500 );
camera.position.z = 2000;
camera.lookAt( 0,0,0 );

var scene = new THREE.Scene();

var material2 = new THREE.ShaderMaterial( {
    uniforms: {
        amplitude: { value: 1.0 },
        color: { value: new THREE.Color( 0xffffff ) },
        texture: { value: new THREE.TextureLoader().load( "textures/star.png" ) }
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
} );

var material = new THREE.PointsMaterial( {
    vertexColors: THREE.VertexColors,
    size: 10

})

var geometry = new THREE.BufferGeometry();
var mesh;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function updateV() {
    text.innerHTML = slider.value;

    material.size = map_range(slider.value, 0, 100000, 25, 0);

    scene.remove(geometry);
    var vertices = [];
    var colors = [];
    var color = new THREE.Color();
    var size = [];

    for (var i = 0; i < slider.value; i++) {
        var phi = Math.random() * 3.14159;
        var theta = Math.random() * 6.283;
        var x = radius * Math.sin(phi) * Math.cos(theta);
        var y = radius * Math.cos(phi);
        var z = radius * Math.sin(phi) * Math.sin(theta);

        var x2 = radius2 * Math.sin(phi) * Math.cos(theta);
        var y2 = radius2 * Math.cos(phi);
        var z2 = radius2 * Math.sin(phi) * Math.sin(theta);
        vertices.push(x,y,z);

        color.setRGB( 0, Math.random(), 1);
        colors.push(color.r, color.g, color.b);

        size.push(Math.random() * 10);

    }
    
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ));
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    //geometry.addAttribute( 'size', new THREE.Float32BufferAttribute( size, 1 ) );

}

updateV();

mesh = new THREE.Points( geometry, material );
mesh.geometry.elementsNeedUpdate = true;

scene.add( mesh );
scene.fog = new THREE.Fog( 0, 2000, 2200 );

function animate() {
    requestAnimationFrame( animate );
    //var time = Date.now() * 0.005;

    mesh.rotation.y += 0.003;

	renderer.render( scene, camera );
}
animate();



