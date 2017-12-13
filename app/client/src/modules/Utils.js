angular.module('reg')
  .factory('Utils', [
    function(){
      return {
        isRegOpen: function(settings){
          return Date.now() > settings.timeOpen && Date.now() < settings.timeClose;
        },
        isAfter: function(time){
          return Date.now() > time;
        },
        formatTime: function(time){

          if (!time){
            return "Fecha inválida";
          }

          date = new Date(time);
          // Hack for timezone
          moment.locale('es');
          var y = moment(date);
          var x = y.format('LLLL') +
            " " + date.toTimeString().split(' ')[2];
          return x;
        }
      };
    }]);