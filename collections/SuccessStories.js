SuccessStories = new Meteor.Collection('successStory');

Meteor.methods({
	insert_successStory: function(td) {
		var companyId = Companies.findOne({})._id;
		SuccessStories.insert({successStory: td.successStory, project: td.project, author: td.author, company: companyId});
		console.log("success story inserted");
	},

	update_successStory: function(td, td_id) {
		SuccessStories.update({_id: td_id}, {$set: {successStory: td.successStory, project: td.project, author: td.author}});
		console.log("success story updated");
	},

	remove_successStory_byProjectIds: function(projectObjects) {
		_.each(projectObjects, function(eachProject)
		{
			SuccessStories.remove({project: eachProject._id});
		});
	},

	remove_successStory_byAuthorId: function(authorId) {
		SuccessStories.remove({author: authorId});
	},

	remove_successStory_byProjectId: function(projectId) {
		SuccessStories.remove({project: projectId})
	},

	remove_successStory_byId: function(Id) {
		SuccessStories.remove({_id: Id})
	}

});

SuccessStories.allow({
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