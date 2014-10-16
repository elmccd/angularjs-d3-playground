'use strict';

angular.module('stockApp').directive('stocksGraph', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '='
        },
        templateUrl: 'stockApp/directives/stocksGraph/stocksGraph.directive.html',
        controller: function ($scope, $element) {

            $scope.$on('redraw', function (value) {
               build($scope.stocks.companies);
            });

            var build = function (data) {

                var margin = {top: 20, right: 80, bottom: 30, left: 50},
                    width = 860 - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom;

                var parseDate = d3.time.format("%Y%m%d").parse;

                var x = d3.time.scale()
                    .range([0, width]);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var color = d3.scale.category10();

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var line = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) { return x(d.Date); })
                    .y(function(d) { return y(d.close); });

                var svg = d3.select($element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                //d3.tsv("data.tsv", function(error, data) {
                    console.log(data);
                    console.info(_.pluck(data, 'name'));
                    color.domain(_.pluck(data, 'name'));

                    data.forEach(function (company) {
                        company.data.forEach(function(d) {
                            d.Date = parseDate(d.Date + '');
                        });
                    });


                    var cities = data.map(function(company) {
                        return {
                            name: company.name,
                            values: company.data.map(function(d) {
                                return {Date: d.Date, close: d.close};
                            })
                        };
                    });
                    console.log(cities);

                    console.log(data[0].data);
                    x.domain(d3.extent(data[0].data, function(d) { return d.Date; }));



                    y.domain([
                        d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
                        50
                    ]);

                console.error([
                    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
                    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
                ]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Temperature (ºF)");
                    console.log(cities);
                    var city = svg.selectAll(".city")
                        .data(cities)
                        .enter().append("g")
                        .attr("class", "city");

                    city.append("path")
                        .attr("class", "line")
                        .attr("d", function(d) { return line(d.values); })
                        .style("stroke", function(d) { return color(d.name); });

                    city.append("text")
                        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                        .attr("transform", function(d) { return "translate(" + x(d.value.Date) + "," + y(d.value.close) + ")"; })
                        .attr("x", 3)
                        .attr("dy", ".35em")
                        .text(function(d) { return d.name; });
               // });
            };

        }
    };
});