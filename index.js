const MAX_SEARCH_BREADTH = 30;//<-- edit this for more results, but I must warn you, it takes a ton of ram
//node --max-old-space-size=8192 index.js
//to allocate some more

const maze = new Map();

//inputs are not the same as outputs, keep track of how letter-deep you are

maze.set("+", [
    {"id":"9","to":"C"}
]);

//0
maze.set(JSON.stringify({"id":"0","from":"in"}), [
    {"id":"0","to":"A"},
    {"id":"14","to":"XC"},
    {"id":"15","to":"XAB"},
]);
maze.set(JSON.stringify({"id":"0","from":"A"}), [
    {"id":"0","to":"XABC"},
    {"id":"14","to":"XC"},
    {"id":"15","to":"XAB"},
]);
maze.set(JSON.stringify({"id":"0","from":"B"}), [
    {"id":"3","to":"XABC"},
]);
maze.set(JSON.stringify({"id":"0","from":"C"}), [
    {"id":"2","to":"XAB"},
    {"id":"4","to":"A"},
    {"id":"6","to":"B"},
    {"id":"11","to":"XA"},
]);
//1
maze.set(JSON.stringify({"id":"1","from":"in"}), [
    {"id":"3","to":"A"},
]);
//2
maze.set(JSON.stringify({"id":"2","from":"in"}), [
    {"id":"0","to":"C"},
    {"id":"4","to":"A"},
    {"id":"6","to":"B"},
    {"id":"11","to":"XA"},
]);
maze.set(JSON.stringify({"id":"2","from":"A"}), [
    {"id":"6","to":"XBC"},
    {"id":"5","to":"C"},
]);
maze.set(JSON.stringify({"id":"2","from":"B"}), [
    {"id":"8","to":"XA"},
]);
//3
maze.set(JSON.stringify({"id":"3","from":"in"}), [
    {"id":"0","to":"B"},
]);
maze.set(JSON.stringify({"id":"3","from":"A"}), [
    {"id":"4","to":"XA"},
]);
maze.set(JSON.stringify({"id":"3","from":"B"}), [
    {"id":"3","to":"A"},
]);
maze.set(JSON.stringify({"id":"3","from":"C"}), [
    {"id":"10","to":"B"},
]);
//4
maze.set(JSON.stringify({"id":"4","from":"in"}), [
    {"id":"3","to":"B"},
]);
maze.set(JSON.stringify({"id":"4","from":"A"}), [
    {"id":"0","to":"C"},
    {"id":"2","to":"XAB"},
    {"id":"6","to":"B"},
    {"id":"11","to":"XA"},
]);
//5
maze.set(JSON.stringify({"id":"5","from":"in"}), [
    {"id":"7","to":"B"},
]);
maze.set(JSON.stringify({"id":"5","from":"C"}), [
    {"id":"6","to":"C"},
]);
//6
maze.set(JSON.stringify({"id":"6","from":"in"}), [
    {"id":"2","to":"A"},
    {"id":"5","to":"C"},
]);
maze.set(JSON.stringify({"id":"6","from":"B"}), [
    {"id":"0","to":"C"},
    {"id":"2","to":"XAB"},
    {"id":"4","to":"A"},
    {"id":"11","to":"XA"},
]);
maze.set(JSON.stringify({"id":"6","from":"C"}), [
    {"id":"7","to":"C"},
]);
//7
maze.set(JSON.stringify({"id":"7","from":"in"}), [
    {"id":"9","to":"XAC"},
    {"id":"10","to":"A"},
    {"id":"12","to":"XC"},
]);
maze.set(JSON.stringify({"id":"7","from":"A"}), [
    {"id":"15","to":"B"},
]);
maze.set(JSON.stringify({"id":"7","from":"B"}), [
    {"id":"5","to":"XC"},
]);
maze.set(JSON.stringify({"id":"7","from":"C"}), [
    {"id":"6","to":"C"},
]);
//8
maze.set(JSON.stringify({"id":"8","from":"in"}), [
    {"id":"2","to":"B"},
]);
maze.set(JSON.stringify({"id":"8","from":"A"}), [
    {"id":"12","to":"C"},
]);
//9
maze.set(JSON.stringify({"id":"9","from":"in"}), [
    {"id":"7","to":"XABC"},
    {"id":"10","to":"A"},
    {"id":"12","to":"XC"},
]);
maze.set(JSON.stringify({"id":"9","from":"A"}), [
    {"id":"15","to":"A"},
]);
//9 from C just leads to +, assumption: not gonna need to include it //EDIT: needed to include it... poetic irony
maze.set(JSON.stringify({"id":"9","from":"C"}), []);
//10
maze.set(JSON.stringify({"id":"10","from":"in"}), [
    {"id":"13","to":"XAB"},
    {"id":"13","to":"A"},
]);
maze.set(JSON.stringify({"id":"10","from":"A"}), [
    {"id":"7","to":"XABC"},
    {"id":"10","to":"XAB"},
    {"id":"12","to":"XC"},
]);
maze.set(JSON.stringify({"id":"10","from":"B"}), [
    {"id":"3","to":"C"},
]);
//11
maze.set(JSON.stringify({"id":"11","from":"in"}), [
    {"id":"0","to":"C"},
    {"id":"2","to":"XAB"},
    {"id":"4","to":"A"},
    {"id":"6","to":"B"},
]);
maze.set(JSON.stringify({"id":"11","from":"A"}), [
    "-",//oh woah, what's this
]);
//12
maze.set(JSON.stringify({"id":"12","from":"in"}), [
    {"id":"7","to":"XABC"},
    {"id":"9","to":"XAC"},
    {"id":"10","to":"A"},
]);
maze.set(JSON.stringify({"id":"12","from":"C"}), [
    {"id":"6","to":"C"},
]);
//13
maze.set(JSON.stringify({"id":"13","from":"in"}), [
    {"id":"10","to":"XAB"},
    {"id":"13","to":"A"},
]);
maze.set(JSON.stringify({"id":"13","from":"A"}), [
    {"id":"10","to":"XAB"},
    {"id":"13","to":"XAB"},
]);
maze.set(JSON.stringify({"id":"13","from":"B"}), [
    {"id":"14","to":"C"},
]);
//14
maze.set(JSON.stringify({"id":"14","from":"in"}), [
    {"id":"0","to":"XABC"},
    {"id":"0","to":"A"},
    {"id":"15","to":"XAB"},
]);
maze.set(JSON.stringify({"id":"14","from":"C"}), [
    {"id":"13","to":"B"},
]);
//15
maze.set(JSON.stringify({"id":"15","from":"in"}), [
    {"id":"0","to":"XABC"},
    {"id":"0","to":"A"},
    {"id":"14","to":"XC"},
]);
maze.set(JSON.stringify({"id":"15","from":"A"}), [
    {"id":"9","to":"A"},
]);
maze.set(JSON.stringify({"id":"15","from":"B"}), [
    {"id":"7","to":"A"},
]);

