document.addEventListener("DOMContentLoaded", function() {
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generateEmbedCode);
  
    var copyEmbedCodeButton = document.getElementById("copyEmbedCodeButton");
    copyEmbedCodeButton.addEventListener("click", copyEmbedCode);
  
    var copyLinkButton = document.getElementById("copyLinkButton");
    copyLinkButton.addEventListener("click", copyLink);
  });
  
  function generateEmbedCode() {
    var entryId = document.getElementById("entryIdInput").value;
    var playerId = "kaltura_player_1687278321"; // You can customize the player ID here
  
    var embedCode = '<iframe id="' + playerId + '" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/47306393/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId + '" width="480" height="270" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>';
  
    var link = 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/47306393/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId;
  
    document.getElementById("embedCodeOutput").value = embedCode;
    document.getElementById("linkOutput").value = link;
  }
  
  function copyEmbedCode() {
    var embedCodeOutput = document.getElementById("embedCodeOutput");
    embedCodeOutput.select();
    document.execCommand("copy");
  }
  
  function copyLink() {
    var linkOutput = document.getElementById("linkOutput");
    linkOutput.select();
    document.execCommand("copy");
  }
  