define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.how', [])
.directive('winWebHowMenu',
		function() {
			return function(scope, element, attrs) {

                scope.$watch('howMenu', function (newValue, oldValue) {

                    var data = scope.howMenu;
                    var $this = $(element);

                    var html = '<tr>\
                    <th>餐次</th>\
                    <th>菜名</th>\
                    <th>食材名称</th>\
                    <th>食材量</th>\
                </tr>';

                    for (var i in data) {

                        var cat = data[i][0];

                        html += '<tr>';
                        for (var j in data[i]) {
                            if (j > 0) {
                                cat = data[i][0] + '-' + data[i][1]
                            }
                            html += '<td data-cat="' + cat + '" data-text="' + data[i][j] + '">' + data[i][j] + '</td>';
                        }
                        html += '</tr>';
                    }
                    $this.html(html);
                    $('td', $this).each(function (i) {
                        var index = i % 4;
                        if (index > 1) {
                            return true;
                        }
                        var $td = $(this);
                        var i = 1;
                        var $rel = $td;

                        while (1) {
                            $rel = $rel.parent().next().children(index)
                                .filter('[data-text="' + $rel.data('text') + '"][data-cat="' + $rel.data('cat') + '"]');
                            if ($rel && $rel.size() > 0) {
                                i++;
                                $rel.attr('data-del', true);
                            } else {
                                if (i > 1) {
                                    $td.attr('data-rows', i);
                                }
                                break;
                            }
                        }
                    });
                    $('td[data-del]').remove();
                    $('td[data-rows]').each(function () {
                        $(this).attr('rowspan', $(this).data('rows'));
                    });
                });
            };
});

});