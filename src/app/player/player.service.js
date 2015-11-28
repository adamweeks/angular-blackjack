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
export default PlayerService;
