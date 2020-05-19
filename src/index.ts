const template = `
  <style id="titan_embeds_style">
    .titan_embeds_iframe_holder {
      display: none;
      position: fixed;
      z-index: 1;
      bottom: 10px;
      right: 10px;
      height: 700px;
      width: 500px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 12px 20px 0 rgba(0, 0, 0, .15);
    }

    .titan_embeds_iframe_holder .titan_embeds_iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .titan_embeds_button_holder {
      position: fixed;
      z-index: 2;
      bottom: 50px;
      right: 10px;
      height: 50px;
      width: 50px;
    }

    .titan_embeds_button_holder .titan_embeds_button {
      height: 100%;
      width: 100%;
      border-radius: 100px;
      overflow: hidden;
      cursor: pointer;
      background-size: 60%;
      background: #1972F5 url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzNSAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggZD0iTTE0LjIyNiAyMC40NmwtOS42NDIgMS4xMDZMMyA1LjEwNiAzMC4wNjYgMmwxLjU4NCAxNi40Ni05LjM2NyAxLjA3NC0zLjUwNiA1LjcxNS00LjU1MS00Ljc5eiIgaWQ9ImIiLz48ZmlsdGVyIHg9Ii0xNS43JSIgeT0iLTE1LjElIiB3aWR0aD0iMTMxLjQlIiBoZWlnaHQ9IjEzOC43JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlTW9ycGhvbG9neSByYWRpdXM9IjEiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz48ZmVPZmZzZXQgZHk9IjEiIGluPSJzaGFkb3dTcHJlYWRPdXRlcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDcgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjwvZz48L3N2Zz4=) no-repeat center;
    }

    .titan_embeds_button_holder .titan_embeds_button_tip {
      display: none;
      position: absolute;
      top: 6px;
      right: 55px;
      white-space: nowrap;
      background-color: rgba(0,0,0,0.8);
      padding: 5px 10px;
      border-radius: 4px;
      font-family: monospace;
      color: #fff;
      font-size: 12px;
    }

    .titan_embeds_button_holder._need_help:hover .titan_embeds_button_tip {
      display: block;
    }

    @media all and (max-width: 420px) {
      .titan_embeds_iframe_holder {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }
  </style>

  <div id="titan_embeds_iframe_holder" class="titan_embeds_iframe_holder">
    <iframe id="titan_embeds_iframe" class="titan_embeds_iframe" frameborder="0"></iframe>
  </div>

  <div id="titan_embeds_button_holder" class="titan_embeds_button_holder _need_help">
    <div class="titan_embeds_button"></div>
    <div class="titan_embeds_button_tip">
      <div>Got a problem?</div>
      <div>Click to get help from our Discord.</div>
    </div>
  </div>
`

const $document = document.createDocumentFragment()
const $template = document.createElement('div')

$template.innerHTML = template
$document.appendChild($template)

const $iframeHolder = $document.getElementById('titan_embeds_iframe_holder') as HTMLElement
const $iframe = $document.getElementById('titan_embeds_iframe') as HTMLIFrameElement
const $buttonHolder = $document.getElementById('titan_embeds_button_holder')
const $style = $document.getElementById('titan_embeds_style')

let loaded = false

export function loadTitanEmbeds (titanUrl = window.TITAN_EMBED_FAB_URL) {
  if (!titanUrl) {
    const $script = document.querySelector('[data-titan-url]')
    if ($script) {
      titanUrl = $script.getAttribute('data-titan-url') || ''
    }
  }

  if (!(titanUrl && $iframeHolder && $buttonHolder && $style && $iframe)) return

  function appendIframe (): void {
    if (!loaded) {
      loaded = true
      $iframe.src = titanUrl
      document.body.appendChild($iframeHolder)
    }
  }

  $buttonHolder.addEventListener('click', function () {
    appendIframe()

    const isHidden = getComputedStyle($iframeHolder).display === 'none'
    if (isHidden) {
      $iframeHolder.style.display = 'block'
      $buttonHolder.classList.remove('_need_help')
    }
    else {
      $iframeHolder.style.display = 'none'
      $buttonHolder.classList.add('_need_help')
    }
  })

  document.body.appendChild($buttonHolder)
  document.head.appendChild($style)
}
