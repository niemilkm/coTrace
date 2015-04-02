Template.dashboard.rendered = function()
{
  $('#filterSidebar').hide();
}

Template.dashboard.helpers({

	items: function()
	{

		var type=Session.get("filter_type");
		var selector = {};
		if (Session.get("filter_category") && Session.get("filter_category") != "all") selector.categories = Session.get("filter_category");
	  	if (Session.get("filter_client")) selector.clientCompany = Session.get("filter_client");
	  	if (Session.get("filter_tag")) selector.tags = Session.get("filter_tag");

		if (type=="project")
		{
			return Projects.find(selector);
		}
		else if (type=="testimonial")
			return Testimonials.find();
		else if (type=="ss")
			return SuccessStories.find()
	}

});

Template.dashboard.events = 
{
  'click .searchModal': function(e)
  {
    $('#filterSidebar').toggle();
  }

}

UI.registerHelper('equals', function (b) {
  return Session.get("filter_type") === b;
});

// Template.dashboard.rendered = function()
// {
//   setTimeout(function()
//   {
//     masonize(function()
//     {
//       //$('.search-query').focus();
//     })
//   }, 500);
// }

// function masonize(callback)
// {
//   var container = $('#mainContent');
//   console.log("ran masonize");
//   container.masonry(
//   {
//     itemSelector:'.projectItem',
//     columnWidth: 50,
//     gutter:20
//   })
//   if(callback){callback()};
// }