function Sprites( params ) {
	
	this.scene = params.scene

	this.imageLocation = 'assets/images/'

	this.distance = 400

	this.xRange = 10

	this.yRange = 300

	this.zRange = 150

	this.minSize = 2

	this.maxSize = 10

	this.materials = []

	this.sprites = []

	this.currentFrame = 0

  this.addMaterial( 2, 100, 8, 8, 'loop_1_', '.png' )

  this.addSprites( 400, this.distance, this.xRange, this.yRange, this.zRange, this.minSize, this.maxSize )

}

Sprites.prototype.addSprites = function( count, distance, xRange, yRange, zRange, minSize, maxSize ) {
	
	var
	size,
	geometry,
	mesh,
	container



	for( var i = 0; i < count; i++ ){

		size = minSize + ( Math.random() * maxSize )
		geometry = new THREE.PlaneBufferGeometry( size, size, 1 )
		mesh = new THREE.Mesh( geometry, this.materials[ 0 ] )
		// mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }) )
		container = new THREE.Object3D()

		container.rotation.y = Math.deg2rad( ( i / count ) * 360 )

		mesh.position.set( xRange * Math.random(), ( yRange * Math.random() ) - ( .5 * yRange ), distance + ( zRange * Math.random() ) )

		_.extend( mesh.userData, {
			offset: 100 * Math.random(),
			zRange: 10 + ( Math.random() * zRange )
		})

		container.add( mesh )

		this.scene.add( container )
	
		this.sprites.push( mesh )

	}

	
}

Sprites.prototype.addMaterial = function( imageCount, frameCount, framesX, framesY, filePrefix, fileExtension ) {

	var
	uniforms = {
    uTexCount: { type: '1f', value: imageCount },
    uTexArray: { type: 'tv', value: [] },
    uTilesX: { type: '1f', value: framesX },
    uTilesY: { type: '1f', value: framesY },
    uCurrentFrame: { type: '1f', value: 0 }
  },
  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: SpriteShader.vertexShader,
    fragmentShader: SpriteShader.fragmentShader,
    transparent: true
  }),
  texture

  for( var i = 0; i < imageCount; i++ ){

  	texture = THREE.ImageUtils.loadTexture( this.imageLocation  + filePrefix + i + fileExtension )
    // texture.magFilter = THREE.NearestFilter
    // texture.minFilter = THREE.NearestFilter
    // texture.wrapS = THREE.RepeatWrapping
    // texture.wrapT = THREE.RepeatWrapping
    material.uniforms[ 'uTexArray' ].value[ i ] = texture
    material.side = THREE.BackSide
  
  }

  this.materials.push( material )

}

Sprites.prototype.update = function( time ) {

	this.currentFrame++
	
	var i 
	
	for( i = 0; i < this.materials.length; i++ ){
	
		this.materials[ i ].uniforms[ 'uCurrentFrame' ].value = Math.floor( ( this.currentFrame * .25 ) % 100 )
	}

	for( i = 0; i < this.sprites.length; i++ ){


		var z = this.distance + ( Math.sin( ( .02 * time ) + this.sprites[ i ].userData[ 'offset' ] ) * Math.sin( .3 * time + this.sprites[ i ].userData[ 'offset' ] ) * this.sprites[ i ].userData[ 'zRange' ] )

		this.sprites[ i ].position.z = z
	
	}

}
