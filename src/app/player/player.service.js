(function(){
    'use strict';

    angular
        .module('blackjack.player')
        .factory('PlayerService', PlayerService);

    function PlayerService(){
        var service = {
            newPlayer: newPlayer
        };

        /////////////
        function Player(playerName, initialScore) {
            this.score = initialScore;
            this.name = playerName;
        }

        Player.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = 0;
            }

            this.score += amountToChange;
        };

        Player.prototype.resetScore = function () {
            this.score = 0;
        };


        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }

        return service;
    }
})();
