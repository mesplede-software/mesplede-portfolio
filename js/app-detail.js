const params=new URLSearchParams(location.search);
const id=params.get("id");
const app=(window.MESPLEDE_APPS||[]).find(item=>item.id===id);
const host=document.getElementById("detail");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
if(!app){
  host.innerHTML='<a class="back-link" href="index.html#aplicaciones">← VOLVER A APLICACIONES</a><div class="empty-state">No encontramos esa aplicación. Vuelve al catálogo para elegir otra.</div>';
}else{
  const shots=(app.screenshots||[]).length
    ? app.screenshots.map((src,index)=>`<figure class="shot-figure"><img src="${esc(src)}" alt="${esc(app.screenshotLabels?.[index]||("Captura de "+app.name))}" style="width:100%;border:1px solid var(--line)">${app.screenshotLabels?.[index]?`<figcaption>${esc(app.screenshotLabels[index])}</figcaption>`:""}</figure>`).join("")
    : '<div class="shot-placeholder">CAPTURAS DE PANTALLA<br><br>Próximamente añadiremos imágenes reales de esta aplicación.</div>';
  host.innerHTML=`
    <a class="back-link" href="index.html#aplicaciones">← VOLVER A APLICACIONES</a>
    <section class="detail-hero">
      <div><div class="eyebrow">${esc(app.category)} / MESPLEDE SOFTWARE STUDIO</div><h1>${esc(app.name)}</h1><p><strong>${esc(app.tagline||"")}</strong></p>
      <div class="detail-meta"><span>${esc(app.statusLabel)}</span><span>${esc(app.platform||"Plataforma por confirmar")}</span><span>${esc(app.version||"Versión por confirmar")}</span>${app.price?`<span class="detail-price">Precio informativo: ${esc(app.price)}</span>`:""}</div></div>
      <div class="detail-art">${app.image?`<img src="${esc(app.image)}" alt="Imagen de ${esc(app.name)}">`:`<div class="detail-code">${esc(app.code)}</div>`}</div>
    </section>
    <section class="detail-section"><div class="eyebrow">DESCRIPCIÓN</div><h2>Acerca de ${esc(app.name)}</h2><div class="description-content"><p>${esc(app.description||"Descripción próximamente.")}</p></div></section>
    ${app.distribution?.length?`<section class="detail-section"><div class="eyebrow">COMPATIBILIDAD Y DISTRIBUCIÓN</div><h2>Preparado para Windows</h2><div class="feature-grid">${app.distribution.map(item=>`<div class="feature-item">${esc(item)}</div>`).join("")}</div><p class="detail-note">Compatibilidad indicada: ${esc(app.platform)}. Versión: ${esc(app.version)}.</p></section>`:""}
    <section class="detail-section"><div class="eyebrow">VISTA DEL PRODUCTO</div><h2>Capturas de pantalla</h2><div class="shot-grid">${shots}</div><p class="detail-note">Estas capturas corresponden a pantallas reales del juego. La compatibilidad y el enlace de descarga se confirmarán después de realizar las pruebas.</p></section>
    <section class="detail-section"><div class="eyebrow">¿NECESITAS INFORMACIÓN?</div><h2>Hablemos de esta aplicación.</h2><a class="contact-link" href="mailto:mesplede.software@gmail.com?subject=${encodeURIComponent("Consulta sobre "+app.name)}">mesplede.software@gmail.com ↗</a></section>`;
}