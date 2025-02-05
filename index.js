import{i as n,S as f}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(r){if(r.ep)return;r.ep=!0;const e=i(r);fetch(r.href,e)}})();const d="48552658-8d0576f2bce30f826d9dd5e42",u=document.querySelector(".search-input"),g=document.querySelector(".search-button"),c=document.querySelector(".gallery"),a=document.querySelector(".loader"),y=document.querySelector(".load-more");let p=1;g.addEventListener("click",()=>{const t=u.value.trim();t?h(t):alert("Please enter a valid search term!")});y.addEventListener("click",function(){const t=u.value.trim();$(t)});async function h(t){a.style.display="block",c.innerHTML="";try{const s=(await(await fetch(`https://pixabay.com/api/?key=${d}&q=${t}&image_type=photo&per_page=15&page=${p}`)).json()).hits;if(s.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}let r="";s.forEach(e=>{r+=`
        <a href="${e.largeImageURL}" class="gallery-item">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <p>Likes: ${e.likes}</p>
            <p>Views: ${e.views}</p>
            <p>Comments: ${e.comments}</p>
            <p>Downloads: ${e.downloads}</p>
          </div>
        </a>
      `}),c.innerHTML=r,m(),a.style.display="none"}catch(o){n.error({title:"Error",message:"An error occurred while loading images!",position:"topRight"}),console.error("Error:",o),a.style.display="none"}y.style.display="block"}async function $(t){p++,a.style.display="block";try{const s=(await(await fetch(`https://pixabay.com/api/?key=${d}&q=${t}&image_type=photo&per_page=15&page=${p}`)).json()).hits;if(s.length===0){n.error({title:"Error",message:"No more images found!",position:"topRight"}),a.style.display="none";return}let r="";s.forEach(e=>{r+=`
        <a href="${e.largeImageURL}" class="gallery-item">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <p>Likes: ${e.likes}</p>
            <p>Views: ${e.views}</p>
            <p>Comments: ${e.comments}</p>
            <p>Downloads: ${e.downloads}</p>
          </div>
        </a>
      `}),c.innerHTML+=r,m(),a.style.display="none"}catch(o){n.error({title:"Error",message:"An error occurred while loading images!",position:"topRight"}),console.error("Error:",o),a.style.display="none"}}let w=new f(".gallery a");function m(){w.refresh()}
//# sourceMappingURL=index.js.map
