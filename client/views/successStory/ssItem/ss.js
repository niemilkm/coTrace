
Template.ssItem.helpers({

	info: function()
	{
		var project = Projects.findOne({_id: this.project});
		return {
					ssName: 		this.name,
					clientCompany: 	ClientCompanies.findOne({_id: project.clientCompany}).name,
					category: 		Categories.findOne({_id: project.categories}).name,
					ss: 			stringTruncate(stringSS(this._id))
				};
	}


});