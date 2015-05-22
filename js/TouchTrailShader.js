TouchTrailShader = {

	uniforms: {
		"uActiveTouchCount": { type: "i", value: 0 },
		"uTouchArray": { type: "v2v", value: [
      new THREE.Vector2( 0.0, 0.0 ),
      new THREE.Vector2( 0.0, 0.0 ),
      new THREE.Vector2( 0.0, 0.0 ),
      new THREE.Vector2( 0.0, 0.0 ),
      new THREE.Vector2( 0.0, 0.0 ),
      new THREE.Vector2( 0.0, 0.0 ),
    ] },
    "uFeedbackTex": { type: "t", value: null }
	},

	vertexShader: [

    "varying vec2 vUv;",

    "void main( void ) {",

      "vUv = uv;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}",

	].join("\n"),

	fragmentShader: [

    "uniform vec2 uTouchArray[ 6 ];",

    "uniform int uActiveTouchCount;",

    "uniform sampler2D uFeedbackTex;",

    "varying vec2 vUv;",

    "const int MAX_TOUCHES = 6;",

    "const float TOUCH_RADIUS = .1;",

    "const float FADE_OUT = .95;",

    "const float FADE_IN = .05;",

		"void main() {",

      "float fActiveTouchCount = float( uActiveTouchCount );",

			"vec4 vColor = texture2D( uFeedbackTex, vUv );",

      "float f = vColor.x * FADE_OUT;",

      "float v = 0.0;",

      "if ( uActiveTouchCount > 0 ) {",
        
        "for ( int i = 0; i < MAX_TOUCHES; i++ ){",

          "if ( i < uActiveTouchCount ){",
            //swap lines for a different effect
            "v += ( FADE_IN * max( exp( 1.0 - ( distance( vUv, uTouchArray[ i ] ) / TOUCH_RADIUS )), 0.0 ) );",

            // "v += ( FADE_IN * max( ( 1.0 - ( distance( vUv, uTouchArray[ i ] ) / TOUCH_RADIUS )), 0.0 ) );",

          "}",
        
        "}",

      "}",

      "v = clamp( v, 0.0, 1.0 );",

      "v += f;",

			"gl_FragColor = vec4( v, v, v, 1.0 );",

		"}"

	].join("\n")

}