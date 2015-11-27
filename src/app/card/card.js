BlackjackCardController.$inject = ['$scope'];

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

export default BlackjackCardController;