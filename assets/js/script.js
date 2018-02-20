$(function(){

	// Create a model for the services
	var Service = Backbone.Model.extend({

		// will contain three attributes
    // These are their default values
    
    defaults: {
      name: "My Service",
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

});
