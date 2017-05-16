angular.module('FilmModel.js',[])
.factory('Film',function(){
    function Film(title,year,runtime,director,actors,plot,poster,imbdRating){
        this.title=title;
        this.year=year;
        this.runtime=runtime;
        this.director=director;
        this.actors=actors;
        this.plot=plot;
        this.poster=poster;
        this.imdbRating=imbdRating;

    }
    Film.build=function(data){
        if(!data)
        return null;
        return new Film(data.Title, data.Year, data.Runtime, data.Director, data.Actors, data.Plot, data.Poster, data.imbdRating);
    }
    Film.prototype.toJson=function(){
        return angular.toJson(this);
    }

    Film.fromJsonBunch=function(data){
        if(angular.isArray(data)){
            return data.map(Film.build).filter(Boolean);
        }
        return Film.build(data);
    }
    return Film;
})