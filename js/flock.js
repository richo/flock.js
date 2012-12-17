var RandomAttractor = Object;

var Flock = (function() {
    function _() {
        this.members = [];
        this.goals = [new RandomAttractor()];
    }

    _.prototype.addChild = function(child) {
        this.members.push(child)
    }

    return _;
})();

var Agent = (function() {
    // constructor
    function _(x, y, init){
        this.x = x;
        this.y = y;
        this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
        init(this);
    };

    _.prototype.move = function(x, y) {
        this.x += x;
        this.y += y;
    };

    return _;
})();

function main() {
    function make_random_agent() {
        var x = Math.floor(Math.random()*480);
        var y = Math.floor(Math.random()*480);

        return new Agent(x, y, init_agent);
    }

    var init_agent = (function(document) {
        var graph = document.getElementById("graph");
        var ctx = graph.getContext("2d");

        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };

        return function(agent) {
            ctx.fillCircle(agent.x, agent.y, 3, agent.color);
        }
    })(document);

    var FLOCK = new Flock();


    for (var i = 0; i < 100; i++) {
        FLOCK.addChild(make_random_agent());
    }
}

// We don't care about things that aren't chrome.
//
document.addEventListener("DOMContentLoaded", function onDom(evt) {
    main()
}, false);
