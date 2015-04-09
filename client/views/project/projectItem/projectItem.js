
Template.dashboard.rendered = function()
{
  $('#mainContent').masonry('reloadItems');
}

 Template.projectItem.helpers({
  // eachProject: function() moved this to routes.js
  // {
  //   console.log(Projects.find({}).count())
  //   return Projects.find({});
  // },

  testimonialCount: function()
  {
    return Testimonials.find({project: this._id}).count();
  },

  successStoryCount: function()
  {
    return SuccessStories.find({project: this._id}).count();
  },

   clientCompany: function()
  {
    return ClientCompanies.findOne({_id: this.clientCompany});
  },

  projectCategory: function()
  {
    //projectId = Projects.findOne({_id: this.project});
    return Categories.findOne({_id: this.categories});
  }
  
});