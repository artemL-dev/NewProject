import type { Page } from '@/types/page'
import type { Block } from '@/types/blocks'

export function generatePageHTML(page: Page): string {
  const { blocks, settings, metadata } = page

  return `<!DOCTYPE html>
<html lang="${metadata.language || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metadata.title)}</title>
  <meta name="description" content="${escapeHtml(metadata.description || '')}">
  ${metadata.ogImage ? `<meta property="og:image" content="${escapeHtml(metadata.ogImage)}">` : ''}
  ${settings.faviconUrl ? `<link rel="icon" href="${escapeHtml(settings.faviconUrl)}">` : ''}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${settings.fontFamily};
      font-size: ${settings.baseFontSize}px;
      color: ${settings.textColor};
      background: ${settings.backgroundColor};
      line-height: 1.5;
    }
    .page-container {
      max-width: ${settings.maxWidth}px;
      margin: 0 auto;
      padding: ${settings.padding}px;
    }
    img { max-width: 100%; height: auto; }
    a { color: inherit; }
    .cta-btn {
      display: inline-block;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .cta-btn:hover { opacity: 0.9; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
    .animate-pulse { animation: pulse 2s infinite; }
  </style>
  ${settings.customCss ? `<style>${settings.customCss}</style>` : ''}
</head>
<body>
  <div class="page-container">
    ${blocks.map(renderBlockHTML).join('\n')}
  </div>
  ${settings.customJs ? `<script>${settings.customJs}</script>` : ''}
  ${settings.customScripts || ''}
</body>
</html>`
}

export function generatePagePHP(page: Page): string {
  const html = generatePageHTML(page)
  return `<?php header('Content-Type: text/html; charset=UTF-8'); ?>\n${html}`
}

function renderBlockHTML(block: Block): string {
  const props = (block as any).props

  switch (block.type) {
    case 'slot-machine':
      return renderSlotMachineHTML(props)
    case 'news-article':
      return renderNewsArticleHTML(props)
    case 'countdown-bonus':
      return renderCountdownBonusHTML(props)
    case 'modal-popup':
      return renderModalPopupHTML(props)
    case 'quiz-survey':
      return renderQuizSurveyHTML(props)
    case 'wheel-of-fortune':
      return renderWheelOfFortuneHTML(props)
    case 'article-header':
      return renderArticleHeaderHTML(props)
    case 'article-content':
      return renderArticleContentHTML(props)
    case 'article-sidebar':
      return renderArticleSidebarHTML(props)
    default:
      return `<!-- Block: ${(block as any).type} -->`
  }
}

function renderSlotMachineHTML(props: any): string {
  return `<div class="slot-machine" style="background:${props.backgroundColor};color:${props.textColor};padding:20px;border-radius:12px;">
    <h2 style="text-align:center;color:${props.accentColor};font-size:24px;font-weight:bold;margin-bottom:16px;">${escapeHtml(props.title)}</h2>
    <div style="text-align:center;padding:20px;">
      <p style="font-size:14px;opacity:0.7;">Interactive Slot Machine</p>
      <p style="font-size:18px;font-weight:bold;">Initial Balance: $${props.initialBalance}</p>
    </div>
    <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="display:block;background:${props.ctaColor};color:white;font-size:18px;border-radius:9999px;">
      ${escapeHtml(props.ctaText)}
    </a>
  </div>`
}

function renderNewsArticleHTML(props: any): string {
  const authorHtml = props.showAuthor ? `
    <div style="display:flex;align-items:center;gap:10px;margin:16px 0;padding:12px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">
      <div style="width:36px;height:36px;background:${props.accentColor};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;">${escapeHtml(props.authorName.charAt(0))}</div>
      <div>
        <div style="font-weight:600;font-size:14px;">${escapeHtml(props.authorName)}</div>
        ${props.showDate ? `<div style="font-size:12px;opacity:0.6;">${escapeHtml(props.publishDate)} · ${escapeHtml(props.sourceName)}</div>` : ''}
      </div>
    </div>` : ''

  const ctaHtml = `<div style="text-align:center;margin:24px 0;">
    <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="background:${props.ctaColor};color:white;font-size:16px;">${escapeHtml(props.ctaText)}</a>
  </div>`

  return `<div style="background:${props.backgroundColor};color:${props.textColor};padding:24px;border-radius:12px;">
    ${props.featuredImageUrl ? `<img src="${escapeHtml(props.featuredImageUrl)}" alt="" style="width:100%;border-radius:8px;margin-bottom:16px;" />` : ''}
    <h1 style="font-size:24px;font-weight:bold;line-height:1.3;margin-bottom:8px;">${escapeHtml(props.headline)}</h1>
    ${props.subheadline ? `<p style="font-size:16px;opacity:0.7;margin-bottom:8px;">${escapeHtml(props.subheadline)}</p>` : ''}
    ${authorHtml}
    <div style="font-size:15px;line-height:1.8;">${props.bodyHtml}</div>
    ${props.ctaPosition === 'inline' || props.ctaPosition === 'both' ? ctaHtml : ''}
    ${props.ctaPosition === 'bottom' || props.ctaPosition === 'both' ? ctaHtml : ''}
    ${props.showShareButtons ? `<div style="display:flex;gap:8px;margin-top:16px;justify-content:center;">
      <a href="#" style="padding:8px 16px;background:#1877f2;color:white;border-radius:6px;text-decoration:none;font-size:13px;">Facebook</a>
      <a href="#" style="padding:8px 16px;background:#1da1f2;color:white;border-radius:6px;text-decoration:none;font-size:13px;">Twitter</a>
      <a href="#" style="padding:8px 16px;background:#0088cc;color:white;border-radius:6px;text-decoration:none;font-size:13px;">Telegram</a>
    </div>` : ''}
  </div>`
}

