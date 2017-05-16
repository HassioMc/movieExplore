angular.module('OMDBFilmsModule', ['FilmModel'])
    .constant('filmNames', [
        'interstellar',
        'star wars espisode VII',
        'jupiter ascending',
        'moonwalkers',
        'independence day Resurgence',
        'star trek beyond',
        'The Space Between Us',
        'Rogue One:A Star Wars Story',
    ])
    .constant('omdbApi', (function (){

        var namePlaceholder = '[namePlaceholder]';

        return {
            url: 'http://www.omdbapi.com/?t=' +
            namePlaceholder + '&y=&plot=short&=json',
            namePlaceholder: namePlaceholder
        };
    })()
    )
    .factory('FilmsService', function($http, $q, filmNames, omdbAPi, Film) {
        var FilmsService = {};
        filmsService.films= [];
        filmsService.selectedFilm = null;

        var urlFromTitle = function(title) {
            var queryString = title.split(' ').join('+');
            var url = omdbAPi.url.
            replace(omdbAPi.namePlaceholder, queryString);
            return url;
        }

        var selectedFilmNyTitle = function(title){
            for(var i = 0; i < filmsService.films.length; i++){
                 if(filmsService.films[i].title == title){
                    return filmsService.films[i];
                 }  
            };
            return null;
        };

        filmsService.getFilm = function(title){
            var deferred = $q.defer();

            if(filmService.films.length > 0){
                filmsService.selectedFilm = SelectedFilmByTitle (title);
                deferred.resolve(filmsService.selectedFilm);
            }
            else{
                //console.log(title);
                $http.get(urlFromTitle(title), {}).then(
                    function (response) {
                        // console.log(response.data);
                        filmsService.selectedFilm = film.build(response);
                        deferred.resolve(filmsService.selectedFilm);
                    },
                    function(error) {
                        filmsService.SelectedFilm = null;
                        deferred.resolve(null);
                    });
            }
            return deferred.promise;
        };

        filmsService.getFilms = function (){
            var deferred = $q.defer();
            if(filmsService.films.length > 0){
                deferred.resolve(filmsService.films);
            }
            else{
                var nDownloads = 0;
                var someErrorOcurred = false;
                var resolveIfFinished = function(succes) {
                    nDownloads++;

                    if(!success){
                        someErrorOcurred = true;
                    }

                    if(nDownloads === filmNames.length){
                        if(!someErrorOcurred){
                            deferred.resolve(filmsService.films);
                            //console.log(filmsService.films);
                        }
                        else{
                            deferred.reject();
                        }
                    }

                };
                for(var i =0; i < filmNames.length; i++){
                    $http.get(urlFromTitle(filmNames[i]), {}).then(function(response){
                        filmsService.films.push(film.build(response.data));
                        resolveIfFinished(true);
                    });
                    
                }
            }
            return deferred.promise;
        }

            return Film; 
        

    })