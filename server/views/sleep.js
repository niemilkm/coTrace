Meteor.methods({
	sleep: function(ms) {
		Fiber = Npm.require("fibers")
		var fiber = Fiber.current;
		setTimeout(function() {
			fiber.run();
		}, ms);
		Fiber.yield();
	}
});