import GameController from './game.controller';
import template from './game.directive.html';

let GameDirective =
    function (){
        return {
            restrict: 'E',
            template: template,
            controller: GameController,
            controllerAs: 'game'
        }
    };
    
export default GameDirective;     