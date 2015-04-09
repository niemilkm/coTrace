Meteor.startup(function()
{
	$(window).resize(function(evt)
	{
		Session.set("reRenderPage", $(window).width() + $(window).height());
	});
});