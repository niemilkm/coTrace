SuccessStoryInputs = new Meteor.Collection('successStoryInput');

Meteor.methods({

	validate_ssInput: function(map) {
		var result = 0; //0=unknown error, 1=alert(num used already), 2=can update, 3=alert(ques used already), 4=needs new entry, 5=alert(num and ques both already used)
		var numOk = false;
		var quesOk = false;

		if (SuccessStoryInputs.findOne({}) != 0)
    {
    	var numCount = SuccessStoryInputs.findOne({'inputs.num': map.num});
    	var quesCount = SuccessStoryInputs.findOne({'inputs.ques': map.ques});
      if (numCount == undefined)
      {
      	numOk = true;
      }
      if (quesCount == undefined)
      {
      	quesOk = true;
      }
      if (numOk && quesOk)
      {
        result = 2;
      }
      else if (!numOk && quesOk)
      {
      	result = 1;
      }
      else if (numOk && !quesOk)
      {
      	result = 3;
      }
      else if (!numOk && !quesOk)
      	result = 5;
    }
    else
    	result = 4;

    return result;

	},

	insert_ssInput: function(map) {
		var result = Meteor.call("validate_ssInput", map);
		var companyId = Companies.findOne({})._id;

		if (result == 2)
			SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map}});
    else if (result == 4)
      SuccessStoryInputs.insert({inputs: map, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});

		return result;
	},

	add_ssInput: function(map) {
		var companyId = Companies.findOne({})._id;
		SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map}});
	},

	update_ssInputNum: function(map, index) {
		var companyId = Companies.findOne({})._id;
		var index_str = (index+1).toString();
		{
			SuccessStoryInputs.update({company: companyId, 'inputs.ques':map.ques}, {$set: {'inputs.$.num': map.num, dateUpdated: moment.utc()}});
			console.log("inserted to database");
		}
	},

	update_ssInputQues: function(map, index) {
		var companyId = Companies.findOne({})._id;
		var index_str = (index+1).toString();
		console.log("index: " + index_str);
		{
			SuccessStoryInputs.update({company: companyId, 'inputs.num':index_str}, {$set: {'inputs.$.ques': map.ques, dateUpdated: moment.utc()}});
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