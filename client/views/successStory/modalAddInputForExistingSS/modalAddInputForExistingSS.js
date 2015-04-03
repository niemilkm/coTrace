
Template.modalAddInputForExistingSS.helpers({

});

Template.modalAddInputForExistingSS.events =
{
	'click #addInputForExistingSS': function()
	{
		console.log(this);
		var inputQuestion = $('#inputQuestion').value;
		var inputAnswer = $('#inputAnswer').value;
		var SSInput =	{
							ssInputs: 	{
											num: -1,
											ques: inputQuestion,
											index: -1
										},
							ans: inputAnswer, 
						};
		Meteor.call("insert_successStory_input", this._id, SSInput);
	}
}