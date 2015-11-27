module.exports = function(ngModule) {    
    ngModule.directive('blackjackGame', blackjackGame);
    
    function blackjackGame(){
        return {
            restrict: 'E',
            template: require('./game.directive.html'),
            controller: 'GameController',
            controllerAs: 'game'
        }
    }    
};
