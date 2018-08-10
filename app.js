$(document).ready(function(){
// tela splash
  $('#splash').delay(4000).fadeToggle('fast');
// botão de busca
  $('.icon-search').click(function() {
    $('#initial').fadeOut('slow');
    $('#playlist').fadeIn('slow');
    $('#playlist').html('');
    getMovieSounds();
  })
});

function getMovieSounds() {
  var input = $('input').val();
  var inputUpperCase = input.toUpperCase();
  var arrayInput = inputUpperCase.split(' ');
  var arrayInputToUrl = input.replace(' ', '%20');

  var url = 'https://api.vagalume.com.br/search.artmus?q=' + arrayInputToUrl + '%20trilha%20sonora&limit=5';

  var foundSongs = [];

  fetch(url).then(function(response) {  
    response.json().then(function(json) {
      json.response.docs.forEach(function(song, index) {
        var arrayOfBand = song.band.split(' ');
        var arrayOfBandToUpperCase = [];
        for (word2 of arrayOfBand) {
          arrayOfBandToUpperCase.push(word2.toUpperCase());
        }

      var filterToSongs =  compare(arrayInput, arrayOfBandToUpperCase, index);
          
      foundSongs.push(filterToSongs);

      });
      for (song of foundSongs) {
        if (song.show) {
          var indexOfSong = foundSongs.indexOf(song);
          var songTitle = json.response.docs[indexOfSong].title;
          if (songTitle !== undefined) {
            var newDiv = $('<div></div>').addClass('banner-playlist');
            var songName = $('<h4></h4>').html(songTitle); 
            var playDiv = $('<div></div>').html('<hr>' + '<i class="fas fa-play"></i>').addClass('play-div');
            newDiv.append(songName);
            newDiv.append(playDiv);
            $('#playlist').append(newDiv);
          }
        }
      }

    });
  });

  function compare(arr1, arr2, index) {

    const objMap={};

    arr1.forEach((e1) => {
      arr2.forEach((e2) => {
        if(e1 === e2) {
          objMap[e1] = objMap[e1] + 1 || 1;
        }
      })
    });

    if (Object.keys(objMap).length === 0) {
      return {show: false, index: index};
    } else {
      return {show: true, index: index};
    }

  }
}
