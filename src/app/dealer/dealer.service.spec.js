'use strict';

describe('DealerService Unit Tests', function () {
    var DealerService, CardService;
    beforeEach(function () {
        module('blackjack.dealer');
        module('blackjack.game');
        module('blackjack.card');
        inject(function (_DealerService_, _CardService_) {
            DealerService = _DealerService_;
            CardService = _CardService_;
        });
    });

    it('should be true', function () {
        expect(true).toBe(true);
    });

    describe('Dealer related tests', function () {
        var dealer;
        beforeEach(function(){
            var deck = CardService.newDeck();
            dealer = DealerService.newDealer(deck);
        });


        it('should create a new dealer', function () {
            expect(dealer).toBeDefined();
        });

        it('should deal two cards initially', function(){
            expect(dealer.cards.length).toBe(0);
            dealer.deal();
            expect(dealer.cards.length).toBe(2);
        });

        it('should properly finish a hand greater than minValue', function () {
            dealer.deal();
            dealer.finish();
            expect(dealer.handValue).toBeGreaterThan(dealer.minValue-1);
        });

        it('should set isDone value after finishing', function () {
            dealer.deal();
            expect(dealer.isDone).toBe(false);
            dealer.finish();
            expect(dealer.isDone).toBe(true);
        });

        it('should bust if finishing over max value', function(){
            dealer.deal();
            dealer.finish();
            expect(dealer.busted).toBe(dealer.handValue > dealer.maxValue);
        })
    });
});
