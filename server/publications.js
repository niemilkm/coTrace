Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

Meteor.publish('all', function()
{
  var companyId = "Q88P7QkWtY9mhRtRw"; //Meteor.users.findOne({_id: this.userId});
  //var projectId = Projects.findOne({company: companyId})._id;
  return [
            Companies.find({_id: companyId}),
            ClientCompanies.find({company: companyId}),
            Categories.find({company: companyId}),
            Tags.find({company: companyId}),
            Projects.find({company: companyId}),
            Authors.find({company: companyId}),
            Testimonials.find({company: companyId})
          ];
});
