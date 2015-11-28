import angular from 'angular';
import PlayerService from './player.service';

let playerModule = angular.module('blackjack.player', []);

playerModule	
	.factory('PlayerService', PlayerService);

export default playerModule;