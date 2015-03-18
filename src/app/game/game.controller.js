(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService', 'CardService', 'GameService', 'DealerService'];

    function GameController(PlayerService, CardService, GameService, DealerService){
        var game = this;

        /**
         * Our game can have multiple states:
         * 1) Game with no player (started = false, canDeal = false, showResults = false)
         * 2) Game with a player, nothing dealt (started = true, canDeal = true, showResults = false)
         * 3) Game with a player, game in progress (started = true, canDeal = false, showResults = false)
         * 4) Game with a player, game over (started = true, canDeal = true, showResults = true)
         */

        /**
         * Initialize our controller data
         */
        game.init = function () {
            game.maxValue = GameService.maxValue();
            game.canDeal = false;
            game.started = false;
            game.showResults = false;
            game.deck = CardService.newDeck();
            game.dealer = DealerService.newDealer(game.deck);
            game.betValue = 100;
            game.playerCards = [];
            game.handValue = 0;
        };

        /**
         * Starts a game by creating a new player
         */
        game.start = function () {
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.started = true;
            game.canDeal = true;
            game.showResults = false;
        };

        /**
         * Deals a new hand by 'paying' from the score,
         * shuffles the deck, and deals two cards to the
         * player.
         */
        game.deal = function () {
            //Initialize values each game
            game.busted = false;
            game.started = true;
            game.canDeal = false;
            game.showResults = false;

            //Our bet defaults to 100
            game.player.changeScore(game.betValue * -1);

            //Shuffle before dealing
            game.deck.shuffle();

            //Empty our dealt card array
            game.playerCards = [];

            //Deal the cards
            game.hit();
            game.hit();

            //Deal to the dealer
            game.dealer.deal();
        };

        /**
         * Adds a card to our hand and calculates value.
         */
        game.hit = function () {
            game.playerCards.push(game.deck.deal());
            game.getHandValue();
        };

        /**
         * Ends the game for the current hand. Checks for wins
         * and 'pays' to player score
         */
        game.end = function () {
            //Tell the dealer to finish his hand
            game.dealer.finish();

            if(game.busted){
                game.results = "BUSTED";
            }
            else{
                var wonGame = false;
                var tiedGame = false;
                //Check against dealer's hand
                if(game.dealer.busted){
                    //Auto Win if dealer busts
                    wonGame = true;
                }
                else{
                    if(game.dealer.handValue === game.handValue){
                        tiedGame = true;
                    }
                    else{
                        wonGame = (game.handValue > game.dealer.handValue);
                    }
                }

                if(wonGame){
                    //Winning pays double the bet
                    game.player.changeScore(game.betValue * 2);
                    game.results = "YOU WON!";
                }
                else if(tiedGame){
                    //A 'PUSH' gives the player back their bet
                    game.player.changeScore(game.betValue);
                }
                else{
                    game.results = "DEALER WON";
                }
            }

            game.canHit = false;
            game.canDeal = true;
            game.showResults = true;
        };

        /**
         * Resets our player's score and re-inits
         */
        game.reset = function () {
            game.player = null;
            game.init();
        };

        /**
         * Calculates value of player's hand via GameService
         * Determines if player can still hit or if busted.
         */
        game.getHandValue = function () {
            game.handValue = GameService.handValue(game.playerCards);
            game.canHit = game.handValue < game.maxValue;
            game.busted = game.handValue > game.maxValue;
            if(game.handValue >= game.maxValue){
                game.end();
            }
        };

        game.init();
    }
})();
