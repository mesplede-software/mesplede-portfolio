const grid=document.getElementById("appGrid");
const filters=document.getElementById("filters");
const apps=window.MESPLEDE_APPS||[];
document.getElementById("totalCount").textContent=apps.length;
function render(filter="all"){
  const shown=apps.filter(app=>filter==="all"||app.status===filter);
  grid.innerHTML=shown.length?shown.map(app=>`
    <article class="app-card">
      <div class="app-top"><div class="app-icon">${escapeHTML(app.code)}</div><span class="status ${app.status==="available"?"available":""}">${escapeHTML(app.statusLabel)}</span></div>
      <div class="app-category">${escapeHTML(app.category)}</div>
      <h3>${escapeHTML(app.name)}</h3><p>${escapeHTML(app.description)}</p>
      <div class="app-bottom"><span>${escapeHTML(app.platform||"SOFTWARE")}</span><a href="app.html?id=${encodeURIComponent(app.id)}" aria-label="Ver ${escapeHTML(app.name)}">Ver aplicación ↗</a></div>
    </article>`).join(""):`<div class="empty-state">No hay aplicaciones en esta categoría todavía.</div>`;
}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
filters.addEventListener("click",e=>{const btn=e.target.closest("button[data-filter]");if(!btn)return;filters.querySelectorAll("button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");render(btn.dataset.filter);});
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
render();