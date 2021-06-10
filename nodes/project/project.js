module.exports = function(RED) {
    function project(config) {
        RED.nodes.createNode(this,config);
        this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);
        var node = this;

        node.on('input', async function(msg) {
            msg.payload = await node.ozmapconnection.ozmap.read("projects", msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("project",project,{
        
    });
}