SuccessStories = new Meteor.Collection('successStory');

Meteor.methods({
	insert_successStory: function(td) {
		var companyId = Companies.findOne({})._id;
		var SS_id = SuccessStories.insert({name: td.SSName, SSInputs: td.SSInputs, project: td.project, author: td.author, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
		console.log("success story inserted");
	},

	update_successStory: function(td, td_id) {
		SuccessStories.update({_id: td_id}, {$set: {name: td.SSName, SSInput: td.SSInputs, project: td.project, author: td.author, dateUpdated: moment.utc()}});
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
	},

	insert_successStory_input: function(id, SSInputs_partialInfo) {
		var SSInputs = SSInputs_partialInfo;
		var indexAndNum = {};
		Meteor.call("findNextIndexAndHighestNum", id, function(error, data) {
			indexAndNum = data;
			SSInputs.ssInputs.num = indexAndNum.num;
			SSInputs.ssInputs.index = indexAndNum.index;
			console.log(SSInputs);
			//SuccessStories.update({_id: id}, {$push: {SSInputs:}});
		});
	},

	findNextIndexAndHighestNum: function(id)
	{
		var ss = SuccessStories.find({_id: id}).SSInputs;
		Meteor.call("sort_ssInputs_LowToHigh", ss, function(error, data) {
			var ss_sorted = data;
		});
		var count = 0;
		var lastNum = 0;
		var foundIndex = false;
		_.each(ss_sorted, function(data)
		{
			if (ss_sorted.index != count && !foundIndex)
			{
				count == ss_sorted.index;
				foundIndex = true;
			}
			lastNum = ss_sorted.num;
		});

		return [{index: count}, {num: lastNum + 1}];

	},

	sort_ssInputs_LowToHigh: function(SSInputs)
	{
		return SSInputs.sort(function(a,b)
		{
			if(a.ssInputs.num > b.ssInputs.num)
	          return 1;
	        else if (a.ssInputs.num < b.ssInputs.num)
	          return -1;
	        else
	          return 0;
		});
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