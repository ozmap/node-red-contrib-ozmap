module.exports = function(RED) {
    function property(config) {
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
                if(msg.payload.query) {
                    msg.payload = await ozmap.getProperty().getAllByQuery(msg.payload.query);
                }else if(msg.payload.filters) {
                    msg.payload = await ozmap.getProperty().getAllByFilter(msg.payload.filters);
                }else if(msg.payload.ids) {
                    msg.payload = await ozmap.getProperty().getByIds(msg.payload.ids);
                }else{
                    msg.payload = await ozmap.getProperty().getAll();
                }

                return this.send([msg,null]);

            }catch (error){
                msg.payload = error;
                return this.send([null, msg]);
            }

        });
    }
    RED.nodes.registerType("property",property);
}