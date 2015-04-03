(function () {
    'use strict';

    angular
        .module('blackjack.dealer')
        .factory('DealerService', DealerService);

    DealerService.$inject =['$timeout','GameService'];

    function DealerService($timeout, GameService){
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
                dealer.hit(true, false, dealer.getHandValue);
                dealer.hit(false, false, dealer.getHandValue);
            };

            /**
             * After player has completed game, tell dealer to finish
             * by dealing out until hand is busted or between 17-21
             * @param callback
             */
            dealer.finish = function (callback) {
                
                var loop = {
                    next: function(){
                        dealer.getHandValue();
                        if(dealer.handValue < dealer.minValue) {
                            //Animate Card In
                            dealer.hit(false, true, function () {
                                loop.next();
                            });
                        }
                        else{
                            loop.done();
                        }
                    },
                    done: function(){
                        if(dealer.handValue > dealer.maxValue){
                            dealer.busted = true;
                        }
                        dealer.isDone = true;
                        callback();
                    }
                };

                //Reveal first card, then play:
                $timeout(function(){
                    dealer.cards.forEach(function(card){
                        card.hideValue = false;
                    });
                    loop.next();
                },500);

            };

            /**
             * Deals a card to the dealer's hand
             * @param hideCard
             * @param animate
             * @param callback
             */
            dealer.hit = function(hideCard, animate, callback){
                var card = dealer.deck.deal();
                card.hideValue = hideCard;
                dealer.cards.push(card);

                if(animate){
                    card.hideValue = true;
                    $timeout(function(){
                        card.hideValue = false;
                        callback();
                    },1000);
                }
                else {
                    callback();
                }
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
