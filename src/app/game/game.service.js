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
