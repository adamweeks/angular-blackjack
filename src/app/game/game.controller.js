(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService', 'CardService'];

    function GameController(PlayerService, CardService){
        var game = this;

        game.init = function () {
            game.started = false;
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.deck = CardService.newDeck();
        };

        game.start = function () {
            game.started = true;
            game.player.changeScore(-100);
            game.deck.shuffle();
            game.playerCards = [];
            game.hit();
            game.hit();
        };

        game.hit = function () {
            game.playerCards.push(game.deck.deal());
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
