document.addEventListener("DOMContentLoaded", function() {
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generateEmbedCode);
  
    var copyEmbedCodeButton = document.getElementById("copyEmbedCodeButton");
    copyEmbedCodeButton.addEventListener("click", function(){
      copyToClipboard("embedCodeOutput", "embedCopyMsg");
    });

    var copyLinkButton = document.getElementById("copyLinkButton");
    copyLinkButton.addEventListener("click", function(){
      copyToClipboard("linkOutput", "linkCopyMsg");
    });

    // Handle Playlist Builder
    var generatePlaylistButton = document.getElementById("generatePlaylistButton");
    generatePlaylistButton.addEventListener("click", generatePlaylistEmbedCode);

    var copyPlaylistEmbedCodeButton = document.getElementById("copyPlaylistEmbedCodeButton");
    copyPlaylistEmbedCodeButton.addEventListener("click", function(){
      copyToClipboard("playlistEmbedCodeOutput", "playlistEmbedCopyMsg");
    });

    var copyPlaylistLinkButton = document.getElementById("playlistCopyLinkButton");
    copyPlaylistLinkButton.addEventListener("click", function(){
      copyToClipboard("playlistLinkOutput", "playlistLinkCopyMsg");
    });

    var video_start = document.getElementById("videoStart");
    var video_end = document.getElementById("videoEnd");

    timeStampValidate(video_start)
    timeStampValidate(video_end)


  });

function timeStampValidate(element) {
  element.addEventListener("input", function (e) {
    let value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    // Apply formatting as user types
    if (value.length > 0) {
      formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
      formattedValue += ":" + value.substring(2, 4);
    }
    if (value.length > 4) {
      formattedValue += ":" + value.substring(4, 6);
    }

    this.value = formattedValue;
  });
}


function getSeconds(inputValue) {
  var time = inputValue.trim();

  const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
    if (!timePattern.test(time)) {
      console.log("Invalid time format! Please enter in HH:MM:SS format.");
      return;
    }

    // Split into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    console.log("Video Timestamp (Seconds):", totalSeconds);
    return totalSeconds;

}
  
  function generateEmbedCode() {
  var entryId = document.getElementById("entryIdInput").value;
  var videoType = document.querySelector('input[name="videoType"]:checked').value;
  
  var playerId = "kaltura_player_" + (new Date()).getTime(); // Unique player ID for each generation
  
  var uiconf_id = videoType === "downloadable" ? "47306393" : "42438262"; // Adjusted based on video type


  


  var videotContainer =  document.getElementById("videoPreview");
  videotContainer.innerHTML = '';  // Clear previous preview if any
  // Width and Height
  var iframeWidth = document.getElementById("videoWidth").value;
  var iframeHeight = document.getElementById("videoHeight").value;

  // Start at and End at
  var start_at = getSeconds(document.getElementById("videoStart").value);
  var end_at = getSeconds(document.getElementById("videoEnd").value);

  var srcURL = `https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/${uiconf_id}/partner_id/1157612?iframeembed=true&playerId=${playerId}&entry_id=${entryId}`
  if(start_at > 0) {
    srcURL = srcURL + `&flashvars[mediaProxy.mediaPlayFrom]=${start_at}`
  }

  if(end_at > 0) {
    srcURL = srcURL + `&flashvars[mediaProxy.mediaPlayTo]=${end_at}`
  }
  
  var embedCode = `<iframe id="${playerId}" src="${srcURL}" width="${iframeWidth}" height="${iframeHeight}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>`;
  var link = srcURL;

  document.getElementById("embedCodeOutput").value = embedCode;
  document.getElementById("linkOutput").value = link;



  var iframe = document.createElement('iframe');
    iframe.setAttribute('src', srcURL);
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

  if (document.getElementById("nextPrev").checked) {
      flashvars += '&flashvars[nextPrevBtn.plugin]=true';
  } else {
      flashvars += '&flashvars[nextPrevBtn.plugin]=false';
  }

  if (document.getElementById("scrubberPreview").checked) {
      flashvars += '&flashvars[scrubber.sliderPreview]=true';
  } else {
      flashvars += '&flashvars[scrubber.sliderPreview]=false';
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

  
function copyToClipboard(sourceId, messageId) {
  var text = document.getElementById(sourceId).value;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      var msg = document.getElementById(messageId);
      if (msg) {
        msg.textContent = 'Copied!';
        setTimeout(function(){ msg.textContent = ''; }, 2000);
      }
    });
  } else {
    var temp = document.getElementById(sourceId);
    temp.select();
    document.execCommand('copy');
  }
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




// Function to show the selected container
function showContainer(container) {
  // Hide both containers
  document.getElementById('embedContainer').hidden = true;
  document.getElementById('playlistContainer').hidden = true;

  // Show the selected container
  if (container === 'embed') {
    document.getElementById('embedContainer').hidden = false;
  } else if (container === 'playlist') {
    document.getElementById('playlistContainer').hidden = false;
  }

  // Update active button styling and aria-selected
  document.getElementById('embedButton').classList.remove('active');
  document.getElementById('playlistButton').classList.remove('active');

  document.getElementById('embedButton').setAttribute('aria-selected', container === 'embed');
  document.getElementById('playlistButton').setAttribute('aria-selected', container === 'playlist');

  if (container === 'embed') {
    document.getElementById('embedButton').classList.add('active');
  } else {
    document.getElementById('playlistButton').classList.add('active');
  }
}

  
