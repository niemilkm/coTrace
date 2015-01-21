Projects = new Meteor.Collection('project');

Meteor.methods({
	update_projectDetails: function(pd, pd_id) {
		console.log("project updated");
		Projects.update({_id: pd_id}, {$set: {name: pd.project, clientCompany: pd.client, categories: pd.category, tags: pd.tag}});
	},

	insert_projectDetails: function(pd) {
		console.log("project inserted");
		var companyId = Companies.findOne({})._id;
		Projects.insert({name: pd.project, clientCompany: pd.client, categories: pd.category, tags: pd.tag, company: companyId});
	},

	remove_project_byProjectIds: function(projectObjects) {
		_.each(projectObjects, function(projectData) {
			Projects.remove({_id: projectData._id});
		});
	},

	remove_project: function(projectId) {
		Projects.remove({_id: projectId});
	}

});

Projects.allow({
insert: function () {
    return true;
},

remove: function (){
    return true;    
},

update: function() {
    return true;    
}

});