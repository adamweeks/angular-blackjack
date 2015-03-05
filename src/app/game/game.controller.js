(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService'];

    function GameController(PlayerService){
        var game = this;

        game.init = function () {
            game.started = false;
            game.player = PlayerService.newPlayer('Ringo', 100);
        };

        game.start = function () {
            game.started = true;
            game.player.changeScore(-100);
        };

        game.end = function () {
            game.started = false;
            game.player.changeScore(200);
        };

        game.reset = function () {
            game.player.resetScore();
            game.started = false;
        };

        game.init();
    }
})();
