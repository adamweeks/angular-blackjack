import angular from 'angular';
import Game from './app/game';
import Player from './app/player';
		
const ngModule = angular.module('blackjack', [
        Game.name,
        Player.name
    ]);