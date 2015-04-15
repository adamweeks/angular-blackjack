(function() {
    'use strict';

    angular.module('blackjack', [
        'blackjack.card',
        'blackjack.game',
        'blackjack.player',
        'blackjack.dealer'
    ]);

})();

(function () {
    'use strict';

    angular
        .module('blackjack.card', []);
})();

(function () {
    'use strict';

    angular
        .module('blackjack.dealer', []);
})();

(function() {
    'use strict';

    angular.module('blackjack.game', []);

})();

(function(){
    'use strict';

    angular
        .module('blackjack.player', []);

})();

(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackCard', BlackjackCard)
        .controller('BlackjackCardController', BlackjackCardController);

    BlackjackCard.$inject = ['$window'];

    BlackjackCardController.$inject = ['$scope'];
    /* @ngInject */
    function BlackjackCard($window)
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="card" ng-class="[vm.suit, vm.cardIndexClass]" ng-if="!vm.card.hideValue">' +
                        '<p>{{vm.rank}}</p>' +
                        '</div>' +
                        '<div class="card back" ng-class="vm.cardIndexClass" ng-if="vm.card.hideValue"></div>',
            scope: {
                card: '=',
                cardIndex: '@'
            },
            controller: 'BlackjackCardController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

    }

    /* @ngInject */
    function BlackjackCardController($scope){
        var vm = this;

        vm.rank;
        vm.suit;

        vm.init = function(){
            vm.displayCard();

            $scope.$watchCollection('vm.card',function(newC,oldC){
                vm.displayCard();
            });
        };

        vm.displayCard = function(){
            if(vm.hideValue){
                vm.suit = 'back';
                vm.rank = '';
            }
            else {
                vm.rank = vm.card.rank;
                var cardSuit;
                switch (vm.card.suit) {
                    //'C', 'D', 'S', 'H'
                    case 'C':
                        cardSuit = 'suitclubs';
                        break;
                    case 'D':
                        cardSuit = 'suitdiamonds';
                        break;
                    case 'H':
                        cardSuit = 'suithearts';
                        break;
                    case 'S':
                        cardSuit = 'suitspades';
                        break;
                }
                vm.suit = cardSuit;
            }

            vm.cardIndexClass = 'card-index-' + vm.cardIndex;
        };

        vm.init();
    }
})();

(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .directive('blackjackHand', BlackjackHand);

    /* @ngInject */
    function BlackjackHand()
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="playingCards">' +
                        '<blackjack-card ng-repeat="card in cards track by $index" card="card" card-index="{{$index}}"></blackjack-card>' +
                        '</div>',
            scope: {
                cards: '='
            }
        };
        return directive;

    }
})();

(function () {
    'use strict';

    angular
        .module('blackjack.card')
        .factory('CardService', CardService);


    function CardService(){
        var service = {
            newDeck: newDeck,
            Deck: Deck,
            Card: Card
        };

        function newDeck(){
            var deck = new Deck();
            return deck;
        }

        function Deck(){
            var deck = this;
            this.cards = [];
            this.dealt = [];

            deck.suits.forEach(function (suit) {
                deck.ranks.forEach(function(rank){
                    var card = new Card(rank, suit);
                    deck.cards.push(card);
                })
            });

            deck.shuffle();
        }

        Deck.prototype.suits = ['C', 'D', 'S', 'H'];

        Deck.prototype.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

        Deck.prototype.deal = function(){
            var card = this.cards.shift();
            if(angular.isDefined(card)){
                this.dealt.push(card);
                return card;
            }
            else{
                return false;
            }

        };

        Deck.prototype.shuffle = function () {
            /**
             * Knuth Shuffle Implementation
             * https://github.com/coolaj86/knuth-shuffle
             */
            var currentIndex = this.cards.length;
            var temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this.cards[currentIndex];
                this.cards[currentIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = temporaryValue;
            }
        };

        Deck.prototype.reset = function () {
            this.cards = this.cards.concat(this.dealt);
            this.dealt = [];
            this.shuffle();
        };

        function Card(rank, suit){
            this.rank = rank;
            this.suit = suit;
        }

        Card.prototype.name = function () {
            return this.rank + ' ' + this.suit;
        };

        return service;

        ////////////////

    }

})();

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

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['$timeout','PlayerService', 'CardService', 'GameService', 'DealerService'];

    function GameController($timeout, PlayerService, CardService, GameService, DealerService){
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

        game.init();
    }
})();

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .directive('blackjackGame', blackjackGame);

    function blackjackGame(){
        return {
            restrict: 'E',
            templateUrl: 'app/game/game.directive.html',
            controller: 'GameController',
            controllerAs: 'game'
        }
    }
})();

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .factory('GameService', GameService);

    function GameService(){
        var service = {
            handValue: handValue,
            maxValue: maxValue
        };

        ////////////////////

        var _maxValue = 21;

        /**
         * Returns the numeric maximum hand value before busting
         * @returns {number}
         */
        function maxValue(){
            return _maxValue;
        }

        /**
         * Gets the value of an array of cards
         * @param hand
         * @returns {number}
         */
        function handValue(hand){
            var aces = 0;
            var totalValue = 0;
            var faceRanks = ['J','Q','K'];

            //Get the values of each card (counting 1 for each ace)
            hand.forEach(function(card){
                //Face Cards
                if(faceRanks.indexOf(card.rank) !== -1){
                    totalValue += 10;
                }
                //Aces
                else if(card.rank === 'A'){
                    totalValue += 1;
                    aces++;
                }
                //Number Cards
                else {
                    totalValue += Number(card.rank);
                }
            });

            //Loop through aces and try to add 10 to get highest value of hand
            // We are adding 10 here because we already added 1 for the ace above
            for(var i=0; i<aces; i++){
                if(totalValue <= 11){
                    totalValue += 10;
                }
            }

            return totalValue;
        }

        return service;
    }
})();

(function(){
    'use strict';

    angular
        .module('blackjack.player')
        .factory('PlayerService', PlayerService);

    function PlayerService(){
        var service = {
            newPlayer: newPlayer
        };

        /////////////
        /**
         * New Player Object
         * @param playerName
         * @param initialScore
         * @constructor
         */
        function Player(playerName, initialScore) {
            this.score = initialScore;
            this.initialScore = initialScore;
            this.name = playerName;
        }

        /**
         * Change the score by amount
         * @param amountToChange
         */
        Player.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = this.initialScore;
            }

            this.score += amountToChange;
        };

        /**
         * Resets the score of a player back to initial score.
         */
        Player.prototype.resetScore = function () {
            this.score = this.initialScore;
        };

        /**
         * Creates a new player object
         * @param playerName
         * @param initialScore
         * @returns {PlayerService.Player}
         */
        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }

        return service;
    }
})();
