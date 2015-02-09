SuccessStoryInputs = new Meteor.Collection('successStoryInput');

Meteor.methods({
	insert_ssInput: function(input, inputNum) {
		var companyId = Companies.findOne({})._id;
		SuccessStoryInputs.insert({input: input, inputNum: inputNum, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
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