module.exports = function (RED) {
    function getOZmapClientByONUCode(config) {
        RED.nodes.createNode(this, config);

        this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);
        this.status({});
        this.on('input', async (msg) => {
            let ozmap = msg.ozmap || this.ozmapconnection.ozmap;
            if (!ozmap.isConnected()) {
                msg.payload = 'Ozmap not connected!';
                this.status({fill: 'red', shape: 'ring', text: 'disconnected'});
                return this.send([null, msg]);
            }

            try {
                msg.payload = await ozmap.getClient().getOneByONUCode(msg.payload.serial_number);
                return this.send([msg, null]);

            } catch (error) {
                msg.payload = error;
                return this.send([null, msg]);
            }

        });
    }

    RED.nodes.registerType('getOZmapClientByONUCode', getOZmapClientByONUCode);
};
