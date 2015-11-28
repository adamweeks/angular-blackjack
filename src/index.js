import jquery from 'jquery';
import angular from 'angular';
import hotkeys from 'angular-hotkeys';
import bootstrap from 'bootstrap';

import Card from './app/card';
import Dealer from './app/dealer';
import Game from './app/game';
import Player from './app/player';

import './content/blackjack.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
		
const ngModule = angular.module('blackjack', [
        Card.name,
        Dealer.name,
        Game.name,
        Player.name,
        'cfp.hotkeys'
    ]);