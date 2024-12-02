module.exports = function (RED) {
  function project(config) {
    RED.nodes.createNode(this, config);

    this.ozmapconnection = RED.nodes.getNode(config.ozmapconnection);
    this.status({});
    this.on('input', async (msg) => {
      const ozmap = msg.ozmap || this.ozmapconnection?.ozmap;
      if (!ozmap) {
        msg.payload = 'Missing ozmap connection';
        return [msg, null];
      }
      this.status({});

      try {
        this.status({ fill: 'blue', shape: 'ring', text: 'running' });
        const options = {
          limit: config.limit,
          page: config.page,
          select: config.select,
          filter: config.filter,
          populate: config.populate,
          sorter: config.sorter,
          ...msg.payload,
        };
        if (options.page) {
          options.limit = options.limit || 100;
          msg.payload = await ozmap.project.find(options);
        } else {
          options.batchSize = options.limit;
          msg.payload = await ozmap.project.findAll(options);
        }
        this.status({});
        return this.send([null, msg]);
      } catch (error) {
        const statusMessages = {
          401: 'Unauthorized',
          503: 'Service Unavailable',
        };
        const message = statusMessages[error.status] || error.name || 'unknown error';
        this.status({ fill: 'red', shape: 'ring', text: message });

        msg.payload = error;
        return this.send([msg, null]);
      }
    });
  }

  RED.nodes.registerType('project', project);
};
