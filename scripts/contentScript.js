var body = document.body.innerHTML;
var head = document.head.innerHTML;

function CloseTab() {
  alert(
    "This URL is completely blocked for today. This tab will close after you press OK"
  );
  chrome.runtime.sendMessage({ CloseMe: true });
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.from === "popup" && message.subject === "startBlocking") {
    document.head.innerHTML = blockedPageStyles();
    document.body.innerHTML = blockedPageHTML();
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.from === "popup" && message.subject === "unlockPage") {
    document.body.innerHTML = body;
    document.head.innerHTML = head;
  }
});
chrome.storage.local.get("BlockedUrls", (data) => {
  if (data.BlockedUrls !== undefined) {
    if (
      data.BlockedUrls.some(
        (e) => e.url === window.location.hostname && e.status === "BLOCKED"
      )
    ) {
      document.head.innerHTML = blockedPageStyles();
      document.body.innerHTML = blockedPageHTML();
    }
  }
});

const blockedPageHTML = () => {
  return `
  <div class="Header">
  <div class="Header-background"></div>
  <div class="Header-content">
    <div class="Header-hero">
      <h1>Its Coding Time !!!</h1>
      <p>Stop Browsing Unnecessary Sites</p>
      <button class="Button" ><a href="https://www.google.com/">BRUHHHH</a></button>
    </div>
    <div class="Header-visuals">
      <div class="Iphone"></div>
      <div class="phone-foot">
        <p> <a href="https://github.com/ItsRoy69">Built By ItsRoy69</a></p>
      </div>      
    </div>
    <script src="./scripts/popup.js"></script>
  </div>
    `;
};

const blockedPageStyles = () => {
  return `<title>Website Blockage Manager</title>
    <style>
    :root {
      --color-1: #780000;
      --color-2: #B721FF;
      --color-3: #000000;
      --color-4: #000000;
    }

    body {
      font-family: 'Varela Round', sans-serif;
      background: var(--color-3);
    }

    .Header {
      position: relative;
      height: 80vh;
      display: block;
    }

    .Header-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(19deg, var(--color-1), var(--color-2));
      transform-origin: 0px 0px;
      transform: skewY(-10deg);
      overflow: hidden;
      z-index: -1;
    }

    .Header-background::before,
    .Header-background::after {
      display: block;
      position: absolute;
      content: '';
      width: 80%;
      height: calc(100% / 3);
      opacity: .3;
      filter: blur(15px);
    }

    .Header-background::before {
      background: var(--color-1);
      right: 0;
    }

    .Header-background::after {
      background: var(--color-2);
      bottom: 0;
    }

    .Header-content {
      text-align: center;
      margin: 0 auto;
      
    }

    .Header-hero a {
      text-decoration: none;
    }
    
    .phone-foot a {
      color: white;
      text-shadow: 0 .5rem 1rem rgba(50, 0, 100, .1);
      text-decoration: none;
    }

    .Header-visuals .phone-foot {
      text-align: center;
    }

    @media (min-width: 58rem) {
      .Header-content {
        text-align: left;
        padding: 5rem 2rem;
        max-width: 54rem;
        display: flex;
        justify-content: space-between;
      }
    }

    .Header-hero h1,
    .Header-hero p {
      color: white;
      text-shadow: 0 .5rem 1rem rgba(50, 0, 100, .1);
    }


    .Header-hero h1 {
      margin: 0;
      font-size: 3rem;
    }

    .Header-hero p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .Header-visuals {
      position: relative;
      margin-top: 5rem;
      transform: rotate(-10deg);
    }

    @media (min-width: 58rem) {
      .Header-visuals {
        margin: 0;
        transform: translateY(-5rem) rotate(-10deg);
      }
    }

    .Button {
      padding: 1.5rem 2rem;
      border: 0;
      color: var(--color-3);
      font-size: 1.2rem;
      font-weight: bold;
      background: white;
      border-radius: 3px;
      transition: all .2s;
      cursor: pointer;
      box-shadow: 0 1.75rem 2rem -.4rem rgba(50, 0, 100, .15);
    }

    .Button:hover {
      color: var(--color-4);
      box-shadow: 0 1.75rem 3rem 0rem rgba(50, 0, 100, .1);
      transform: scale(1.05);
    }

    .Button:active {
      box-shadow: 0 1.75rem 2.5rem -.2rem rgba(50, 0, 100, .125);
      transform: scale(1.025);
    }

    .Iphone {
      display: inline-block;
      background: white;
      padding: 4rem .6rem 0;
      border-radius: 2rem;
      box-shadow: -1rem 1.75rem 2rem -.4rem rgba(50, 0, 100, .1), -.2rem .2rem .5rem rgba(50, 0, 100, .05), inset .5rem -.5rem .5rem -.4rem rgba(50, 0, 100, .1);
      text-align: center;
    }

    .Iphone::before,
    .Iphone::after {
      content: '';
      display: block;
    }

    .Iphone::before {
      background-color: var(--color-3);
      background-image: linear-gradient(0deg, var(--color-3) 0%, var(--color-4) 100%);
      width: 12rem;
      padding-top: 150%;
    }

    .Iphone::after {
      display: inline-block;
      margin: .6rem;
      padding: 1.4rem;
      border: 1px solid #f1f1f1;
      border-radius: 2rem;
      box-shadow: inset -.05rem .05rem .5rem 0rem rgba(50, 0, 100, .05);
    }
     </style>`;
};
