SuccessStoryInputs = new Meteor.Collection('successStoryInput');

Meteor.methods({

	findAvailableIndex_ssInput: function(map)
	{
		var count = 0;
		var ss = SuccessStoryInputs.findOne({}).inputs;
		ss.sort(function(a,b) {
			if(a.index > b.index)
        return 1;
      else if (a.index < b.index)
        return -1;
      else
        return 0;
		});
		console.log(ss);
		_.each(ss, function(ssData) {
			console.log("index & count: " + ssData.index + " & " + count);
			if (ssData.index != count) //check for lowest number starting at 0 not used
				return count; //once found, then return this number
			count++;
		});
		console.log("Returning (highest number): " + count);
		return count; //if no numbers found then take the next available number
	},

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
		{
			var index = Meteor.call("findAvailableIndex_ssInput");
			var map_index = {num:map.num, ques:map.ques, index:index};
			SuccessStoryInputs.update({company: companyId}, {$push: {inputs: map_index}});
		}
    else if (result == 4)
    {
    	var map_index = {num:map.num, ques:map.ques, index:0};
      SuccessStoryInputs.insert({inputs: map_index, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
    }

		return result;
	},

	update_ssInputNum: function(map, index) {
		var companyId = Companies.findOne({})._id;
		var result = 0; //0=unknown error, 1=alert(num used already), 2=can update, 3=alert(ques used already), 4=needs new entry, 5=alert(num and ques both already used)
		var map_num_str = (map.num).toString();
		//var index_str = index.toString();
		var numOk = false;
		var quesOk = false;

		console.log("map.num: " + map.num);
		console.log("map.ques: " + map.ques);
		console.log("index: " + index);

		var numCount = SuccessStoryInputs.find({inputs: {$elemMatch: {num: map_num_str, index: {$ne: index}}}}).count()
		var quesCount = SuccessStoryInputs.find({inputs: {$elemMatch: {ques: map.ques, index: {$ne: index}}}}).count()
		if (numCount == 0)
			numOk = true;
		if (quesCount == 0)
			quesOk = true;

		if (numOk && quesOk)
		{
			SuccessStoryInputs.update({company: companyId, 'inputs.index':index}, {$set: {'inputs.$.num': map.num, 'inputs.$.ques': map.ques, dateUpdated: moment.utc()}});
			console.log("inserted to database");
			result = 2; //successful update
		}
		else if (!numOk && quesOk)
			result = 1;
		else if (numOk && !quesOk)
			result = 3;
		else if (!numOk && !quesOk)
			result = 5;

		console.log("numCount: " + numCount);
		console.log("quesCount: " + quesCount);
		console.log("result: " + result);

		return result;
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