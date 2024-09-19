document.addEventListener("DOMContentLoaded", function() {
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generateEmbedCode);
  
    var copyEmbedCodeButton = document.getElementById("copyEmbedCodeButton");
    copyEmbedCodeButton.addEventListener("click", copyEmbedCode);
  
    var copyLinkButton = document.getElementById("copyLinkButton");
    copyLinkButton.addEventListener("click", copyLink);

    // Handle Playlist Builder
    var generatePlaylistButton = document.getElementById("generatePlaylistButton");
    generatePlaylistButton.addEventListener("click", generatePlaylistEmbedCode);

    var copyPlaylistEmbedCodeButton = document.getElementById("copyPlaylistEmbedCodeButton");
    copyPlaylistEmbedCodeButton.addEventListener("click", copyPlaylistEmbedCode);

    var copyPlaylistLink = document.getElementById("playlistCopyLinkButton");
    copyPlaylistLink.addEventListener("click", copyPlaylistLink);


  });
  
  function generateEmbedCode() {
  var entryId = document.getElementById("entryIdInput").value;
  var videoType = document.querySelector('input[name="videoType"]:checked').value;
  
  var playerId = "kaltura_player_" + (new Date()).getTime(); // Unique player ID for each generation
  
  var uiconf_id = videoType === "downloadable" ? "47306393" : "42438262"; // Adjusted based on video type


  
  var embedCode = '<iframe id="' + playerId + '" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/' + uiconf_id + '/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId +'" width="480" height="270" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>';

  var link = 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/' + uiconf_id + '/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId;

  document.getElementById("embedCodeOutput").value = embedCode;
  document.getElementById("linkOutput").value = link;

  var videotContainer =  document.getElementById("videoPreview");
  videotContainer.innerHTML = '';  // Clear previous preview if any
  var iframeWidth = document.getElementById("videoWidth").value;

  var iframeHeight = document.getElementById("videoHeight").value;

  var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/' + uiconf_id + '/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&entry_id=' + entryId);
    iframe.setAttribute('width', iframeWidth);
    iframe.setAttribute('height', iframeHeight);
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
    iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
    iframe.setAttribute('allow', 'autoplay *; fullscreen *; encrypted-media *');
    iframe.setAttribute('frameborder', '0');

  // Append the iframe to the preview container
  videotContainer.appendChild(iframe);
}

function generatePlaylistEmbedCode() {
  var playlistId = document.getElementById("playlistIdInput").value;
  var playerId = "kaltura_playlist_" + (new Date()).getTime(); // Unique player ID for each playlist generation

  // Flashvars customization options
  var flashvars = '';

  if (document.getElementById("autoPlay").checked) {
      flashvars += '&flashvars[autoPlay]=true';
  }
  if (document.getElementById("nextPrev").checked) {
      flashvars += '&flashvars[nextPrevBtn.plugin]=true';
  }
  if (document.getElementById("streamSelector").checked) {
      flashvars += '&flashvars[streamSelector.plugin]=true';
  }
  if (document.getElementById("resume").checked) {
      flashvars += '&flashvars[resume]=true';
  }
  if (document.getElementById("scrubberPreview").checked) {
      flashvars += '&flashvars[scrubber.sliderPreview]=true';
  }


  // Chapters layout
  var chaptersLayout = document.getElementById("chaptersLayout").value;
  //flashvars += '&flashvars[chapters.layout]=' + chaptersLayout;

  // Playback speed control
  var playbackSpeedControl = document.getElementById("playbackSpeed").value;
  flashvars += '&flashvars[playbackRateSelector.plugin]=' + playbackSpeedControl;

  var player = chaptersLayout == "vertical" ? "44360632" : "44360622";

  var iframeWidth = document.getElementById("frameWidth").value;

  var iframeHeight = document.getElementById("frameHeight").value;
  var url = 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/'+ player +'/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&flashvars[playlistAPI.kpl0Id]=' + playlistId + flashvars;
  // Playlist embed code
  var playlistEmbedCode = '<iframe id="' + playerId + '" src="'+url+'" width="'+iframeWidth+'" height="'+iframeHeight+'" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>';

  document.getElementById("playlistEmbedCodeOutput").value = playlistEmbedCode;
  document.getElementById("playlistLinkOutput").value = url;
  
  var playlistContainer =  document.getElementById("playlistPreview");
  playlistContainer.innerHTML = '';  // Clear previous preview if any

  var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/'+ player +'/partner_id/1157612?iframeembed=true&playerId=' + playerId + '&flashvars[playlistAPI.kpl0Id]=' + playlistId + flashvars);
    iframe.setAttribute('width', iframeWidth);
    iframe.setAttribute('height', iframeHeight);
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
    iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
    iframe.setAttribute('allow', 'autoplay *; fullscreen *; encrypted-media *');
    iframe.setAttribute('frameborder', '0');

    // Append the iframe to the preview container
    playlistContainer.appendChild(iframe);

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

function copyPlaylistEmbedCode() {
    var playlistEmbedCodeOutput = document.getElementById("playlistEmbedCodeOutput");
    playlistEmbedCodeOutput.select();
    document.execCommand("copy");
}

function copyPlaylistLink() {
  var linkOutput = document.getElementById("playlistLinkOutput");
  linkOutput.select();
  document.execCommand("copy");
}

document.getElementById("chaptersLayout").addEventListener("change", function() {
  // Get the selected layout value
  var selectedLayout = this.value;
  // Log or perform any action on change
  if(selectedLayout == "vertical") {
    document.getElementById("frameWidth").value = 400;
    document.getElementById("frameHeight").value = 600;

  } else {
    document.getElementById("frameWidth").value = 900;
    document.getElementById("frameHeight").value = 400;
  }
  
});
  
