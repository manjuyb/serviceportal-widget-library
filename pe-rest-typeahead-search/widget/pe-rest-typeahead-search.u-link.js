function Link(scope) {

  scope.cleanTypeahead = function () {
    scope.typeaheadElement.typeahead('val', '');
    scope.c.typing = false;
  };

  $(document).ready(function () {
    scope.$watch(scope, function (newValues, oldValues, scope) {
      scope.typeaheadElement = $(
        '#' + scope.c.widget.rectangle_id + '.typeahead.form-control.x-pisn-sp-typeahead-search__input'
      );
      scope.typeaheadContainer = scope.typeaheadElement.parent();

      scope.typeaheadElement.typeahead({
        minLength: 1,
        delay: 200,
        highlight: false
      }, {
        name: scope.c.name,
        limit: scope.c.options.limit_result,
        display: scope.c.options.display_field,
        source: function (query, syncResults, asyncResults) {
          if (query && query.length > 1) {
            var entrypoint = scope.c.apiUrl + '&sysparm_query=' + scope.c.fieldCondition + query;

            if (scope.data.uri_external) {
              $.ajax({
                method: 'GET',
                url: entrypoint,
                success: function (data) {
                  asyncResults(data.result);
                },
                dataType: 'json',
                username: scope.c.options.rest_username,
                password: scope.c.options.rest_password,
                crossDomain: true,
                withCredentials: true,
                xhrFields: {
                  withCredentials: true
                }
              });
            } else {
              $.get(entrypoint, function (data) {
                asyncResults(data.result);
              });

            }
          }
        }
      });

      scope.typeaheadElement.bind('typeahead:select', function (ev, suggestion) {
        if (scope.options.overlay)
          scope.typeaheadContainer.removeClass('x-pisn-sp-typeahead-search__dim');

        scope.c.selected = true;
        scope.c.typing = false;
        scope.c.selectRecord(suggestion);
      });

      scope.typeaheadElement.bind('typeahead:active', function (ev, suggestion) {
        scope.c.selected = false;
        scope.c.typing = true;

        if (scope.options.overlay)
          scope.typeaheadContainer.addClass('x-pisn-sp-typeahead-search__dim');
      });

      scope.typeaheadElement.bind('typeahead:close', function (ev, suggestion) {
        if (scope.options.overlay)
          scope.typeaheadContainer.removeClass('x-pisn-sp-typeahead-search__dim');
        if (!scope.c.selected)
          scope.typeaheadElement.typeahead('val', '');
        scope.c.typing = false;
      });

    });
  });



}
