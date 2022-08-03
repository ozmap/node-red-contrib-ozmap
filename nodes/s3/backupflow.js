module.exports = function (RED) {
  //IMPORT
  let fs = require("fs/promises");
  let aws = require("aws-sdk");
  let backupFlowsVariables = {
    bucket: process.env.BUCKET_BACKUP,
    folder: process.env.FOLDER_BACKUP,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
  };

  //ASYNC FUNCTION TO READ FILE AND SEND TO S3
  async function sendToS3(configInfos, node) {
    let s3config = new aws.Config({
      credentials: {
        accessKeyId: configInfos.accessKey,
        secretAccessKey: configInfos.secretKey
      },
      region: 'us-east-1',
      apiVersion: '2006-03-01'
    });
    let s3 = new aws.S3(s3config);
    
    try {
      const fileData = await fs.readFile('../../../data/flows.json', { encoding: 'utf8' });
      let params = {
        Body: fileData,
        Bucket: configInfos.bucket,
        Key: configInfos.folder
      };
      s3.putObject(params, function(err, data) {
        console.log('começoy')
        if(err){
          if(node){
            return node.status({fill:"red",shape:"ring",text:"Error"});
          };
          RED.log.error(err)
        };
        if(node){
          node.status({fill:"green",shape:"ring",text:"Uploaded"});
        }
        RED.log.warn('Backup Upload Successfully');
      });
    } catch (err) {
      if(node){
        RED.log.error(err);
        node.status({fill:"red",shape:"ring",text:"Error"});
      }
    }
  }

  //SET BACKUPFLOW INFOS
  function backupflow(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', async (msg) => {
      if (config.accessKey.match(/(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/gm)) {
        let backupFlowsConfig = {
          bucket: config.bucket,
          folder: config.folderName,
          accessKey: config.accessKey,
          secretKey: config.secretKey
        }
        return sendToS3(backupFlowsConfig, node);
      };
      sendToS3(backupFlowsVariables, node);
    });
  };
  //REGISTER BACKUPFLOW NODE
  RED.nodes.registerType('backupflow', backupflow);

  //SEND WHENEVER DEPLOY RUN
  RED.events.on('runtime-event', function(event) {
    try{
      if(event.id == 'runtime-deploy'){
        sendToS3(backupFlowsVariables, null);
      }
    } catch(err){
      RED.log.error(err);
    }
  })
};