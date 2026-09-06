// 蒙特卡洛：200 局随机通关，检查稳定性、后果链覆盖率与结局分布
const fs=require("fs"),vm=require("vm");
let src=fs.readFileSync(__dirname+"/game.js","utf8").replace(/\nboot\(\);\s*$/,"\n");
src+="\nglobalThis.__b={get s(){return state},set s(v){state=v}};\n";
const El=()=>({textContent:"",innerHTML:"",value:"",disabled:false,dataset:{},style:{},
  classList:{add(){},remove(){},toggle(){},contains:()=>false},addEventListener(){},setAttribute(){},
  querySelector:()=>El(),querySelectorAll:()=>[]});
const store={};
const sb={console,Math,JSON,Date,setTimeout:(f)=>f(),clearTimeout,
  localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v,removeItem:k=>delete store[k]},
  document:{querySelector:()=>El(),querySelectorAll:()=>[],body:{style:{}}},
  window:{scrollTo(){},AudioContext:null}};
sb.globalThis=sb; vm.createContext(sb); vm.runInContext(src,sb);
const B=sb.__b;

let ending="", crashed=null;
sb.openModal=({eyebrow,title,choices=[]})=>{
  if(eyebrow==="2026 届 · 毕业结局"){ ending=title; return; }
  if(!choices.length) return;
  choices[Math.floor(Math.random()*choices.length)].onChoose?.();
};
sb.closeModal=()=>{}; sb.toast=()=>{}; sb.setScene=()=>{}; sb.render=()=>sb.save(); sb.playTone=()=>{};

const acts=["lesson","tutor","talk","meeting","parent","study"];
const endings={}, cbHit={}, lostDist={}, storyDist={}, scores=[], ranks={}, metDist={};
let incidents=0, belowTotal=0, belowN=0;
const N=200;
for(let run=0;run<N;run++){
  ending="";
  B.s=sb.initialState(["math","chinese","english"][run%3]);
  B.s.seed=(Math.random()*4294967296)>>>0;
  let guard=0;
  try{
    while(!B.s.finished && B.s.week<=12 && guard++<60){
      let inner=0;
      while(B.s.energy>0 && inner++<12){
        const alive=B.s.students.filter(x=>!x.out);
        if(!alive.length){B.s.energy=0;break;}
        const a=acts[Math.floor(Math.random()*acts.length)];
        const t=alive[Math.floor(Math.random()*alive.length)];
        if(a==="lesson")sb.doLesson();
        else if(a==="meeting")sb.doMeeting();
        else if(a==="study")sb.doStudy();
        else if(a==="talk"){const k=B.s.students.filter(x=>x.key&&x.met&&!x.out&&x.node);sb.startStoryBeat(k.length?k[0]:t);}
        else if(a==="tutor"){sb.applyEff({study:8,trust:3,stress:5,mood:-2},t);sb.spend("tutor","辅导");}
        else {sb.applyEff({stress:-12,trust:3,mood:4},t);sb.spend("parent","家校");}
      }
      B.s.energy=0;
      sb.endWeek();
    }
  }catch(e){ crashed={run,err:e.message,week:B.s.week}; break; }
  const st=B.s;
  endings[ending||"未触发"]=(endings[ending||"未触发"]||0)+1;
  st.firedCallbacks.forEach(c=>cbHit[c]=(cbHit[c]||0)+1);
  lostDist[st.lost.length]=(lostDist[st.lost.length]||0)+1;
  incidents += st.incident?1:0;
  const below=st.students.filter(x=>!x.out&&x.lastScore&&x.lastScore<528).length;
  belowTotal+=below; belowN++;
  const done=st.students.filter(x=>x.key&&x.met&&!x.out&&x.node===null).length;
  storyDist[done]=(storyDist[done]||0)+1;
  const met=st.students.filter(x=>x.key&&x.met).length; metDist[met]=(metDist[met]||0)+1;
  const fin=st.examHistory.find(e=>e.week===12);
  if(fin){scores.push(fin.score);ranks[fin.rank]=(ranks[fin.rank]||0)+1;}
  const dup=st.usedEvents.length-new Set(st.usedEvents).size;
  if(dup) console.log("⚠ 事件重复",dup,"run",run);
}
if(crashed){ console.log("❌ 崩溃:",crashed); process.exit(1); }
const pct=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}: ${(v/N*100).toFixed(0)}%`).join("  ");
scores.sort((a,b)=>a-b);
console.log(`✅ ${N} 局全部跑完，无异常\n`);
console.log("结局分布      ",pct(endings));
console.log("退出人数分布  ",pct(lostDist));
console.log("剧情登门人数  ",pct(metDist));
console.log("发生事故      ",(incidents/N*100).toFixed(1)+"%");
console.log("一本线下人数  ",(belowTotal/belowN).toFixed(1)+" 人 / 班（复读或大专）");
console.log("故事完成数    ",pct(storyDist));
console.log("高考排名分布  ",pct(ranks));
console.log(`高考分数      最低 ${scores[0]} / 中位 ${scores[Math.floor(scores.length/2)]} / 最高 ${scores[scores.length-1]}`);
const all=Array.from(src.matchAll(/id:"(cb_[a-z_]+)"/g)).map(m=>m[1]);
console.log("\n后果链覆盖率  ",all.map(c=>`${c} ${((cbHit[c]||0)/N*100).toFixed(0)}%`).join("\n               "));
const never=all.filter(c=>!cbHit[c]);
console.log("\n从未触发的后果:",never.length?never.join(", "):"无（全部可达）");
