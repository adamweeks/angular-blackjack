import angular from 'angular';
import DealerService from './dealer.service';

let dealerModule = angular.module('blackjack.dealer', []);

dealerModule
	.factory('DealerService', DealerService);

export default dealerModule;