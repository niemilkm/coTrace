Template.adminModal_deleteCategory.helpers({

  categoryName_deleteCategory: function()
  {
    console.log(Session.get("categoryName_deleteCategory"));
    return Session.get("categoryName_deleteCategory");
  },

  projectCount_deleteCategory: function()
  {
    return Session.get("projectCount_deleteCategory");
  },

  testimonialCount_deleteCategory: function()
  {
    return Session.get("testimonialCount_deleteCategory");
  },

  projectsToDelete: function()
  {
    return Session.get("projectsToDelete");
  },

  

});

Template.adminModal_deleteCategory.events = 
{
  'click #deleteCategory': function()
  {
    var projectIds = Session.get("projectsToDelete_objects");
    Meteor.call("remove_testimonial_byProjectIds", projectIds, function(error_testimonial) {
      if (!error_testimonial)
      {
        Meteor.call("remove_project_byProjectIds", projectIds, function(error_project) {
          if (!error_project)
            Meteor.call("remove_category", Session.get("categoryToDelete_id"));
        });
      }
    });
    $('#adminModal_deleteCategory').modal('hide');
  }
}