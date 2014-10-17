'use strict';

angular.module('stockApp').directive('stocksGraph', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '='
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
                console.log('UPDATE');
                $scope.update();
            });

            var cities;


            var $chartContainer = $($element[0]).find('.chart').get(0);

// Set the dimensions of the canvas / graph
            var margin = {top: 30, right: 20, bottom: 30, left: 50},
                width = 900 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

// Parse the date / time
            var parseDate = d3.time.format("%Y%m%d").parse;

// Set the ranges
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

// Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            var color = d3.scale.category10();

// Define the line
            var line = d3.svg.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.close);
                });

// Adds the svg canvas
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
                console.log(cities);
                cities.forEach(function(company) {
                    if (company.visible) {
                        $('.city[data-id="' + company.id + '"]').show();
                    } else {
                        company.values = [];
                        $('.city[data-id="' + company.id + '"]').hide();
                    }
                    console.log(company.visible);
                });



                console.log(cities);


                color.domain(_.pluck(cities, 'name'));


                // Scale the range of the data
                x.domain(d3.extent(data[0].data, function (d) {
                    return d.date;
                }));

                y.domain([
                    d3.min(cities, function (c) {
                        return d3.min(c.values, function (v) {
                            return v.close;
                        });
                    }),
                    d3.max(cities, function (c) {
                        return d3.max(c.values, function (v) {
                            return v.close;
                        });
                    })
                ]);






                // Select the section we want to apply our changes to
                var svg = d3.select($chartContainer);
                var svg2 = d3.select($chartContainer).transition();

                var city = svg.selectAll(".line")
                    .data(cities);
//                    .enter().append("g")
//                    .attr("class", "city");
                console.log(city);
                svg2.selectAll(".line")
                    .duration(750)
                    .attr("d", function (d) {
                        console.log(d);
                        return d.values.length ? line(d.values) : null;
                    });

                // Make the changes
//                svg.select(".line")   // change the line
//                    .duration(750)
//                    .attr("d", line(data));
                svg2.select(".x.axis") // change the x axis
                    .duration(750)
                    .call(xAxis);
                svg2.select(".y.axis") // change the y axis
                    .duration(750)
                    .call(yAxis);


//                city.selectAll(".series")
//                    .datum(function(d) { console.info(d);  return {name: d.name, value: d.value[d.value.length - 1]}; })
//                    .attr("transform", function(d) { console.info(d);  return "translate(" + x(d.value.date) + "," + y(d.value.close) + ")"; })
//                    .attr("x", 3)
//                    .attr("dy", ".35em")
//                    .text(function(d) { return d.name; });
            };

            var build = function (data) {
                console.log(data);

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

                // Scale the range of the data
                x.domain(d3.extent(data[0].data, function (d) {
                    return d.date;
                }));
                y.domain([
                    d3.min(cities, function (c) {
                        return d3.min(c.values, function (v) {
                            return v.close;
                        });
                    }),
                    d3.max(cities, function (c) {
                        return d3.max(c.values, function (v) {
                            return v.close;
                        });
                    })
                ]);


//
//                    // Add the valueline path.
//                    svg.append("path")
//                        .attr("class", "line")
//                        .attr("d", valueline(data))
//                        .on("click", function(d) {
//                            div.transition()
//                                .duration(500)
//                                .style("opacity", 0);
//                            div.transition()
//                                .duration(200)
//                                .style("opacity", 0.9);
//                            div.html(
//                                    '<a href= "" target="_blank">' + //with a link
//                                    33 +
//                                    "</a>" +
//                                    "<br/>"  + 4)
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY - 28) + "px");
//                        });

                var city = svg.selectAll(".city")
                    .data(cities)
                    .enter()
                    .append("g")
                    .attr("class", "city")
                    .attr("data-id", function (d) {
                        console.log(d);
                        return d.id;
                        //return line(d.values);
                    });

                city.append("path")
                    .attr("class", "line")
                    .attr("d", function (d) {
                        return d.values.length ? line(d.values) : null;
                    });

//                city.append("text")
//                    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
//                    .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.close) + ")"; })
//                    .attr("x", 3)
//                    .attr("dy", ".35em")
//                    .attr("class", "series")
//                    .text(function(d) { return d.name; });


                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                // });
            };

        }
    };
});