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
  var arrayInput = inputUpperCase.split();

  var url = 'https://www.vagalume.com.br/disney/index.js';

  var foundSongs = [];

  fetch(url).then(function(response) {  
    response.json().then(function(json) {
      json.artist.lyrics.item.forEach(function(song, index) {
        var arrayOfDesc = song.desc.split(' - ');
        var arrayOfDescToUpperCase = [];
        for (word2 of arrayOfDesc) {
          arrayOfDescToUpperCase.push(word2.toUpperCase());
        }

      var filterToSongs =  compare(arrayInput, arrayOfDescToUpperCase, index);
          
      foundSongs.push(filterToSongs);

      });
      for (song of foundSongs) {
        if (song.show) {
          var indexOfSong = foundSongs.indexOf(song);
          var songTitle = json.artist.lyrics.item[indexOfSong].desc;
          if (songTitle !== undefined) {
            var newDiv = $('<div></div>').addClass('banner-playlist');
            var songName = $('<h4></h4>').html(songTitle.split(' - ')[1]); 
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
