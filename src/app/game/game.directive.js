(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .directive('blackjackGame', blackjackGame);

    function blackjackGame(){
        return {
            restrict: 'E',
            templateUrl: 'app/game/game.directive.html',
            controller: 'GameController',
            controllerAs: 'game'
        }
    }
})();
