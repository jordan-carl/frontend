with (scope('BountySource')) {

  define('api_host', 'https://www.bountysource.com/');

  // parse arguments: url, [http_method], [params], [callback]
  define('api', function() {
    var args = Array.prototype.slice.call(arguments);

    var options = {
      url:       api_host + args.shift().replace(/^\//,''),
      method:    typeof(args[0]) == 'string' ? args.shift() : 'GET',
      params:    typeof(args[0]) == 'object' ? args.shift() : {},
      callback:  typeof(args[0]) == 'function' ? args.shift() : function(){}
    }
    
    // add in our access token
    options.params.access_token = Storage.get('access_token');
    
    JSONP.get(options);
  });

  define('logout', function() {
    Storage.remove('access_token');
    set_route('#', { reload_page: true });
  });

  define('user_info', function(callback) {
    BountySource.api('/user', callback);
  });

  define('search_users', function(term, callback) {
    api('/github/user/search/' + term, callback);
  });

  define('search_repositories', function(term, callback) {
    api('/github/repos/search/' + term, callback);
  });

  define('search_issues', function(login, repository, term, callback) {
    api('/github/issues/search/'+login+'/'+repository+'/'+term, callback);
  });

  define('get_repository', function(login, repository, callback) {
    api('/github/repos/'+login+'/'+repository, callback);
  });

  define('get_issues', function(login, repository, callback) {
    api('/github/repos/'+login+'/'+repository+'/issues', callback);
  });

  define('get_issue', function(login, repository, issue_number, callback) {
    api('/github/repos/'+login+'/'+repository+'/issues/'+issue_number, callback);
  });

  define('overview', function(callback) {
    api('/overview', callback);
  });

  define('create_bounty', function(login, repository, issue_number, amount, payment_method, return_url, callback) {
    api('/github/repos/'+login+'/'+repository+'/issues/'+issue_number+'/bounties', 'POST', { amount: amount, payment_method: payment_method, return_url: return_url }, callback);
  });

  define('get_user_repositories', function(callback) {
    api('/github/user/repos/', callback);
  });

  define('create_solution', function(login, repository, issue_number, branch_name, callback) {
    api('/github/repos/'+login+'/'+repository+'/issues/'+issue_number+'/solutions', 'POST', { branch_name: branch_name }, callback);
  });

  define('my_solutions', function(callback) {
     api('/solutions', callback);
  });

//  define('fork_repo', function(login, repository, callback) {
//    api('/github/repos/'+login+'/'+repository+'/fork', 'POST', callback);
//  });
}