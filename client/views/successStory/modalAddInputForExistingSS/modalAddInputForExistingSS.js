
Template.modalAddInputForExistingSS.helpers({

});

Template.modalAddInputForExistingSS.events =
{
	'click #addInputForExistingSS': function()
	{
		var inputQuestion = $('#inputQuestion').val();
		var inputAnswer = $('#inputAnswer').val();
		var SSInput =	{
							ssInputs: 	{
											num: -1,
											ques: inputQuestion,
											index: -1
										},
							ans: inputAnswer, 
						};
		Meteor.call("insert_successStory_input", this._id, SSInput);

		$('#inputQuestion').val('');
		$('#inputAnswer').val('');
        $('#modalAddInputForExistingSS').modal('hide');
	},

	'click .closeModal': function()
	{
		$('#inputQuestion').val('');
		$('#inputAnswer').val('');
        $('#modalAddInputForExistingSS').modal('hide');
	}
}