'use strict';
/*  

TRABAJO PRACTICO FINAL: NETFLIX ROULETTE

En el siguiente trabajo practico utilizaremos la api
 de Netflix Roulette para traer información peliculas
  o series sugeridas de un director.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al
 clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda
 ingresar el nombre del director.
- Tambien habrá un boton de "Buscar" o una lupa, el cual
 al presionarlo realizará nuestra busqueda de peliculas 
 del director en la api de netflix.
- Cuando estemos buscando, deberemos mostrar un icono de
 "Cargando resultados..." en la pagina, el cual desaparecera
  cuando aparezca el resultado.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre de la pelicula o serie
	- Imagen
	- Sinopsis
	- Si es pelicula o serie
	- Ranking de netflix
	- Año


FOOTER
- En el footer debemos tener informacion relevante con 
respecto al: autor, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve
 hacia arriba de todo de la página.


URLS de ejemplo para hacer Ajax Requests:
http://netflixroulette.net/api/api.php?director=quentin%20tarantino
http://netflixroulette.net/api/api.php?director=George%20Lucas

BONUS: crear 1 input mas donde pueda ingresar el nombre del actor.
Este input funcionara como filtro para nuestra busqueda ajax:
Ej: http://netflixroulette.net/api/api.php?director=quentin%20tarantino&actor=waltz

*/

(function (){

	//cuando el usuario inicia la busqueda, haciendo click en buscar...
	$('#input_boton').click( function(){
		event.preventDefault();

		//tomo el input del director que se busca
		var inputDirector = $('#input_director').val();

		//con ese input, hago la llamada AJAX al servidor roulette de Netflix...
		$.ajax({
			url: "http://netflixroulette.net/api/api.php?director=" + inputDirector,
			method: "GET",
			data: "data",
			dataType: 'JSON',
			statusCode:{
				400: function(){

					//si falla, fallback de error 400
					$('.fail').slideDown();
					$('.lista').empty();
					$('.datos').hide();
					$('.instruccion').slideDown();
				}
			}
			}).always( function(){

				//muestro que esta cargando
				$('.cargando').slideDown();

			}).done( function(response){
				//empiezo vaciando la lista
				$('.lista').empty();
				//por cada pelicula dentro del director voy a ...
				$('.fail').hide();
				$('.cargando').slideUp();
				$('.instruccion').slideUp().hide();
				$('.to-top').show();
				$('.datos').addClass('in-line');

				//hago un for para listar las peliculas de Tarantino
				for (var i in response) {
					var cadaPelicula = "<article>"+
						"<p class='titulo'>"+response[i].show_title+"</p>"+
						"<img src='"+response[i].poster+"'></img>"+
						"<p class='descripcion'>"+response[i].summary+"</p>"+
						"<p class='rating'>Rating: "+response[i].rating+"</p>"+
						"<p class='anio'>Anio: "+response[i].release_year+"</p>"
					+"</article>";

					//y las appendeo a la lista
					$('.lista').append(cadaPelicula);
				};

				$('.to-top').click( function(){
					event.preventDefault();
					$('body').animate({
					scrollTop: 0
					},2000);
				});

			}).fail( function(){

				//si falla...
				$('.cargando').slideUp();
				$('.fail').slideDown();
				$('.lista').empty();
				$('.datos').hide();
				$('.instruccion').slideDown();
			})
	})	
})()