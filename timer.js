(()=>{if(window.__rotationTimerLoaded)return;window.__rotationTimerLoaded=true;
const K='rotation_shot_timer_v1';let cfg={seconds:45,voice:true};try{Object.assign(cfg,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
if(![30,35,45,60].includes(cfg.seconds))cfg.seconds=45;
let left=cfg.seconds,running=false,interval=null,expired=false,voice=null,unlocked=false;

const st=document.createElement('style');st.textContent=`
#shotTimer{background:#0e1512;border:1px solid #2b3831;border-radius:15px;padding:10px;margin-bottom:10px;text-align:center}
#shotTimer .tt{font-size:10px;color:#8f9b95}#shotTime{font-size:48px;line-height:1;font-weight:900;margin:2px 0 7px}
#shotTime.warning{color:#e8c967}#shotTime.danger{color:#ff7474}
#shotTimerBtns{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
#shotTimer button{border:1px solid #2b3831;background:#202923;color:#f5f7f6;border-radius:9px;padding:8px 3px;font-weight:700;font-size:11px}
#shotTimer button.active{background:#55d98d;color:#06130b;border-color:#55d98d}
#shotPause,#voiceTest{margin-top:6px;width:100%}#shotTimer.expired{border-color:#ff7474}
#voiceStatus{font-size:10px;color:#8f9b95;margin-top:5px}`;document.head.appendChild(st);

const card=document.createElement('div');card.id='shotTimer';
card.innerHTML='<div class="tt">SHOT CLOCK</div><div id="shotTime">45</div><div id="shotTimerBtns"><button data-s="30">30秒</button><button data-s="35">35秒</button><button data-s="45">45秒</button><button data-s="60">60秒</button></div><button id="shotPause">▶ 開始</button><button id="voiceTest">🔊 音声テスト</button><div id="voiceStatus">音声：準備中</div>';
const target=document.querySelector('.card');target.parentNode.insertBefore(card,target);
const te=document.getElementById('shotTime'),pb=document.getElementById('shotPause'),vt=document.getElementById('voiceTest'),vs=document.getElementById('voiceStatus');

function save(){localStorage.setItem(K,JSON.stringify(cfg))}
function chooseVoice(){
 if(!('speechSynthesis' in window)){vs.textContent='音声：利用不可';return}
 const vsx=speechSynthesis.getVoices(),ja=vsx.filter(v=>(v.lang||'').toLowerCase().startsWith('ja'));
 voice=ja.find(v=>/kyoko|haruka|nanami|mizuki|female|woman/i.test(v.name))||ja.find(v=>/enhanced|premium/i.test(v.name))||ja[0]||null;
 vs.textContent=voice?'音声：'+voice.name:'音声：日本語音声を待機中';
}
function unlock(){if(unlocked)return;unlocked=true;chooseVoice();try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance('');u.lang='ja-JP';u.volume=0;speechSynthesis.speak(u)}catch(e){}}
function speak(text,delay=0){if(!cfg.voice||!('speechSynthesis' in window))return;setTimeout(()=>{try{chooseVoice();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=.9;u.pitch=1.15;u.volume=1;if(voice)u.voice=voice;speechSynthesis.speak(u)}catch(e){}},delay)}
if('speechSynthesis' in window){chooseVoice();speechSynthesis.onvoiceschanged=chooseVoice}

function render(){te.textContent=left;te.className=left<=5?'danger':left<=10?'warning':'';card.classList.toggle('expired',expired);pb.textContent=running?'⏸ 一時停止':'▶ 開始';document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.classList.toggle('active',+b.dataset.s===cfg.seconds))}
function stop(){clearInterval(interval);interval=null;running=false}
function reset(){try{speechSynthesis.cancel()}catch(e){}stop();left=cfg.seconds;expired=false;running=true;render();interval=setInterval(tick,1000)}
function tick(){if(!running)return;left--;if(left<=10&&left>=1)speak(String(left));if(left<=0){left=0;stop();expired=true;try{navigator.vibrate&&navigator.vibrate([180,100,180,100,450])}catch(e){}speak('時間です！');render();return}render()}

document.querySelectorAll('#shotTimerBtns button').forEach(b=>b.onclick=()=>{unlock();cfg.seconds=+b.dataset.s;save();reset();speak(cfg.seconds+'秒、スタート',80)});
pb.onclick=()=>{unlock();if(expired){reset();speak(cfg.seconds+'秒、スタート',80);return}if(running)stop();else{running=true;interval=setInterval(tick,1000);speak(cfg.seconds+'秒、スタート',80)}render()};
vt.onclick=()=>{unlock();speak('音声テストです。聞こえていますか？',50)};

/* イベント音声：reset() が音声をcancelするため、必ず reset 後に発話する */
const op=window.pocket;if(typeof op==='function')window.pocket=function(n){unlock();op(n);reset();speak(n+'番',100)};
const oc=window.changeTurn;if(typeof oc==='function')window.changeTurn=function(a){unlock();oc(a);reset();speak(a,100)};
const or=window.rackEnd;if(typeof or==='function')window.rackEnd=function(){unlock();or();reset();speak('ラック終了',100)};

render();
})();