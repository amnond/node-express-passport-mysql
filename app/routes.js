// app/routes.js
module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/index');
			return
		}
		res.redirect('/login');
	});

	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		})
    );

	app.get('/index', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/secured', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('secured.ejs', { message: _t('dog', 'he') });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.use(function(req, res){
	   res.sendStatus(404);
	});	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
