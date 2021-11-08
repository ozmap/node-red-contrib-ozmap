const OZmapSDK = require('ozmap-sdk');

module.exports = function (RED) {
  function OZMapConnection(n, config, done) {
    RED.nodes.createNode(this, n);
    this.url = n.url;
    this.username = n.username;
    this.ozmap = new OZmapSDK(this.url, this.credentials.key);
    this.ozmap.authentication(this.username, this.credentials.password).then((a) => {
      console.log('Ozmap foi iniciado...');
    });
  }

  RED.nodes.registerType('ozmap-connection', OZMapConnection, {
    credentials: {
      password: { type: 'password' },
      key: { type: 'password' },
    },
  });
};
