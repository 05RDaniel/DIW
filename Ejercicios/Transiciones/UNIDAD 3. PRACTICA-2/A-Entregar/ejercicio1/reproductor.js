function redimensionaBarra()
{
	if(!medio.ended)
	{
		var total=parseInt(medio.currentTime*maximo / medio.duration);
		progreso.style.width=total+'px';
	}
	else
	{
		progreso.style.width='0px';
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio(e)
{
	if(!medio.paused && !medio.ended)
	{
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;
		medio.currentTime=nuevoTiempo;
		progreso.style.width=ratonX+'px';
	}
}

function accionPlay()
{
	if(!medio.paused && !medio.ended) 
	{
		medio.pause();
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
	else
	{
		medio.play();
		play.value='▮▮';
		bucle=setInterval(redimensionaBarra, 1000);
	}
}

function iniciar() 
{
	maximo=700;
	
	medio=document.getElementById('medio');
	barra=document.getElementById('barra');
	progreso=document.getElementById('progreso');
	play=document.getElementById('play');
	silence=document.getElementById('silenciar');
	volumen=document.getElementById('volumen');
    /* obtener los objetos del resto de elementos necesarios */
	
	play.addEventListener('click', accionPlay, false);
	/* crear los manejadores de eventos para el resto de botones */

	barra.addEventListener('click', desplazarMedio, false);
}

function reiniciar(){
	medio.currentTime=0;
    progreso.style.width='0px';
    play.value='\u25BA';
    window.clearInterval(bucle);
    medio.pause();
    medio.load();
    redimensionaBarra();
	accionPlay();
}

function retroceder(){
	var nuevoTiempo=medio.currentTime-5;
    if(nuevoTiempo<0) nuevoTiempo=0;
    medio.currentTime=nuevoTiempo;
    progreso.style.width=nuevoTiempo*maximo / medio.duration+'px';
}

function avanzar(){
	var nuevoTiempo=medio.currentTime+5;
    if(nuevoTiempo<0) nuevoTiempo=0;
    medio.currentTime=nuevoTiempo;
    progreso.style.width=nuevoTiempo*maximo / medio.duration+'px';
}

function silenciar(){
	if(silence.value == "silenciar"){
	medio.volume = 0;
	silence.value = "desilenciar"
	} else {
		medio.volume = 1;
		silence.value = "silenciar";
	}
}

function volumeUp(){
	if(medio.volume < 1){
    medio.volume += 0.1;
    }
}

function volumeDown(){
	if(medio.volume > 0){
    medio.volume -= 0.1;
    }
}

window.addEventListener('load', iniciar, false);