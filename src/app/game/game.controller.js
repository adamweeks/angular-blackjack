(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    function GameController(){
        var game = this;

        game.init = function () {
            game.started = false;
        };

        game.start = function () {
            game.started = true;
        };

        game.end = function () {
            game.started = false;
        };

        game.init();
    }
})();
