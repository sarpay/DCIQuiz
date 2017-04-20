function set_gauge(score, correctsCount, wrongsCount, skippedCount) {

    /******************/
    /*** SCORE ARCH ***/
    /******************/
    var size = 150,/*actual height in px divided by 2*/
    thickness = 50;

    var color = d3.scale.linear()
        .domain([0, 60, 100])
        .range(['#db2828', '#fbbd08', '#21ba45']);
    // .domain([0, 17, 33, 50, 67, 83, 100])
    // .range(['#db4639', '#db7f29', '#d1bf1f', '#92c51b', '#48ba17', '#12ab24', '#0f9f59']);

    var arc = d3.svg.arc()
        .innerRadius(size - thickness)
        .outerRadius(size)
        .startAngle(-Math.PI / 2);

    var svg = d3.select('#scoreArch').append('svg')
        .attr('width', size * 2)
        .attr('height', size + 35)/*overall height of the arch*/
        .attr('class', 'gauge');

    var chart = svg.append('g')
        .attr('transform', 'translate(' + size + ',' + size + ')')

    var background = chart.append('path')
        .datum({
            endAngle: Math.PI / 2
        })
        .attr('class', 'background')
        .attr('d', arc);

    var foreground = chart.append('path')
        .datum({
            endAngle: -Math.PI / 2
        })
        .style('fill', '#db2828')
        .attr('d', arc);

    var title = svg.append('g')
        .attr('transform', 'translate(' + size + ',' + (size * .70) + ')')
        .append('text')
        .text('SCORE')
        .attr('text-anchor', 'middle')
        .attr('class', 'title');

    var value = svg.append('g')
        .attr('transform', 'translate(' + size + ',' + (size * .95) + ')')/*position of the text 'SCORE'*/
        .append('text')
        .text(0)
        .attr('text-anchor', 'middle')
        .attr('class', 'value');

    var scale = svg.append('g')
        .attr('transform', 'translate(' + size + ',' + (size + 25) + ')')/*position of the text '99'*/
        .attr('class', 'scale');

    scale.append('text')
        .text(100)
        .attr('text-anchor', 'middle')
        .attr('x', (size - thickness / 2));

    scale.append('text')
        .text(0)
        .attr('text-anchor', 'middle')
        .attr('x', -(size - thickness / 2));

    update(score);

    function update(v) {
        //v = d3.format('.1f')(v);/*un-comment to add decimals*/
        foreground.transition()
            .duration(750)
            .style('fill', function () {
                return color(v);
            })
            .call(arcTween, v);

        value.transition()
            .duration(750)
            .call(textTween, v);
    }

    function arcTween(transition, v) {
        var newAngle = v / 100 * Math.PI - Math.PI / 2;
        transition.attrTween('d', function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });
    }

    function textTween(transition, v) {
        transition.tween('text', function () {
            var interpolate = d3.interpolate(this.innerHTML, v),
                split = (v + '').split('.'),
                round = (split.length > 1) ? Math.pow(10, split[1].length) : 1;
            return function (t) {
                this.innerHTML = (Math.round(interpolate(t) * round) / round);// + '<tspan>%</tspan>';
                /*replace with below to add decimals*/
                //this.innerHTML = d3.format('.1f')(Math.round(interpolate(t) * round) / round) + '<tspan>%</tspan>';
            };
        });
    }

    /**************/
    /*** DONUTS ***/
    /**************/
    var x, y;

    var correctsDonut = new Donut({
        bindTo: '#correctsDonut > .donut',
        background: true,
        thickness: 10,
        offset: 1,
        startAngle: 0,
        endAngle: 360
    });
    x = Math.round((correctsCount / CORRECT_ANSWERS.length) * 100);
    y = 100 - x;
    d = [x, y];
    correctsDonut.load({ data: d });

    var wrongsDonut = new Donut({
        bindTo: '#wrongsDonut > .donut',
        background: true,
        thickness: 10,
        offset: 1,
        startAngle: 0,
        endAngle: 360
    });
    x = Math.round((wrongsCount / CORRECT_ANSWERS.length) * 100);
    y = 100 - x;
    d = [x, y];
    wrongsDonut.load({ data: d });

    var skippedDonut = new Donut({
        bindTo: '#skippedDonut > .donut',
        background: true,
        thickness: 10,
        offset: 1,
        startAngle: 0,
        endAngle: 360
    });
    x = Math.round((skippedCount / CORRECT_ANSWERS.length) * 100);
    y = 100 - x;
    d = [x, y];
    skippedDonut.load({ data: d });

}


var donut_license_colors = d3.scale.ordinal()
  .range(["#0072a7", "#ddd", "#acd7e2"]);

