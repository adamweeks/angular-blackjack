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
                dealer.hit(true);
                dealer.hit(false);
            };

            /**
             * After player has completed game, tell dealer to finish
             * by dealing out until hand is busted or between 17-21
             */
            dealer.finish = function () {
                while(dealer.handValue < dealer.minValue){
                    dealer.hit(false);
                }
                if(dealer.handValue > dealer.maxValue){
                    dealer.busted = true;
                }
                dealer.cards.forEach(function(card){
                    card.hideValue = false;
                });
                dealer.isDone = true;

            };

            /**
             * Deals a card to the dealer's hand
             * @param hideCard
             */
            dealer.hit = function(hideCard){
                var card = dealer.deck.deal();
                card.hideValue = hideCard;
                dealer.cards.push(card);
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
