function formatTimeInput(element) {
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
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  console.log("Video Timestamp (Seconds):", totalSeconds);
  return totalSeconds;
}

function generateEmbedCode() {
  var entryId = document.getElementById("entryIdInput").value;
  var videoType = document.querySelector('input[name="videoType"]:checked').value;

  var playerId = "kaltura_player_" + new Date().getTime(); // Unique player ID for each generation

  var uiconf_id = videoType === "downloadable" ? "57429403" : "56813562"; // Adjusted based on video type

  var videotContainer = document.getElementById("videoPreview");
  videotContainer.innerHTML = ""; // Clear previous preview if any
  // Width and Height
  var iframeWidth = document.getElementById("videoWidth").value;
  var iframeHeight = document.getElementById("videoHeight").value;

  // Start at and End at
  var start_at = getSeconds(document.getElementById("videoStart").value);
  var end_at = getSeconds(document.getElementById("videoEnd").value);

  var srcURL = `https://cdnapisec.kaltura.com/p/1157612/embedPlaykitJs/uiconf_id/${uiconf_id}?iframeembed=true&entry_id=${entryId}`;
  if (start_at > 0) {
    srcURL = srcURL + `&flashvars[mediaProxy.mediaPlayFrom]=${start_at}`;
  }

  if (end_at > 0) {
    srcURL = srcURL + `&flashvars[mediaProxy.mediaPlayTo]=${end_at}`;
  }

  var widthValue = (iframeWidth || "").toString();
  var heightValue = (iframeHeight || "").toString();
  var styleAttr = `width: ${widthValue}${
    widthValue.includes("%") || widthValue.includes("px") ? "" : "px"
  }; height: ${heightValue}${
    heightValue.includes("%") || heightValue.includes("px") ? "" : "px"
  }`;

  var embedCode = `<iframe id="${playerId}" type="text/javascript" src="${srcURL}" style="${styleAttr}" width="${iframeWidth}" height="${iframeHeight}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Kaltura video player"></iframe>`;

  document.getElementById("embedCodeOutput").value = embedCode;
  document.getElementById("linkOutput").value = srcURL;

  videotContainer.innerHTML = embedCode;
}

function generatePlaylistEmbed() {
  var playlistId = document.getElementById("playlistIdInput").value;
  var frameWidth = document.getElementById("frameWidth").value;
  var frameHeight = document.getElementById("frameHeight").value;
  var nextPrev = document.getElementById("nextPrev").checked;
  var scrubberPreview = document.getElementById("scrubberPreview").checked;
  var chaptersLayout = document.getElementById("chaptersLayout").value;
  var playbackSpeed = document.getElementById("playbackSpeed").value;

  var uiconfId = "57079362"; // default uiconf for playlist

  var flashvars = {};
  flashvars["streamerType"] = "hls";
  flashvars["playlistAPI.kpl0Id"] = playlistId;
  flashvars["chapters.layout"] = chaptersLayout;
  flashvars["playbackRateSelector.plugin"] = playbackSpeed;
  flashvars["controlBarContainer.plugin"] = true;
  flashvars["largePlay.plugin"] = true;
  flashvars["loadingSpinner.plugin"] = true;
  flashvars["sourceSelector.plugin"] = true;
  flashvars["dualScreen.plugin"] = true;
  flashvars["KalturaSupport.LeadWithHLSOnFlash"] = true;
  flashvars["IframeCustomPluginCss.parent"] = "dot";
  flashvars["IframeCustomPluginCss.iframeHTML5Css"] = "https://www.byui.edu/prebuilt/css/kaltura.css";
  flashvars["scrubber.plugin"] = scrubberPreview;
  flashvars["nextPrevBtn.plugin"] = nextPrev;

  var flashvarsStr = "";
  for (var key in flashvars) {
    flashvarsStr += `&flashvars[${key}]=${flashvars[key]}`;
  }

  var srcURL = `https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/${uiconfId}/partner_id/1157612?iframeembed=true${flashvarsStr}`;

  var embedCode = `<iframe src="${srcURL}" width="${frameWidth}" height="${frameHeight}" allowfullscreen webkitallowfullscreen mozallowfullscreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe>`;

  document.getElementById("playlistEmbedCodeOutput").value = embedCode;
  document.getElementById("playlistLinkOutput").value = srcURL;
  document.getElementById("playlistPreview").innerHTML = embedCode;
}

function showContainer(containerId) {
  // Hide all containers
  document.getElementById("embedContainer").hidden = true;
  document.getElementById("playlistContainer").hidden = true;

  // Deactivate all buttons
  document.getElementById("embedButton").classList.remove("active");
  document.getElementById("playlistButton").classList.remove("active");
  document.getElementById("embedButton").setAttribute("aria-selected", "false");
  document.getElementById("playlistButton").setAttribute("aria-selected", "false");

  // Show the selected container and activate the corresponding button
  document.getElementById(containerId + "Container").hidden = false;
  document.getElementById(containerId + "Button").classList.add("active");
  document.getElementById(containerId + "Button").setAttribute("aria-selected", "true");
}

function handleCopyClick(event) {
  const button = event.target;
  const originalText = button.textContent;
  // Use previousElementSibling to get the input/textarea right before the button
  const textToCopy = button.previousElementSibling.value;

  navigator.clipboard.writeText(textToCopy).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000); // Revert back after 2 seconds
  }).catch(err => {
    console.error('Failed to copy text: ', err);
    // Optionally, provide feedback to the user that the copy failed
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var timeInputs = document.querySelectorAll(".time-input");
  timeInputs.forEach(formatTimeInput);

  document.getElementById("generateButton").addEventListener("click", generateEmbedCode);
  document.getElementById("generatePlaylistButton").addEventListener("click", generatePlaylistEmbed);

  // Set up copy buttons
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(button => {
    button.addEventListener('click', handleCopyClick);
  });
  
  // Initialize with the embed container visible
  showContainer('embed');
});
