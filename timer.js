(()=>{if(window.__rotationTimerLoaded)return;window.__rotationTimerLoaded=true;
const K='rotation_shot_timer_v1';let cfg={seconds:30};try{Object.assign(cfg,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
let left=cfg.seconds,running=true,interval=null,expired=false;
const st=document.createElement('style');st.textContent=`#shotTimer{background:#0e1512;border:1px solid #2b3831;border-radius:15px;padding:10px;margin-bottom:10px;text-align:center}#shotTimer .tt{font-size:10px;color:#8f9b95}#shotTime{font-size:48px;line-height:1;font-weight:900;margin:2px 0 7px}#shotTime.warning{color:#e8c967}#shotTime.danger{color:#ff7474}#shotTimerBtns{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}#shotTimer button{border:1px solid #2b3831;background:#202923;color:#f5f7f6;border-radius:9px;padding:8px 3px;font-weight:700;font-size:11px}#shotTimer button.active{background:#55d98d;color:#06130b;border-color:#55d98d}#shotPause{margin-top:6px;width:100%}#shotTimer.expired{border-color:#ff7474}`;document.head.appendChild(st);
const card=document.createElement('div');card.id='shotTimer';card.innerHTML='<div class="tt">SHOT CLOCK</div><div id="shotTime">30</div><div id="shotTimerBtns"><button data-s="30">30秒</button><button data-s="35">35秒</button><button data-s="40">40秒</button><button data-s="60">60秒</button></div><button id="shotPause">一時停止</button>';
const target=document.querySelector('.card');target.parentNode.insertBefore(card,target);
const te=document.getElementById('shotTime'),pb=document.getElementById('shotPause');
function save(){localStorage.setItem(K,JSON.stringify(cfg))}
function draw(){te.textContent=left;te.className=left<=5?'danger':left<=10?'warning':'';card.classList.toggle('expired',expired);pb.textContent=running?'一時停止':'再開';document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.classList.toggle('active',+b.dataset.s===cfg.seconds))}
function reset(){clearInterval(interval);left=cfg.seconds;running=true;expired=false;draw();interval=setInterval(()=>{if(!running)return;left--;if(left<=0){left=0;clearInterval(interval);interval=null;running=false;expired=true;try{navigator.vibrate&&navigator.vibrate([180,100,180,100,300])}catch(e){}}draw()},1000)}
document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.onclick=()=>{cfg.seconds=+b.dataset.s;save();reset()});
pb.onclick=()=>{if(expired){reset();return}running=!running;if(running&&!interval)interval=setInterval(()=>{},1000);draw()};
const op=window.pocket;if(typeof op==='function')window.pocket=function(n){op(n);reset()};
const oc=window.changeTurn;if(typeof oc==='function')window.changeTurn=function(a){oc(a);reset()};
const or=window.rackEnd;if(typeof or==='function')window.rackEnd=function(){or();reset()};
draw();reset()})();