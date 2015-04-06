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
		Meteor.call("findNextIndexAndHighestNum", id, function(error, result) {
			if (!error)
			{
				indexAndNum = result;
				SSInputs.ssInputs.num = indexAndNum.num;
				SSInputs.ssInputs.index = indexAndNum.index;
				SuccessStories.update({_id: id}, {$push: {SSInputs: SSInputs}});
			}
			else
				console.log("there was an error");
		});
	},

	findNextIndexAndHighestNum: function(id)
	{
		var ss = SuccessStories.findOne({_id: id}).SSInputs;
		var ss_sorted;
		Meteor.call("sort_ssInputs_LowToHighByIndex", ss, function(error, result) {
			if (!error)
				ss_sorted = result;
		});
		var count = 0;
		var indexNum = 0;
		var quesNum = 1;
		var foundIndex = false;
		_.each(ss_sorted, function(data)
		{
			if (data.ssInputs.index != count && !foundIndex)
			{
				indexNum = count;
				foundIndex = true;
			}
			else
				count++;
			if (data.ssInputs.num > quesNum) quesNum = data.ssInputs.num;

		});
		if (!foundIndex)
			indexNum = count;

		return {index: indexNum, num: quesNum + 1};

	},

	sort_ssInputs_LowToHighByIndex: function(SSInputs)
	{
		return SSInputs.sort(function(a,b)
		{
			if(a.ssInputs.index > b.ssInputs.index)
	          return 1;
	        else if (a.ssInputs.index < b.ssInputs.index)
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