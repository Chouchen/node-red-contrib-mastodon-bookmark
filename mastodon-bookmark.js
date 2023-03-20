module.exports = function(RED) {
    'use strict';

	let Masto = require('masto');

    function MastodonBookmark(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        node.on('input', async function (msg) {
            
            var creds = RED.nodes.getNode(n.creds),
                payload = typeof msg.payload === 'object' ? msg.payload : {};
        
            var attrs = ['tweet'];
            for (var attr of attrs) {
                if (n[attr]) {
                    payload[attr] = n[attr];     
                }
            }
            
            payload.id = payload.tweet;

			const masto = await Masto.login({
				url: creds.url,
				accessToken: creds.token,
			});

			let bookmarks = await masto.v1.bookmarks.list();

			msg.payload = bookmarks;
			await node.send(msg);
        });
    }

    RED.nodes.registerType('mastodon-bookmark', MastodonBookmark);
};
