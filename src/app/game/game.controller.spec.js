'use strict';

describe('GameController Unit Tests', function () {
    var gameController;
    beforeEach(function () {
        module('blackjack.game');
        module('blackjack.player');
        inject(function ($controller) {
            gameController = $controller('GameController');
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

    it('should have a player defined', function (){
        expect(gameController.player).toBeDefined();
    });
});
