 Template.projectView.helpers({

  eachTestimonial: function()
  {
    return Testimonials.find({project: this._id});
  },

  author: function()
  {
  	return Authors.findOne({_id: this.author});
  },

  clientCompany: function()
  {
    return ClientCompanies.findOne({_id: this.clientCompany});
  },

  category: function()
  {
    return Categories.findOne({_id: this.categories});
  },

  noProjects_routeToDashboard: function()
  {
    if (!Testimonials.findOne({project: Session.get("projectId")}))
      Router.go('/dashboard');
  }

});