function forward (node) {
    if (node.now == "-") {
        if (node.layers == 0) { console.log("found it!"); return true; }
        else { return false; }
    }
    // console.log(node);
    //I have to COPY it cuz JAVASCRIPT USES SPLICE ON ORIGINAL FOR SOME REASON
    let paths = [];
    // console.log(node.now);
    for (let i=0; i<maze.get(node.now).length; i++) { paths.push(maze.get(node.now)[i]); }
    let p_l = paths.length;//had some bug, maybe javascript does smth wierd with for loop conditions?

    for (let i=0; i<p_l; i++) {
        let from = "?";
        let next_node = {
            now: "#",
            prev: node,
            next: [],
            layers: JSON.parse(JSON.stringify(node.layers)),
        };
        if (paths[i] == "-") {
            if (node.layers.length == 0) {
                from = "+";
                console.log("\nFound a solution!\n");
                var c_node = node;
                while(c_node.prev != null) {
                    console.log(c_node.now + " [" + c_node.layers + "]");
                    c_node = c_node.prev;
                }
                console.log("");
                return true;
            }
            else {
                //a "-" that's deep in layers; not the top one
                paths.splice(i, 1); i--; p_l--; continue;
            }
        }
        else if (paths[i].to.includes("X")) {
            if (next_node.layers.length > 0 && paths[i].to.includes(next_node.layers[next_node.layers.length-1])) {
                from = next_node.layers[next_node.layers.length-1];
                next_node.layers.pop();
            } else {
                //not enough layers, kill path
                paths.splice(i, 1); i--; p_l--; continue;
            }
        }
        else if (paths[i].to == "A" || paths[i].to == "B" || paths[i].to == "C") {
            from = "in";
            next_node.layers.push(paths[i].to);
        }
        else {
            console.log("???"+paths);
        }
        next_node.now = JSON.stringify({"id":paths[i].id+"","from":from+""});
        node.next[i] = next_node;
    }
    return false;
}

console.log("This program is made by clickednebula3.");
console.log("I used Breadth First Search method to solve Mark J. P. Wolf's Fractcal Maze.");
console.log("I recommend running via [node --max-old-space-size=8192 index.js] for more ram.");
console.log("Read each solution from its bottom to its top.");
console.log("Change the number of steps directly from the constant in index.js (Default: 30).\n");

journey_node = { now: "+", prev: null, next: [], layers: [] };
var all_nodes_this_cycle = [journey_node];
var unique_node_states = new Set();
console.log(journey_node.now);

for (let t=0; t<MAX_SEARCH_BREADTH; t++) {
    let all_nodes_next_cycle = [];

    console.log("\n\n======================STEP== ("+t+")");
    console.log("Testing "+all_nodes_this_cycle.length+" paths...");

    for (let n=0; n<all_nodes_this_cycle.length; n++) {
        // console.log("\n---- ["+n+"] " + all_nodes_this_cycle[n].now + " [" + all_nodes_this_cycle[n].layers + "] -->");
        let found_it = forward(all_nodes_this_cycle[n]);//never used but neat
        
        let simpler_node = JSON.parse(JSON.stringify({ now: all_nodes_this_cycle[n].now, layers: all_nodes_this_cycle[n].layers }));
        if (unique_node_states.has(simpler_node)) {
            console.log("Found obsolete node");
            continue;
        } else {
            unique_node_states.add(simpler_node);
        }

        for (let i=0; i<all_nodes_this_cycle[n].next.length; i++) {
            all_nodes_next_cycle.push(all_nodes_this_cycle[n].next[i]);
            // console.log(all_nodes_this_cycle[n].next[i].now + " [" + all_nodes_this_cycle[n].next[i].layers + "]");
        }
    }
    
    all_nodes_this_cycle = all_nodes_next_cycle;
}
