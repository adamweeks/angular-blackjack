(function() {
    'use strict';

    angular.module('blackjack', [
        'blackjack.card',
        'blackjack.game',
        'blackjack.player'
    ]);

})();

(function () {
    'use strict';

    angular
        .module('blackjack.card', []);
})();

(function(){
    'use strict';

    angular
        .module('blackjack.player', []);

})();

(function() {
    'use strict';

    angular.module('blackjack.game', []);

})();

(function() {
    'use strict';

    angular.module('blackjack', [
        'blackjack.card',
        'blackjack.game',
        'blackjack.player'
    ]);

})();

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService', 'CardService'];

    function GameController(PlayerService, CardService){
        var game = this;

        game.init = function () {
            game.started = false;
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.deck = CardService.newDeck();
        };

        game.start = function () {
            game.started = true;
            game.player.changeScore(-100);
            game.deck.shuffle();
            game.playerCards = [];
            game.hit();
            game.hit();
        };

        game.hit = function () {
            game.playerCards.push(game.deck.deal());
        };

        game.end = function () {
            game.started = false;
            game.player.changeScore(200);
        };

        game.reset = function () {
            game.player.resetScore();
            game.started = false;
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

(function() {
    'use strict';

    angular.module('blackjack.game', []);

})();

(function () {
    'use strict';

    angular
        .module('blackjack.card', []);
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

(function(){
    'use strict';

    angular
        .module('blackjack.player', []);

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

(function() {
    'use strict';

    angular.module('blackjack', [
        'blackjack.card',
        'blackjack.game',
        'blackjack.player'
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

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService', 'CardService'];

    function GameController(PlayerService, CardService){
        var game = this;

        game.init = function () {
            game.started = false;
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.deck = CardService.newDeck();
        };

        game.start = function () {
            game.started = true;
            game.player.changeScore(-100);
            game.deck.shuffle();
            game.playerCards = [];
            game.hit();
            game.hit();
        };

        game.hit = function () {
            game.playerCards.push(game.deck.deal());
        };

        game.end = function () {
            game.started = false;
            game.player.changeScore(200);
        };

        game.reset = function () {
            game.player.resetScore();
            game.started = false;
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

(function() {
    'use strict';

    angular.module('blackjack.game', []);

})();

(function(){
    'use strict';

    angular
        .module('blackjack.player', []);

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

(function(){
    'use strict';

    angular
        .module('blackjack.game')
        .controller('GameController',GameController);

    GameController.$inject = ['PlayerService', 'CardService'];

    function GameController(PlayerService, CardService){
        var game = this;

        game.init = function () {
            game.started = false;
            game.player = PlayerService.newPlayer('Ringo', 100);
            game.deck = CardService.newDeck();
        };

        game.start = function () {
            game.started = true;
            game.player.changeScore(-100);
            game.deck.shuffle();
            game.playerCards = [];
            game.hit();
            game.hit();
        };

        game.hit = function () {
            game.playerCards.push(game.deck.deal());
        };

        game.end = function () {
            game.started = false;
            game.player.changeScore(200);
        };

        game.reset = function () {
            game.player.resetScore();
            game.started = false;
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
