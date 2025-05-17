let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}


function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "es-MX"
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                    console.log(datos)
                    let tags = '';
    
                    datos.genres.forEach((genre, index) => {
                        if (index > 2) {
                            return
                        }
                        tags += `${genre.name},`          

                    });

                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        <li>
                        <a href="#!" class="episode" 
                        option-1-lang="Lat"
                        option-1-server="HD"
                        option-1-url=""
                        >
                        <div class="episode__img">
                        <img src="https://image.tmdb.org/t/p/w300${episode.still_path}" onerror="this.style='display:none';">
                        <div class="episode__no-image"><i class="fa-regular fa-circle-play"></i></div>
                        </div>
                        <div class="epsiode__info">
                        <h4 class="episode__info__title">${episode.episode_number} - ${episode.name}</h4>
                        <div class="episode__info__duration">${runtime}</div>
                        </div>
                        </a>
                        </li>
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="${season.season_number}">Temporada ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = `  
                    <style>
  a.episode {
    text-decoration: none;
    color: #ffffff;
    padding: 5px;
    display: inline-block;
    margin: 2px;
  }

  a.episode.active {
    background-color:rgb(212, 62, 62);
    color: white;
    border-radius: 4px;
  }
</style>

<div class="separator" style="clear: both;"><a href="" style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0" data-original-height="553" data-original-width="522" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}"/></a></div>
<p>${datos.overview}</p>
<p style="color: #1c1b1b;">  </p>

<style>
.entry-download {
    display: grid !important;
    grid-template-columns: repeat(10, 1fr) !important;
}
  .entry-button {
  padding-bottom: .6rem !important;
  }
  .entry-button .btn {
    margin-bottom:.1rem !important}
</style>

<iframe id="videoPlayer" class='lazyload' data-src="__URL__" src="__URL__" 
        title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="">
</iframe>

<a href="" data-url="" target="_blank" rel="nofollow">Temp __NUMERO__</a>


<div id="episodes">
  <!-- Agrega todos los episodios aquí -->



</div>

<!-- EPISODIOS COPIA Y PEGA

<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">01</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">02</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">03</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">04</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">05</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">06</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">07</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">08</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">09</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">10</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">11</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">12</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">13</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">14</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">15</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">16</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">17</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">18</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">19</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">20</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">21</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">22</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">23</a>
<a href="__URL__" class="episode" data-urls="_URL__" target="_blank" rel="nofollow">24</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">25</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">26</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">27</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">28</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">29</a>
<a href="__URL__" class="episode" data-url="__URL__" target="_blank" rel="nofollow">30</a>

-->


<script>
    const links = document.querySelectorAll('a[data-url]');
    const iframe = document.getElementById('videoPlayer');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita  el enlace navegue a otro lugar
            const newUrl = this.getAttribute('data-url');
            iframe.src = newUrl; // Cambia la URL del iframe
        });
    });
</script>

<script>
  const videoPlayer = document.getElementById('videoPlayer');
  const episodeLinks = document.querySelectorAll('.episode');

  episodeLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Cambiar el src del iframe
      const url = this.getAttribute('data-url');
      videoPlayer.src = url;

      // Remover clase 'active' de todos
      episodeLinks.forEach(el => el.classList.remove('active'));

      // Agregar clase 'active' al clicado
      this.classList.add('active');
    });
  });
</script>

<!--PEGAR SCRIPT ABAJO-->



<!--EXTRA INFO
${datos.name}
Serie,${tags}${datos.first_air_date.slice(0,4)},

-->
                    `;
                    
                    let seasonOnly = `
                    <ul class="caps-grid hide" id="season-${seasonNumber}">
                    ${episodeList}
                    </ul><!--Siguiente temporada debajo-->
    
    
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                let tags = '';
                console.log(datos)


                datos.genres.forEach((genre, index) => {
                    if (index > 2) {
                        return
                    }
                    tags += `${genre.name},`          

                });


                    let template = document.getElementById('html-final');

                    let justHtml = `<!-- extra
${datos.title}

Movie,${tags}${datos.release_date.slice(0,4)},


-->

<div class="separator" style="clear: both;"><a href="" style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0" data-original-height="553" data-original-width="522" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}"/></a></div>

<p>${datos.overview}</p>
<p style="color: #1c1b1b;">  </p>


<iframe id="videoPlayer" class='lazyload' data-src="__URL__" src="__URL__"
title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="">
</iframe>


<script>
    const links = document.querySelectorAll('a[data-url]');
    const iframe = document.getElementById('videoPlayer');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita  el enlace navegue a otro lugar
            const newUrl = this.getAttribute('data-url');
            iframe.src = newUrl; // Cambia la URL del iframe
        });
    });
</script>

<a href="Intent://lacinelocuradelzplayhdgratis.blogspot.com/#Intent;package=com.instantbits.cast.webvideo;scheme=https;end" data-url="" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg></a>
<a href="Intent://lacinelocuradelzplayhdgratis.blogspot.com/#Intent;package=idm.internet.download.manager;scheme=https;end" data-url="" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-120v-80l40-40H160q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h320v80H160v440h640v-120h80v120q0 33-23.5 56.5T800-240H680l40 40v80H240Zm360-240L400-560l56-56 104 103v-327h80v327l104-103 56 56-200 200Z"/></svg></a>

<!--PEGAR SCRIPT ABAJO-->

`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();
}

generar();



