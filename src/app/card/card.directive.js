(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackCard', BlackjackCard)
        .controller('BlackjackCardController', BlackjackCardController);

    BlackjackCard.$inject = ['$window'];

    BlackjackCardController.$inject = ['$scope'];
    /* @ngInject */
    function BlackjackCard($window)
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="card" ng-class="[vm.suit, vm.cardIndexClass]" ng-if="!vm.card.hideValue">' +
                        '<p>{{vm.rank}}</p>' +
                        '</div>' +
                        '<div class="card back" ng-class="vm.cardIndexClass" ng-if="vm.card.hideValue"></div>',
            scope: {
                card: '=',
                cardIndex: '@'
            },
            controller: 'BlackjackCardController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

    }

    /* @ngInject */
    function BlackjackCardController($scope){
        var vm = this;

        vm.rank;
        vm.suit;

        vm.init = function(){
            vm.displayCard();

            $scope.$watchCollection('vm.card',function(newC,oldC){
                vm.displayCard();
            });
        };

        vm.displayCard = function(){
            if(vm.hideValue){
                vm.suit = 'back';
                vm.rank = '';
            }
            else {
                vm.rank = vm.card.rank;
                var cardSuit;
                switch (vm.card.suit) {
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
            }

            vm.cardIndexClass = 'card-index-' + vm.cardIndex;
        };

        vm.init();
    }
})();
