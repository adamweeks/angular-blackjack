import angular from 'angular';
import GameDirective from './game.directive';
import GameService from './game.service';

let gameModule = angular.module('blackjack.game', []);

gameModule
	.directive('blackjackGame', GameDirective)
	.factory('GameService', GameService);

export default gameModule;