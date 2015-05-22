
FeedbackRenderer = function ( params ){

	this.size 					= params.size || 512
  this.uniforms 			= params.uniforms
  this.vertexShader 	= params.vertexShader
  this.fragmentShader = params.fragmentShader
  this.renderer 			= params.renderer

  this.camera = new THREE.OrthographicCamera( this.size / - 2, this.size / 2, this.size / 2, this.size / - 2, -10000, 10000 )
	this.scene = new THREE.Scene()

	this.clear()

	var
	geometry = new THREE.PlaneBufferGeometry( this.size, this.size )

	this.mesh = new THREE.Mesh( geometry, this.material )
	this.mesh.position.z = -100
	this.scene.add( this.mesh )

}

FeedbackRenderer.prototype.clear = function (){

	var renderTargetParams = {
	  minFilter: THREE.LinearFilter,
	  magFilter: THREE.NearestFilter, 
	  format: THREE.RGBFormat	
	}

	if( this.texture ){
	
		this.texture.dispose()
		this.textureClone.dispose()
	
	}
	
	this.texture 			= new THREE.WebGLRenderTarget( this.size, this.size, renderTargetParams )
	this.textureClone = new THREE.WebGLRenderTarget( this.size, this.size, renderTargetParams )

	this.material = new THREE.ShaderMaterial({
	  uniforms: this.uniforms,
	  vertexShader: this.vertexShader,
	  fragmentShader: this.fragmentShader
	}).clone()

	if( this.mesh )
		this.mesh.material = this.material

  this.material.uniforms.uFeedbackTex = { type: 't', value: this.texture }


}

FeedbackRenderer.prototype.render = function () {

	var clone = this.texture
  this.texture = this.textureClone
  this.textureClone = clone

  this.material.uniforms.uFeedbackTex.value = clone

	this.renderer.render( this.scene, this.camera, this.texture, true )

}