function renderCountdownBonusHTML(props: any): string {
  const timerId = 'timer_' + Math.random().toString(36).substr(2, 9)
  return `<div style="background:${props.backgroundColor};color:${props.textColor};padding:32px 24px;text-align:center;border-radius:12px;">
    ${props.urgencyText ? `<div style="font-size:14px;font-weight:600;margin-bottom:16px;${props.showUrgencyPulse ? 'animation:pulse 2s infinite;' : ''}">${escapeHtml(props.urgencyText)}</div>` : ''}
    <h2 style="font-size:22px;font-weight:bold;color:${props.accentColor};margin-bottom:8px;">${escapeHtml(props.bonusTitle)}</h2>
    <div style="font-size:48px;font-weight:900;color:${props.accentColor};margin:16px 0;">${escapeHtml(props.bonusAmount)}</div>
    ${props.bonusSubtitle ? `<p style="font-size:14px;opacity:0.8;margin-bottom:24px;">${escapeHtml(props.bonusSubtitle)}</p>` : ''}
    <div id="${timerId}" style="font-size:36px;font-weight:bold;font-variant-numeric:tabular-nums;margin:20px 0;">${String(props.countdownMinutes).padStart(2, '0')}:00</div>
    <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="background:${props.ctaColor};color:white;font-size:18px;width:100%;display:block;">${escapeHtml(props.ctaText)}</a>
  </div>
  <script>
  (function(){
    var el=document.getElementById('${timerId}');
    var total=${props.countdownMinutes * 60};
    var action='${props.countdownEndAction}';
    var iv=setInterval(function(){
      total--;
      if(total<=0){
        if(action==='reset') total=${props.countdownMinutes * 60};
        else if(action==='hide') { el.style.display='none'; clearInterval(iv); return; }
        else { el.textContent='EXPIRED'; clearInterval(iv); return; }
      }
      var m=Math.floor(total/60), s=total%60;
      el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    },1000);
  })();
  </script>`
}

