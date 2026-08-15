(()=>{if(window.__rotationMissButtonFix2)return;window.__rotationMissButtonFix2=true;
const st=document.createElement('style');st.textContent=`
.rotation-miss-large{font-size:19px!important;min-height:72px!important;padding:19px 10px!important;font-weight:900!important;border-width:2px!important}
`;document.head.appendChild(st);
function apply(){document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim()==='ミス')b.classList.add('rotation-miss-large')})}
apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
})();