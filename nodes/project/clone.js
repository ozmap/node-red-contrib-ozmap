module.exports = function(RED) {
    function clone(config) {
        RED.nodes.createNode(this,config);
        this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);
        this.status({});
        this.on('input', async (msg) => {
            let ozmap = msg.ozmap || this.ozmapconnection.ozmap;
            if(!ozmap.isConnected()){
                msg.payload="Ozmap not connected!";
                this.status({fill:"red",shape:"ring",text:"disconnected"});
                return this.send([null, msg]);
            }
            try {
                let projectId = config.projectId;
                if(msg.payload && msg.payload.projectId) {
                    projectId = msg.payload.projectId;
                }
                msg.payload = await ozmap.getProject().clone(projectId);
                return this.send([msg,null]);
            }catch (error){
                msg.payload = error;
                return this.send([null, msg]);
            }
        });
    }
    RED.nodes.registerType("project-clone",clone);
}