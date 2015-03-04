 Template.projectView.helpers({

  eachTestimonial: function()
  {
    return Testimonials.find({project: this._id});
  },

  eachSuccessStory: function()
  {
    return SuccessStories.find({project: Session.get("projectId")});
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
    if (!Testimonials.findOne({project: Session.get("projectId")}) && !SuccessStories.findOne({project: Session.get("projectId")}))
      Router.go('/dashboard');
  },

  inputAns: function()
  {
    var ssInputs = this.SSInputs;
    var count = 0;
    var countLimit = 100;
    ssInputs.sort(function(a,b) {
        if(a.ssInputs.num > b.ssInputs.num)
          return 1;
        else if (a.ssInputs.num < b.ssInputs.num)
          return -1;
        else
          return 0;
      });
    var exitEach = false;
    var array = [];
    _.each(ssInputs, function(data) 
    {
      if (!exitEach)
      {
        var ques = data.ssInputs.ques + ":";
        var ans = data.ans;
        count = count + ques.length;
        if (count > countLimit)
        {
          ques = ques.substring(0, ques.length - (count - countLimit)) + "...";
          exitEach = true;
          ans = "";
        }
        count = count + ans.length;
        if (count > countLimit && !exitEach)
        {
          ans = ans.substring(0, (ans.length - (count - countLimit))) + "...";
          exitEach = true;
        }
        array.push({ques: ques, ans: ans});
      }
    });
    return array;
  }

});