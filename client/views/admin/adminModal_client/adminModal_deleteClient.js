Template.adminModal_deleteClient.helpers({

  clientName_deleteClient: function()
  {
    return Session.get("clientName_deleteClient");
  },

  projectCount_deleteClient: function()
  {
    return Session.get("projectCount_deleteClient");
  },

  testimonialCount_deleteClient: function()
  {
    return Session.get("testimonialCount_deleteClient");
  },

  projectsToDelete: function()
  {
    return Session.get("projectsToDelete");
  },

  

});

Template.adminModal_deleteClient.events = 
{
  'click #deleteClient': function()
  {
    var projectIds = Session.get("projectsToDelete_objects");
    Meteor.call("remove_testimonial_byProjectIds", projectIds, function(error_testimonial) {
      if (!error_testimonial)
      {
        Meteor.call("remove_project_byProjectIds", projectIds, function(error_project) {
          if (!error_project)
            Meteor.call("remove_client", Session.get("clientToDelete_id"));
        });
      }
    });
    $('#adminModal_deleteClient').modal('hide');
  }
}