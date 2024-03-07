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
  var videoType = document.querySelector('input[name="videoType"]:checked').value;
  
  var playerId = "kaltura_player_" + (new Date()).getTime(); // Unique player ID for each generation
  
  var uiconf_id = videoType === "downloadable" ? "47306393" : "42438262"; // Adjusted based on video type
  
  var embedCode = '<iframe id="' + playerId + '" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/' + uiconf_id + '/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId + '" width="480" height="270" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>';

  var link = 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/' + uiconf_id + '/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId;

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
  
