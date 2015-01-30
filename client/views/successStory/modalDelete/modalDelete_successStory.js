Template.modalDelete_successStory.helpers({

});

Template.modalDelete_successStory.events = 
{
  'click #deleteTestimonial': function()
  {
    var testimonialId = Session.get("successStoryId");
    Meteor.call("remove_successStory_byId", testimonialId)
    
    $('#modalDelete_successStory').modal('hide');
    Meteor.call("sleep", 250, function(error) {
      if (!error)
        Router.go('/dashboard');
    });
  }
}