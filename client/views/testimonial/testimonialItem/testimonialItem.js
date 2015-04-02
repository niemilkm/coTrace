
Template.testimonialItem.helpers({

	info: function()
	{
		console.log(this);
		var project = Projects.findOne({_id: this.project});
		return {
					pName: 			project.name,
					clientCompany: 	ClientCompanies.findOne({_id: project.clientCompany}).name,
					category: 		Categories.findOne({_id: project.categories}).name,
					testimonial: 	stringTruncate(this.testimonial)
				};
	}


});

