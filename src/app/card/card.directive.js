import BlackjackCardController from './card';

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
        template:   '<div class="card" ng-class="[vm.suit, vm.cardIndexClass]" ng-if="!vm.card.hideValue">' +
                    '<p>{{vm.rank}}</p>' +
                    '</div>' +
                    '<div class="card back" ng-class="vm.cardIndexClass" ng-if="vm.card.hideValue"></div>',
        scope: {
            card: '=',
            cardIndex: '@'
        },
        controller: BlackjackCardController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;

}

export default BlackjackCard;
