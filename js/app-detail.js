const params=new URLSearchParams(location.search);
const id=params.get("id");
const app=(window.MESPLEDE_APPS||[]).find(item=>item.id===id);
const host=document.getElementById("detail");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
if(!app){
  host.innerHTML='<a class="back-link" href="index.html#aplicaciones">← VOLVER A APLICACIONES</a><div class="empty-state">No encontramos esa aplicación. Vuelve al catálogo para elegir otra.</div>';
}else{
  const shots=(app.screenshots||[]).length
    ? app.screenshots.map(src=>`<img src="${esc(src)}" alt="Captura de ${esc(app.name)}" style="width:100%;border:1px solid var(--line)">`).join("")
    : '<div class="shot-placeholder">CAPTURAS DE PANTALLA<br><br>Próximamente añadiremos imágenes reales de esta aplicación.</div>';
  host.innerHTML=`
    <a class="back-link" href="index.html#aplicaciones">← VOLVER A APLICACIONES</a>
    <section class="detail-hero">
      <div><div class="eyebrow">${esc(app.category)} / MESPLEDE SOFTWARE STUDIO</div><h1>${esc(app.name)}</h1><p><strong>${esc(app.tagline||"")}</strong><br>${esc(app.description)}</p>
      <div class="detail-meta"><span>${esc(app.statusLabel)}</span><span>${esc(app.platform||"Plataforma por confirmar")}</span><span>${esc(app.version||"Versión por confirmar")}</span></div></div>
      <div class="detail-code">${esc(app.code)}</div>
    </section>
    <section class="detail-section"><div class="eyebrow">CARACTERÍSTICAS</div><h2>Qué ofrece</h2><div class="feature-grid">${(app.features||[]).map(f=>`<div class="feature-item">${esc(f)}</div>`).join("")}</div></section>
    <section class="detail-section"><div class="eyebrow">VISTA DEL PRODUCTO</div><h2>Capturas de pantalla</h2><div class="shot-grid">${shots}</div><p class="detail-note">Las imágenes y enlaces de descarga se incorporarán cuando estén disponibles y verificados. No publicamos descargas ficticias.</p></section>
    <section class="detail-section"><div class="eyebrow">¿NECESITAS INFORMACIÓN?</div><h2>Hablemos de esta aplicación.</h2><a class="contact-link" href="mailto:mesplede.software@gmail.com?subject=${encodeURIComponent("Consulta sobre "+app.name)}">mesplede.software@gmail.com ↗</a></section>`;
}