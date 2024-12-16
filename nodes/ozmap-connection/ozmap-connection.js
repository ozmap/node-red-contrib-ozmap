const OZmapSDK = require('@ozmap/ozmap-sdk');

module.exports = function (RED) {
  function OZMapConnection(n, config, done) {
    RED.nodes.createNode(this, n);
    try {
      this.url = n.url;
      this.username = n.username;
      if (this.username && this.credentials?.password) {
        this.ozmap = new OZmapSDK.default(this.url, {
          login: this.username,
          password: this.credentials?.password,
        });
      } else if (this.credentials?.key) {
        this.ozmap = new OZmapSDK.default(this.url, { apiKey: this.credentials?.key });
      } else {
        this.ozmap = null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  RED.nodes.registerType('ozmap-connection', OZMapConnection, {
    credentials: {
      url: { type: 'text' },
      username: { type: 'text' },
      password: { type: 'password' },
      key: { type: 'password' },
    },
  });
};
