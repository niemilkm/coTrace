Router.map(function() {

  this.route('home', {
    path: '/'
  });

  this.route('dashboard', {
    path: '/dashboard',
    loginRequired: 'entrySignIn',
    waitOn: function() {
      return this.subscribe("items");
    },
    data: {
      items: Items.find({})
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Dashboard | ' + SEO.settings.title
      });
    }
  });

  this.route('profile', {
    path: '/profile',
    data: function() {
      return Meteor.user();
    }
  });

  this.route('admin', {
    path: '/admin',
    onAfterAction: function() {
      Session.set("editDelete", 0)
    }
  });

  this.route('projectView', {
    path: '/project/view/:id',
    onAfterAction: function() {
      Session.set("projectId", this.params.id)
    },
    data: function() {
      return Projects.findOne({_id: this.params.id})
    }
  });

  this.route('testimonialView', {
    path: '/testimonial/view/:id',
    onAfterAction: function() {
      Session.set("testimonialId", this.params.id)
    },
    data: function() {
      return Testimonials.findOne({_id: this.params.id})
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
