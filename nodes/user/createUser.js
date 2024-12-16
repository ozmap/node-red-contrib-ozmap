module.exports = function (RED) {
  function createUser(config) {
    RED.nodes.createNode(this, config);

    this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);
    this.status({});
    this.on('input', async (msg) => {
      const ozmap = msg.ozmap || this.ozmapconnection?.ozmap;
      if (!ozmap) {
        msg.payload = 'Missing ozmap connection';
        return [msg, null];
      }
      this.status({ fill: 'blue', shape: 'ring', text: 'running' });

      ozmap.users
        .create(msg.payload)
        .then((data) => {
          msg.payload = data;
          this.status({});
          return this.send([null, msg]);
        })
        .catch((error) => {
          const statusMessages = {
            401: 'Unauthorized',
            503: 'Service Unavailable',
          };
          const message = statusMessages[error.status] || error.name || 'unknown error';
          this.status({ fill: 'red', shape: 'ring', text: message });

          msg.payload = error;
          return this.send([msg, null]);
        });
    });
  }

  RED.nodes.registerType('createUser', createUser);
};
