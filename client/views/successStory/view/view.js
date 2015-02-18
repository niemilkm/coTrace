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

  inputs: function()
  {
    var ss = SuccessStories.findOne({_id: this._id}).SSInputs;
    ss.sort(function(a,b) {
        if(a.ssInputs.num > b.ssInputs.num)
          return 1;
        else if (a.ssInputs.num < b.ssInputs.num)
          return -1;
        else
          return 0;
      });
    return ss;
  }


});