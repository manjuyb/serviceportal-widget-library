(function () {

  data.uri = gs.getProperty('glide.servlet.uri');

  if (options.rest_instance_url) {
    if (options.rest_instance_url.indexOf('http') == -1)
      options.rest_instance_url = 'https://' + options.rest_instance_url;
    if (options.rest_instance_url.substring(options.rest_instance_url.length - 1, options.rest_instance_url.length) != '/')
      options.rest_instance_url = options.rest_instance_url + '/';

    data.uri = options.rest_instance_url;
    data.uri_external = true;
  }

  options.overlay = options.overlay == 'true' || options.overlay == true;
  options.order_by = options.order_by || options.display_field;

})();
