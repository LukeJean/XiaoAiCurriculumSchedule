function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  const ifrs = dom.getElementsByTagName("iframe")
  if (ifrs.length) {
    for (let i = 1; i < ifrs.length; i++) {
      iframeContent = ifrs[i].contentDocument.getElementById('Form1').innerHTML;
    }
  }
  return iframeContent;
}