import type { Page } from '@/types/page'
import type { Block } from '@/types/blocks'
import { generatePageHTML, generatePagePHP } from '@/lib/utils/exportUtils'

export interface ExportOptions {
  format: 'json' | 'html' | 'php'
  includeStyles?: boolean
  minify?: boolean
}

export const exportService = {
  exportToJSON(page: Page): string {
    const exportData = {
      name: page.name,
      type: page.type,
      blocks: page.blocks,
      settings: page.settings,
      metadata: page.metadata,
      exportedAt: new Date().toISOString(),
    }

    return JSON.stringify(exportData, null, 2)
  },

  exportToHTML(page: Page, options: Partial<ExportOptions> = {}): string {
    const { includeStyles = true, minify = false } = options

    const html = generatePageHTML(page)
    return minify ? minifyHTML(html) : html
  },

  exportToPHP(page: Page): string {
    return generatePagePHP(page)
  },

  downloadJSON(page: Page) {
    const content = this.exportToJSON(page)
    downloadFile(`${page.slug}.json`, content, 'application/json')
  },

  downloadHTML(page: Page, options?: Partial<ExportOptions>) {
    const content = this.exportToHTML(page, options)
    downloadFile(`${page.slug}.html`, content, 'text/html')
  },

  downloadPHP(page: Page) {
    const content = this.exportToPHP(page)
    downloadFile(`${page.slug}.php`, content, 'application/x-php')
  },
}

function generateGAScript(id: string): string {
  return `
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>
`.trim()
}

function generateFBPixel(id: string): string {
  return `
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${id}');
  fbq('track', 'PageView');
</script>
`.trim()
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function minifyHTML(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
