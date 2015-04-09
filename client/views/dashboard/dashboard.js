Template.dashboard.rendered = function()
{
  	$('#filterSidebar').hide();

  	//Masonry
  	var $container = $('#mainContent');
// initialize
	$container.imagesLoaded( function() 
	{
		$container.masonry({
		  //columnWidth: 60,
		  itemSelector: '.item',
		  transformsEnabled: false
		});
	});

	Session.get("reRenderPage");
};

Template.dashboard.helpers({

	items: function()
	{

		var type=Session.get("filter_type");
		var selector = {};
		if (Session.get("filter_category") && Session.get("filter_category") != "all") selector.categories = Session.get("filter_category");
	  	if (Session.get("filter_client") && Session.get("filter_client") != "all") selector.clientCompany = Session.get("filter_client");
	  	if (Session.get("filter_tag") && Session.get("filter_tag") != "all") selector.tags = Session.get("filter_tag");

	  	var projects = Projects.find(selector, {sort: {dateCreated: -1}}).fetch();
		if (type=="project")
			return projects;
		else if (type=="testimonial")
		{
			var ids = createArray_ProjectIds(projects);
			return Testimonials.find({project: {$in: ids}}, {sort: {dateCreated: -1}});
		}
		else if (type=="ss")
		{
			var ids = createArray_ProjectIds(projects);
			return SuccessStories.find({project: {$in: ids}}, {sort: {dateCreated: -1}});
		}
	},

	reRenderPage: function()
	{
		console.log("in reRenderPage");
		Session.get("reRenderPage");
		$('#mainContent').masonry({
		  //columnWidth: 60,
		  itemSelector: '.item',
		  transformsEnabled: false
		});
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