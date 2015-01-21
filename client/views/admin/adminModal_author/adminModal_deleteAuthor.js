Template.adminModal_deleteAuthor.helpers({

  authorName_deleteAuthor: function()
  {
    var authorId = Session.get("authorToDelete_id");
    if (authorId != undefined && authorId != null)
      return Authors.findOne({_id: Session.get("authorToDelete_id")}).name;
  },

  testimonialCount_deleteAuthor: function()
  {
    return Session.get("testimonialCount_deleteAuthor");
  },

  projectCount_deleteAuthor: function()
  {
    return Session.get("projectCount_deleteAuthor");
  },

  projectsToDelete: function()
  {
    return Session.get("projectsToDelete");
  }

});

Template.adminModal_deleteAuthor.events = 
{
  'click #deleteAuthor': function()
  {
    var authorId = Session.get("authorToDelete_id");
    Meteor.call("remove_testimonial_byAuthorId", authorId, function(error_testimonial) {
      if (!error_testimonial)
      {
        Meteor.call("remove_author", authorId, function(error_author) {
        });
        Session.set("authorToDelete_id", null);
        $('#adminModal_deleteAuthor').modal('hide');
      }
    });
  }
}