Template.adminModal_deleteSSInput.helpers({

  ssInputName_deleteSSInput: function()
  {
    var ssInputId = Session.get("ssInputToDelete_id");
    console.log("ssInputId: " + ssInputId);
    if (ssInputId != undefined && ssInputId != null)
      return SuccessStoryInputs.findOne({_id: Session.get("ssInputToDelete_id")}).input;
  },


});

Template.adminModal_deleteSSInput.events = 
{
  'click #deleteSSInput': function()
  {
    Meteor.call("remove_ssInput", Session.get("ssInputToDelete_id"));
    $('#adminModal_deleteSSInput').modal('hide');
  }
}