const {OZmap} = require("ozmap-api");

module.exports = function(RED) {
    function OZMapConnection(n, config, done) {
        RED.nodes.createNode(this,n);
        this.url = n.url;
        this.username = n.username;
        this.ozmap = new OZmap(this.credentials.key, this.url);
        this.ozmap.authenticate({login: this.username, password: this.credentials.password, key: this.credentials.key});
    }
    RED.nodes.registerType("ozmap-connection",OZMapConnection,{

        credentials: {
            password: {type:"password"},
            key: {type:"password"}
        }
    });
}