function renderModalPopupHTML(props: any): string {
  const modalId = 'modal_' + Math.random().toString(36).substr(2, 9)
  const animStyle = props.animationType === 'slide-up' ? 'transform:translateY(100%);'
    : props.animationType === 'scale' ? 'transform:scale(0.8);'
    : 'opacity:0;'
  const animActiveStyle = props.animationType === 'slide-up' ? 'transform:translateY(0);'
    : props.animationType === 'scale' ? 'transform:scale(1);'
    : 'opacity:1;'

  return `<div id="${modalId}_trigger" style="background:${props.backgroundColor};color:${props.textColor};padding:24px;border-radius:12px;text-align:center;">
    <p style="font-size:14px;opacity:0.6;margin-bottom:8px;">Modal Popup Block</p>
    <p style="font-size:12px;opacity:0.4;">Trigger: ${props.triggerType}${props.triggerType === 'timer' ? ` (${props.triggerDelay}s)` : props.triggerType === 'scroll' ? ` (${props.triggerScrollPercent}%)` : ''}</p>
    ${props.triggerType === 'click' ? `<button onclick="document.getElementById('${modalId}').style.display='flex'" style="margin-top:12px;padding:10px 24px;background:${props.ctaColor};color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Open Popup</button>` : ''}
  </div>
  <div id="${modalId}" style="display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;background:${props.overlayColor}${Math.round(props.overlayOpacity * 2.55).toString(16).padStart(2, '0')};">
    <div style="background:${props.modalBackgroundColor};color:${props.textColor};padding:32px;border-radius:16px;max-width:400px;width:90%;text-align:center;position:relative;${animActiveStyle}transition:all 0.3s;">
      ${props.showCloseButton ? `<button onclick="document.getElementById('${modalId}').style.display='none'" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:20px;cursor:pointer;color:${props.textColor};opacity:0.5;">✕</button>` : ''}
      ${props.imageUrl ? `<img src="${escapeHtml(props.imageUrl)}" alt="" style="width:100%;border-radius:8px;margin-bottom:16px;" />` : ''}
      <h3 style="font-size:22px;font-weight:bold;margin-bottom:8px;">${escapeHtml(props.title)}</h3>
      <p style="font-size:14px;opacity:0.8;margin-bottom:20px;">${escapeHtml(props.message)}</p>
      <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="background:${props.ctaColor};color:white;width:100%;display:block;">${escapeHtml(props.ctaText)}</a>
    </div>
  </div>
  <script>
  (function(){
    var modal=document.getElementById('${modalId}');
    var trigger='${props.triggerType}';
    if(trigger==='timer'){
      setTimeout(function(){ modal.style.display='flex'; }, ${props.triggerDelay * 1000});
    } else if(trigger==='scroll'){
      window.addEventListener('scroll',function f(){
        var pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
        if(pct>=${props.triggerScrollPercent}){ modal.style.display='flex'; window.removeEventListener('scroll',f); }
      });
    } else if(trigger==='exit-intent'){
      document.addEventListener('mouseleave',function f(e){
        if(e.clientY<0){ modal.style.display='flex'; document.removeEventListener('mouseleave',f); }
      });
    }
  })();
  </script>`
}

function renderQuizSurveyHTML(props: any): string {
  const quizId = 'quiz_' + Math.random().toString(36).substr(2, 9)
  const questions = props.questions || []

  const questionsJson = JSON.stringify(questions.map((q: any) => ({
    question: q.question,
    answers: q.answers,
    imageUrl: q.imageUrl,
  })))

  return `<div id="${quizId}" style="background:${props.backgroundColor};color:${props.textColor};padding:24px;border-radius:12px;">
    <div id="${quizId}_quiz">
      <h2 style="font-size:22px;font-weight:bold;text-align:center;margin-bottom:4px;">${escapeHtml(props.title)}</h2>
      ${props.subtitle ? `<p style="text-align:center;font-size:14px;opacity:0.7;margin-bottom:20px;">${escapeHtml(props.subtitle)}</p>` : ''}
      ${props.showProgressBar ? `<div style="background:#e5e7eb;border-radius:9999px;height:6px;margin-bottom:16px;"><div id="${quizId}_progress" style="background:${props.accentColor};height:100%;border-radius:9999px;width:0%;transition:width 0.3s;"></div></div>` : ''}
      ${props.showQuestionNumber ? `<div id="${quizId}_num" style="font-size:13px;opacity:0.6;margin-bottom:8px;text-align:center;"></div>` : ''}
      <div id="${quizId}_question" style="font-size:18px;font-weight:600;text-align:center;margin-bottom:16px;"></div>
      <div id="${quizId}_image" style="text-align:center;margin-bottom:16px;"></div>
      <div id="${quizId}_answers" style="display:flex;flex-direction:column;gap:8px;"></div>
    </div>
    <div id="${quizId}_result" style="display:none;text-align:center;">
      ${props.resultImageUrl ? `<img src="${escapeHtml(props.resultImageUrl)}" alt="" style="width:100%;border-radius:8px;margin-bottom:16px;" />` : ''}
      <h3 style="font-size:24px;font-weight:bold;margin-bottom:8px;color:${props.accentColor};">${escapeHtml(props.resultTitle)}</h3>
      <p style="font-size:14px;opacity:0.8;margin-bottom:20px;">${escapeHtml(props.resultMessage)}</p>
      <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="background:${props.ctaColor};color:white;width:100%;display:block;">${escapeHtml(props.ctaText)}</a>
    </div>
  </div>
  <script>
  (function(){
    var questions=${questionsJson};
    var current=0;
    var total=questions.length;
    function render(){
      if(current>=total){ document.getElementById('${quizId}_quiz').style.display='none'; document.getElementById('${quizId}_result').style.display='block'; return; }
      var q=questions[current];
      ${props.showProgressBar ? `document.getElementById('${quizId}_progress').style.width=((current/total)*100)+'%';` : ''}
      ${props.showQuestionNumber ? `document.getElementById('${quizId}_num').textContent='Question '+(current+1)+' of '+total;` : ''}
      document.getElementById('${quizId}_question').textContent=q.question;
      document.getElementById('${quizId}_image').innerHTML=q.imageUrl?'<img src="'+q.imageUrl+'" style="max-width:200px;border-radius:8px;" />':'';
      var ac=document.getElementById('${quizId}_answers');
      ac.innerHTML='';
      q.answers.forEach(function(a){
        var btn=document.createElement('button');
        btn.textContent=a;
        btn.style.cssText='padding:12px 16px;border:2px solid #e5e7eb;border-radius:8px;background:white;cursor:pointer;font-size:14px;text-align:left;transition:all 0.2s;';
        btn.onmouseover=function(){this.style.borderColor='${props.accentColor}';};
        btn.onmouseout=function(){this.style.borderColor='#e5e7eb';};
        btn.onclick=function(){ current++; render(); };
        ac.appendChild(btn);
      });
    }
    render();
  })();
  </script>`
}

function renderWheelOfFortuneHTML(props: any): string {
  const wheelId = 'wheel_' + Math.random().toString(36).substr(2, 9)
  const segments = props.segments || []
  const segCount = segments.length
  const segAngle = 360 / segCount

  // Build conic gradient
  const gradientParts = segments.map((seg: any, i: number) => {
    const start = (i * segAngle).toFixed(1)
    const end = ((i + 1) * segAngle).toFixed(1)
    return `${seg.color} ${start}deg ${end}deg`
  }).join(', ')

  const segmentsJson = JSON.stringify(segments.map((s: any) => ({ text: s.text, prize: s.prize })))

  return `<div style="background:${props.backgroundColor};color:${props.textColor};padding:32px 24px;text-align:center;border-radius:12px;">
    <h2 style="font-size:24px;font-weight:bold;margin-bottom:4px;">${escapeHtml(props.title)}</h2>
    ${props.subtitle ? `<p style="font-size:14px;opacity:0.7;margin-bottom:24px;">${escapeHtml(props.subtitle)}</p>` : ''}
    <div style="position:relative;width:280px;height:280px;margin:0 auto 24px;">
      <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);z-index:10;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-top:20px solid ${props.accentColor};"></div>
      <div id="${wheelId}" style="width:280px;height:280px;border-radius:50%;background:conic-gradient(${gradientParts});transition:transform ${props.spinDuration / 1000}s cubic-bezier(0.17,0.67,0.12,0.99);border:4px solid ${props.accentColor};position:relative;overflow:hidden;">
        ${segments.map((seg: any, i: number) => {
          const rotation = i * segAngle + segAngle / 2
          return `<div style="position:absolute;top:50%;left:50%;transform:rotate(${rotation}deg) translateY(-50%);transform-origin:0 0;width:130px;text-align:right;padding-right:8px;font-size:11px;font-weight:700;color:white;text-shadow:0 1px 2px rgba(0,0,0,0.5);">${escapeHtml(seg.text)}</div>`
        }).join('')}
      </div>
    </div>
    <button id="${wheelId}_btn" onclick="${wheelId}_spin()" style="padding:14px 48px;background:${props.spinButtonColor};color:white;border:none;border-radius:9999px;font-size:18px;font-weight:bold;cursor:pointer;">${escapeHtml(props.spinButtonText)}</button>
    <div id="${wheelId}_win" style="display:none;margin-top:24px;">
      <h3 style="font-size:28px;font-weight:bold;color:${props.accentColor};margin-bottom:8px;">${escapeHtml(props.winTitle)}</h3>
      <p id="${wheelId}_prize" style="font-size:18px;margin-bottom:4px;"></p>
      <p style="font-size:14px;opacity:0.8;margin-bottom:16px;">${escapeHtml(props.winMessage)}</p>
      <a href="${escapeHtml(props.ctaUrl)}" class="cta-btn" style="background:${props.ctaColor};color:white;font-size:16px;">${escapeHtml(props.ctaText)}</a>
    </div>
  </div>
  <script>
  var ${wheelId}_spun=false;
  function ${wheelId}_spin(){
    if(${wheelId}_spun)return;
    ${wheelId}_spun=true;
    var segments=${segmentsJson};
    var winIdx=${props.winSegmentIndex};
    var segAngle=${segAngle};
    var spins=${props.numberOfSpins};
    var targetAngle=360*spins+(360-winIdx*segAngle-segAngle/2);
    document.getElementById('${wheelId}').style.transform='rotate('+targetAngle+'deg)';
    document.getElementById('${wheelId}_btn').disabled=true;
    document.getElementById('${wheelId}_btn').style.opacity='0.5';
    setTimeout(function(){
      document.getElementById('${wheelId}_btn').style.display='none';
      document.getElementById('${wheelId}_win').style.display='block';
      document.getElementById('${wheelId}_prize').textContent=segments[winIdx].prize;
    }, ${props.spinDuration}+200);
  }
  </script>`
}

function renderArticleHeaderHTML(props: any): string {
  return `<div style="background:${props.backgroundColor};color:${props.textColor};padding:24px 0;">
    ${props.featuredImageUrl ? `<img src="${escapeHtml(props.featuredImageUrl)}" alt="" style="width:100%;border-radius:8px;margin-bottom:20px;" />` : ''}
    ${props.category ? `<span style="display:inline-block;padding:4px 12px;background:${props.accentColor};color:white;border-radius:9999px;font-size:12px;font-weight:600;margin-bottom:12px;">${escapeHtml(props.category)}</span>` : ''}
    <h1 style="font-size:28px;font-weight:bold;line-height:1.3;margin-bottom:8px;">${escapeHtml(props.title)}</h1>
    ${props.subtitle ? `<p style="font-size:16px;opacity:0.7;margin-bottom:16px;">${escapeHtml(props.subtitle)}</p>` : ''}
    <div style="display:flex;align-items:center;gap:10px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.1);">
      <div style="width:36px;height:36px;background:${props.accentColor};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;">${escapeHtml(props.authorName.charAt(0))}</div>
      <div>
        <div style="font-weight:600;font-size:14px;">${escapeHtml(props.authorName)}</div>
        <div style="font-size:12px;opacity:0.6;">${escapeHtml(props.publishDate)}</div>
      </div>
    </div>
  </div>`
}

function renderArticleContentHTML(props: any): string {
  return `<div style="background:${props.backgroundColor};color:${props.textColor};font-size:${props.fontSize}px;line-height:${props.lineHeight};padding:16px 0;">
    <div style="max-width:100%;">${props.bodyHtml}</div>
  </div>
  <style>
    .page-container h2 { font-size: 1.4em; font-weight: bold; margin: 1.2em 0 0.6em; }
    .page-container p { margin-bottom: 1em; }
    .page-container ul, .page-container ol { margin: 0.8em 0; padding-left: 1.5em; }
    .page-container li { margin-bottom: 0.4em; }
    .page-container blockquote { border-left: 3px solid ${props.accentColor}; padding: 12px 16px; margin: 1em 0; font-style: italic; opacity: 0.9; }
    .page-container strong { font-weight: 600; }
  </style>`
}

function renderArticleSidebarHTML(props: any): string {
  const related = props.relatedArticles || []
  const categories = props.categories || []

  return `<div style="background:${props.backgroundColor};color:${props.textColor};padding:20px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);">
    ${props.showSearch ? `<div style="margin-bottom:20px;"><input type="text" placeholder="Search..." style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;" /></div>` : ''}
    ${related.length > 0 ? `
    <div style="margin-bottom:20px;">
      <h4 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;color:${props.accentColor};">Related Articles</h4>
      ${related.map((a: any) => `
        <a href="${escapeHtml(a.url)}" style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.05);text-decoration:none;color:inherit;">
          ${a.imageUrl ? `<img src="${escapeHtml(a.imageUrl)}" style="width:48px;height:48px;border-radius:4px;object-fit:cover;" />` : ''}
          <span style="font-size:13px;font-weight:500;">${escapeHtml(a.title)}</span>
        </a>`).join('')}
    </div>` : ''}
    ${categories.length > 0 ? `
    <div>
      <h4 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;color:${props.accentColor};">Categories</h4>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${categories.map((c: any) => `<a href="${escapeHtml(c.url)}" style="padding:4px 10px;background:rgba(0,0,0,0.05);border-radius:9999px;font-size:12px;text-decoration:none;color:inherit;">${escapeHtml(c.name)}</a>`).join('')}
      </div>
    </div>` : ''}
  </div>`
}

export function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function downloadFile(filename: string, content: string, mimeType: string): void {
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

export function downloadHTML(page: Page): void {
  const html = generatePageHTML(page)
  downloadFile(`${page.slug}.html`, html, 'text/html')
}

export function downloadPHP(page: Page): void {
  const php = generatePagePHP(page)
  downloadFile(`${page.slug}.php`, php, 'application/x-php')
}

export function downloadJSON(page: Page): void {
  const json = JSON.stringify(
    {
      name: page.name,
      type: page.type,
      blocks: page.blocks,
      settings: page.settings,
      metadata: page.metadata,
    },
    null,
    2
  )
  downloadFile(`${page.slug}.json`, json, 'application/json')
}
