(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackHand', BlackjackHand)
        .controller('BlackjackHandController', BlackjackHandController);

    BlackjackHand.$inject = ['$window'];

    /* @ngInject */
    function BlackjackHand($window)
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="playingCards">' +
                        '<blackjack-card ng-repeat="card in vm.cards" card="card"></blackjack-card>' +
                        '</div>',
            scope: {
                cards: '=',
                dealer: '='
            },
            bindToController: true,
            controller: 'BlackjackHandController',
            controllerAs: 'vm'
        };
        return directive;

    }

    /* @ngInject */
    function BlackjackHandController(CardService){
        var vm = this;

        vm.init = function(){

        };

        vm.init();
    }
})();
