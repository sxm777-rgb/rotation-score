(()=>{if(window.__rotationTimerLoaded)return;window.__rotationTimerLoaded=true;
const K='rotation_shot_timer_v1';let cfg={seconds:45};try{Object.assign(cfg,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
if(![30,35,45,60].includes(cfg.seconds))cfg.seconds=45;
let left=cfg.seconds,running=true,interval=null,expired=false;

const st=document.createElement('style');st.textContent=`
#shotTimer{background:#0e1512;border:1px solid #2b3831;border-radius:15px;padding:10px;margin-bottom:10px;text-align:center}
#shotTimer .tt{font-size:10px;color:#8f9b95}
#shotTime{font-size:48px;line-height:1;font-weight:900;margin:2px 0 7px}
#shotTime.warning{color:#e8c967}#shotTime.danger{color:#ff7474}
#shotTimerBtns{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
#shotTimer button{border:1px solid #2b3831;background:#202923;color:#f5f7f6;border-radius:9px;padding:8px 3px;font-weight:700;font-size:11px}
#shotTimer button.active{background:#55d98d;color:#06130b;border-color:#55d98d}
#shotPause{margin-top:6px;width:100%}#shotTimer.expired{border-color:#ff7474}`;document.head.appendChild(st);

const card=document.createElement('div');card.id='shotTimer';
card.innerHTML='<div class="tt">SHOT CLOCK</div><div id="shotTime">45</div><div id="shotTimerBtns"><button data-s="30">30秒</button><button data-s="35">35秒</button><button data-s="45">45秒</button><button data-s="60">60秒</button></div><button id="shotPause">一時停止</button>';
const target=document.querySelector('.card');target.parentNode.insertBefore(card,target);

const te=document.getElementById('shotTime'),pb=document.getElementById('shotPause');

function save(){localStorage.setItem(K,JSON.stringify(cfg))}
function render(){
  te.textContent=left;
  te.className=left<=5?'danger':left<=10?'warning':'';
  card.classList.toggle('expired',expired);
  pb.textContent=running?'一時停止':'再開';
  document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.classList.toggle('active',+b.dataset.s===cfg.seconds));
}

/* iPhone/Safariの日本語音声から女性系の声を優先して選択。
   利用可能な声は端末・iOSバージョンによって異なるため、見つからない場合は日本語音声へフォールバック。 */
let voice=null;
function chooseVoice(){
  if(!('speechSynthesis' in window))return;
  const vs=speechSynthesis.getVoices();
  const ja=vs.filter(v=>(v.lang||'').toLowerCase().startsWith('ja'));
  voice=ja.find(v=>/female|woman|kyoko|otoya|haruka|nanami|mizuki/i.test(v.name))||ja.find(v=>/siri|premium|enhanced/i.test(v.name))||ja[0]||null;
}
if('speechSynthesis' in window){
  chooseVoice();
  speechSynthesis.onvoiceschanged=chooseVoice;
}
function speak(text){
  if(!('speechSynthesis' in window))return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='ja-JP';u.rate=0.95;u.pitch=1.15;u.volume=1;
    if(voice)u.voice=voice;
    speechSynthesis.speak(u);
  }catch(e){}
}
function countdownVoice(n){
  if(n>=1&&n<=10)speak(String(n));
}
function timeUp(){
  expired=true;running=false;left=0;
  try{navigator.vibrate&&navigator.vibrate([180,100,180,100,400])}catch(e){}
  speak('時間です！');
  render();
}
function tick(){
  if(!running)return;
  left--;
  if(left<=10&&left>=1)countdownVoice(left);
  if(left<=0){clearInterval(interval);interval=null;timeUp();return}
  render();
}
function startInterval(){clearInterval(interval);interval=setInterval(tick,1000)}
function reset(){
  if('speechSynthesis' in window)try{speechSynthesis.cancel()}catch(e){}
  clearInterval(interval);interval=null;left=cfg.seconds;running=true;expired=false;render();startInterval();
}
document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.onclick=()=>{
  cfg.seconds=+b.dataset.s;save();reset();
});
pb.onclick=()=>{
  if(expired){reset();return}
  running=!running;
  if(running)startInterval();else{clearInterval(interval);interval=null}
  render();
};
const op=window.pocket;if(typeof op==='function')window.pocket=function(n){op(n);reset()};
const oc=window.changeTurn;if(typeof oc==='function')window.changeTurn=function(a){oc(a);reset()};
const or=window.rackEnd;if(typeof or==='function')window.rackEnd=function(){or();reset()};

/* iOS Safariでは、ユーザー操作後に音声が許可されるように、
   最初のショット操作時に音声エンジンをウォームアップ。 */
document.addEventListener('click',()=>{if('speechSynthesis' in window){chooseVoice();}}, {once:false});

render();reset();
})();