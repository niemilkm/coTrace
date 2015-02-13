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

  inputTest: function()
  {

    var returnArray = [];
    var count = 0;
    console.log("SS ID: " + this._id);
    var SS = SuccessStories.find({_id: this._id}).fetch();
    _.each(SS, function(SSData)
    {
      console.log("ques & ans:" + SSData.input + " & " + SSData.inputAns);
      if (count != 0)
        returnArray.push({question:SSData.input, answer:SSData.inputAns})
    });

    console.log("returnArray: " + returnArray);

    return returnArray;


    // var object = [
    //                   {question: "1o", answer: "one"},
    //                   {question: "2", answer: "two"},
    //                   {question: "3", answer: "three"}
    //               ];
    // return object;
  }


});