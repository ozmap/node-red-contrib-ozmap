module.exports = function (RED) {
  function client(config) {
    RED.nodes.createNode(this, config);
    let node = this;
    this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);

    this.on('input', async (msg) => {
      if (typeof msg.payload.query !== 'object') {
        if (typeof msg.payload !== 'object') {
          msg.payload = {};
        }
        msg.payload.query = {};
      }

      msg.payload.query.createdAt =
        msg.payload.query.createdAt || config.createdAt;
      msg.payload.query.createdAt1 =
        msg.payload.query.createdAt1 || config.createdAt1;
      if (msg.payload.query.createdAt && msg.payload.query.createdAt1) {
        msg.payload.query.createdAt = {
          $gte: new Date(msg.payload.query.createdAt).toISOString(),
          $lte: new Date(msg.payload.query.createdAt1).toISOString(),
        };
      }
      if (msg.payload.query.createdAt === '') {
        delete msg.payload.query.createdAt;
      }
      delete msg.payload.query.createdAt1;

      msg.payload.query.updatedAt =
        msg.payload.query.updatedAt || config.updatedAt;
      msg.payload.query.updatedAt1 =
        msg.payload.query.updatedAt1 || config.updatedAt1;
      if (msg.payload.query.updatedAt && msg.payload.query.updatedAt1) {
        msg.payload.query.updatedAt = {
          $gte: new Date(msg.payload.query.updatedAt).toISOString(),
          $lte: new Date(msg.payload.query.updatedAt1).toISOString(),
        };
      }
      if (msg.payload.query.updatedAt === '') {
        delete msg.payload.query.updatedAt;
      }
      delete msg.payload.query.updatedAt1;

      msg.payload.query.id = msg.payload.query.id || config.clientId;
      if (!msg.payload.query.id || msg.payload.query.id === '') {
        delete msg.payload.query.id;
      }

      msg.payload.query.name = msg.payload.query.name || config.clientName;
      if (!msg.payload.query.name && msg.payload.query.name === '') {
        delete msg.payload.query.name;
      }

      msg.ozmapQuery = msg.payload.query;

      try {
        msg.payload = await this.ozmapconnection.ozmap.read(
          'clients',
          msg.payload.query,
        );
        return this.send([msg, null]);
      } catch (error) {
        msg.payload = JSON.stringify(error);
        return this.send([null, msg]);
      }
    });
  }
  RED.nodes.registerType('client', client);
};
