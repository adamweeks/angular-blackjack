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
