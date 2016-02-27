$(function() {
	'use stricrt';
	var app = app || {};

	/**
	 * Service Model 
	 */
	app.Service = Backbone.Model.extend({
		// only three values we are going to handle
		defaults: {
			name: 'Empty Service',
			price: 100,
			checked: false
		},

		// set checking to false
		toggle: function() {
			this.set( 'checked', !this.get( 'checked' ) );
		}
	});

	/**
	 * Service Collection
	 */
	app.ServiceList = Backbone.Collection.extend({
		// hold objects of the service model
		model: app.Service,

		// return array only with the checked services
		getChecked: function() {
			return this.where({ 'checked': true });
		}
	});

	/**
	 * Service Collection Data
	 */
	var services = new app.ServiceList([
		new app.Service({ label: 'Web Development', Price: 200 }),
		new app.Service({ label: 'Web Design', Price: 100 }),
		new app.Service({ label: 'Web Photography', Price: 80 }),
		new app.Service({ label: 'Coffee Drinking', Price: 200 })
	]);

	/**
	 * Service View
	 * <li>
	 */
	app.ServiceView = Backbone.View.extend({
		tagName: 'li',

		events: {
			'click': 'toggleService'
		},

		initialize: function() {
			this.listenTo( this.model, 'change', this.render );
		},

		render: function() {
			// create HTML
			this.$el.html( '<input type="checkbox" value="' + this.model.get('label') + '" name="services"/> ' + this.model.get( 'label' ) + ' <span>$' + this.model.get( 'price' ) + '</span>' );
			this.$( 'input' ).prop( 'checked', this.model.get( 'checked' ) );

			// chain the object
			return this;
		},

		toggleService: function() {
			this.model.toggle();
		}
	});

	/**
	 * Main View
	 */
	app.MainView = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#main'),

		initialize: function() {
			// cache these selectors
			this.total = $('#total span');
			this.list = $('#services');

			// listen to the change event on the collection
			this.listenTo( services, 'change', this.render );

			// create view for every one of the services in the 
			// collection and add them to the page

			services.each(function( service ) {
				var view = new app.ServiceView({ model: service });
				this.list.append( view.render().el );
			}, this);	// callback context
		},

		render: function() {
			// calculate the total order amount by agregating 
			// the prices of only the checked elements
			var total = 0;

			_.each( services.getChecked(), function( elem ) {
				total += elem.get( 'price' );
			});

			// update the total price
			this.total.text( '$' + total );

			return this;
		}
	});

	new app.MainView();
})