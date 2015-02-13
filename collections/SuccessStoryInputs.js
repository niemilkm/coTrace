SuccessStoryInputs = new Meteor.Collection('successStoryInput');

Meteor.methods({
	insert_ssInput: function() {
		var companyId = Companies.findOne({})._id;
		return SuccessStoryInputs.insert({company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
	},

	add_ssInput: function(map) {
		var companyId = Companies.findOne({})._id;
		SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map}});
	},

	update_ssInput: function(ssInputId, input, inputNum) {
		SuccessStoryInputs.update({_id: ssInputId}, {$set: {input: input, inputNum: inputNum, dateUpdated: moment.utc()}});
	},

	remove_ssInput: function(ssInputId) {
		SuccessStoryInputs.remove({_id: ssInputId});
	}
	
});

SuccessStoryInputs.allow({
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