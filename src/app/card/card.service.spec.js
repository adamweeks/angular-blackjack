'use strict';

describe('CardService Unit Tests', function () {
    var CardService;
    beforeEach(function () {
        module('blackjack.card');
        inject(function (_CardService_) {
            CardService = _CardService_;
        });


    });

    it('should be true', function () {
        expect(true).toBe(true);
    });

    describe('Deck related tests', function () {
        var deck;
        beforeEach(function () {
            deck = CardService.newDeck();
        });

        it('should be able to get a new deck of cards with the object type "Deck"', function () {
            expect(typeof deck).toBe('Deck');
        });

        it('The deck should contain 52 cards', function () {
            expect(deck.cards.length).toBe(52);
        });

        it('There should be no duplicate cards in a deck', function () {
            var cardNames = [];
            deck.cards.forEach(function (card) {
                expect(cardNames.indexOf(card.name)).toBe(-1);
                cardNames.push(card.name);
            });
        });

        it('Each card should have a value and a suit.', function () {
            deck.cards.forEach(function (card) {
                expect(card.value).toBeDefined();
                expect(card.suite).toBeDefined();
            });
        });

        it('We should be able to "deal" a card from a deck that has undealt cards in it.', function () {
            expect(deck.deal).toBeDefined();
            var card = deck.deal();
            expect(typeof card).toBe('Card');
        });

        it('Attempting to "deal" from a deck with no undealt cards returns false', function () {
            deck.cards = [];
            var card = deck.deal();
            expect(card).toBe(false);
        });

        it('When a card is dealt, it is no longer in the cards array', function () {
            var card = deck.deal();
            expect(deck.indexOf(card)).toBe(-1);
        });

        it('We should be able to shuffle the deck and randomize all undealt cards.', function () {
            expect(deck.shuffle).toBeDefined();
            var originalDeck = angular.copy(deck.cards);
            deck.shuffle();
            expect(originalDeck).not.toEqual(deck.cards);
        });

        it('We should be able to "reset" a deck that will move all dealt cards into the undealt status and shuffle.', function () {
            expect(deck.reset).toBeDefined();
            deck.deal();
            expect(deck.cards.length).not.toBe(52);
            deck.reset();
            expect(deck.cards.length).toBe(52);
        });

    });


    /*
     We should be able to get a new deck of cards with the object type "Deck"
     The deck should contain 52 cards
     There should be no duplicate cards in a deck
     Each card should have a value and a suit.
     We should be able to 'deal' a card from a deck that has undealt cards in it.
     Attempting to "deal" from a deck with no undealt cards returns false
     When a card is dealt, it is no longer in the cards array
     We should be able to shuffle the deck and randomize all undealt cards.
     We should be able to 'reset' a deck that will move all dealt cards into the undealt status and shuffle.
     */

});
