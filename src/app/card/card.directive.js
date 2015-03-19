(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackCard', BlackjackCard)
        .controller('BlackjackCardController', BlackjackCardController);

    BlackjackCard.$inject = ['$window'];

    /* @ngInject */
    function BlackjackCard($window)
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="card" ng-class="vm.suit">' +
                        '<p>{{vm.rank}}</p>' +
                        '</div>',
            scope: {
                card: '='
            },
            controller: 'BlackjackCardController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

    }

    /* @ngInject */
    function BlackjackCardController(){
        var vm = this;

        vm.rank;
        vm.suit;

        vm.init = function(){
            vm.rank = vm.card.rank;
            var cardSuit;
            switch(vm.card.suit){
                //'C', 'D', 'S', 'H'
                case 'C':
                    cardSuit = 'suitclubs';
                    break;
                case 'D':
                    cardSuit = 'suitdiamonds';
                    break;
                case 'H':
                    cardSuit = 'suithearts';
                    break;
                case 'S':
                    cardSuit = 'suitspades';
                    break;
            }
            vm.suit = cardSuit;
        };

        vm.init();
    }
})();
