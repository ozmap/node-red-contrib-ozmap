module.exports = function(RED) {
    function box(config) {
        RED.nodes.createNode(this,config);

        this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);

        this.on('input', async (msg) => {
            try {
                msg.payload = await this.ozmapconnection.ozmap.read("boxes", msg.payload);
                return this.send([msg,null]);
            }catch (error){
                msg.payload = error;
                return this.send([null, msg]);
            }
        });
    }
    RED.nodes.registerType("box",box);
}