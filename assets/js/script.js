$(function(){

  // Create a model for the services
  var Service = Backbone.Model.extend({

    // will contain three attributes
    // These are their default values

    defaults: {
      name: 'My Service',
      price: 100,
      isChecked: false
    },

    // Helper function for checking/unchecking a service
    toggle: function(){
      this.set('isChecked', !this.get('isChecked'));
    }

  });

  // Create a collection of services
  var ServiceList = Backbone.Collection.extend({

    // Will hold objects of the Service model
    model: Service,

    // Return an array of the checked services
    getChecked: function(){
      return this.where({checked:true});
    }
  });

  // Pre-fill the collection with a number of services.l
  var services = new ServiceList([
    new Service({ title: 'web development', price: 200 }),
    new Service({ title: 'web design', price: 250 }),
    new Service({ title: 'photography', price: 100 }),
    new Service({ title: 'bullshit', price: 330 }),
    new Service({ title: 'drinking coffee', price: 800 }),
    new Service({ title: 'sex', price: 300 }),
    new Service({ title: 'eternal damnation', price: 666 }),
  ]);

  // This view turns a Service model into HTML. Will create li elements.
  var ServiceView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click': 'toggleService'
    },

    initialize: function(){
      // Set up event listeners. the backbone synthetic change event
      // is raised when a property changes (such as a checked field)

      this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
      // Create the HTML


      this.$el.html(
        '<input type="checkbox" value="1" name="' 
        + this.model.get('title') 
        + '" /> ' 
        + this.model.get('title') 
        + '<span>$' 
        + this.model.get('price') 
        + '</span>'
      ); 
      this.$('input').prop('checked', this.model.get('checked'));

      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    toggleService: function(){
      this.model.toggle();
    }
  });

  // The main view of the application
  var App = Backbone.View.extend({

    // Base the viw on an existing element
    el: this.$('#main'),

    initialize: function(){

      // Cache these selectors
      this.total = this.$('#total span');
      this.list = this.$('#services');

      // Listen for the change event on the collection.
      // This is equivalent to listening on every one of the
      // service objects in the collection
      this.listenTo(services, 'change', this.render);

      // Create views for every on of the services in the collection 
      // and add them to the page
      //
      services.each(function(service){
      
      
        var view = new ServiceView({ model: service });
        this.list.append(view.render().el);
      }, this); // "this is the context in the callback
    },

    render: function(){

      // Calculate the total order amount by aggregating
      // the prices of only the checked elements

      var total = 0;

      _.each(services.getChecked(), function(elem){
        total += elem.get('price');
      });

      // Update the total price
      this.total.text('$'+total);

      return this;
    }
  });

  new App();
});
