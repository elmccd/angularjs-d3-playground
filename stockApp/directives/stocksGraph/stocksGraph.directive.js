'use strict';

angular.module('stockApp').directive('stocksGraph', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '=',
            selectedCompany: '='
        },
        templateUrl: 'stockApp/directives/stocksGraph/stocksGraph.directive.html',
        controller: function ($scope, $element) {
            var drawn  = false;

            $scope.$on('draw', function () {
                if (drawn) {
                    $scope.update();
                } else {
                    drawn = true;
                    build($scope.stocks.companies);
                }

            });

            $scope.$on('redraw', function () {
                $scope.update();
            });

            var cities;

            var $chartContainer = $($element[0]).find('.chart').get(0);

            var margin = {top: 30, right: 120, bottom: 30, left: 50},
                width = 700 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y%m%d").parse;

            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            var color = d3.scale.category10();

            var line = d3.svg.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.close);
                });

            var svg = d3.select($chartContainer)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var div = d3.select($chartContainer).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            $scope.update = function () {

                var data = $scope.stocks.companies;

                data.forEach(function (company) {
                    company.data.forEach(function (d, index) {
                        d.id = index;
                        d.date = parseDate(d.Date + '');
                        d.close = +d.close;
                    });
                });

                cities = data.map(function (company) {
                    return {
                        id: company.id,
                        name: company.name,
                        visible: company.visible,
                        values: company.data.map(function (d) {
                            return {date: d.date, close: d.close};
                        })
                    };
                });

                cities.forEach(function(company) {
                    if (company.visible) {
                        $('.city[data-id="' + company.id + '"]').show();
                    } else {
                        company.values = [];
                        $('.city[data-id="' + company.id + '"]').hide();
                    }
                });

                color.domain(_.pluck(cities, 'name'));

                x.domain(d3.extent(data[0].data, function (d) {
                    return d.date;
                }));

                y.domain([
                    d3.min(cities, function (c) {
                        return d3.min(c.values, function (v) {
                            return v.close;
                        });
                    }) - 2,
                    d3.max(cities, function (c) {
                        return d3.max(c.values, function (v) {
                            return v.close;
                        });
                    }) + 2
                ]);



                var svg = d3.select($chartContainer);
                var svgTransition = svg.transition();

                var city = svg.selectAll(".line")
                    .data(cities);


                svgTransition.selectAll(".line")
                    .duration(750)
                    .attr("d", function (d) {
                        return line(d.values);
                    });

                svgTransition.select(".x.axis")
                    .duration(750)
                    .call(xAxis);
                svgTransition.select(".y.axis")
                    .duration(750)
                    .call(yAxis);


            };

            var build = function (data) {

                color.domain(_.pluck(data, 'name'));

                data.forEach(function (company) {
                    company.data.forEach(function (d) {
                        d.date = parseDate(d.Date + '');
                        d.close = +d.close;
                    });
                });

                cities = data.map(function (company) {
                    return {
                        id: company.id,
                        name: company.name,
                        values: company.data.map(function (d) {
                            return {date: d.date, close: d.close};
                        })
                    };
                });

                x.domain(d3.extent(data[0].data, function (d) {
                    return d.date;
                }));

                y.domain([
                    d3.min(cities, function (c) {
                        return d3.min(c.values, function (v) {
                            return v.close;
                        });
                    }) - 2,
                    d3.max(cities, function (c) {
                        return d3.max(c.values, function (v) {
                            return v.close;
                        });
                    }) + 2
                ]);

                var city = svg.selectAll(".city")
                    .data(cities)
                    .enter()
                    .append("g")
                    .attr("class", "city")
                    .attr("data-id", function (d) {
                        return d.id;
                    });

                city.append("path")
                    .attr("class", "line")
                    .attr("d", function (d) {
                        return d.values.length ? line(d.values) : 'M';
                    }).on("click", function(lineData, b, c, d) {
                        $scope.selectedCompany = _.findWhere($scope.stocks.companies, {id: lineData.id});

                        if ($scope.$$phase !== '$apply' || $scope.$$phase !== '$digest') {
                            $scope.$apply();
                        }
                    });

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);


                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            };

        }
    };
});