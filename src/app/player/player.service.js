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

        Player.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = 0;
            }

            this.score += amountToChange;
        };

        Player.prototype.resetScore = function () {
            this.score = 0;
        };

        function Player(playerName) {
            this.score = 0;
            this.name = playerName;
        }



        function newPlayer(playerName) {
            var player = new Player(playerName);
            return player;
        }

        return service;
    }
})();
