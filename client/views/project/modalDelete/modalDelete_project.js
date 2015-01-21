Template.modalDelete_project.helpers({

  testimonialCount_deleteProject: function()
  {
    console.log(Testimonials.find({project: Session.get("projectId")}).count());
    return Testimonials.find({project: Session.get("projectId")}).count();
  },

  projectName: function()
  {
    return Projects.findOne({_id: Session.get("projectId")}).name;
  }

});

Template.modalDelete_project.events = 
{
  'click #deleteProject': function()
  {
    var projectId = Session.get("projectId");
    if (Testimonials.findOne({project: projectId}))
    {
      Meteor.call("remove_testimonial_byProjectId", projectId, function(error_testimonial) {
      if (!error_testimonial)
        Meteor.call("remove_project", projectId);
      });
    }
    else
    {
      Meteor.call("remove_project", projectId);
    }
    
    $('#modalDelete_project').modal('hide');
    Meteor.call("sleep", 250, function(error) {
      if (!error)
        Router.go('/dashboard');
    });
  }
}