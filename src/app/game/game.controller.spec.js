'use strict';

describe('GameController Unit Tests', function () {
    var gameController, CardService, PlayerService, DealerService, hotkeys;
    beforeEach(function () {
        module('blackjack.game');
        module('blackjack.player');
        module('blackjack.card');
        module('blackjack.dealer');
        module('cfp.hotkeys');
        inject(function ($controller, _CardService_, _PlayerService_, _DealerService_, _hotkeys_) {
            CardService = _CardService_;
            PlayerService = _PlayerService_;
            DealerService = _DealerService_;
            hotkeys = _hotkeys_;
            gameController = $controller('GameController', {
                CardService: CardService,
                PlayerService: PlayerService,
                DealerService: DealerService,
                hotkeys: hotkeys
            });
        });
    });

    it('should be true', function () {
       expect(true).toBe(true);
    });

    it('should have a start and end function', function () {
        expect(gameController.start).toBeDefined();
        expect(typeof gameController.start).toBe('function');
        expect(gameController.end).toBeDefined();
        expect(typeof gameController.end).toBe('function');
    });

    it('should have a deck', function () {
        expect(gameController.deck).toBeDefined();
        expect(gameController.deck instanceof CardService.Deck).toBe(true);
    });

    it('should create a player after starting game', function () {
        expect(gameController.player).not.toBeDefined();
        gameController.start();
        expect(gameController.player).toBeDefined();
    });

    it('should set started flag after calling start', function () {
        expect(gameController.started).toBe(false);
        gameController.start();
        expect(gameController.started).toBe(true);
    });

    it('should reset the deck before dealing', function(){
        spyOn(gameController.deck, 'reset');
        gameController.start();
        gameController.deal();
        expect(gameController.deck.reset).toHaveBeenCalled();
    });

});
