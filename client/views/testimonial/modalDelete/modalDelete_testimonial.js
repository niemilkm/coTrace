Template.modalDelete_testimonial.helpers({

});

Template.modalDelete_testimonial.events = 
{
  'click #deleteTestimonial': function()
  {
    var testimonialId = Session.get("testimonialId");
    Meteor.call("remove_testimonial_byId", testimonialId)
    
    $('#modalDelete_testimonial').modal('hide');
    Meteor.call("sleep", 250, function(error) {
      if (!error)
        Router.go('/dashboard');
    });
  }
}