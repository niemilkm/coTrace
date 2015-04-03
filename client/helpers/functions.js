
stringSS = function(ss_id, length)
{
	if (length ==0 || length == undefined) length = 200;
	var SSInputs = SuccessStories.findOne({_id: ss_id}).SSInputs;
	var SSInputs_sorted = sort_ssInputs_LowToHigh(SSInputs);
	var str ="";
	//console.log(SSInputs);
	//console.log(SSInputs_sorted)
	_.each(SSInputs_sorted, function(data) {
		str = str + data.ssInputs.ques + ": " + data.ans + "\n";
	});
	return _(str).truncate(length);
}

sort_ssInputs_LowToHigh = function(SSInputs)
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

createArray_ProjectIds = function(projects)
{
	var array = [];
	console.log(projects);
	_.each(projects, function(data)
	{
		array.push(data._id);
	})
	return array;
}