(function (global, undefined) {
    var defaults = {
        bindTo: 'body',
        className: 'donut',
        size: {
            width: 160,
            height: 160
        },
        margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        startAngle: 0,
        endAngle: 360,
        thickness: null,
        offset: 0,
        sort: null,
        maxValue: null,
        background: false,
        colors: donut_license_colors,
        accessor: function (d, i) {
            return d;
        }
    };

    var Donut = global.Donut = function (config) {
        // need an extend fn
        this.config = extend({}, defaults, config);

        // setup radius
        this.config.radius = getRadius(this);

        // setup accessor
        this.accessor = this.config.accessor;

        // convenience method to map data to start/end angles
        this.pie = d3.layout.pie()
          .sort(this.config.sort)
          .startAngle(degToRad(this.config.startAngle))
          .endAngle(degToRad(this.config.endAngle))

        if (this.accessor && typeof this.accessor === 'function') {
            this.pie.value(this.accessor);
        }

        var thickness = getThickness(this);

        this.arc = d3.svg.arc()
          .innerRadius(this.config.radius - thickness - (this.config.offset / 4))
          .outerRadius(this.config.radius + (this.config.offset / 4));

        bindSvgToDom(this);
    };

    Donut.prototype.load = function (newOpts) {
        // store data on object
        var data = (newOpts && newOpts.data != null) ? newOpts.data : this.data.map(this.accessor);

        // convert to array if not already
        data = Array.isArray(data) ? data : [data];

        if (this.config.maxValue) {
            this.data = this.pieMaxValue(data);
        } else {
            this.data = this.pie(data);
        }

        // drawPaths
        drawPaths(this);
    };

    Donut.prototype.pieMaxValue = function (data) {
        var accessor = this.accessor,
          self = this;

        // Compute the numeric values for each data element.      
        var values = data.map(function (d, i) { return +accessor.call(self, d, i); });

        var sum = d3.sum(values),
          max = d3.max([this.config.maxValue, sum]),
          diff = max - sum;

        // Compute the start angle.
        var a = +(degToRad(this.config.startAngle));

        // Compute the angular scale factor: from value to radians.
        // include the diff because it will help create angles with a maxValue in mind
        var k = (degToRad(this.config.endAngle) - a) / (sum + diff);

        var index = d3.range(data.length);

        // Compute the arcs!
        // They are stored in the original data's order.
        var arcs = [];
        index.forEach(function (i) {
            var d;
            arcs[i] = {
                data: data[i],
                value: d = values[i],
                startAngle: a,
                endAngle: a += d * k
            };
        });
        return arcs;
    };

    function getThickness(donut) {
        return donut.config.thickness || donut.config.radius;
    }

    /*
     * Setup the svg in the DOM and cache a ref to it
     */
    function bindSvgToDom(donut) {
        var width = getWidth(donut),
          height = getHeight(donut);

        donut.svg = d3.select(donut.config.bindTo)
          .append('svg')
          .attr('class', donut.config.classNames)
          .attr('width', width)
          .attr('height', height)
          .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        if (donut.config.background) {
            donut.svg.append('path')
              .attr('class', 'donut-background')
              .attr('fill', '#eee')
              .transition()
              .duration(500)
              .attrTween('d', function (d, i) {
                  var fullArc = {
                      value: 0,
                      startAngle: degToRad(donut.config.startAngle),
                      endAngle: degToRad(donut.config.endAngle)
                  };
                  return arcTween.call(this, fullArc, i, donut);
              });
        }
    }

    function drawPaths(donut) {
        var paths = donut.svg.selectAll('path.donut-section').data(donut.data);

        // enter new data
        paths.enter()
          .append('path')
          .attr('class', function (d, i) { return 'donut-section value-' + i; })
          .attr('fill', function (d, i) {
              return (typeof donut.config.colors === 'function') ? donut.config.colors(i) : donut.config.colors[i];
          })
          .attr('stroke', '#fff')
          .attr('stroke-width', donut.config.offset / 2);

        // transition existing paths
        donut.svg.selectAll('path.donut-section')
          .transition()
          .duration(500)
          .attrTween('d', function (d, i) {
              return arcTween.call(this, d, i, donut);
          })

        // exit old data
        paths.exit()
          .transition()
          .duration(100)
          .attrTween('d', function (d, i) {
              return removeArcTween.call(this, d, i, donut);
          })
          .remove();
    }

    // Store the currently-displayed angles in this._current.
    // Then, interpolate from this._current to the new angles.
    function arcTween(a, i, donut) {
        var prevSiblingArc, startAngle, newArc, interpolate;


        if (!this._current) {
            prevSiblingArc = donut.svg.selectAll('path')[0][i - 1];// donut.data[i - 1];

            // start at the end of the previous one or start of entire donut
            startAngle = (prevSiblingArc && prevSiblingArc._current) ?
              prevSiblingArc._current.endAngle :
              degToRad(donut.config.startAngle);

            newArc = {
                startAngle: startAngle,
                endAngle: startAngle,
                value: 0
            };
        }

        interpolate = d3.interpolate(this._current || newArc, a);

        // cache a copy of data to each path
        this._current = interpolate(0);
        return function (t) {
            return donut.arc(interpolate(t));
        };
    }

    function removeArcTween(a, i, donut) {
        var emptyArc = {
            startAngle: degToRad(donut.config.endAngle),
            endAngle: degToRad(donut.config.endAngle),
            value: 0
        },
          i = d3.interpolate(a, emptyArc);
        return function (t) {
            return donut.arc(i(t));
        };
    }

    function getRadius(donut) {
        var width = getWidth(donut) - donut.config.margin.left - donut.config.margin.right,
          height = getHeight(donut) - donut.config.margin.top - donut.config.margin.bottom;

        return Math.min(width, height) / 2;
    }

    function getWidth(donut) {
        return donut.config.size && donut.config.size.width;
    }

    function getHeight(donut) {
        return donut.config.size && donut.config.size.height;
    }

    function degToRad(degree) {
        return degree * (Math.PI / 180);
    }

    function radToDeg(radian) {
        return radian * (180 / Math.PI);
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var prop in arguments[i]) {
                if (arguments[i].hasOwnProperty(prop)) {
                    arguments[0][prop] = arguments[i][prop];
                }
            }
        }
        return arguments[0];
    }
})(window);