SuccessStoryInputs = new Meteor.Collection('successStoryInput');

Meteor.methods({
	insert_ssInput: function(map, ssInputNum) {
		var companyId = Companies.findOne({})._id;
		var result = 0; //0=unknown error, 1=alert(num used already), 2=successful

		if (SuccessStoryInputs.find({}).count() > 0)
    {
      if (SuccessStoryInputs.find({'inputs.num': ssInputNum}).count() == 0)
      {
      	SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map}});
        result = 2;
      }
      else
        result = 1;
    }
    else
    {
      SuccessStoryInputs.insert({inputs: map, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
      result = 2;
    }

		return result;
	},

	add_ssInput: function(map) {
		var companyId = Companies.findOne({})._id;
		SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map}});
	},

	update_ssInput: function(map, index) {
		var companyId = Companies.findOne({})._id;
		indexPlusOne_String = (index + 1).toString();
		var inputsIndex = "inputs." + index.toString();
		//if (newNumIndex == oldNumIndex)
		{
			SuccessStoryInputs.update({company: companyId, inputsIndex: indexPlusOne_String}, {$set: {"inputs.$.num": map.num, "inputs.$.ques": map.ques, dateUpdated: moment.utc()}});
			console.log("inserted to database");
		}
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