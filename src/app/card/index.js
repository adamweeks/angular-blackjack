import angular from 'angular';
import BlackjackCard from './card.directive';
import CardService from './card.service';
import BlackjackHand from './card.hand.directive';

let cardModule = angular.module('blackjack.card', []);

cardModule
	.directive('blackjackCard', BlackjackCard)
	.factory('CardService', CardService)
	.directive('blackjackHand', BlackjackHand);

export default cardModule;