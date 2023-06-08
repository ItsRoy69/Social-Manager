var WebsiteUrl;
var WebsiteHostName;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  WebsiteUrl = tabs[0].url;
  WebsiteHostName = new URL(tabs[0].url).hostname;
  console.log(WebsiteHostName);

  document.getElementById("url").innerText = WebsiteHostName;

  chrome.storage.local.get("BlockedUrls", (data) => {
    var aux = false;
    if (data.BlockedUrls != undefined) {
      data.BlockedUrls.forEach((e, index) => {
        if (e.url === WebsiteHostName && e.status === "BLOCKED") {
          aux = true;
        }
      });
    }

    if (aux) {
      document.getElementById("btn").textContent = "UNLOCK ALL URL'S";
    } else {
      document.getElementById("btn").textContent = "BLOCK THIS URL";
    }
  });
});

function ShowError(text) {
  var div = document.createElement("div");
  div.setAttribute("id", "ERRORcontainer");
  div.innerHTML = `
                <div class="ERROR">
                    <p>${text}</p>     
                </div>`;
  document.getElementsByClassName("bottomItem")[0].appendChild(div);

  setTimeout(() => {
    document.getElementById("ERRORcontainer").remove();
  }, 3000);
}

document.getElementById("btn").addEventListener("click", () => {
  if (WebsiteUrl.toLowerCase().includes("chrome://")) {
    ShowError("You cannot block a chrome URL");
  } else {
    chrome.storage.local.get("BlockedUrls", (data) => {
      if (data.BlockedUrls === undefined) {
        chrome.storage.local.set({
          BlockedUrls: [{ status: "BLOCKED", url: WebsiteHostName }],
        });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "startBlocking",
          });
        });

        document.getElementById("btn").textContent = "UNLOCK ALL URL'S";
      } else {
        var found = false;
        data.BlockedUrls.forEach((e, index) => {
          if (e.url === WebsiteHostName && e.status === "BLOCKED") {
            var arr = data.BlockedUrls.splice(index, 1);

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, {
                from: "popup",
                subject: "unlockPage",
              });
            });

            document.getElementById("btn").textContent = "BLOCK THIS URL";
            found = true;

            chrome.storage.local.set({ BlockedUrls: [arr] });
          }
        });

        if (found === false) {
          chrome.storage.local.set({
            BlockedUrls: [
              ...data.BlockedUrls,
              { status: "BLOCKED", url: WebsiteHostName },
            ],
          });

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              from: "popup",
              subject: "startBlocking",
            });
          });
          document.getElementById("btn").textContent = "UNLOCK ALL URL'S";
        }
      }
    });
  }
});
