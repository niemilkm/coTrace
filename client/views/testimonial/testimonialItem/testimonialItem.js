
Template.dashboard.rendered = function()
{
	$('#mainContent').masonry('reloadItems');
}

Template.testimonialItem.helpers({

	info: function()
	{
		var project = Projects.findOne({_id: this.project});
		return {
					pName: 			project.name,
					clientCompany: 	ClientCompanies.findOne({_id: project.clientCompany}).name,
					category: 		Categories.findOne({_id: project.categories}).name,
					testimonial: 	stringTruncate(this.testimonial)
				};
	}


});

