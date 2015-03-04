Template.filter_category.helpers({

  category: function()
  {
    if (Categories.findOne({}) != undefined)
    {
      console.log(Categories.findOne({}));
      return Categories.find({});
    }
  }


});

// Template.dashboard.events = 
// {

//   'click .open-modal': function(e,t)
//   {
//     e.preventDefault();
//     Session.set("hidden", true);
//     Session.set("hidden_testimonial", true);
//     $(".modalAdd_project").modal("show");
//   },

//   'click .open-modal_testimonial': function(e,t)
//   {
//     e.preventDefault();
//     Session.set("hidden", true);
//     Session.set("hidden_testimonial", true);
//     $(".modalAdd_testimonial").modal("show");
//   }

// }