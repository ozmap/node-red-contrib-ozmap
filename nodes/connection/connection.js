const {OZmap} = require("ozmap-api");

module.exports = function(RED) {
    function connection(config) {
        RED.nodes.createNode(this,config);
        const node = this;
        const flowContext = this.context().flow;

        node.on('input', async (msg) => {

            let name = msg.payload.name || config.name;
            let url = msg.payload.url || config.url;
            let login = msg.payload.username || node.credentials.username;
            let password = msg.payload.password || node.credentials.password;
            let key = msg.payload.key || node.credentials.key;

            const ozmap = new OZmap(null, url);

            this.status({fill:"yellow",shape:"dot",text:"connecting..."});

            let ozmapconnections = flowContext.get('ozmapconnections');

            try {
                key = await ozmap.authenticate({login, password, key});
                this.status({fill:"green",shape:"dot",text:"connected"});
                ozmapconnections[name] = ozmap;
                msg.payload = {url,login,password, key};
            }catch (error){
                ozmapconnections[name] = null;
                this.status({fill:"red",shape:"ring",text:"disconnected"});
                msg.payload = {error, name, url, login, password, key};
            }

            flowContext.set('ozmapconnections',ozmapconnections);

            node.send(msg);
        });
    }
    RED.nodes.registerType("connection",connection,{
        credentials: {
            username: {type:"text"},
            password: {type:"password"},
            key: {type:"password"}
        }
    });
}