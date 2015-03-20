(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackHand', BlackjackHand)
        .controller('BlackjackHandController', BlackjackHandController);

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
                        '<blackjack-card ng-repeat="card in vm.cards" card="card" hide-value="card.hideValue"></blackjack-card>' +
                        '</div>',
            scope: {
                cards: '=',
                dealer: '=',
                dealerIsDone: '='
            },
            bindToController: true,
            controller: 'BlackjackHandController',
            controllerAs: 'vm'
        };
        return directive;

    }
    BlackjackHandController.$inject = ['$scope'];
    /* @ngInject */
    function BlackjackHandController($scope){
        var vm = this;

        vm.init = function(){

        };

        $scope.$watchGroup(['vm.cards', 'vm.dealerIsDone'], function(newVals, oldVals){
            if(!vm.dealer){
                return;
            }
            vm.cards.forEach(function(card, index){
                if(index == 0){
                    card.hideValue = false;
                }
                else {
                    card.hideValue = !vm.dealerIsDone;
                }
            })
        });

        vm.init();
    }
})();
