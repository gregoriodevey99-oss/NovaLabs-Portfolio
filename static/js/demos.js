"use strict";
(() => {
  const root = document.querySelector('[data-demo]');
  if (!root) return;
  const status = document.querySelector('#demo-status');
  function announce(message) { status.hidden = false; status.textContent = message; }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function action(text, label, callback, className = 'quantity-button') {
    const node = element('button', text, className);
    node.type = 'button'; node.setAttribute('aria-label', label);
    node.addEventListener('click', callback);
    return node;
  }
  const storage = {
    read(key, fallback) {
      try { const raw = localStorage.getItem(key); return raw && raw.length < 50000 ? JSON.parse(raw) : fallback; }
      catch { return fallback; }
    },
    write(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); }
      catch { announce('Podés probar la demo, pero este navegador no permite guardar los cambios al cerrar la página.'); }
    }
  };
  if (root.dataset.demo === 'novashop') {
    const key = 'novalabs.shop.v1';
    const catalog = [
      {id:'remera',name:'Remera esencial',category:'Indumentaria',price:18000,symbol:'R',tone:'purple'},
      {id:'mochila',name:'Mochila urbana',category:'Accesorios',price:32000,symbol:'M',tone:'blue'},
      {id:'taza',name:'Taza de diseño',category:'Hogar',price:9500,symbol:'T',tone:'cyan'},
      {id:'cuaderno',name:'Cuaderno creativo',category:'Papelería',price:7500,symbol:'C',tone:'purple'}
    ];
    const saved = storage.read(key, {});
    const cart = {};
    for (const p of catalog) {
      const count = saved && typeof saved === 'object' ? saved[p.id] : 0;
      if (Number.isInteger(count) && count > 0 && count <= 9) cart[p.id] = count;
    }
    const money = value => new Intl.NumberFormat('es-AR', {style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);
    const products = document.querySelector('#shop-products');
    function change(p, delta) {
      const count = (cart[p.id] || 0) + delta;
      if (count > 9) { announce('La demo admite hasta 9 unidades por producto.'); return; }
      if (count <= 0) delete cart[p.id]; else cart[p.id] = count;
      storage.write(key, cart); renderCart();
      announce(`${p.name}: ${cart[p.id] || 0} unidades en el carrito.`);
    }
    function renderProducts() {
      const q = document.querySelector('#shop-search').value.trim().toLocaleLowerCase('es');
      products.replaceChildren();
      for (const p of catalog.filter(p => `${p.name} ${p.category}`.toLocaleLowerCase('es').includes(q))) {
        const card = element('article', undefined, 'shop-item');
        const art = element('div', p.symbol, `sample-product ${p.tone}`); art.setAttribute('aria-hidden','true');
        card.append(art, element('p', p.category, 'eyebrow'), element('h2', p.name), element('p', money(p.price), 'price'), action('Agregar al carrito', `Agregar ${p.name} al carrito`, () => change(p, 1), 'btn-secondary'));
        products.append(card);
      }
      if (!products.children.length) products.append(element('p','No encontramos productos con esa búsqueda.','empty-state'));
    }
    function renderCart() {
      const items = document.querySelector('#cart-items'); items.replaceChildren();
      let units=0, total=0;
      for (const p of catalog) {
        const quantity=cart[p.id] || 0; if (!quantity) continue;
        units += quantity; total += quantity*p.price;
        const line = element('div', undefined, 'cart-line');
        const controls = element('div', undefined, 'quantity-controls');
        controls.append(action('−', `Quitar una unidad de ${p.name}`, () => change(p,-1)), element('span',String(quantity)), action('+',`Agregar una unidad de ${p.name}`,()=>change(p,1)));
        line.append(element('strong', p.name),element('small',money(p.price*quantity)),controls);
        items.append(line);
      }
      if (!units) items.append(element('p','Tu carrito está vacío. Elegí un producto para empezar.','muted'));
      document.querySelector('#cart-count').textContent=String(units);
      document.querySelector('#cart-total').textContent=money(total);
      document.querySelector('#shop-checkout').disabled=!units;
    }
    document.querySelector('#shop-search').addEventListener('input',renderProducts);
    document.querySelector('#shop-reset').addEventListener('click',()=>{
      Object.keys(cart).forEach(k=>delete cart[k]); storage.write(key,cart); renderCart(); announce('Carrito vacío.');
    });
    document.querySelector('#shop-checkout').addEventListener('click',()=>{
      const units=Object.values(cart).reduce((a,b)=>a+b,0);
      const total=catalog.reduce((sum,p)=>sum+(cart[p.id] || 0)*p.price,0);
      if (!units) return;
      announce(`Simulación finalizada: ${units} unidades por ${money(total)}. No se envió ningún pedido ni se realizó ningún cobro.`);
      status.scrollIntoView({block:'center'});
    });
    renderProducts(); renderCart();
  }
  if (root.dataset.demo === 'novacore') {
    const key='novalabs.core.v1';
    const initial=[{id:'ej-1',name:'Remera esencial',stock:15},{id:'ej-2',name:'Mochila urbana',stock:4},{id:'ej-3',name:'Taza de diseño',stock:22}];
    const fresh=()=>initial.map(item=>({...item}));
    const saved=storage.read(key,null);
    let rows=Array.isArray(saved) && saved.length<=50 && saved.every(x=>x && typeof x.id==='string' && x.id.length<=60 && typeof x.name==='string' && x.name.length>=2 && x.name.length<=60 && Number.isInteger(x.stock) && x.stock>=0 && x.stock<=9999) && new Set(saved.map(x=>x.id)).size===saved.length ? saved : fresh();
    function save() { storage.write(key,rows); render(); }
    function adjust(item,change) {
      if(item.stock+change<0 || item.stock+change>9999) return;
      item.stock+=change; save(); announce(`Stock de ${item.name}: ${item.stock} unidades.`);
    }
    function render() {
      document.querySelector('#core-products').textContent=String(rows.length);
      document.querySelector('#core-units').textContent=String(rows.reduce((sum,p)=>sum+p.stock,0));
      document.querySelector('#core-low').textContent=String(rows.filter(p=>p.stock<5).length);
      const q=document.querySelector('#core-search').value.trim().toLocaleLowerCase('es');
      const tbody=document.querySelector('#inventory-rows'); tbody.replaceChildren();
      for(const p of rows.filter(p=>p.name.toLocaleLowerCase('es').includes(q))) {
        const row=element('tr');
        const label=element('td'); label.append(element('span',p.stock<5?'Bajo':'Disponible',`status-badge ${p.stock<5?'nuevo':'cerrado'}`));
        const controls=element('td'); const buttons=element('div',undefined,'quantity-controls');
        const minus=action('−',`Restar stock de ${p.name}`,()=>adjust(p,-1)); minus.disabled=p.stock===0;
        const plus=action('+',`Sumar stock de ${p.name}`,()=>adjust(p,1)); plus.disabled=p.stock===9999;
        buttons.append(minus,plus,action('Quitar',`Quitar ${p.name}`,()=>{rows=rows.filter(x=>x.id!==p.id);save();announce(`${p.name} eliminado de esta demostración.`);},'text-button'));
        controls.append(buttons); row.append(element('td',p.name),element('td',String(p.stock)),label,controls); tbody.append(row);
      }
      if(!tbody.children.length) { const tr=element('tr'); const td=element('td','No hay productos para mostrar.');td.colSpan=4;tr.append(td);tbody.append(tr); }
    }
    document.querySelector('#inventory-form').addEventListener('submit',event=>{
      event.preventDefault();
      const name=document.querySelector('#item-name').value.trim(); const stock=Number(document.querySelector('#item-stock').value);
      if(name.length<2 || name.length>60 || !Number.isInteger(stock) || stock<0 || stock>9999) {announce('Revisá el nombre y el stock.');return;}
      if(rows.length>=50) {announce('Esta demo admite hasta 50 productos.');return;}
      if(rows.some(p=>p.name.toLocaleLowerCase('es')===name.toLocaleLowerCase('es'))) {announce('Ese producto ya existe. Podés ajustar su stock en la tabla.');return;}
      rows.push({id:crypto.randomUUID(),name,stock}); document.querySelector('#core-search').value='';save();event.target.reset();announce(`${name} agregado al inventario de demostración.`);
    });
    document.querySelector('#core-search').addEventListener('input',render);
    document.querySelector('#core-reset').addEventListener('click',()=>{ rows=fresh(); document.querySelector('#core-search').value=''; save(); announce('Inventario de ejemplo restablecido.'); });
    render();
  }
  if(root.dataset.demo==='nova-ai') {
    const messages=document.querySelector('#chat-messages'); const options=document.querySelector('#chat-options');
    const choices=[
      {label:'Quiero vender online',answer:'Una tienda puede ayudarte a mostrar tu catálogo y reunir pedidos. En NovaShop podés probar una demostración con carrito.',slug:'novashop',link:'Ver NovaShop'},
      {label:'Quiero organizar mi negocio',answer:'Podemos reunir productos, clientes o tareas en una herramienta a medida. La demo de NovaCore muestra un inventario sencillo.',slug:'novacore',link:'Ver NovaCore'},
      {label:'Quiero automatizar una tarea',answer:'Empecemos por identificar la tarea, los pasos que repetís y las herramientas que usás. Con esa información podemos evaluar una automatización.',slug:'nova-ai',link:'Contar mi idea'},
      {label:'Necesito una página web',answer:'Podemos preparar una página para presentar tu negocio y recibir consultas. Contanos qué hacés y qué querés mostrar.',slug:'web',link:'Consultar por una web'}
    ];
    function message(text,kind) { messages.append(element('p',text,`chat-bubble ${kind}`)); messages.scrollTop=messages.scrollHeight; }
    function reset() {
      messages.replaceChildren(); options.replaceChildren();
      message('¡Hola! Soy ADAM, el asistente de esta demo guiada. ¿Qué te gustaría hacer?','assistant');
      choices.forEach(choice=>options.append(action(choice.label,choice.label,()=>{
        message(choice.label,'user');message(choice.answer,'assistant');options.replaceChildren();
        const link=element('a',choice.link,'btn-cta-blue');
        link.href=['novashop','novacore'].includes(choice.slug)?`/productos/${choice.slug}`:`/contacto?servicio=${encodeURIComponent(choice.slug)}`;
        options.append(link,action('Elegir otra opción','Volver a las opciones',reset,'btn-secondary'));
      },'btn-secondary')));
    }
    document.querySelector('#chat-reset').addEventListener('click',reset); reset();
  }
})();
