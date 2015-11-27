module.exports = function(ngModule) {
	require('./game.directive')(ngModule);
	require('./game.controller')(ngModule);
	require('./game.service')(ngModule);
};