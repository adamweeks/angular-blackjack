(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['$timeout','PlayerService', 'CardService', 'GameService', 'DealerService', 'hotkeys'];

    function GameController($timeout, PlayerService, CardService, GameService, DealerService, hotkeys){
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

            game.updateButtons(false, false, false);

            game.setupHotKeys();

        };

        /**
         * Starts a game by creating a new player
         */
        game.start = function () {
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.started = true;
            game.canDeal = true;
            game.showResults = false;

            game.updateButtons(true, false, false);
        };

        /**
         * Deals a new hand by 'paying' from the score,
         * shuffles the deck, and deals two cards to the
         * player.
         */
        game.deal = function () {
            //Initialize values each game
            game.updateButtons(false, false, false);

            game.busted = false;
            game.started = true;
            game.canDeal = false;
            game.showResults = false;

            //Our bet defaults to 100
            game.player.changeScore(game.betValue * -1);

            //Shuffle before dealing
            game.deck.reset();

            //Empty our dealt card array
            game.playerCards.length = 0;

            //Deal the cards
            game.hit(false);
            game.hit(false);

            //Deal to the dealer
            game.dealer.deal();
        };

        /**
         * Adds a card to our hand and calculates value.
         * @param animate - Animate the card in
         */
        game.hit = function (animate) {
            game.updateButtons(false, false, false);
            var card = game.deck.deal();
            game.dealCardToPlayer(card, animate, function(){
                game.getHandValue();
            });


        };

        /**
         *
         * @param card
         * @param animate
         * @param callback
         */
        game.dealCardToPlayer = function(card, animate, callback){
            if(animate) {
                card.hideValue = true;
                game.playerCards.push(card);
                $timeout(function () {
                    card.hideValue = false;
                    callback();
                }, 250);
            }
            else{
                game.playerCards.push(card);
                callback();
            }
        };

        /**
         * Ends the game for the current hand. Checks for wins
         * and 'pays' to player score
         */
        game.end = function () {
            game.updateButtons(false, false, false);
            //Tell the dealer to finish his hand
            game.dealer.finish(function(){
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
                        game.results = "HAND PUSHED";
                    }
                    else{
                        game.results = "DEALER WON";
                    }
                }

                $timeout(function() {
                    game.showResults = true;
                    game.updateButtons(true, false, false);
                },500);
            });


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
            game.busted = game.handValue > game.maxValue;
            if(game.handValue >= game.maxValue){
                game.end();
            }
            else{
                game.updateButtons(false, true, true);
            }
        };

        /**
         * Called after a game state changes and updates the status of the game action buttons.
         * @param bet
         * @param hit
         * @param stay
         */
        game.updateButtons = function(bet, hit, stay) {
            game.buttonBetEnabled = bet;
            game.buttonHitEnabled = hit;
            game.buttonStayEnabled = stay;
        };

        game.setupHotKeys = function(){
            hotkeys.add({
                combo: 's',
                description: 'Press to Stay',
                callback: function() {
                    if(game.buttonStayEnabled){
                        game.end();
                    }
                }
            });

            hotkeys.add({
                combo: 'h',
                description: 'Press to Hit',
                callback: function() {
                    if(game.buttonHitEnabled){
                        game.hit(true);
                    }
                }
            });

            hotkeys.add({
                combo: 'b',
                description: 'Press to Bet',
                callback: function() {
                    if(game.buttonBetEnabled){
                        game.deal();
                    }
                }
            });
        };

        game.init();
    }
})();
