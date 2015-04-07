(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackHand', BlackjackHand);

    /* @ngInject */
    function BlackjackHand()
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="playingCards">' +
                        '<blackjack-card ng-repeat="card in cards track by $index" card="card" card-index="{{$index}}"></blackjack-card>' +
                        '</div>',
            scope: {
                cards: '='
            }
        };
        return directive;

    }
})();
