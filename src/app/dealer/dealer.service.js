(function () {
    'use strict';

    angular
        .module('blackjack.dealer')
        .factory('DealerService', DealerService);

    DealerService.$inject =['GameService'];

    function DealerService(GameService){
        var service = {
            newDealer: newDealer,
            Dealer: Dealer
        };

        function newDealer(deck){
            var dealer = new Dealer(deck);
            return dealer;
        }

        function Dealer(deck){
            var dealer = this;
            dealer.deck = deck;

            /**
             * Creates initial values for dealer object
             */
            dealer.init = function(){
                dealer.cards = [];
                dealer.handValue = 0;
                dealer.isDone = false;
                dealer.busted = false;
                dealer.maxValue = GameService.maxValue();
                dealer.minValue = 17;
            };

            /**
             * When a new game is started, dealer gets two cards
             */
            dealer.deal = function(){
                dealer.init();
                dealer.hit();
                dealer.hit();
            };

            /**
             * After player has completed game, tell dealer to finish
             * by dealing out until hand is busted or between 17-21
             */
            dealer.finish = function () {
                while(dealer.handValue < dealer.minValue){
                    dealer.hit();
                }
                if(dealer.handValue > dealer.maxValue){
                    dealer.busted = true;
                }
                dealer.isDone = true;

            };

            /**
             * Deals a card to the dealer's hand
             */
            dealer.hit = function(){
                dealer.cards.push(dealer.deck.deal());
                dealer.getHandValue();
            };

            /**
             * Uses game service to calculate hand value
             */
            dealer.getHandValue = function(){
                dealer.handValue = GameService.handValue(dealer.cards);
            };

            dealer.init();

        }

        return service;

        ////////////////



    }

})();
