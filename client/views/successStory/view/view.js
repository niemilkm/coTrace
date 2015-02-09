 Template.successStoryView.helpers({

  author: function()
  {
  	return Authors.findOne({_id: this.author});
  },

  clientcompany: function()
  {
  	authorId = Authors.findOne({_id: this.author});
  	return ClientCompanies.findOne({_id: this.author});

  },

  projectCategory: function()
  {
  	projectId = Projects.findOne({_id: this.project});
  	return Categories.findOne({_id: projectId.categories});
  },

  project: function()
  {
    return Projects.findOne({_id: this.project});
  },

  // inputQues: function()
  // {
  //   var ss = SuccessStories.find({_id: this._id});
  //   return ss.input;
  // },

  // inputAns: function()
  // {
  //   var ss = SuccessStories.find({_id: this._id});
  //   return ss.inputAns;
  // }


});