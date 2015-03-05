'use strict';

describe('PlayerService Unit Tests', function () {
    var PlayerService;
    beforeEach(function () {
        module('blackjack.player');
        inject(function (_PlayerService_) {
            PlayerService = _PlayerService_;
        });
    });

    it('should be true', function () {
        expect(true).toBe(true);
    });

    it('should create a new player with name and score', function () {
        var playerName = 'testPlayer';
        var playerScore = 10101;
        var player = PlayerService.newPlayer(playerName, playerScore);
        expect(player.name).toBe(playerName);
        expect(player.score).toBe(playerScore);
    });

});
