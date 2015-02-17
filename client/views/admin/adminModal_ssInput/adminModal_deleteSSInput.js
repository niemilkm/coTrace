Template.adminModal_deleteSSInput.helpers({

  ss: function()
  {
    if (Session.get("editSSInput") != undefined)
    {
      var instance = Session.get("editSSInput");
      var array = [{ss_num: instance.ss_num, ss_ques: instance.ss_ques}];
      return array;
    }
    return;
  },


});

Template.adminModal_deleteSSInput.events = 
{
  'click #deleteSSInput': function()
  {
    Meteor.call("remove_ssInput", Session.get("editSSInput").ss_index);
    $('#adminModal_deleteSSInput').modal('hide');
  }
}