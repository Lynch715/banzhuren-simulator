// 验证心理危机链：三级预警是否按序出现、两种走向是否都成立
const fs=require("fs"),vm=require("vm");
const D=__dirname;
let src=fs.readFileSync(D+"/game.js","utf8").replace(/\nboot\(\);\s*$/,"\n")+"\nglobalThis.__b={get s(){return state},set s(v){state=v}};\n";
const El=()=>({textContent:"",innerHTML:"",value:"",disabled:false,dataset:{},style:{},
  classList:{add(){},remove(){},toggle(){},contains:()=>false},addEventListener(){},setAttribute(){},
  querySelector:()=>El(),querySelectorAll:()=>[]});
const store={},sb={console,Math,JSON,Date,setTimeout:(f)=>f(),clearTimeout,
  localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v,removeItem:k=>delete store[k]},
  document:{querySelector:()=>El(),querySelectorAll:()=>[],body:{style:{}}},window:{scrollTo(){},AudioContext:null}};
sb.globalThis=sb;vm.createContext(sb);vm.runInContext(src,sb);const B=sb.__b;

let log=[], mode="ignore", ending="";
sb.openModal=({eyebrow,title,choices=[]})=>{
  if(eyebrow==="2026 届 · 毕业结局"){ ending=title; return; }
  const crisisEyes=["有人跟你提起","更清楚的信号","最后的窗口","不可挽回","离开","缓过来了"];
  if(crisisEyes.includes(eyebrow)) log.push(`第${B.s.week}周 [${eyebrow}] ${title}`);
  if(!choices.length) return;
  // 危机弹窗：ignore 模式一律选敷衍项，rescue 模式一律选负责项
  let i=0;
  if(crisisEyes.includes(eyebrow)&&choices.length>1) i = mode==="ignore" ? 1 : 0;
  else i = Math.floor(Math.random()*choices.length);
  choices[Math.min(i,choices.length-1)].onChoose?.();
};
sb.closeModal=()=>{};sb.toast=()=>{};sb.setScene=()=>{};sb.render=()=>sb.save();sb.playTone=()=>{};

function run(label,m,seed){
  mode=m; log=[]; ending="";
  B.s=sb.initialState("math"); B.s.seed=seed;
  let g=0;
  while(!B.s.finished&&B.s.week<=12&&g++<60){
    let i=0;
    // 极端忽视型打法：只上课、只夜间备课，从不做任何降压行动
    while(B.s.energy>0&&i++<12){ B.s.energy===1?sb.doStudy():sb.doLesson(); }
    B.s.energy=0; sb.endWeek();
  }
  const st=B.s;
  console.log(`\n=== ${label} ===`);
  log.forEach(l=>console.log("  "+l));
  console.log(`  事故: ${st.incident?st.incident.name+" 第"+st.incident.week+"周":"未发生"}`);
  console.log(`  离开人数: ${st.lost.length} (${st.lost.map(l=>l.name+(l.injured?"·受伤":"")).join("、")||"无"})`);
  const bad=st.students.filter(x=>!x.out&&x.lastScore&&x.lastScore<528).length;
  console.log(`  一本线下: ${bad}/${st.students.filter(x=>!x.out).length} 人（复读或大专）`);
  console.log(`  结局: ${ending}`);
  return st;
}

run("A · 三次预警全部敷衍","ignore",111111);
run("B · 三次预警全部认真对待","rescue",111111);
run("C · 敷衍（另一颗种子）","ignore",987654);
run("D · 认真（另一颗种子）","rescue",987654);
