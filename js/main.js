window.addEventListener( 'load', function(){

	if( Detector.webgl ){

		function readyHandler(){
			console.log( 'ready' )
			marco.start()
		}

		this.marco = new Marco({
			readyCallback: readyHandler
		})

		var _this = this

		document.body.appendChild( marco.renderer.domElement )
	
	}
	else{
		
		var
		noWebglElement = document.createElement( 'div')
		document.body.appendChild( noWebglElement )
		noWebglElement.classList.add( 'no-webgl' )

		if( isMobile() )
			noWebglElement.classList.add( 'mobile' )
		else
			noWebglElement.classList.add( 'desktop' )

	}

})

window.AudioContext = window.AudioContext || window.webkitAudioContext

Math.deg2rad = function( degrees ) {
  return degrees  * ( Math.PI/180)
}

window.isMobile = function  () {

    if( /Android/i.test( navigator.userAgent ) || /iPhone|iPad|iPod/i.test( navigator.userAgent ) )
    	return true
    
    else
    	return false

}