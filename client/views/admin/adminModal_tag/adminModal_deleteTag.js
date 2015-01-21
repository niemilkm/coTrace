Template.adminModal_deleteTag.helpers({

  tagName_deleteTag: function()
  {
    console.log(Session.get("tagName_deleteTag"));
    return Session.get("categoryName_deleteTag");
  },

  projectCount_deleteTag: function()
  {
    return Session.get("projectCount_deleteTag");
  },

  testimonialCount_deleteTag: function()
  {
    return Session.get("testimonialCount_deleteTag");
  },

  projectsToDelete: function()
  {
    return Session.get("projectsToDelete");
  },

  

});

Template.adminModal_deleteTag.events = 
{
  'click #deleteTag': function()
  {
    var projectIds = Session.get("projectsToDelete_objects");
    Meteor.call("remove_testimonial_byProjectIds", projectIds, function(error_testimonial) {
      if (!error_testimonial)
      {
        Meteor.call("remove_project_byProjectIds", projectIds, function(error_project) {
          if (!error_project)
            Meteor.call("remove_tag", Session.get("tagToDelete_id"));
        });
      }
    });
    $('#adminModal_deleteTag').modal('hide');
  }
}