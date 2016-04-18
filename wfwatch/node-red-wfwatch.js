module.exports = function(RED) {
  var watchr = require('watchr');

  function WFWatch(config) {
    RED.nodes.createNode(this,config);
    this.folder = config.folder;

    var node = this;
    watchr.watch({
      outputLog: false,
      paths: [node.folder],
      listeners: {
        watching: function(err,watcherInstance,isWatching){
          if (err) {
            node.status({fill:"red",shape:"ring",text:"error watching folder"});
          } else {
            node.status({fill:"green", shape: "ring", text: "watching folder"});
          }
        },
        change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
          var payload = {
            changeType: changeType,
            filePath: filePath
          }
          node.send({payload: payload})
        }
      },
      next: function(err,watchers){
        if (err) {
          node.status({fill:"red",shape:"ring",text:"error watching folder"});
          return console.log("watching everything failed with error", err);
        } else {
          node.on('close', (done) => {
            watchers.forEach(w => w.close())
            done();
          })
        }
      }
    });
  }

  RED.nodes.registerType("wfwatch",WFWatch);
}
