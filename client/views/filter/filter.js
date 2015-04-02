

Template.filter.helpers({

});

Template.filter.events = 
{
  'change #filter_type': function()
  {
  	Session.set("filter_type", $('#filter_type').val());
    //filterResults();
  },

  'change #filter_category': function()
  {
    Session.set("filter_category", $('#filter_category').val());
    //filterResults();
  },

  'change #filter_client': function()
  {
    Session.set("filter_client", $('#filter_client').val());
    //filterResults();
  },

  'change #filter_tag': function()
  {
    Session.set("filter_tag", $('#filter_tag').val());
    //filterResults();
  },

}

function filterResults()
{
  //var filter_type = Session.get("filter_type");
  // if (Session.get("filter_category") selector.type = Session.get("filter_category"));
  // if (Session.get("filter_client") selector.client = Session.get("filter_client"));
  // if (Session.get("filter_tag") selector.tag = Session.get("filter_tag"));

  // if (filter_type == "project")
  //   Projects.find();
  // else if (filter_type == "testimonial")
  //   Testimonials.find();
  // else if (filter_Type == "ss")
  //   SuccessStories.find();


}