(()=>{if(window.__rotationBallsLoaded)return;window.__rotationBallsLoaded=true;
const st=document.createElement('style');st.textContent=`
#balls .ball{
  position:relative;
  overflow:hidden;
  border-radius:50%;
  aspect-ratio:1;
  border:0;
  color:#111;
  font-size:19px;
  font-weight:900;
  text-shadow:none;
  box-shadow:inset -7px -8px 12px rgba(0,0,0,.28),inset 5px 5px 8px rgba(255,255,255,.18),0 4px 5px rgba(0,0,0,.28);
  background:
    radial-gradient(circle at 35% 28%,rgba(255,255,255,.62) 0 7%,rgba(255,255,255,0) 22%),
    radial-gradient(circle at 50% 50%,#fff 0 25%,rgba(255,255,255,0) 26%),
    #bbb;
}
#balls .ball::after{
  content:"";
  position:absolute;
  inset:0;
  border-radius:50%;
  box-shadow:inset 1px 1px 2px rgba(255,255,255,.4),inset -2px -2px 4px rgba(0,0,0,.3);
  pointer-events:none;
}
#balls .ball:nth-child(1){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#f5c400}
#balls .ball:nth-child(2){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#1456b8}
#balls .ball:nth-child(3){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#d71920}
#balls .ball:nth-child(4){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#6d2aa6}
#balls .ball:nth-child(5){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#ed7115}
#balls .ball:nth-child(6){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#15864b}
#balls .ball:nth-child(7){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#7a1f25}
#balls .ball:nth-child(8){color:#111;background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.35) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),#101010}
#balls .ball:nth-child(9){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#f5c400 0 31%,#fff 31% 69%,#f5c400 69% 100%)}
#balls .ball:nth-child(10){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#1456b8 0 31%,#fff 31% 69%,#1456b8 69% 100%)}
#balls .ball:nth-child(11){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#d71920 0 31%,#fff 31% 69%,#d71920 69% 100%)}
#balls .ball:nth-child(12){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#6d2aa6 0 31%,#fff 31% 69%,#6d2aa6 69% 100%)}
#balls .ball:nth-child(13){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#ed7115 0 31%,#fff 31% 69%,#ed7115 69% 100%)}
#balls .ball:nth-child(14){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#15864b 0 31%,#fff 31% 69%,#15864b 69% 100%)}
#balls .ball:nth-child(15){background:radial-gradient(circle at 35% 28%,rgba(255,255,255,.65) 0 7%,transparent 22%),radial-gradient(circle,#fff 0 25%,transparent 26%),linear-gradient(to bottom,#7a1f25 0 31%,#fff 31% 69%,#7a1f25 69% 100%)}
#balls .ball.used{opacity:.20;filter:grayscale(.7)}
#balls .ball.low{outline:3px solid #e8c967;outline-offset:2px}
#balls .ball:active{transform:scale(.93)}
`;
document.head.appendChild(st);
})();