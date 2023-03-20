module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.url = n.url;
        this.token = n.token;
    }
    RED.nodes.registerType("mastodon-bookmark-client", RemoteServerNode);
}