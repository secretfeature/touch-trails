DisplacementShader = {

	uniforms: {
    "uDisplacementTex": { type: "t", value: null },
    "uDiffuseTex": { type: "t", value: null },
    "uDisplacementScale": { type: "f", value: 300.0 }
	},

	vertexShader: [

    "varying vec2 vUv;",

    "varying float vDisplacement;",

    "uniform sampler2D uDisplacementTex;",

    "uniform float uDisplacementScale;",

    "void main( void ) {",

      "vUv = uv;",

      "vDisplacement = texture2D( uDisplacementTex, vUv ).r;",
      
      "vec3 newPosition = position + normal;",

      "newPosition.z += vDisplacement * uDisplacementScale;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );",

    "}",

	].join("\n"),

	fragmentShader: [

    "varying vec2 vUv;",

    "uniform sampler2D uDiffuseTex;",

    "uniform sampler2D uDisplacementTex;",

    "varying float vDisplacement;",

		"void main() {",

      "vec4 c = texture2D( uDiffuseTex, vUv );",

      // "c.r += vDisplacement;",

			"gl_FragColor = c;",

		"}"

	].join("\n")

}