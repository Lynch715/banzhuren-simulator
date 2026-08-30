const SUBJECTS = {
  math: { name: "数学", short: "数", color: "#4c8290", lesson: "专题精讲", desc: "拔高压轴题，提分快，但会甩掉后排" },
  chinese: { name: "语文", short: "文", color: "#a95f49", lesson: "阅读写作课", desc: "提分慢，却是唯一能让他们开口的科目" },
  english: { name: "英语", short: "英", color: "#6d779d", lesson: "语境突破课", desc: "靠积累，短期看不出，考前最稳" }
};

const PORTRAITS = {
  teacher: "portrait-teacher", principal: "portrait-principal", linxiaoyu: "portrait-linxiaoyu",
  zhouyang: "portrait-zhouyang", suqing: "portrait-suqing", chengmo: "portrait-chengmo",
  xuhui: "portrait-xuhui", luming: "portrait-luming"
};

// 每个选项都必须付出代价：eff 为即时数值，flag 写入后果链，next 决定下一章走向
const STUDENT_TEMPLATES = [
  {
    id:"linxiaoyu", key:true, female:true, met:false, awakenWeek:2, name:"林小雨", tag:"尖子生", portrait:"portrait-linxiaoyu",
    study:82, mood:54, trust:42, stress:73, story:0, ceiling:99, node:"lin1", strain:0, out:false,
    thread:"满分以外", summary:"她把第二名也当成失败。", strength:"基础扎实，目标清晰", risk:"完美主义 · 长期失眠",
    nodes:{
      lin1:{ title:"错掉的两分", quote:"老师，我昨晚把那道题重做了七遍。可我还是觉得……不该错。",
        text:"她攥着卷角，指节发白。你注意到她校服袖口有一圈掐出来的红印，不是新的。",
        choices:[
          {label:"下命令：今晚不许再碰这套卷子", hint:"她会照做。但被抽走的那两小时，没有别的东西填得回来。",
           eff:{stress:-13,trust:5,mood:6,study:-6}, flag:"linRest", next:"lin2"},
          {label:"陪她把错误拆成三类", hint:"她第一次觉得错题是可以被处理的。也第一次发现，还能再挤出一小时。",
           eff:{study:8,trust:4,stress:9,mood:-2}, flag:"linPush", next:"lin2"}
        ]},
      lin2:{ title:"母亲的电话", quote:"我妈说，您要是真为我好，就该配合她。",
        text:"林母在电话里说得很客气：请老师每天把她的排名发给我。她说这是家校配合。你知道这更像监控。",
        choices:[
          {label:"拒绝，并告诉她母亲这会毁掉孩子", hint:"你站在了她这边。代价是林母当天下午就打去了教务处。",
           eff:{trust:10,mood:8,stress:-8,prestige:-6}, flag:"motherComplaint", next:"lin3_ally"},
          {label:"照做。她需要的是分数，不是理解", hint:"排名每天准时发出。她再没主动敲过你的办公室门。",
           eff:{study:9,prestige:3,trust:-11,mood:-12,stress:14}, flag:"linBetrayed", next:"lin3_break"}
        ]},
      lin3_ally:{ title:"天文台的坐标", quote:"我查了，那所学校的天文系……分数比北京那所低四十分。",
        text:"她把打印出来的招生简章推过来，边角折得很整齐。折了很多次。",
        choices:[
          {label:"帮她把这张纸带进那场家庭谈话", hint:"你成了那个在场的成年人。也成了林母眼里那个多管闲事的班主任。",
           eff:{trust:9,mood:11,stress:-12,study:-3,prestige:-3}, flag:"linFree", next:null},
          {label:"让她先把分数考出来再谈", hint:"务实，也可能是最安全的怯懦。她点了头，把简章折回口袋。",
           eff:{study:7,trust:3,stress:4,mood:-4}, flag:"linDeferred", next:null}
        ]},
      lin3_break:{ title:"凌晨四点的消息", quote:"老师，我睡不着。我一闭眼就在算，还差多少名。",
        text:"消息发送时间是 04:12。你回过去的时候，她已经在早读教室了。",
        choices:[
          {label:"立刻停课，带她去校医室", hint:"她会缺掉两天课，年级排名会掉。但你不想赌第三天。",
           eff:{stress:-20,mood:9,trust:8,study:-9}, flag:"linRescued", next:null},
          {label:"给她开一盒褪黑素，让她撑到高考", hint:"你听见自己说出这句话，也听见了它的分量。",
           eff:{study:6,stress:8,mood:-8,trust:-5}, flag:"linAbandoned", next:null}
        ]}
    }
  },
  {
    id:"zhouyang", key:true, met:false, awakenWeek:3, name:"周扬", tag:"体育生", portrait:"portrait-zhouyang",
    study:48, mood:72, trust:36, stress:45, story:0, ceiling:76, node:"zhou1", strain:0, out:false,
    thread:"球场与考场", summary:"省赛与二模撞在同一周。", strength:"行动力强，能带动同学", risk:"文化课基础薄弱 · 旧伤",
    nodes:{
      zhou1:{ title:"第七次迟到", quote:"训练结束都十点半了。老师，我真不是故意睡过头。",
        text:"班规写着三次迟到通报批评。他已经七次。前排的学习委员正盯着你，等一个答案。",
        choices:[
          {label:"私下宽限，换成晨读补签", hint:"他记住了这份体谅。全班也记住了：规则可以谈。",
           eff:{trust:7,study:3,discipline:-7,morale:-3}, flag:"zhouExempt", next:"zhou2"},
          {label:"照章通报，一视同仁", hint:"纪律立住了。他没顶嘴，只是从此上课坐到了最后一排。",
           eff:{discipline:8,trust:-7,mood:-8,study:-2}, flag:"zhouPunished", next:"zhou2"}
        ]},
      zhou2:{ title:"膝盖里的冰袋", quote:"队医说最好休两周。可省赛……可能就这一次。",
        text:"片子上那道白线你看不懂。但你看得懂他说“就这一次”时，眼睛亮的样子。",
        choices:[
          {label:"签字，让他上场", hint:"你把选择权还给了他。也把风险一起还了回去。",
           eff:{trust:10,mood:10,prestige:3,stress:-4,study:-4}, flag:"zhouPlayed", next:"zhou3_play"},
          {label:"按规定压下他的参赛申请", hint:"膝盖保住了。他有半个月没跟你说过一句话。",
           eff:{study:7,discipline:3,trust:-10,mood:-14,stress:11}, flag:"zhouBenched", next:"zhou3_bench"}
        ]},
      zhou3_play:{ title:"第三节的哨声", quote:"我们赢了。老师，我进省队了。",
        text:"他是被队友架下场的。省队录取通知和骨科诊断书，同一周到。",
        choices:[
          {label:"帮他把体育单招那条路走通", hint:"文化课线不高，但也不是零。你得从头帮他算一遍。",
           eff:{study:9,trust:8,mood:6,stress:-6}, flag:"zhouPath", next:null},
          {label:"劝他先康复，明年再战", hint:"最负责任的建议，也是他最不想听的那句。",
           eff:{stress:-8,study:4,trust:-4,mood:-7}, flag:"zhouWait", next:null}
        ]},
      zhou3_bench:{ title:"退队申请", quote:"我签了。反正也没什么好练的了。",
        text:"他把那张纸放在你桌上，压在成绩单下面。膝盖好了，人空了。",
        choices:[
          {label:"承认你当时越界了，向他道歉", hint:"道歉不会让时间倒流，但能让他重新坐回前排。",
           eff:{trust:12,mood:11,stress:-9,study:3}, flag:"zhouMended", next:null},
          {label:"把他按在文化课上，用成绩换出路", hint:"他会考出这辈子最高的分数。你也会记得他签字时的表情。",
           eff:{study:13,stress:9,trust:-3,mood:-5}, flag:"zhouGrind", next:null}
        ]}
    }
  }
];

STUDENT_TEMPLATES.push(
  {
    id:"suqing", key:true, female:true, met:false, awakenWeek:5, name:"苏晴", tag:"文学社", portrait:"portrait-suqing",
    study:68, mood:57, trust:49, stress:58, story:0, ceiling:90, node:"su1", strain:0, out:false,
    thread:"没交出的作文", summary:"她的文字里藏着没说出口的事。", strength:"表达细腻，观察敏锐", risk:"父母正在打抚养权官司",
    nodes:{
      su1:{ title:"空白的作文纸", quote:"题目是“家”。我不知道该怎么写。",
        text:"纸上只有一道被橡皮擦破的痕迹。这是本学期第三次交白卷，再有一次就要计入平时分。",
        choices:[
          {label:"给她换一个题目", hint:"你替她挡掉了这一次。但高考作文不会替她换题。",
           eff:{mood:8,stress:-9,trust:6,study:-6}, flag:"suShielded", next:"su2"},
          {label:"让她从外婆的旧饭盒写起", hint:"她写完了，写得很好。也在办公室里坐了很久没站起来。",
           eff:{study:9,trust:5,stress:12,mood:-7}, flag:"suOpened", next:"su2"}
        ]},
      su2:{ title:"一份在校表现证明", quote:"我爸让我问您……能不能开一张证明，说我跟他住的时候成绩更好。",
        text:"抚养权官司下周开庭。两边的律师都联系过学校。你手里那支笔忽然变得很重。",
        choices:[
          {label:"只写事实，不写倾向", hint:"程序上无懈可击。两边家长都认为你站在了对面。",
           eff:{trust:5,prestige:-4,stress:6,mood:-3}, flag:"suNeutral", next:"su3"},
          {label:"拒绝出具，并建议法院直接问孩子", hint:"你把话语权还给了她。也把她推到了两个大人中间。",
           eff:{trust:9,mood:-6,stress:10,prestige:-3}, flag:"suVoice", next:"su3"}
        ]},
      su3:{ title:"校刊的署名栏", quote:"发就发吧。反正他们已经在传了。",
        text:"那篇写离婚的散文拿了市里的奖。编辑要真名。她父母的名字会跟着一起被认出来。",
        choices:[
          {label:"坚持匿名，哪怕丢掉这个奖项", hint:"你替她挡住了聚光灯，也挡住了她第一次被看见的机会。",
           eff:{trust:9,stress:-11,mood:7,prestige:-5}, flag:"suAnon", next:null},
          {label:"署名发表，让她自己面对回声", hint:"她成了全校都认识的那个女孩。有掌声，也有走廊里的窃窃私语。",
           eff:{study:7,prestige:6,mood:4,stress:9,trust:4}, flag:"suNamed", next:null}
        ]}
    }
  },
  {
    id:"chengmo", key:true, met:false, awakenWeek:6, name:"程默", tag:"偏科生", portrait:"portrait-chengmo",
    study:59, mood:48, trust:31, stress:64, story:0, ceiling:94, node:"cheng1", strain:0, out:false,
    thread:"沉默的竞赛生", summary:"数学一枝独秀，其余全线下坠。", strength:"抽象思维极强", risk:"社交回避 · 严重偏科",
    nodes:{
      cheng1:{ title:"草稿本最后一页", quote:"他们说我只会做题。解释了也没用。",
        text:"最后一页不是公式，是一整面同学的绰号和座位图，画得像一张作战地图。",
        choices:[
          {label:"不追问，只留一句“想说的时候我在”", hint:"你没有逼他。他也确实没有来。语文英语继续往下掉。",
           eff:{trust:8,mood:4,stress:-6,study:-5}, flag:"chengWait", next:"cheng2"},
          {label:"排他上讲台讲一道题", hint:"他讲完了。也在讲台上僵了将近二十秒，全班都看着。",
           eff:{morale:5,study:4,stress:14,mood:-9,trust:2}, flag:"chengExposed", next:"cheng2"}
        ]},
      cheng2:{ title:"两份一模一样的答案", quote:"我给他讲过思路。抄不抄是他的事。",
        text:"周扬的数学卷和他的解法一字不差，连那个多余的辅助线都一样。教务处要一个说法。",
        choices:[
          {label:"担下来，说是你安排的结对辅导", hint:"两个孩子都保住了。你的师德考核栏里多了一行字。",
           eff:{trust:11,mood:8,stress:-7,prestige:-8}, flag:"chengCovered", next:"cheng3"},
          {label:"如实上报，两人都记过", hint:"你守住了底线。他从此再没跟班上任何人讲过一道题。",
           eff:{discipline:9,trust:-9,mood:-11,stress:12}, flag:"chengReported", next:"cheng3"}
        ]},
      cheng3:{ title:"竞赛落选通知", quote:"差一分。现在连“只会做题”都算不上了。",
        text:"他把通知揉成一团，又小心地展开，抚平，折好，放进书包最里层。",
        choices:[
          {label:"逼他补语文英语，放弃竞赛这条路", hint:"总分会好看很多。你亲手关掉了他唯一擅长的那扇门。",
           eff:{study:12,stress:10,mood:-8,trust:-4}, flag:"chengConverted", next:null},
          {label:"陪他再试一次，赌自主招生", hint:"押上全部筹码。赢了是天才，输了是一场空。",
           eff:{trust:10,mood:9,stress:-5,study:-6,prestige:4}, flag:"chengBet", next:null}
        ]}
    }
  },
  {
    id:"luming", key:true, met:false, awakenWeek:8, name:"陆鸣", tag:"转学生", portrait:"portrait-luming",
    study:65, mood:42, trust:27, stress:67, story:0, ceiling:87, node:"lu1", strain:0, out:false,
    thread:"耳机里的旧学校", summary:"他来了新班，却把自己留在了过去。", strength:"英语听力优秀", risk:"融入困难 · 频繁请假",
    nodes:{
      lu1:{ title:"一直戴着的耳机", quote:"没放音乐。戴着……别人就不会来问我。",
        text:"转学手续上，紧急联系人一栏改过两次。第二次是他自己的字迹。",
        choices:[
          {label:"由他去，先不碰他的边界", hint:"他安全了。三周后你会发现，全班没有一个人叫得出他的名字。",
           eff:{trust:6,stress:-7,mood:2,morale:-4}, flag:"luLeftAlone", next:"lu2"},
          {label:"硬把他编进小组值日", hint:"强行破冰。他没缺席，也没抬过头。",
           eff:{morale:4,discipline:3,stress:11,mood:-8,trust:-3}, flag:"luForced", next:"lu2"}
        ]},
      lu2:{ title:"旧校服照片", quote:"他们在网上说，是我害球队输掉了比赛。所以我才转学。",
        text:"那张贴子被人转进了本班群。两座城市的距离，在网线上等于零。",
        choices:[
          {label:"开班会公开澄清，禁止传播", hint:"传播停了。代价是全班现在都知道了他为什么转学。",
           eff:{discipline:7,trust:9,stress:-6,mood:-5,morale:-3}, flag:"luExposed", next:"lu3"},
          {label:"逐个私下找传谣的学生谈", hint:"更慢，更安静。这三天里贴子又多了两百条回复。",
           eff:{trust:5,discipline:2,stress:12,mood:-7}, flag:"luQuiet", next:"lu3"}
        ]},
      lu3:{ title:"第二张转学申请", quote:"我妈说，再转一次也没关系。",
        text:"表格已经填好了一半。落款日期是明天。",
        choices:[
          {label:"告诉他：留下会更难，但值得", hint:"你要求一个十七岁的人替你承担你的判断。",
           eff:{trust:11,mood:9,stress:-8,study:5}, flag:"luStayed", next:null},
          {label:"帮他把手续办得体面一点", hint:"你尊重了他的选择。毕业照上会少一个人。",
           eff:{trust:7,mood:5,stress:-13,study:-10,morale:-5}, flag:"luLeft", next:null}
        ]}
    }
  }
);


// ── 全班名册：43 名学生，每人有姓名、身份与自己的数值 ──────────────────
// [姓名, 身份标签, 学业基准]
const ROSTER = [   // [姓名, 身份, 学业基准, 是否女生]
  ["徐慧","学习委员",79,true],   ["王雨桐","语文课代表",71,true], ["李承泽","副班长",68],
  ["张思远","数学课代表",76],["刘佳宁","走读生",54,true],    ["陈子昂","后排",44],
  ["杨欣怡","文艺委员",61,true], ["黄浩然","住校生",57],     ["赵梦琪","英语课代表",73,true],
  ["吴俊熙","体育委员",49], ["周语彤","团支书",70,true],     ["孙悦然","住校生",58,true],
  ["马文博","物理课代表",74],["朱清和","走读生",52],    ["胡一鸣","后排",41],
  ["郭沐阳","化学课代表",69],["何家欣","住校生",63,true],    ["高振宇","生活委员",55],
  ["罗晓桐","走读生",60,true],   ["郑柏舟","住校生",47],     ["梁书言","历史课代表",66,true],
  ["谢知遥","艺考生",43,true],   ["唐若初","走读生",64,true],     ["韩沐辰","住校生",51],
  ["曹雨薇","地理课代表",67,true],["邓亦凡","后排",39],      ["冯思齐","走读生",59],
  ["蒋南舟","住校生",56],   ["沈亦白","复读生",72],     ["汪明轩","走读生",53],
  ["卢星野","住校生",46],   ["董雨眠","生物课代表",65,true], ["潘敬之","走读生",62],
  ["秦淮安","住校生",50],   ["许清让","转班生",58],     ["樊听雨","艺考生",42,true],
  ["白露微","走读生",63,true],   ["崔行知","住校生",48],     ["石斛","后排",38],
  ["项北","走读生",55],     ["温言","住校生",60,true],       ["裴向晚","艺考生",45,true],
  ["阮眠","走读生",57,true]
];

// 确定性抖动，保证每次开局同一个人是同一个人
function jit(i){ let x=(i*2654435761)>>>0; x^=x>>>15; x=(x*2246822507)>>>0; x^=x>>>13; return (x>>>0)%1000/1000; }

function buildRoster(){
  return ROSTER.map(([name,tag,base,female],i)=>({
    id:"bg"+i, name, tag, key:false, portrait:null, female:!!female,
    initial:name[0],
    study:base,
    ceiling:Math.min(96, base+5+Math.round(jit(i)*17)),
    mood:  Math.max(20,Math.min(90, 50+Math.round((base-58)*.22)+Math.round(jit(i+101)*18-9))),
    stress:Math.max(20,Math.min(88, 44+Math.round((base-55)*.28)+Math.round(jit(i+202)*20))),
    trust: Math.max(15,Math.min(70, 28+Math.round(jit(i+303)*24))),
    story:0, node:null, strain:0, out:false
  }));
}

// ── 班上的说法：每个人都有一件跟分数无关、但全班都知道的小事 ─────────
const QUIRKS=[
  "写作业永远先写最喜欢的那科，所以那科的作业总是第一个交",
  "抽屉里常年备着三支同款笔，说是考试玄学，缺一支就心慌",
  "能把圆周率背到一百位，但英语单词三天忘两页",
  "值日拖地永远只拖自己那一列，拖得极其认真",
  "传纸条被抓过一次之后改用眼神交流，现在全班都看得懂",
  "书包里有一包吃了三个月还没吃完的话梅，谁问都说快吃完了",
  "给每支笔都起了名字，涂卡那支叫「关键先生」",
  "早读永远比别人高半个调，隔壁班都习惯了",
  "错题本包了书皮，封面写着「再见了所有的错题」",
  "去小卖部只买同一种面包，老板看见人影就开始拿货",
  "打篮球前要把眼镜郑重地交给同桌保管，仪式感很足",
  "笔记做得极漂亮，考前全班排队借，借出去要登记",
  "有一套自己的天气预报，准确率高于电视台，依据是操场的旗子",
  "座位周围永远是全班最干净的一平方米，扫帚自备",
  "能模仿每个任课老师的口头禅，惟妙惟肖，就是从来不敢当面来",
  "睡觉技术一流，下课铃响前十秒准时醒，从无失手"
];
const KEY_QUIRKS={
  linxiaoyu:"错题本按颜色分了三层，别人借去也看不懂她的标记体系",
  zhouyang:"教室后门的门框上有他起跳摸高的手印，一学期比一学期高",
  suqing:"作文纸永远比别人多要一张，连草稿都写得像定稿",
  chengmo:"上课转笔从来没掉过，数学老师说这叫角动量守恒",
  luming:"耳机永远只戴一边——后来你才知道，另一边是留着听课的"
};
function quirkOf(s){
  if(KEY_QUIRKS[s.id]) return KEY_QUIRKS[s.id];
  const i=s.id&&s.id.startsWith("bg")?parseInt(s.id.slice(2))||0:Math.abs(s.name.charCodeAt(0));
  return QUIRKS[Math.floor(jit(i+404)*QUIRKS.length)%QUIRKS.length];
}

// ── 分科：语文 150 / 数学 150 / 英语 150 / 综合 300 ──────────────────
const SUBJECT_FULL={chinese:150,math:150,english:150,comp:300};
const SUBJECT_NAME={chinese:"语文",math:"数学",english:"英语",comp:"综合"};
// 现实里语文几乎不可能满分，数学可以
const SUBJECT_CAP={chinese:.92,math:.99,english:.97,comp:.95};
const APT_KEY={
  linxiaoyu:{chinese:1.00,math:1.06,english:1.04,comp:1.02},  // 均衡，理科稍强
  zhouyang: {chinese:1.06,math:0.86,english:0.82,comp:0.94},  // 文化课整体薄，语文相对能看
  suqing:   {chinese:1.22,math:0.80,english:1.02,comp:0.94},  // 文字见长，数学是短板
  chengmo:  {chinese:0.74,math:1.34,english:0.78,comp:1.06},  // 严重偏科
  luming:   {chinese:0.94,math:0.96,english:1.24,comp:0.94}   // 英语听力出众
};
function aptOf(s){
  if(APT_KEY[s.id]) return APT_KEY[s.id];
  const i=parseInt((s.id||"bg0").replace("bg",""))||0;
  const w=k=>0.86+jit(i+k)*0.30;
  return {chinese:w(11),math:w(29),english:w(47),comp:w(67)};
}
// 把总分按天赋拆到四科，保证各科之和恰好等于总分
function splitSubjects(s,total){
  const apt=aptOf(s), keys=Object.keys(SUBJECT_FULL);
  // 任教学科额外受教学水平带动
  const boost=Math.max(0,(state.stats.teaching-50))/100*0.16;
  const pb=periodBias();
  const w={}; keys.forEach(k=>{ w[k]=apt[k]*(k===state.subject?1+boost:1-boost/3)*(pb[k]||1); });
  let raw={},sum=0;
  keys.forEach(k=>{ raw[k]=SUBJECT_FULL[k]*(total/750)*w[k]; sum+=raw[k]; });
  const scale=total/sum;
  const hi=k=>Math.round(SUBJECT_FULL[k]*SUBJECT_CAP[k]), lo=k=>Math.round(SUBJECT_FULL[k]*0.18);
  const out={};
  keys.forEach(k=>{ out[k]=Math.max(lo(k),Math.min(hi(k),Math.round(raw[k]*scale))); });
  // 舍入与封顶的残差按顺序摊到还有空间的科目上，保证各科之和恰好等于总分
  let diff=total-keys.reduce((n,k)=>n+out[k],0);
  const order=["comp","math","english","chinese"];
  for(let pass=0;pass<3&&diff!==0;pass++){
    for(const k of order){
      if(diff===0) break;
      const room=diff>0?hi(k)-out[k]:out[k]-lo(k);
      if(room<=0) continue;
      const step=Math.sign(diff)*Math.min(Math.abs(diff),room);
      out[k]+=step; diff-=step;
    }
  }
  return out;
}
// 偏科判定：某科得分率比自己平均低 15 个百分点以上
function weakSubject(sub){
  const rate=k=>sub[k]/SUBJECT_FULL[k];
  const keys=Object.keys(SUBJECT_FULL), avg=keys.reduce((n,k)=>n+rate(k),0)/keys.length;
  const worst=keys.reduce((a,b)=>rate(a)<rate(b)?a:b);
  return rate(worst)<avg-0.12?SUBJECT_NAME[worst]:null;
}


// ── 课表：白天六节正课由教务处排定，晚上两节晚自习归你 ────────────────
const SUBJ_META={
  chinese:{name:"语文",short:"语",cat:"chinese",color:"#a95f49"},
  math:   {name:"数学",short:"数",cat:"math",   color:"#4c8290"},
  english:{name:"英语",short:"英",cat:"english",color:"#6d779d"},
  comp:   {name:"综合",short:"综",cat:"comp",   color:"#7a6a9c"},
  pe:     {name:"体育",short:"体",cat:null,     color:"#7fa0a8"}
};
const DAYS=["一","二","三","四","五"];
// 三月中旬接手，六月七号高考。脑子里记的是日子，不是第几周。
const WEEK_DATES=["3月16日","3月23日","3月30日","4月6日","4月13日","4月20日",
                  "4月27日","5月4日","5月11日","5月18日","5月25日","6月1日"];
const WEEK_MONTH=["三月中旬","三月底","三月底","四月初","四月中","四月下旬",
                  "四月底","五月初","五月中","五月中下旬","五月底","高考那一周"];
function dateOf(w){ return WEEK_DATES[Math.min(11,Math.max(0,w-1))]; }
function monthOf(w){ return WEEK_MONTH[Math.min(11,Math.max(0,w-1))]; }
function daysLeft(w){ return Math.max(0,(12-w)*7+6); }
function weekPhrase(w){ return `${dateOf(w)}那一周`; }
function agoPhrase(from,to){ const d=to-from; return d<=1?"上周":d===2?"两周前":d===3?"三周前":`${d} 周前`; }
// 高三早就分完科了：白天六节就在语数外综之间转，一周留两节体育
const FIXED_TT=[
  ["chinese","math","english","comp","comp","pe"],
  ["math","english","chinese","comp","comp","comp"],
  ["english","math","chinese","comp","comp","comp"],
  ["math","chinese","english","comp","comp","pe"],
  ["chinese","english","math","comp","comp","comp"]
];
// 综合是好几个老师一起带的，占课得知道占的是谁
const COMP_TEACHERS=["physics","chem","bio","politics","history"];
function compTeacherAt(d,p){ return COMP_TEACHERS[(d*6+p)%COMP_TEACHERS.length]; }
function ownerAt(d,p){
  const k=FIXED_TT[d][p];
  return k==="comp"?compTeacherAt(d,p):k;
}
// 晚自习可以排的东西
const EVENING=[
  {id:"chinese",label:"语文自习",cat:"chinese"},
  {id:"math",   label:"数学自习",cat:"math"},
  {id:"english",label:"英语自习",cat:"english"},
  {id:"comp",   label:"综合自习",cat:"comp"},
  {id:"free",   label:"自由活动",cat:null}
];
const SEIZE_LIMIT=2;

function initTimetable(){
  // 交接过来时就是这么排的：十节晚自习全占满，一节都没留
  return { evening:["math","chinese","english","comp","free","math","chinese","english","comp","free"],
           seized:[] };
}
function periodBias(){
  const t=state.periodTotals||{chinese:0,math:0,english:0,comp:0};
  const keys=["chinese","math","english","comp"];
  const sum=keys.reduce((n,k)=>n+(t[k]||0),0);
  if(!sum) return {chinese:1,math:1,english:1,comp:1};
  const out={};
  keys.forEach(k=>out[k]=1+(((t[k]||0)/sum)-0.25)*0.62);
  return out;
}
// 一周排完之后结算：自习提分，自由活动降压，占课额外加成
function applyTimetable(){
  const tt=state.tt||initTimetable();
  const cnt={chinese:0,math:0,english:0,comp:0,free:0};
  tt.evening.forEach(id=>cnt[id]=(cnt[id]||0)+1);
  state.periodTotals=state.periodTotals||{chinese:0,math:0,english:0,comp:0};
  ["chinese","math","english","comp"].forEach(k=>state.periodTotals[k]+=cnt[k]);
  const busy=10-cnt.free;
  // 八节自习两节自由是交接过来的排法，视作零点：加成只来自你自己的调整
  active().forEach(s=>{
    s.study=clamp(s.study+busy*0.30,0,s.ceiling||100);
    s.stress=clamp(s.stress+busy*0.30-cnt.free*1.1);
    s.mood=clamp(s.mood+(cnt.free-2)*0.55);
  });
  state.stats.teaching=clamp(state.stats.teaching+(busy-8)*0.2);
  state.stats.morale=clamp(state.stats.morale+(cnt.free-2)*0.6-(busy>=10?2:0));
  // 占课：你多讲了两节，别人少讲了两节
  tt.seized.forEach(key=>{
    const [d,p]=key.split(",").map(Number);
    const own=ownerAt(d,p);
    active().forEach(s=>{ s.study=clamp(s.study+0.7,0,s.ceiling||100); s.stress=clamp(s.stress+1); });
    if(own==="pe"){ active().forEach(s=>{ s.mood=clamp(s.mood-2.2); }); state.stats.morale=clamp(state.stats.morale-2); }
    else { state.teacherAnger=state.teacherAnger||{}; state.teacherAnger[own]=(state.teacherAnger[own]||0)+1; }
  });
  state.stats.discipline=clamp(state.stats.discipline+(cnt.free>=4?-2:cnt.free<=1?2:0));
  // 拖科效应：长期偏废一科会拖住整体，四科均衡则互相带动
  const tot=state.periodTotals, sum=["chinese","math","english","comp"].reduce((n,k)=>n+tot[k],0);
  if(sum>=16){
    const shares=["chinese","math","english","comp"].map(k=>tot[k]/sum);
    const lo=Math.min(...shares), hi=Math.max(...shares);
    if(lo<0.14) active().forEach(s=>s.study=clamp(s.study-0.55,0,s.ceiling||100));
    else if(hi-lo<0.10) active().forEach(s=>s.study=clamp(s.study+0.3,0,s.ceiling||100));
  }
}

const TT_PRESETS=[
  {id:"balanced",label:"四科轮着来",apply:()=>["math","chinese","english","comp","free","math","chinese","english","comp","free"]},
  {id:"mine",label:"主攻我的科目",apply:()=>{const m=state.subject;return [m,m,"comp",m,"free",m,m,"comp",m,"free"];}},
  {id:"weak",label:"补最弱的一科",apply:()=>{
    const a=active().filter(x=>x.lastSub);
    if(!a.length) return ["math","chinese","english","comp","free","math","chinese","english","comp","free"];
    const keys=["chinese","math","english","comp"];
    const rate=k=>a.reduce((n,s)=>n+s.lastSub[k]/SUBJECT_FULL[k],0)/a.length;
    const w=keys.reduce((x,y)=>rate(x)<rate(y)?x:y);
    return [w,w,w,"comp","free",w,w,"math","comp","free"];
  }},
  {id:"rest",label:"让他们喘口气",apply:()=>["math","free","chinese","free","free","english","free","comp","free","free"]}
];

function renderTimetable(){
  const el=$("#timetable"); if(!el) return;
  const tt=state.tt=state.tt||initTimetable();
  const cnt={}; tt.evening.forEach(id=>cnt[id]=(cnt[id]||0)+1);
  let html=`<div class="tt-grid"><div class="tt-corner"></div>`;
  DAYS.forEach(d=>html+=`<div class="tt-day">周${d}</div>`);
  for(let p=0;p<6;p++){
    html+=`<div class="tt-num">${p+1}</div>`;
    for(let d=0;d<5;d++){
      const key=`${d},${p}`, seized=tt.seized.includes(key);
      const subj=FIXED_TT[d][p], m=SUBJ_META[subj];
      const mine=subj===state.subject;
      const own=ownerAt(d,p), t=TEACHERS.find(x=>x.id===own);
      const can=!seized&&!mine;
      const who=subj==="pe"?"体育课":t?`${t.name}（${t.title}）`:m.name;
      html+=`<div class="tt-cell ${seized?"seized":""} ${mine?"mine":""} ${can?"can-seize":""}" `+
        `${can||seized?`data-seize="${key}"`:""} style="--c:${seized?SUBJ_META[state.subject].color:m.color}" `+
        `title="${seized?`你占了${who}`:who}">${seized?SUBJ_META[state.subject].short:m.short}</div>`;
    }
  }
  for(let p=0;p<2;p++){
    html+=`<div class="tt-num night">晚${p+1}</div>`;
    for(let d=0;d<5;d++){
      const i=p*5+d, id=tt.evening[i], o=EVENING.find(x=>x.id===id);
      const col=id==="free"?"#b7ab95":id==="comp"?"#7a6a9c":SUBJ_META[id]?SUBJ_META[id].color:"#999";
      html+=`<div class="tt-cell night" data-eve="${i}" style="--c:${col}" title="${o.label}">${id==="free"?"休":id==="comp"?"综":SUBJ_META[id].short}</div>`;
    }
  }
  html+=`</div>`;
  const seizeLeft=SEIZE_LIMIT-tt.seized.length;
  html+=`<div class="tt-foot">
    <div class="tt-legend">晚自习 ${10-(cnt.free||0)} 节课 · ${cnt.free||0} 节自由 ｜ 本周还能占 <b>${seizeLeft}</b> 节正课</div>
    <div class="tt-presets">${TT_PRESETS.map(pr=>`<button class="tt-preset" data-preset="${pr.id}">${pr.label}</button>`).join("")}</div>
  </div>`;
  el.innerHTML=html;

  $$('[data-eve]').forEach(c=>c.addEventListener("click",()=>{
    if(state.finished) return;
    const i=+c.dataset.eve, cur=EVENING.findIndex(x=>x.id===state.tt.evening[i]);
    state.tt.evening[i]=EVENING[(cur+1)%EVENING.length].id;
    playTone(500,.04); renderTimetable(); save();
  }));
  $$('[data-seize]').forEach(c=>c.addEventListener("click",()=>{
    if(state.finished) return;
    const key=c.dataset.seize, idx=state.tt.seized.indexOf(key);
    if(idx>=0){ state.tt.seized.splice(idx,1); }
    else if(state.tt.seized.length<SEIZE_LIMIT){
      state.tt.seized.push(key);
      const [dd,pp]=key.split(",").map(Number), own=ownerAt(dd,pp);
      const t=TEACHERS.find(x=>x.id===own);
      toast(own==="pe"?"你占了这周的体育课。":`你占了${t?t.name:"别人"}的一节课。`);
    } else { toast("一周最多只能占两节课。"); return; }
    playTone(430,.05); renderTimetable(); save();
  }));
  $$('[data-preset]').forEach(b=>b.addEventListener("click",()=>{
    const pr=TT_PRESETS.find(x=>x.id===b.dataset.preset);
    state.tt.evening=pr.apply(); playTone(560,.06); renderTimetable(); save();
  }));
}

// ── 任课老师：办公室里有别人 ──────────────────────────────────────
const TEACHERS=[
  {id:"chinese", cat:"chinese", name:"周立群", title:"语文", tag:"带了二十六年，下学期退休", hue:18,
   gripe:"你们班的作文，最近全是套话。三十八篇里有二十九篇开头是‘人生如逆旅’。"},
  {id:"math",   cat:"math",   name:"郑维",   title:"数学", tag:"年级最快的进度", hue:190,
   gripe:"我这门课已经拉了半章，你们班后面十几个人是彻底不管了吗？"},
  {id:"english",cat:"english",name:"林岚", female:true, title:"英语", tag:"入职第三年", hue:230,
   gripe:"我想抓个早读……但是又怕学生烦我。你觉得我该抓吗？"},
  {id:"physics",cat:"comp",   name:"陈海",   title:"综合 · 物理", tag:"一班的班主任", hue:270,
   gripe:"你们班那几个苗子，放在平行班是浪费。要不要我跟教务处说说？"},
  {id:"chem",   cat:"comp",   name:"吴敏", female:true, title:"综合 · 化学", tag:"实验做得最认真", hue:135,
   gripe:"这周实验课又被借走了。孩子们连滴定管都没摸过几次。"},
  {id:"bio",    cat:"comp",   name:"许文昭", title:"综合 · 生物", tag:"从不拖堂", hue:150,
   gripe:"我那部分你们随便占，反正生物就那么点分。不过话说回来，那也是分。"},
  {id:"politics",cat:"comp",  name:"孙桂芳", female:true, title:"综合 · 政治", tag:"年级组长", hue:35,
   gripe:"下周年级排名要公示。你们班的数据，我先给你看一眼。"},
  {id:"history",cat:"comp",   name:"曹叙",   title:"综合 · 历史", tag:"讲课像说书", hue:28,
   gripe:"你们班有个孩子上我的课从来不抬头。我问他名字他都不说。"}
];
function TEACHER_SHORT(t){ return t.title.replace(/^综合 · /,""); }
function teacherOf(id){ return TEACHERS.find(t=>t.id===id)||TEACHERS.find(t=>t.cat===id); }
function tPortrait(t){
  return `<div class="event-portrait avatar-initial" style="--hue:${t.hue}deg">${t.name[0]}</div>`;
}

// 办公室里的对话：有的只是抱怨，有的会告诉你一些你不知道的事
const STAFF_EVENTS=[
  { id:"st_seize", weight:s=>Object.values(s.teacherAnger||{}).some(v=>v>=2)?9:0,
    build:()=>{
      const subj=Object.entries(state.teacherAnger).sort((a,b)=>b[1]-a[1])[0][0];
      const t=teacherOf(subj)||TEACHERS[0];
      return {t,title:`${t.name}站在你桌子旁边`,
        text:`“这个月你占了我${state.teacherAnger[subj]}节课。我不是要跟你争，我是想问——期末我这科考砸了，算谁的？”`,
        choices:[
          {label:"当面道歉，把课还回去",hint:"你少了两节可支配的课时，但办公室里能坐得住了。",
           eff:{prestige:3,teaching:-3},run:()=>{state.teacherAnger[subj]=0;}},
          {label:"“考砸了算我的。”",hint:"你把话接了下来。这句话会有人记着。",
           eff:{teaching:4,prestige:-5},run:()=>{state.teacherAnger[subj]=Math.max(0,state.teacherAnger[subj]-1);}}
        ]};
    }},
  { id:"st_neglect", weight:s=>{
      const t=s.periodTotals||{}; const sum=Object.values(t).reduce((a,b)=>a+b,0);
      if(sum<12) return 0;
      const min=Object.entries(t).sort((a,b)=>a[1]-b[1])[0];
      return min[1]/sum<0.13?8:0;
    },
    build:()=>{
      const t2=state.periodTotals;
      const key=Object.entries(t2).sort((a,b)=>a[1]-b[1])[0][0];
      const t=teacherOf(key)||TEACHERS[4];
      const nm={chinese:"语文",math:"数学",english:"英语",comp:"综合"}[key];
      return {t,title:`${t.name}把一张统计表放在你面前`,
        text:`“这学期的晚自习，${nm}一共排了几节，你自己看。我不是要抢课时，我是怕到时候一科拖死全班。”`,
        choices:[
          {label:"下周开始补回来",hint:"你得从别的科目挪时间。哪一科都不富裕。",
           eff:{prestige:2},run:()=>{state.periodTotals[key]+=4;}},
          {label:"“先保住能提分的。”",hint:"务实。但那门课的均分会一直挂在年级末尾。",
           eff:{teaching:3,prestige:-3},run:()=>{}}
        ]};
    }},
  { id:"st_gripe", weight:()=>6,
    build:()=>{
      const t=TEACHERS[rint(0,TEACHERS.length-1)];
      return {t,title:`${t.name}在办公室叹了口气`,text:`“${t.gripe}”`,
        choices:[
          {label:"接着话头聊下去",hint:"半小时过去了。你少备了一节课，但知道了不少事。",
           eff:{teaching:-2,prestige:4,morale:2},run:()=>{
             const s=byNeed(active())[0];
             if(s) addLog(`${t.name}顺口提到，${s.name}最近在${TEACHER_SHORT(t)}课上状态很差。`);
           }},
          {label:"嗯了一声，继续批作业",hint:`你手上的活确实堆着。${TA(t)}没再说下去。`,
           eff:{teaching:3,prestige:-2},run:()=>{}}
        ]};
    }},
  { id:"st_poach2", weight:s=>s.week>=5?5:0,
    build:()=>{
      const t=teacherOf("physics");
      const top=[...active()].sort((a,b)=>b.study-a.study)[0];
      return {t,title:"陈海把你叫到楼梯口",
        text:`“${top.name}这苗子，跟着你们班是耽误了。一班下学期开小灶，我给${TA(top)}留个位置。你考虑考虑——这话我只跟你说一次。”`,
        choices:[
          {label:"“他是七班的。”",hint:"你把话堵死了。陈海笑了笑，说好，然后走了。",
           eff:{trust:6,morale:4,prestige:-6},run:()=>{}},
          {label:"“我问问孩子自己的意思。”",hint:"你没替他做决定。但这件事从此在他心里立着。",
           eff:{prestige:2},run:()=>{ if(top) {top.mood=clamp(top.mood-6); top.stress=clamp(top.stress+5);} }}
        ]};
    }},
  { id:"st_rep", weight:()=>7,
    build:()=>{
      const reps=active().filter(s=>/课代表/.test(s.tag));
      const r=reps.length?reps[rint(0,reps.length-1)]:active()[0];
      const subjName=(r.tag.match(/^(\S+?)课代表/)||[])[1]||"语文";
      const worst=byNeed(active()).filter(x=>x!==r)[0];
      return {t:TEACHERS[rint(0,TEACHERS.length-1)],portrait:portraitHTML(r),
        title:`${r.name}抱着一摞作业本进来`,
        text:`“老师，${subjName}作业还差六个人没交。${worst?`还有……${worst.name}这两周一直是空白，我不知道要不要写在名单上。`:""}”`,
        choices:[
          {label:"“写上。规矩就是规矩。”",hint:"名单交上去了。第二天那六个人补齐了，其中一个没跟你说话。",
           eff:{discipline:7,trust:-4},run:()=>{}},
          {label:"“先别写，我去问问。”",hint:"你替他兜住了这一次。课代表点点头，说好。",
           eff:{trust:6,discipline:-3},run:()=>{ if(worst){worst.mood=clamp(worst.mood+7);worst.stress=clamp(worst.stress-8);} }},
          {label:"“辛苦你了，本子放这儿吧。”",hint:"你先谢了她。这句话她记了很久。",
           eff:{trust:4,morale:3},run:()=>{ r.mood=clamp(r.mood+8); r.trust=clamp(r.trust+8); }}
        ]};
    }}
];

function drawStaffEvent(){
  const pool=STAFF_EVENTS.map(e=>({e,w:e.weight(state)})).filter(x=>x.w>0);
  if(!pool.length) return null;
  const total=pool.reduce((n,x)=>n+x.w,0);
  let r=rand()*total;
  for(const x of pool){ r-=x.w; if(r<=0) return x.e; }
  return pool[0].e;
}
function showStaffEvent(ev,next){
  const d=ev.build();
  openModal({eyebrow:"办公室",title:d.title,
    body:`<div class="event-scene">${d.portrait||tPortrait(d.t)}<div class="dialogue">${d.text}</div></div>`,
    choices:d.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const del=applyEff(c.eff); c.run&&c.run();
      addLog(`办公室：${d.title.replace(/老师.*/,"老师")}——${c.label}`);
      closeModal(false);
      showOutcome({title:c.label,text:c.hint,portrait:d.portrait||tPortrait(d.t),delta:del},next);
    }}))});
}

const RIVALS = [
  {name:"高三（1）班", teacher:"物理 · 实验班", color:"#b45a48", score:515, growth:4.6, push:2.2, react:1.0,
   note:"一班从来不用担心生源"},
  {name:"高三（2）班", teacher:"数学 · 重点班", color:"#c17a3f", score:518, growth:4.0, push:1.6, react:.9,
   note:"二班的班主任住在学校"},
  {name:"高三（3）班", teacher:"英语 · 重点班", color:"#5d789d", score:513, growth:3.8, push:1.5, react:.8,
   note:"三班上个月刚换了数学老师"},
  {name:"高三（4）班", teacher:"语文 · 平行班", color:"#6e8f6a", score:514, growth:3.2, push:1.1, react:.6,
   note:"四班跟你们情况差不多"},
  {name:"高三（5）班", teacher:"化学 · 平行班", color:"#8a7ba8", score:502, growth:2.9, push:1.0, react:.5,
   note:"五班的班主任带着两个班"},
  {name:"高三（6）班", teacher:"历史 · 平行班", color:"#9c7b5e", score:490, growth:2.6, push:.8, react:.4,
   note:"六班的晚自习纪律一直不好"},
  {name:"高三（8）班", teacher:"美术 · 艺术班", color:"#7fa0a8", score:449, growth:2.0, push:.5, react:.2,
   note:"八班的孩子这个月都在外面考试"}
];
// 别的班这周在干什么
const RIVAL_MOVES=[
  {t:r=>`${r.name}这周开始上晚三了，十点半才放学。`, g:2.6},
  {t:r=>`${r.name}把后二十名单独编了个小班，抽晚自习补课。`, g:2.2},
  {t:r=>`${r.name}请了市里的教研员来押题，全年级只有他们班去听。`, g:2.4},
  {t:r=>`${r.name}的班主任把办公桌搬进了教室后面。`, g:2.0},
  {t:r=>`${r.name}周末加了两个半天，家长联名同意的。`, g:2.8},
  {t:r=>`${r.name}和别的班串了一次联考，据说均分很好看。`, g:1.4},
  {t:r=>`${r.name}这周有两个学生转学走了，班主任在办公室坐了很久。`, g:-2.6},
  {t:r=>`${r.name}闹了一次集体请假，年级组通报批评。`, g:-3.0},
  {t:r=>`${r.name}的班主任病倒了，这周是别的老师在代。`, g:-2.2}
];


const ICONS = {
  book:'<svg viewBox="0 0 24 24"><path d="M4 5.5c2.8-1.4 5.3-.8 8 1.2v12c-2.7-2-5.2-2.6-8-1.2z"/><path d="M20 5.5c-2.8-1.4-5.3-.8-8 1.2v12c2.7-2 5.2-2.6 8-1.2z"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M20.5 9c0 5-8.5 10-8.5 10S3.5 14 3.5 9A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2z"/></svg>',
  people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M15 15c3.7-.8 6 1 6 4"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M7 3h3l1 4-2 1c1.2 3 2.8 4.7 6 6l1-2 4 1v3c0 2-1.5 3-3.5 2.5C10 17 6 13 4.5 6.5 4 4.5 5 3 7 3z"/></svg>',
  moon:'<svg viewBox="0 0 24 24"><path d="M19 15.5A8 8 0 0 1 8.5 5a8 8 0 1 0 10.5 10.5z"/></svg>',
  sound:'<svg viewBox="0 0 24 24"><path d="M5 10h4l5-4v12l-5-4H5z"/><path d="M17 9c1 1 1 5 0 6M20 6c3 3 3 9 0 12"/></svg>',
  help:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 0 1 4.5.6c0 2-2.3 2.2-2.3 4M12 17.5h.01"/></svg>',
  reset:'<svg viewBox="0 0 24 24"><path d="M4 4v6h6"/><path d="M5.5 15a8 8 0 1 0 .5-7l-2 2"/></svg>',
  album:'<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M12 8l2 2 3-3"/></svg>'
};

// ── 周事件池：不重复抽取，部分事件带前置条件 ──────────────────────────
const WEEK_EVENTS = [
  { id:"phone", title:"走廊里的手机", portrait:"portrait-xuhui",
    text:"晚自习前，徐慧在饮水机旁捡到一部正在录音的手机。几个学生说，这只是为了记录老师押题。",
    choices:[
      {label:"公开说明边界，把手机还回去", hint:"规则说清了，学生的体面也留住了。但没人相信这事到此为止。", eff:{discipline:5,trust:3,morale:-1}, flag:"phoneSoft"},
      {label:"当场收缴全班手机，逐个检查", hint:"纪律立竿见影。今晚会有五个家长在群里看到这条消息。", eff:{discipline:9,trust:-7,morale:-5}, flag:"phoneRaid"}
    ]},
  { id:"countdown", title:"黑板上的倒计时", portrait:"portrait-xuhui",
    text:"有人把“距高考”后面的数字改成了“距自由”。教室里笑成一片，学习委员板着脸站起来要擦掉。",
    choices:[
      {label:"留到明天再擦", hint:"绷了三周的弦松了一格。学习委员当晚交了一份辞呈。", eff:{morale:7,discipline:-3,trust:3}, flag:"freeJoke"},
      {label:"擦掉，并让全班默写高考时间", hint:"没人再开玩笑了。也没人再说话。", eff:{discipline:6,morale:-6,teaching:1}, flag:"freeErased"}
    ]},
  { id:"observe", title:"校长推门听课", portrait:"portrait-principal",
    text:"陈校长没提前通知，带着听课本坐进最后一排。今天恰好是你试验新教法的第一天。",
    choices:[
      {label:"照原计划上", hint:"课有点乱，但学生真的在想。校长的本子记了很多行。", eff:{prestige:-3,teaching:5,trust:3,morale:3}, flag:"showedReal"},
      {label:"临时切回标准套路", hint:"四平八稳。校长挑不出错，学生也知道你今天在演给谁看。", eff:{prestige:5,teaching:1,trust:-4}, flag:"showedSafe"}
    ]},
  { id:"note", title:"一张没有署名的纸条", portrait:"portrait-xuhui",
    text:"讲台抽屉里有张纸条：“老师，如果努力了还是考不好，那努力还有用吗？”",
    choices:[
      {label:"在全班认真回应这个问题", hint:"好几个低着的头慢慢抬了起来。也有人当场哭了，那节课没上完。", eff:{morale:8,trust:7,teaching:-3}, flag:"answeredNote"},
      {label:"当作没看见，讲课", hint:"进度保住了。那张纸条你留在了抽屉里，一直到毕业。", eff:{teaching:4,morale:-6,trust:-4}, flag:"ignoredNote"}
    ]},
  { id:"groupchat", title:"家长群里的截图", portrait:"portrait-principal",
    text:"你上周说的“分数不是唯一标准”被截了图，配文是“这样的班主任能带高三？”。已经转了两百多次。",
    choices:[
      {label:"在群里逐条回应，把话说完", hint:"你花了整整一晚。有家长道歉了，也有人退了群。", eff:{prestige:2,trust:5,morale:2}, flag:"defendedSelf"},
      {label:"沉默，让它自己过去", hint:"三天后没人再提。但办公室里已经开始有人绕着你走。", eff:{prestige:-6,trust:-2,morale:-3}, flag:"stayedSilent"}
    ]},
  { id:"poach", title:"隔壁班的邀请", portrait:"portrait-principal", req:s=>!s.students.find(x=>x.id==="linxiaoyu").out,
    text:"高三（1）班主任想把林小雨借调去参加尖子生集训，为期六周。他说：为了学校的清北指标。",
    choices:[
      {label:"放人", hint:"学校指标好看了。你的班少了一根顶梁柱，也少了一个你答应过要照顾的人。", eff:{prestige:8,morale:-7,trust:-6}, flag:"lentAway"},
      {label:"顶回去", hint:"你护住了她。也得罪了年级组长，和他背后那张排课表。", eff:{trust:7,morale:4,prestige:-8}, flag:"refusedPoach"}
    ]},
  { id:"rankboard", title:"教务处的公示栏", portrait:"portrait-principal",
    text:"学校要求每周把班级排名和后十名学生名单张贴在走廊。你可以申请豁免，但要写情况说明。",
    choices:[
      {label:"照章张贴", hint:"竞争氛围起来了。后十名里有三个是你班的，其中一个连着两天没来。", eff:{teaching:5,discipline:4,morale:-9,trust:-6}, flag:"postedRanks"},
      {label:"申请豁免，写那份说明", hint:"名单没贴出去。你的说明被年级会当作反面案例念了一遍。", eff:{trust:8,morale:6,prestige:-7}, flag:"refusedRanks"}
    ]},
  { id:"nightout", title:"晚自习的三个空座", portrait:"portrait-xuhui",
    text:"连续第三天了。保安说看见有学生从后墙翻出去，进了网吧。其中一个背影很像周扬。",
    choices:[
      {label:"半夜去网吧把人带回来", hint:"你找到了他们。第二天全年级都知道七班班主任去网吧抓人。", eff:{discipline:8,trust:4,prestige:-4,morale:-2}, flag:"caughtThem"},
      {label:"第二天在班上等他们自己说", hint:"你给了台阶。两个人承认了，第三个人再也没提过。", eff:{trust:6,discipline:-5,morale:2}, flag:"waitedThem"}
    ]},
  { id:"gift", title:"办公桌上的纸袋", portrait:"portrait-principal",
    text:"某位家长走后，你的抽屉里多了一个信封。厚度很实在。他孩子下周要竞选保送推荐名额。",
    choices:[
      {label:"当天退回去，什么都不说", hint:"钱退了，事没完。那位家长从此逢人就说你架子大。", eff:{prestige:-4,trust:3,discipline:3}, flag:"refusedGift"},
      {label:"交到纪检，走正式流程", hint:"你做得完全正确。那个孩子第二天被同学问：你爸是不是送钱了？", eff:{prestige:6,discipline:6,morale:-6,trust:-3}, flag:"reportedGift"}
    ]},
  { id:"faculty", title:"教研组的沉默", portrait:"portrait-principal",
    text:"老教师在会上说：“年轻人搞那些花样，出了成绩算你的，出了事谁负责？”会议室里没人接话。",
    choices:[
      {label:"当场把你的数据摆出来", hint:"你赢了这场争论。也让在座每个人记住了你不好相处。", eff:{teaching:5,prestige:-6,trust:2}, flag:"foughtFaculty"},
      {label:"点头，会后照旧", hint:"表面服软，暗地照做。你开始需要向所有人解释每一件小事。", eff:{prestige:3,teaching:-3,morale:-2}, flag:"bowedFaculty"}
    ]},
  { id:"petition", title:"一封联名信", portrait:"portrait-xuhui",
    text:"三十一个签名，要求更换物理老师。那位老师带了二十六年书，下学期就要退休。",
    choices:[
      {label:"把信递上去", hint:"你替学生说了话。那位老师在楼道里跟你擦肩而过，没有看你。", eff:{trust:9,morale:5,prestige:-9}, flag:"sentPetition"},
      {label:"压下来，自己帮他们补物理", hint:"你多担了一门课。夜里的时间不够用了，你的课也开始将就。", eff:{teaching:-6,trust:6,morale:3}, flag:"heldPetition"}
    ]},
  { id:"checkup", title:"体检报告", portrait:"portrait-teacher",
    text:"甲状腺结节，建议三个月复查。复查日期正好卡在一模那一周。",
    choices:[
      {label:"请假去查", hint:"两天不在，班里出了两件事。但你至少知道了结果。", eff:{teaching:-5,morale:-4,discipline:-3}, flag:"tookLeave"},
      {label:"改到高考以后", hint:"你把单子折起来放进抽屉。这三个月，你会一直记得它在那里。", eff:{teaching:4,trust:2}, flag:"delayedHealth"}
    ]},
  { id:"clinic", title:"校医室的电话", portrait:"portrait-xuhui", req:s=>s.students.some(x=>!x.out&&x.stress>=78),
    text:"“你们班有个学生在早读时晕倒了。血压不低，就是长期没睡好。家长在赶来的路上。”",
    choices:[
      {label:"当天下午改早读为自习，全班多睡四十分钟", hint:"你动了作息表。年级组要你写一份说明，成绩掉了要你负责。", eff:{morale:8,prestige:-6,teaching:-4}, flag:"cutMorning"},
      {label:"个别处理，作息不动", hint:"其他人照旧六点二十到校。这个月还会有第二个、第三个。", eff:{teaching:3,discipline:3,morale:-7}, flag:"keptMorning"}
    ]},
  { id:"flu", title:"教室里此起彼伏的咳嗽", portrait:"portrait-xuhui",
    text:"一周之内请了十一个假。校医说是甲流，建议停课三天通风消毒。年级组说，别的班都没停。",
    choices:[
      {label:"停三天，把课挪到线上", hint:"你是年级唯一停课的班。三天后回来，教室里干净了，进度落下了。", eff:{teaching:-7,morale:7,discipline:-3}, flag:"fluStop"},
      {label:"照常上课，发口罩和板蓝根", hint:"进度保住了。第二周请假的人数变成了十九个。", eff:{teaching:3,morale:-8}, flag:"fluPush"}
    ]},
  { id:"storm", title:"暴雨预警", portrait:"portrait-principal",
    text:"橙色预警，市里通知中小学停课，高三年级自愿。走读生家长群已经炸了，住校生倒是无所谓。",
    choices:[
      {label:"全班停一天，走读生别来了", hint:"安全第一。第二天有家长在群里说，别的班可都上着呢。", eff:{teaching:-5,morale:5,prestige:-3}, flag:"stormOff"},
      {label:"照常，来不了的算事假", hint:"来了三十一个人。那节课你讲得很好，可惜有十七个人没听着。", eff:{teaching:2,morale:-5,discipline:-4}, flag:"stormOn"}
    ]},
  { id:"blackout", title:"停电的晚自习", portrait:"portrait-xuhui",
    text:"晚上八点四十，整栋楼黑了。走廊里全是尖叫和手机手电筒的光。物业说线路老化，最快也要一个半小时。",
    choices:[
      {label:"点蜡烛继续上", hint:"你从值班室搬来一箱蜡烛。那节晚自习后来被很多人写进了周记。", eff:{morale:9,teaching:1,discipline:3}, flag:"candleNight"},
      {label:"提前放学，让他们回宿舍", hint:"最稳妥的处理。一个半小时的自习时间没了。", eff:{teaching:-4,morale:3}, flag:"blackoutHome"}
    ]},
  { id:"canteen", title:"食堂那顿饭", portrait:"portrait-principal",
    text:"晚饭后有六个学生肚子疼，两个去了医院。食堂说是个人体质问题。家长群里已经有人在拍照。",
    choices:[
      {label:"带头去食堂查，把事情捅上去", hint:"你得罪了后勤处。三天后食堂换了供货商，没人跟你说谢谢。", eff:{prestige:-8,trust:11,morale:6}, flag:"canteenFight"},
      {label:"安抚家长，让学校去处理", hint:"事情压下去了。此后一个月，班上有十几个人开始订外卖。", eff:{prestige:4,trust:-6,morale:-4}, flag:"canteenHush"}
    ]},
  { id:"leak", title:"外流的押题卷", portrait:"portrait-principal",
    text:"你熬夜编的模拟卷出现在了某个付费群里，标价三十八元。上传者IP来自本校。",
    choices:[
      {label:"追查到底", hint:"三天后查到了人。是隔壁班一个成绩很好的孩子。他母亲跪在了办公室门口。", eff:{discipline:7,prestige:3,morale:-5,teaching:-3}, flag:"chasedLeak"},
      {label:"重编一套，不再外发", hint:"你把损失自己吞了。从此每份卷子都要多花一倍时间。", eff:{teaching:-6,trust:4,morale:2}, flag:"swallowedLeak"}
    ]}
];

// ── 闲笔：不是每周都出大事。有些周只是一只仓鼠、一首歌、一根绳子 ──────
function pickBgStudent(pred){
  const pool=active().filter(s=>!s.key&&(!pred||pred(s)));
  return pool.length?pool[rint(0,pool.length-1)]:active()[0];
}
const LIGHT_MOMENTS=[
  { id:"lm_hamster", build:()=>{
      const s=state.students.find(x=>x.name==="高振宇"&&!x.out)||pickBgStudent();
      return {title:"储物柜里有动静", portrait:portraitHTML(s),
        text:`生活委员${s.name}的储物柜里传出窸窸窣窣的声音。打开一看，一只仓鼠，笼子上贴着标签：「高三（7）班编外学生 · 高考必胜」。全班都知道，就你不知道。养了多久，没人肯说。`,
        choices:[
          {label:"“留下可以。高考完带走。”",hint:"你多了四十八个同谋。周五起，笼子旁边开始定期出现菜叶。",eff:{morale:5,discipline:-3},flag:"hamsterStay"},
          {label:"“校规就是校规，今天带回家。”",hint:`${s.name}抱着笼子走的时候，全班目送。那节课安静得过分。`,eff:{discipline:4,morale:-5}}]};
    }},
  { id:"lm_nickname", build:()=>({title:"楼梯口听来的外号",
      text:"你在楼梯口听见两个学生聊天，提到一个外号。走出几步你才反应过来——说的是你。外号不难听，甚至有点贴切，这才是最气人的。",
      choices:[
        {label:"记下了，没吭声",hint:"第二天你在班上把这个外号自己说了出来。全班安静两秒，笑倒一片。",eff:{trust:4,morale:4,prestige:-2},flag:"nickKept"},
        {label:"当场回头",hint:"两个人僵在原地。这个外号从此没人敢叫了——他们换了一个更难听的。",eff:{discipline:3,trust:-3}}]})},
  { id:"lm_comic", build:()=>({title:"黑板右下角的连载",
      text:"黑板右下角出现了四格漫画，一周一更，主角是个拿三角板的火柴人，发型和你一模一样。这周更新的那格里，火柴人说：「这道题不难。」底下画满了全班的问号。",
      choices:[
        {label:"在旁边画一格回应",hint:"你画得很丑。但连载从此多了一个角色，更新频率变成一周两更。",eff:{morale:5,trust:3,teaching:-1}},
        {label:"擦掉。黑板是用来写字的",hint:"连载停更了。两周后你在一本作业本的背面看到了大结局。",eff:{discipline:3,morale:-3}}]})},
  { id:"lm_radio", build:()=>({title:"课间广播点歌",
      text:"周三课间，广播站放了一首老歌，点歌人落款「高三（7）班的四十八只青蛙」。第一句歌词是「最近比较烦」。班上笑作一团，隔壁班纷纷探头。",
      choices:[
        {label:"在后门站着听完",hint:"整首。有人看见了你，没人说破。",eff:{morale:4,trust:2,discipline:-1}},
        {label:"查是谁点的",hint:"没查出来。倒是广播站从此不敢接七班的单子了。",eff:{discipline:2,morale:-3}}]})},
  { id:"lm_eraser", build:()=>{
      const s=state.students.find(x=>x.name==="张思远"&&!x.out)||pickBgStudent();
      return {title:"橡皮占卜", portrait:portraitHTML(s),
        text:`考试临近，班里流行起橡皮占卜：六个面写上 A、B、C、D 和「再想想」「相信自己」，不会的题就掷一把。${s.name}那块橡皮已经盘出包浆了。`,
        choices:[
          {label:"没收之前，先掷了一把",hint:"你掷出了「再想想」。全班起哄。橡皮照旧没收，但这一把大家记了很久。",eff:{morale:5,discipline:-2}},
          {label:"统一没收，考场不许带",hint:"占卜风停了。有人在草稿纸上画了个骰子，聊胜于无。",eff:{discipline:4,morale:-4}}]};
    }},
  { id:"lm_cat", build:()=>({title:"后窗跳进来一只橘猫",
      text:"一只橘猫从后窗跳进教室，径直走到讲台边坐下，熟练得不像第一次来。你看向全班，四十八张脸整齐地写着「我不知道」。窗台上有一排藏了很久的火腿肠。",
      choices:[
        {label:"“它可以旁听。别耽误做题。”",hint:"橘猫从此在最后一排有了固定座位。它睡觉的时候，那一片的自习格外安静。",eff:{morale:5,discipline:-2}},
        {label:"关窗，把猫送出去",hint:"猫送走了。之后两周，总有人下课往操场那边看。",eff:{discipline:3,morale:-4}}]})},
  { id:"lm_sleep", build:()=>{
      const s=state.students.find(x=>x.name==="石斛"&&!x.out)||pickBgStudent();
      return {title:"年级群里的照片", who:s, portrait:portraitHTML(s),
        text:`体育老师转来一张照片：${s.name}在体操垫上睡着了，睡姿标准得像教学示范。配文已经在年级群传开：「高三（7）班，养精蓄锐」。`,
        choices:[
          {label:"回了一句：说明我们班心态好",hint:`年级群难得笑了一次。${s.name}第二天顶着表情包上学，泰然自若。`,eff:{morale:4,prestige:-2}},
          {label:"把人叫来，问问作息",hint:`${TA(s)}说晚上两点睡，在打一个通关过很多遍的游戏。你们聊了十分钟游戏。`,eff:{trust:6,stress:-4,teaching:-1}}]};
    }},
  { id:"lm_tug", req:s=>s.week>=4, build:()=>{
      const s=state.students.find(x=>x.name==="吴俊熙"&&!x.out)||pickBgStudent();
      return {title:"运动会只剩最后一个项目", portrait:portraitHTML(s),
        text:`春季运动会压轴是拔河，对面是高三（1）班，陈海站在队伍最前面压阵。体育委员${s.name}回头看你，意思很明显：老师，上不上？`,
        choices:[
          {label:"把外套脱了，排在最后一个",hint:"绳子那头是实验班，这头是你和四十七个人。赢了。那天下午没人做题，你也没催。",eff:{morale:8,teaching:-3},flag:"tugWin"},
          {label:"站在边上喊加油",hint:`输了半米。${s.name}说，老师你要是上了肯定赢。你说行，明年。这话你们俩都没接下去。`,eff:{teaching:2,morale:-2}}]};
    }},
  { id:"lm_snack", build:()=>{
      const boss=pickBgStudent(x=>x.study<60);
      return {title:"抽屉里的辣条生意", portrait:portraitHTML(boss),
        text:`纪律委员来报：晚自习有人用抽屉做辣条生意，明码标价，还能赊账。老板是${boss.name}。账本你看到了——记得比${TA(boss)}的数学作业工整十倍。`,
        choices:[
          {label:"罚老板请全班吃一次，免费",hint:"「破产清算」那天全班分辣条，老板肉疼但骄傲。生意再没做过，账本留着当了纪念。",eff:{morale:5,trust:2,discipline:-1}},
          {label:"取缔，账本没收",hint:"生意转入地下，价格涨了五毛。",eff:{discipline:3,morale:-3}}]};
    }},
  { id:"lm_countdown2", build:()=>({title:"倒计时牌的小字",
      text:"后门的高考倒计时牌下面，不知什么时候多了一行小字：「也是距离食堂三楼新窗口开业」。字很小，但全班都知道。擦倒计时的值日生每天都小心地绕开那行字。",
      choices:[
        {label:"假装没看见",hint:"那行小字活到了高考前一天。最后一天，有人在后面补了个句号。",eff:{morale:3,discipline:-1}},
        {label:"让值日生一起擦掉",hint:"擦掉了。第二天出现在了前门。",eff:{discipline:2,morale:-2}}]})}
];
function drawLight(){
  const used=state.usedLights||[];
  const pool=LIGHT_MOMENTS.filter(e=>!used.includes(e.id)&&(!e.req||e.req(state)));
  if(!pool.length) return null;
  return pool[rint(0,pool.length-1)];
}
function showLight(ev,next){
  state.usedLights=(state.usedLights||[]).concat(ev.id);
  const d=ev.build();
  const p=d.portrait||'<div class="event-portrait portrait-xuhui"></div>';
  openModal({eyebrow:"教室一角",title:d.title,
    body:`<div class="event-scene">${p}<div class="dialogue">${d.text}</div></div>`,
    choices:d.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const del=applyEff(c.eff,d.who||null); setFlag(c.flag); addLog(`${d.title}：${c.label}。`); closeModal(false);
      showOutcome({title:c.label,text:c.hint,portrait:p,delta:del},next);
    }}))});
}

// ── 日历彩蛋：有些日子不看课表，看日历 ────────────────────────────────
const DATE_EGGS=[
  { id:"eggFool", week:4, build:()=>({title:"四月一日备忘录",
      text:"上周三是愚人节。你走进教室，讲台上放着一杯泡好的枸杞茶，黑板上写着「老师辛苦了」，全班坐姿标准得可疑。你喝到一半，杯底的跳跳糖开始炸。",
      choices:[
        {label:"面不改色，喝完，说了声谢谢",hint:"全班憋笑憋到内伤。这份定力后来被写进了至少七本周记。",eff:{morale:6,trust:3,discipline:-2},flag:"foolDrank"},
        {label:"当场破功，笑出了声",hint:"计划圆满成功，策划组当场击掌。那节课前十分钟没法上。",eff:{morale:7,trust:2,discipline:-4}}]})},
  { id:"eggMay4", week:8, build:()=>{
      const s=state.students.find(x=>x.name==="周语彤"&&!x.out)||pickBgStudent();
      return {title:"五月四日，十八岁", portrait:portraitHTML(s),
        text:`学校统一办十八岁成人仪式，每人要收到一封家长的信。团支书${s.name}统计到最后发现，有三个孩子的信凑不齐——家长联系不上，或者说自己写不来。`,
        choices:[
          {label:"那三封，你来写",hint:"你写到了十一点多。仪式上没人知道哪三封是你写的，包括站在你旁边的同事。",eff:{trust:6,morale:4,teaching:-3},flag:"wroteLetters"},
          {label:"让同桌互相写",hint:"同桌给同桌写。有几封写得比家长的还长。",eff:{morale:5,trust:2,discipline:-1}}]};
    }}
];
function dueEgg(){
  return DATE_EGGS.find(e=>e.week===state.week&&!(state.usedLights||[]).includes(e.id));
}

// ── 后果链：每个重大选择都会在若干周后回旋镖式兑现 ─────────────────────
const CALLBACKS = [
  { id:"cb_mother", flag:"motherComplaint", after:2, portrait:"portrait-principal", echo:"你回办公室的时候，座机上有两个未接来电，是同一个号码。", title:"教务处的一次谈话",
    text:"“林小雨的母亲来了三趟了。她说你在离间她们母女。”校长把投诉信推过来，没有让你坐下。",
    choices:[
      {label:"坚持你的判断，签字确认", hint:"你把名字写在了那封信下面。年度考核栏里，这一笔擦不掉。", eff:{prestige:-8,trust:6,morale:3}, flag:"stoodGround"},
      {label:"写检讨，恢复每日发排名", hint:"投诉撤了。林小雨没问为什么，只是又开始每天最后一个离开教室。", eff:{prestige:5,who:"linxiaoyu",trust:-9,stress:12,mood:-8}, flag:"foldedUnderPressure"}
    ]},
  { id:"cb_lin_abandon", flag:"linAbandoned", after:2, portrait:"portrait-linxiaoyu", echo:"她把药盒放进了书包最里层的夹袋。", title:"药盒",
    text:"她书包侧袋里的褪黑素只剩两粒。一整盒是三十粒，你上周才给的。",
    choices:[
      {label:"立刻联系家长和校医", hint:"事情闹大了。你保住了她，也把她的名字送进了年级的会议记录。", eff:{who:"linxiaoyu",stress:-22,mood:6,study:-12}, flag:"linSaved"},
      {label:"只是没收药盒", hint:"你选择了不惊动任何人。距高考还有很多个凌晨四点。", eff:{who:"linxiaoyu",stress:6,mood:-6,trust:-8}, flag:"linUnwatched"}
    ]},
  { id:"cb_zhou_exempt", flag:"zhouExempt", after:2, portrait:"portrait-xuhui", echo:"学习委员把班规重新抄了一遍，贴在讲台边上。", title:"第二份免签申请",
    text:"这周有六个人以“训练”为由申请免早读。其中四个根本不在校队。学习委员把名单拍在你桌上：“老师，规则是您定的。”",
    choices:[
      {label:"承认标准出了问题，重新公示班规", hint:"你当着全班认了错。纪律回来了一半，威信少了一半。", eff:{discipline:6,trust:4,prestige:-5}, flag:"rulesRewritten"},
      {label:"全部批准，把口子彻底放开", hint:"再没人为难你。早读教室从此只坐得下十几个人。", eff:{morale:4,discipline:-11,teaching:-4}, flag:"rulesGone"}
    ]},
  { id:"cb_zhou_punish", flag:"zhouPunished", after:3, portrait:"portrait-zhouyang", echo:"他一整天没抬头。放学最后一个走的，不是他。", title:"最后一排的三个人",
    text:"周扬把两个体育生也带到了最后一排。他们不吵不闹，只是整节课都不抬头。",
    choices:[
      {label:"把他们三个调回前排，一个一个谈", hint:"要花掉你接下来两周所有的课余时间。", eff:{who:"zhouyang",trust:7,mood:6,study:5,teaching:-5}, flag:"pulledBack"},
      {label:"随他们去，先保住剩下的人", hint:"你做了取舍。班里从此有了一块谁都不去看的角落。", eff:{morale:-7,who:"zhouyang",study:-9,mood:-6}, flag:"wroteThemOff"}
    ]},
  { id:"cb_cheng_cover", flag:"chengCovered", after:3, portrait:"portrait-principal", echo:"教务处的干事把这学期的排课表复印了一份带走。", title:"师德档案",
    text:"教务处核实了结对辅导的排课记录——没有这项安排。“老师，你替学生撒了个谎。”",
    choices:[
      {label:"承认，接受处分", hint:"记过一次，评优取消。程默在门口站了很久，没敢进来。", eff:{prestige:-10,who:"chengmo",trust:12,mood:9,stress:-8}, flag:"tookTheFall"},
      {label:"改口，把责任交回学生", hint:"你的档案干净了。程默没有辩解，只是把座位换到了最后一排靠墙。", eff:{prestige:4,who:"chengmo",trust:-14,mood:-12,stress:13}, flag:"traded"}
    ]},
  { id:"cb_cheng_report", flag:"chengReported", after:2, portrait:"portrait-zhouyang", echo:"处分公示贴在楼道最显眼的位置，要贴七天。", title:"记过之后",
    text:"周扬的处分公示贴了七天。他不再交数学作业了，理由是“反正抄了也算作弊”。",
    choices:[
      {label:"公开撤销对周扬的连带处分", hint:"你越了权。教务主任第二天就找上门。", eff:{who:"zhouyang",trust:9,mood:10,study:6,prestige:-7}, flag:"undidPunish"},
      {label:"维持原判", hint:"规矩是规矩。他的数学从此停在了那一天。", eff:{discipline:5,who:"zhouyang",study:-11,mood:-8}, flag:"heldPunish"}
    ]},
  { id:"cb_lu_exposed", flag:"luExposed", after:2, portrait:"portrait-luming", echo:"班会开到一半，后排有人举着手机，屏幕一直亮着。", title:"班会录音",
    text:"那场澄清班会被人录了下来，传回了他原来的学校。旧贴子下面多了一句：“他现在的老师都替他说话了。”",
    choices:[
      {label:"联系对方学校，正式要求删帖", hint:"走流程要两个月。你还是发了那封函。", eff:{who:"luming",trust:8,stress:-6,teaching:-4,prestige:-3}, flag:"escalated"},
      {label:"不再插手，让他自己决定", hint:"他谢谢你。然后连着请了三天假。", eff:{who:"luming",stress:9,mood:-7,study:-6}, flag:"steppedBack"}
    ]},
  { id:"cb_su_voice", flag:"suVoice", after:3, portrait:"portrait-suqing", echo:"开庭通知书压在她的作文本底下，日期是下个月八号。", title:"开庭日",
    text:"法院真的问了她。她在两个大人中间站了四十分钟，回来后交了一篇满分作文，题目是《旁听》。",
    choices:[
      {label:"把这篇文章留在她自己手里", hint:"最好的一篇作品，不会有人看见。", eff:{who:"suqing",trust:10,mood:8,stress:-10}, flag:"suKept"},
      {label:"推荐去参赛", hint:"她会拿奖。她的家事也会被更多人读到。", eff:{who:"suqing",study:8,stress:8,mood:-3,prestige:6}, flag:"suSubmitted"}
    ]},
  { id:"cb_phone_raid", flag:"phoneRaid", after:2, portrait:"portrait-principal", echo:"晚上十一点，家长群还在响。", title:"家长群的第四十七条",
    text:"“搜身式检查”“侵犯隐私”“建议换班主任”。截图已经发到了校长信箱。",
    choices:[
      {label:"开家长会，把当晚的情况讲清楚", hint:"讲了两个半小时。走的时候有家长握了你的手，也有人提前离场。", eff:{prestige:3,trust:5,teaching:-4}, flag:"facedParents"},
      {label:"由学校统一回复", hint:"你不用出面了。学生知道你没出面。", eff:{prestige:-4,trust:-7,morale:-4}, flag:"hidBehindSchool"}
    ]},
  { id:"cb_refused_ranks", flag:"refusedRanks", after:3, portrait:"portrait-principal", echo:"你的情况说明被收进了年级组的文件夹，没人当面提。", title:"年级会上的点名",
    text:"“个别班主任把学生的情绪看得比升学率重。”会议室里所有人都知道说的是谁。",
    choices:[
      {label:"当场站起来把话说完", hint:"你说完了。掌声没有，但当晚有三个年轻老师给你发了消息。", eff:{prestige:-6,morale:6,trust:6}, flag:"spokeUp"},
      {label:"会后补贴一份名单", hint:"名单贴出去了。第二天有个孩子在公示栏前站了很久。", eff:{prestige:6,morale:-8,trust:-6}, flag:"caved"}
    ]},
  { id:"cb_posted_ranks", flag:"postedRanks", after:2, portrait:"portrait-xuhui", echo:"公示栏前那天下午一直有人站着。", title:"公示栏前",
    text:"后十名名单挂了两周。今天有家长打电话来问：“为什么我孩子的名字要贴在楼道里？”",
    choices:[
      {label:"撤下名单，自己承担后果", hint:"你违反了年级规定。楼道空了，你的麻烦满了。", eff:{morale:8,trust:7,prestige:-8}, flag:"tookDown"},
      {label:"照贴", hint:"分数确实提上来了一点。代价写在那十个人的脸上。", eff:{teaching:4,morale:-8,trust:-5}, flag:"keptPosting"}
    ]},
  { id:"cb_health", flag:"delayedHealth", after:4, portrait:"portrait-teacher", echo:"那张单子在抽屉里。你每次拿粉笔都会看见它。", title:"讲台上的十秒",
    text:"讲到一半，你忽然听不清自己的声音。前排的学生站了起来。你摆手说没事，继续讲完了那道题。",
    choices:[
      {label:"当天去医院", hint:"结果还好。但你已经耽误了三个月。", eff:{teaching:-6,morale:-3,trust:4}, flag:"finallyWent"},
      {label:"撑到高考结束", hint:"还有几周而已。你对自己说了很多次这句话。", eff:{teaching:5,morale:-5}, flag:"pushedThrough"}
    ]},
  { id:"cb_lent", flag:"lentAway", after:3, portrait:"portrait-linxiaoyu", echo:"她的座位空了下来。值日表上的名字没人去划。", title:"集训班的最后一名",
    text:"她在那个班排第三十一名，共三十一人。她给你发消息：“老师，我是不是本来就不行。”",
    choices:[
      {label:"立刻把人要回来", hint:"你得罪的人会记很久。她当天下午就坐回了原来的位置。", eff:{who:"linxiaoyu",trust:11,mood:10,stress:-14,prestige:-7}, flag:"broughtBack"},
      {label:"让她把六周走完", hint:"也许她能扛住。也许扛不住的东西不止这一件。", eff:{who:"linxiaoyu",study:7,stress:12,mood:-9,trust:-6}, flag:"leftThere"}
    ]},
  { id:"cb_petition", flag:"sentPetition", after:3, portrait:"portrait-principal", echo:"那位老师从此绕开教师办公室这条走廊。", title:"提前退休申请",
    text:"那位物理老师递了申请，比原定日期早了一个学期。签字那天他只说了一句：“孩子们没错。”",
    choices:[
      {label:"去送他", hint:"办公室里没有别人去。你们聊了很久，都没提那封信。", eff:{morale:3,trust:4,prestige:-3}, flag:"sawHimOff"},
      {label:"不去", hint:"你告诉自己这是制度的问题。你也知道这话不完全成立。", eff:{teaching:3,morale:-4}, flag:"didntGo"}
    ]}
];

// ── 状态与工具 ──────────────────────────────────────────────────────
function initialState(subject="math") {
  const st={
    version:6, subject, week:1, energy:3, sound:true, seed:260826, finished:false,
    stats:{teaching:52,morale:57,discipline:54,trust:46,prestige:43},
    students:JSON.parse(JSON.stringify(STUDENT_TEMPLATES)).concat(buildRoster()),
    rivals:JSON.parse(JSON.stringify(RIVALS)),
    examHistory:[], actionsThisWeek:[], flags:{}, usedEvents:[], firedCallbacks:[], lost:[], actionUse:{},
    crisis:{id:null,stage:0,sinceWeek:0}, incident:null, snap:null, looked:[], lookTotal:0,
    tt:null, periodTotals:{chinese:0,math:0,english:0,comp:0}, teacherAnger:{},
    seats:null, seatSwaps:0, seatPick:null, journalDone:false, journalTotal:0, wishes:{},
    posts:{}, ptaDone:[], visits:0,
    chains:{active:null,stage:0,cast:[],done:[],nextWeek:0},

    log:[{week:1,text:"三月十六号，你接过了高三（7）班的点名册。距高考八十三天——这些名字将走进不同的考场，如果他们都还在的话。"}]
  };
  st.seats=buildSeats(st.students);
  st.tt=initTimetable();
  return st;
}

let state = initialState();
let pendingModalCallback = null;
let toastTimer = null;

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];
const clamp = (v,min=0,max=100) => Math.max(min,Math.min(max,v));
function rand(){ state.seed=(state.seed*1664525+1013904223)>>>0; return state.seed/4294967296; }
function rint(min,max){ return Math.floor(rand()*(max-min+1))+min; }
function studentById(id){ return state.students.find(s=>s.id===id); }
function active(){ return state.students.filter(s=>!s.out); }
function keyStudents(){ return state.students.filter(s=>s.key); }
function metKeys(){ return state.students.filter(s=>s.key&&s.met&&!s.out); }
function classSize(){ return state.students.length; }
// 最需要你的人：压力高、心情低的排在前面
function byNeed(list){ return [...list].sort((a,b)=>(b.stress-b.mood*.6)-(a.stress-a.mood*.6)); }
function avgStudent(key){ const a=active(); return a.length?a.reduce((n,s)=>n+s[key],0)/a.length:0; }
function save(){ try{ localStorage.setItem("afterBellSave",JSON.stringify(state)); }catch{ /* file:// 下可能不可用，忽略 */ } }
function loadSave(){ try { const x=JSON.parse(localStorage.getItem("afterBellSave")); return x&&x.version===6?x:null; } catch { return null; } }
function dropSave(){ try{ localStorage.removeItem("afterBellSave"); }catch{} }

function setFlag(k){ if(!k) return; state.flags[k]={week:state.week}; if(FLAG_MEDALS[k]) unlockMedal(FLAG_MEDALS[k]); }
function hasFlag(k){ return !!state.flags[k]; }

function playTone(freq=520,duration=.06){
  if(!state.sound) return;
  try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=freq;g.gain.setValueAtTime(.055,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+duration);}catch{}
}
function toast(text){ const el=$("#toast");el.textContent=text;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200); }
function addLog(text){ state.log.unshift({week:state.week,text});state.log=state.log.slice(0,18); }

// ── 执教纪念册：跨局保存的名场面与结局集。不是奖杯，是你带过的每一届 ────
const MEDALS=[
  {id:"m_candle", name:"蜡烛与晚自习", desc:"停电那晚，你从值班室搬来了一箱蜡烛。", hint:"有些晚自习不用电。"},
  {id:"m_canteen", name:"为一顿饭出头", desc:"食堂的事，你带头捅了上去。", hint:"有人吃坏了肚子，家长群在拍照。"},
  {id:"m_saved", name:"接住了", desc:"把一个滑到边上的孩子拉了回来。", hint:"信号来的时候，你在看。"},
  {id:"m_all5", name:"五条线都走到了头", desc:"一届之内，五个孩子的故事你都陪着走完了。", hint:"十二周的行动力不够全部走完——除非你把别的都放下。"},
  {id:"m_chains", name:"班上的事都接住了", desc:"早恋、打架、逃课，三条事件链一届走完。", hint:"班上的每件事都有后半段。"},
  {id:"m_noloss", name:"一个都没少", desc:"零人离班毕业，全班平均心情不低于 60。", hint:"毕业照上一个不缺，而且都在笑。"},
  {id:"m_rank1", name:"平行班的天花板", desc:"高考排名压过实验班，年级第一。", hint:"一班从来不用担心生源——直到这一届。"},
  {id:"m_journal", name:"批到最后一页", desc:"一届里认真回过 10 本以上周记。", hint:"四十八本里，你回过的那些。"},
  {id:"m_visit", name:"熟门熟路", desc:"一届里家访 4 次以上。", hint:"有些事，进了那个门才看得见。"},
  {id:"m_looker", name:"眼里有活", desc:"一届里「不占时间的事」做满 30 次。", hint:"翻作业、转走廊、站后门——看不看随你。"},
  {id:"m_hamster", name:"编外学生", desc:"批准一只仓鼠留在高三（7）班，直到高考。", hint:"储物柜里有动静。"},
  {id:"m_fool", name:"跳跳糖", desc:"愚人节那杯茶，你面不改色地喝完了。", hint:"四月的第一天，小心讲台上的杯子。"},
  {id:"m_tug", name:"一根绳子的事", desc:"运动会拔河，你排在最后一个，赢了实验班。", hint:"力气这种事，跟年级排名没关系。"},
  {id:"m_nick", name:"外号在编", desc:"知道了自己的外号，并且装作不知道。", hint:"他们私下不叫你老师。"},
  {id:"m_letters", name:"三封信", desc:"成人仪式上，有三封家长的信是你写的。", hint:"五月四日，有人的信凑不齐。"}
];
const FLAG_MEDALS={candleNight:"m_candle",canteenFight:"m_canteen",hamsterStay:"m_hamster",foolDrank:"m_fool",tugWin:"m_tug",nickKept:"m_nick",wroteLetters:"m_letters"};
const ENDINGS_ALL=["课上完了","就这么过去了","那天之后","有两张空课桌","第一名的代价","不只是一张高分答卷","他们记得你","逆袭的七班","挤进前三","比排名更长的回声","你也在这一届里","把每个人送到门口"];
function loadMedals(){ try{ return JSON.parse(localStorage.getItem("afterBellMedals"))||{}; }catch{ return {}; } }
let medals=loadMedals();
function saveMedals(){ try{ localStorage.setItem("afterBellMedals",JSON.stringify(medals)); }catch{} }
function unlockMedal(id){
  if(medals[id]) return;
  const m=MEDALS.find(x=>x.id===id); if(!m) return;
  medals[id]=1; saveMedals();
  setTimeout(()=>toast(`纪念册翻开了新的一页：${m.name}`),600);
}
function recordEnding(name){
  medals._endings=medals._endings||{};
  if(!medals._endings[name]){ medals._endings[name]=1; saveMedals(); }
}
function showMedals(){
  medals=loadMedals();
  const got=MEDALS.filter(m=>medals[m.id]).length;
  const grid=MEDALS.map(m=>medals[m.id]
    ?`<div class="medal-item"><strong>${m.name}</strong><small>${m.desc}</small></div>`
    :`<div class="medal-item locked"><strong>？？？</strong><small>${m.hint}</small></div>`).join("");
  const ends=medals._endings||{};
  const seen=ENDINGS_ALL.filter(e=>ends[e]).length;
  const endRow=ENDINGS_ALL.map(e=>ends[e]?`<span class="end-chip got">${e}</span>`:`<span class="end-chip">？？？</span>`).join("");
  openModal({eyebrow:"执教纪念册",title:"带过的每一届，都写在这里",
    body:`<p>名场面 <b>${got}</b> / ${MEDALS.length} · 见过的结局 <b>${seen}</b> / ${ENDINGS_ALL.length}。跨届保存在本机。</p>
    <div class="medal-grid">${grid}</div>
    <div class="report-label" style="margin-top:16px">毕业结局集</div>
    <div class="end-collect">${endRow}</div>`,
    choices:[{label:"合上纪念册",onChoose:()=>closeModal()}],dismissible:true});
}

const CLASS_KEYS=["teaching","morale","discipline","trust","prestige"];
const STU_KEYS=["study","mood","trust","stress"];

// eff 同时支持班级数值与学生数值；eff.who 指定目标学生，默认为 defaultStudent
const CLASS_LABEL={teaching:"教学",morale:"士气",discipline:"纪律",trust:"信任",prestige:"声望"};
const STU_LABEL={study:"学业",mood:"心情",trust:"信任",stress:"压力"};
// 返回真正生效的增减（封顶之后的实际值），用于反馈面板——不能只显示"账面上想加多少"
function applyEff(eff={},defaultStudent=null){
  const target = eff.who ? studentById(eff.who) : defaultStudent;
  const before={...state.stats}, sBefore=target?{...target}:null;
  if(target && !target.out){
    STU_KEYS.forEach(k=>{ if(eff[k]!=null) target[k]=clamp(target[k]+eff[k],0,k==="study"?(target.ceiling||100):100); });
    if(eff.trust!=null) state.stats.trust=clamp(state.stats.trust+Math.round(eff.trust*0.35));
    CLASS_KEYS.filter(k=>k!=="trust").forEach(k=>{ if(eff[k]!=null) state.stats[k]=clamp(state.stats[k]+eff[k]); });
  } else {
    CLASS_KEYS.forEach(k=>{ if(eff[k]!=null) state.stats[k]=clamp(state.stats[k]+eff[k]); });
  }
  const d={cls:{},stu:{},who:target&&!target.out?target:null};
  CLASS_KEYS.forEach(k=>{ const v=Math.round(state.stats[k]-before[k]); if(v) d.cls[k]=v; });
  if(sBefore&&d.who) STU_KEYS.forEach(k=>{ const v=Math.round(target[k]-sBefore[k]); if(v) d.stu[k]=v; });
  return d;
}
// 有些账要过几周才结。不播报，只留一个具体的细节。
function echoNote(flag){
  const cb=CALLBACKS.find(c=>c.flag===flag);
  return cb&&cb.echo?`<p class="echo-note">${cb.echo}</p>`:"";
}
function deltaChips(d){
  const chip=(label,v,goodDown=false)=>{
    const good=goodDown?v<0:v>0;
    return `<span class="delta-chip ${good?"up":"down"}">${label} ${v>0?"+":""}${v}</span>`;
  };
  let out="";
  if(d.who){
    const parts=Object.entries(d.stu).map(([k,v])=>chip(STU_LABEL[k],v,k==="stress")).join("");
    if(parts) out+=`<div class="delta-row"><b>${d.who.name}</b>${parts}</div>`;
  }
  const cls=Object.entries(d.cls).map(([k,v])=>chip(CLASS_LABEL[k],v)).join("");
  if(cls) out+=`<div class="delta-row"><b>班级</b>${cls}</div>`;
  return out||`<div class="delta-row" style="opacity:.6">这一次，什么数字都没有变。</div>`;
}
// 重要选择之后必须给回执：发生了什么、影响是什么、有没有埋下后账
function showOutcome({title,text,portrait,delta,flag,extra=""},next){
  openModal({eyebrow:"结果",title,
    body:`${portrait?`<div class="event-scene">${portrait}<div class="dialogue">${text}</div></div>`:`<p>${text}</p>`}
    ${extra}
    <div class="delta-box">${deltaChips(delta)}</div>
    ${flag?echoNote(flag):""}`,
    choices:[{label:"知道了",onChoose:()=>{closeModal(false);next&&next()}}]});
}

// ── 顺序执行若干个弹窗步骤 ──────────────────────────────────────────
function runSteps(steps,done){
  let i=0;
  const next=()=>{ if(i>=steps.length){ done&&done(); return; } steps[i++](next); };
  next();
}

// 手机上把双指缩放和双击放大按死。
// meta viewport 的 user-scalable=no 在 iOS 10+ 的 Safari 里是被无视的，
// CSS 的 touch-action:pan-x pan-y 管住绝大多数场景，剩下的靠这里的手势事件兜底。
function lockZoom(){
  const stop=e=>e.preventDefault();
  // iOS Safari 的捏合走 gesture* 这套私有事件，document 和 window 都挂上
  ["gesturestart","gesturechange","gestureend"].forEach(t=>{
    document.addEventListener(t,stop,{passive:false});
    window.addEventListener(t,stop,{passive:false});
  });
  // 安卓 / Chrome：只要有第二根手指落下就掐掉，不等它变成缩放
  document.addEventListener("touchstart",e=>{ if(e.touches.length>1) e.preventDefault(); },{passive:false});
  document.addEventListener("touchmove", e=>{ if(e.touches.length>1) e.preventDefault(); },{passive:false});
  // 双击放大兜底。只掐「同一个位置的连续两下」，
  // 否则快速点两个不同按钮时第二下的 click 会被一起吃掉。
  let lastT=0,lastX=0,lastY=0;
  document.addEventListener("touchend",e=>{
    const t=e.changedTouches&&e.changedTouches[0]; if(!t) return;
    const now=Date.now();
    if(now-lastT<=300 && Math.abs(t.clientX-lastX)<30 && Math.abs(t.clientY-lastY)<30) e.preventDefault();
    lastT=now; lastX=t.clientX; lastY=t.clientY;
  },{passive:false});
  document.addEventListener("dblclick",stop,{passive:false});
  // 桌面浏览器的 Ctrl/⌘ + 滚轮缩放
  document.addEventListener("wheel",e=>{ if(e.ctrlKey||e.metaKey) e.preventDefault(); },{passive:false});
}

function boot(){
  lockZoom();
  $("#soundBtn").innerHTML=ICONS.sound; $("#helpBtn").innerHTML=ICONS.help; $("#resetBtn").innerHTML=ICONS.reset;
  const mb=$("#medalBtn"); if(mb){ mb.innerHTML=ICONS.album; mb.addEventListener("click",showMedals); }
  const saved=loadSave();
  let resume=false;                       // 之前靠按钮文案判断续档，文案改过之后永远读不到存档
  if(saved&&!saved.finished){
    resume=true;
    $("#startBtn").textContent=`回到 ${dateOf(saved.week)} · 高三（7）班`;
    $$('[data-subject]').forEach(b=>{b.classList.toggle("active",b.dataset.subject===saved.subject);b.setAttribute("aria-checked",b.dataset.subject===saved.subject)});
  }
  $$('[data-subject]').forEach(btn=>btn.addEventListener("click",()=>{
    $$('[data-subject]').forEach(b=>{b.classList.remove("active");b.setAttribute("aria-checked","false")});
    btn.classList.add("active");btn.setAttribute("aria-checked","true");playTone(440);
    if(saved){                            // 换了学科就等于重开，存档留着但这一局不用
      resume = btn.dataset.subject===saved.subject && !saved.finished;
      $("#startBtn").textContent = resume ? `回到 ${dateOf(saved.week)} · 高三（7）班` : "从头接过高三（7）班";
    }
  }));
  $("#startBtn").addEventListener("click",()=>{
    const selected=$('.subject-card.active').dataset.subject;
    state=(resume&&saved&&selected===saved.subject)?saved:initialState(selected);
    $("#startScreen").classList.add("hidden");$("#gameScreen").classList.remove("hidden");
    if(!state.snap) state.snap=snapshot();
    $("#soundBtn").classList.toggle("muted",!state.sound);
    render();playTone(620,.12);
    if(state.week===1&&state.actionsThisWeek.length===0) setTimeout(()=>showWelcome(),350);
  });
  $("#endWeekBtn").addEventListener("click",endWeek);
  $("#soundBtn").addEventListener("click",()=>{state.sound=!state.sound;$("#soundBtn").classList.toggle("muted",!state.sound);toast(state.sound?"音效已开启":"音效已关闭");save()});
  $("#helpBtn").addEventListener("click",showHelp);
  $("#resetBtn").addEventListener("click",confirmReset);
  $("#modalClose").addEventListener("click",()=>closeModal());
  $("#modalBackdrop").addEventListener("click",e=>{
    if(e.target.id==="modalBackdrop" && $("#modal").dataset.dismissible==="1") closeModal();
  });
  $("#clearLogBtn").addEventListener("click",()=>{
    const hid=$("#eventLog").classList.toggle("hidden");
    $("#clearLogBtn").textContent=hid?"展开记录":"收起旧记录";
  });
  // 手机横竖屏切换后重算一次布局相关的文案
  addEventListener("orientationchange",()=>setTimeout(()=>{ if(state&&state.students) render(); },250));
}

function showWelcome(){
  openModal({eyebrow:"开学寄语",title:"离高考，还有 83 天",
    body:`<div class="event-scene"><div class="event-portrait portrait-teacher"></div><div class="dialogue">“成绩单上是分数，点名册上是人。两样都想要，就得知道自己在拿什么去换。”</div></div>
    <p>全班 <b>48 人</b>，每一个都有名字、有成绩、有自己的压力值。花名册随时可以翻。</p>
    <p>有些孩子的事会自己找上门来。剩下的孩子，得你自己去看。</p>
    <p>每周 <b>3 点行动力</b>。<b>没有全都变好的选项</b>——每个决定都会拿走一样东西，有些账要等好几周才结。</p>
    <p>压力持续超过 <b>86</b> 的学生会先收到一次警告，再没有变化就会<b>永久退出这一届</b>。毕业照上会少一个人。</p>`,
    choices:[{label:"翻开班主任手册",hint:"开始第一周",onChoose:()=>closeModal()}]});
}

function render(){
  const sub=SUBJECTS[state.subject];
  $("#teacherLine").textContent=`${sub.name} · 班主任`;
  $("#weekLabel").textContent=state.finished?"毕业季":dateOf(state.week);
  $("#examCountdown").textContent=state.finished?"这一届结束了":`距高考 ${daysLeft(state.week)} 天`;
  $("#studentCount").textContent=`${active().length} / ${classSize()} 人`;
  renderStats();renderRivals();renderGoals();renderEnergy();renderTimetable();renderActions();renderLooks();renderStudents();renderStories();renderLog();
  $("#weatherText").textContent=`周${["一","二","三","四","五"][state.actionsThisWeek.length]||"五"} · ${["晴","多云","阴","风"][state.week%4]}`;
  save();
}

function renderStats(){
  const defs=[["教学","teaching","#4e8890"],["士气","morale","#d79f39"],["纪律","discipline","#6683a0"],["信任","trust","#d26b59"],["声望","prestige","#748f68"]];
  $("#classStats").innerHTML=defs.map(([label,k,c])=>`<div class="stat-row"><span class="stat-label"><i class="stat-dot" style="background:${c}"></i>${label}</span><span class="stat-track"><i style="width:${state.stats[k]}%;background:${c}"></i></span><b>${Math.round(state.stats[k])}</b></div>`).join("");
  const our=projectedScore(), rank=1+state.rivals.filter(r=>r.score>our).length;
  const total=state.rivals.length+1;
  $("#classRank").textContent=`${rank} / ${total}`;$("#rankFill").style.width=`${(total-rank)/(total-1)*100}%`;
}
function scoreBias(s){
  let b=0;
  if(s.id==="chengmo")   b+= hasFlag("chengConverted")?-6:-32;          // 不补副科就一直被总分拖着
  if(s.id==="zhouyang")  b+= hasFlag("zhouGrind")?10:hasFlag("zhouPath")?-6:0;
  if(s.id==="linxiaoyu") b+= hasFlag("linAbandoned")?-14:hasFlag("linRescued")?-4:0;
  if(s.id==="suqing")    b+= hasFlag("suShielded")?-11:0;               // 每次替她换题，考场上没人替她换
  if(s.id==="luming")    b+= hasFlag("luStayed")?7:0;
  return b;
}
function rawScore(s){ return 300+s.study*3.1+state.stats.teaching*.45+(s.mood-50)*.16-Math.max(0,s.stress-64)*1.35+scoreBias(s); }
function projectedScore(){
  const a=active(); if(!a.length) return 0;
  const mean=a.reduce((n,s)=>n+rawScore(s),0)/a.length;
  return Math.round(mean-state.lost.length*13+state.stats.morale*.06+state.stats.discipline*.04);
}
function renderRivals(){
  const ours=projectedScore();
  $("#rivalList").innerHTML=[...state.rivals,{name:"高三（7）班",teacher:`${SUBJECTS[state.subject].name} · 你的班`,color:"#3f8581",score:ours,mine:true}]
    .sort((a,b)=>b.score-a.score)
    .map((r,i)=>`<div class="rival-item ${r.mine?"is-mine":""}"><div class="rival-badge" style="background:${r.color}">${i+1}</div><div class="rival-info"><b>${r.name}</b><small>${r.teacher}</small></div><div class="rival-score">${Math.round(r.score)}</div></div>`).join("");
}
function renderGoals(){
  const a=state.actionsThisWeek;
  const risky=active().filter(s=>s.stress>=80).length;
  const goals=[
    [a.some(x=>x==="lesson"||x==="tutor"),"至少完成一次学业行动"],
    [a.some(x=>x==="talk"||x==="meeting"||x==="parent"),"关注一名学生或班级情绪"],
    [risky===0,risky?`有 ${risky} 个孩子最近状态很差`:"班上暂时没有让你放心不下的人"]
  ];
  $("#weeklyGoals").innerHTML=goals.map(([done,t])=>`<div class="goal-row ${done?"done":""}"><span class="goal-check">${done?"✓":""}</span><span>${t}</span></div>`).join("");
  $("#energyText").textContent=`行动力 ${state.energy}/3`;
}
function renderEnergy(){ $("#energyPips").innerHTML=[0,1,2].map(i=>`<i class="energy-pip ${i>=state.energy?"used":""}"></i>`).join(""); }

const dim = k => Math.max(.35, 1-(state.actionUse?.[k]||0)*.07);
// 同一个行动里反复挑同一个选项，衰减得比行动本身快得多。
// 以前只按行动记次数，于是「班会 · 谈心态」可以一路刷到底，全班压力被刷到个位数。
const dimSub = (a,o) => Math.max(.28, 1-(state.actionUse?.[a+":"+o]||0)*.19) * dim(a);
function noteUse(k){ state.actionUse=state.actionUse||{}; state.actionUse[k]=(state.actionUse[k]||0)+1; }
function noteSub(a,o){ noteUse(a); noteUse(a+":"+o); }



// ── 班级事件链：一件事要跟好几周 ──────────────────────────────────
// 角色从班上真实的名字里挑，处理方式会在后面的幕里回来找你。
const CHAINS={
  romance:{
    id:"romance", minWeek:2,
    cast:()=>{
      const boys=active().filter(s=>!s.female&&s.mood>=45), girls=active().filter(s=>s.female&&s.mood>=45);
      if(!boys.length||!girls.length) return null;
      return [boys[rint(0,boys.length-1)], girls[rint(0,girls.length-1)]];
    },
    stages:[
      { eyebrow:"晚自习之后", title:(a,b)=>`${a.name}和${b.name}`,
        text:(a,b)=>`保安说，晚自习散了以后，有两个学生在操场看台上坐到快十一点。今天早上，${b.name}的同桌把一张折成方块的纸条放在了你桌上——她说她不是想告状，她是怕出事。`,
        signs:null,
        choices:[
          {label:"分开座位，各自谈一次",hint:(a,b)=>`最常规的处理。两个人都答应得很快，快得让你觉得没说真话。`,
           eff:{},run:(a,b)=>{applyEff({mood:-6,stress:6,study:4},a);applyEff({mood:-7,stress:7,study:4},b);state.stats.discipline=clamp(state.stats.discipline+5);},flag:"romSplit"},
          {label:"什么都不说，先看两周",hint:(a,b)=>`你把纸条收进抽屉。有些事管早了，反而管不住。`,
           eff:{},run:(a,b)=>{applyEff({mood:5,trust:5},a);applyEff({mood:5,trust:6},b);state.stats.discipline=clamp(state.stats.discipline-3);},flag:"romWait"},
          {label:"把两个人一起叫来，把话摊开讲",hint:(a,b)=>`你没提“早恋”两个字，只问了一句：你们打算怎么安排接下来这几个月。`,
           eff:{teaching:-2},run:(a,b)=>{applyEff({trust:9,mood:3,study:2},a);applyEff({trust:9,mood:3,study:2},b);},flag:"romTalk"}
        ]},
      { eyebrow:"三周之后", gap:3, title:(a,b)=>`${b.name}的母亲来了`,
        text:(a,b)=>hasFlag("romSplit")
          ? `“我女儿最近整晚整晚不睡。老师，我听说班上有个男生——您是不是早就知道？”她的手一直在抖。`
          : `“我从她手机里看到了。老师，您是班主任，这种事您管不管？”她把手机推到你面前，屏幕朝下。`,
        choices:[
          {label:"承认你知道，也说出你的判断",hint:(a,b)=>`你替两个孩子说了话。这位母亲当场就红了眼眶，走的时候没跟你道别。`,
           eff:{prestige:-7},run:(a,b)=>{applyEff({trust:10,mood:6},b);applyEff({trust:6},a);},flag:"romDefend"},
          {label:"配合家长，明确要求断掉",hint:(a,b)=>`家长满意了。第二天${b.name}的座位换到了第一排，她一整天没抬头。`,
           eff:{prestige:5,discipline:4},run:(a,b)=>{applyEff({mood:-14,stress:12,trust:-11},b);applyEff({mood:-9,stress:8,study:5},a);},flag:"romCut"},
          {label:"“这件事得让孩子自己在场谈。”",hint:(a,b)=>`你把${b.name}叫了进来。三个人在办公室坐了四十分钟，很难，但话说开了。`,
           eff:{teaching:-3,prestige:-2},run:(a,b)=>{applyEff({trust:12,mood:8,stress:-6},b);applyEff({trust:5},a);},flag:"romOpen"}
        ]},
      { eyebrow:"一模之后", gap:2, notBefore:10, title:(a,b)=>`两个人的成绩单`,
        text:(a,b)=>hasFlag("romCut")
          ? `${a.name}的名次涨了十一位。${b.name}掉了二十三位。她母亲又打了电话来，这次是问，能不能让她转班。`
          : hasFlag("romDefend")||hasFlag("romOpen")
          ? `两个人的名次都往前挪了。${b.name}在周记里写：我们说好了，谁也不许因为对方考砸。`
          : `两个人的成绩都平平。你不知道这跟那件事有没有关系，也没有办法知道。`,
        choices:[
          {label:"把这件事翻篇，不再提",hint:(a,b)=>`剩下的几周，你没有再问过一句。`,
           eff:{},run:(a,b)=>{applyEff({stress:-5},a);applyEff({stress:-5},b);},flag:"romClosed"},
          {label:"再找两个人各谈一次",hint:(a,b)=>`你花掉了一个下午。有些话现在不说，以后就没机会说了。`,
           eff:{teaching:-3},run:(a,b)=>{applyEff({trust:8,mood:7,stress:-8},a);applyEff({trust:8,mood:7,stress:-8},b);},flag:"romFollow"}
        ]}
    ]},

  fight:{
    id:"fight", minWeek:3,
    cast:()=>{
      const pool=active().filter(s=>!s.key||s.met);
      const hurt=byNeed(pool)[0];
      const other=pool.filter(s=>s!==hurt).sort((a,b)=>b.study-a.study)[rint(0,4)]||pool[0];
      return [hurt,other];
    },
    stages:[
      { eyebrow:"课间", title:(a,b)=>`厕所门口`,
        text:(a,b)=>`${a.name}把${b.name}按在墙上，打了两拳。围观的学生说不清是怎么起的头。${b.name}的嘴角破了，${a.name}的手在抖，但一句话不说。`,
        choices:[
          {label:"各打五十大板，两人都写检讨",hint:(a,b)=>`最快的处理。半小时后两个人都回教室了，谁也没说为什么打。`,
           eff:{discipline:9,morale:-4},run:(a,b)=>{applyEff({mood:-9,stress:9,trust:-8},a);applyEff({mood:-5,stress:5},b);},flag:"fightBoth"},
          {label:"先分开，一个一个问清楚",hint:(a,b)=>`你花了整整两节课。${a.name}最后说了一句：他们叫了我三个月。`,
           eff:{teaching:-4,discipline:2},run:(a,b)=>{applyEff({trust:11,mood:5,stress:-7},a);applyEff({mood:-6,stress:4},b);},flag:"fightDig"},
          {label:"按校规上报，交给教务处",hint:(a,b)=>`程序上无懈可击。处分下来那天，${a.name}的父亲在办公室扇了${TA(a)}一巴掌。`,
           eff:{discipline:12,prestige:3,morale:-8},run:(a,b)=>{applyEff({mood:-18,stress:16,trust:-14},a);applyEff({mood:-4},b);},flag:"fightReport"}
        ]},
      { eyebrow:"第二天", gap:1, title:(a,b)=>`班上的空气变了`,
        text:(a,b)=>hasFlag("fightDig")
          ? `你查了。${b.name}那伙人给${a.name}起的外号，全班几乎都知道，只有你不知道。现在他们看你的眼神，像在等你做点什么。`
          : `没人再提这件事，但${a.name}的桌子被搬到了最后一排靠墙的位置——不是你安排的。班上有一种很安静的默契。`,
        choices:[
          {label:"开一次班会，把这件事摆到台面上",hint:(a,b)=>`一节正课没了。有人低头，有人不服。但那个外号从此没人再叫。`,
           eff:{teaching:-3,morale:6,discipline:5,trust:7},run:(a,b)=>{applyEff({mood:14,stress:-12,trust:10},a);applyEff({mood:-6},b);},flag:"fightOpen"},
          {label:"私下警告那几个人，不惊动全班",hint:(a,b)=>`更省事。那几个人收敛了，但${a.name}仍然一个人坐在最后一排。`,
           eff:{discipline:4},run:(a,b)=>{applyEff({mood:4,stress:-4},a);},flag:"fightQuiet"},
          {label:"什么都不做，先保住这几周的进度",hint:(a,b)=>`高考只剩几周了。你告诉自己，等考完再说。`,
           eff:{teaching:4,morale:-7,trust:-6},run:(a,b)=>{applyEff({mood:-12,stress:11},a);},flag:"fightIgnore"}
        ]}
    ]},

  gaming:{
    id:"gaming", minWeek:4,
    cast:()=>{
      const pool=active().filter(s=>s.study<66).sort((a,b)=>a.mood-b.mood);
      if(!pool.length) return null;
      return [pool[rint(0,Math.min(3,pool.length-1))]];
    },
    stages:[
      { eyebrow:"晚自习", title:a=>`第三排靠窗的空位`,
        text:a=>`点名的时候${a.name}不在。保安说看见有学生从后墙翻出去了。十点四十，你在学校后门那条街的网吧二楼找到了${TA(a)}——耳机还挂在脖子上，屏幕没关。\n\n${TA(a)}看见你，第一反应是把显示器关掉。`,
        choices:[
          {label:"当场带回学校，通知家长",hint:a=>`按规矩办。家里人半小时就到了，在校门口没说一句话，只是一直看着${TA(a)}。`,
           eff:{discipline:10,morale:-3},run:a=>{applyEff({mood:-13,stress:13,trust:-9,study:3},a);},flag:"gameParent"},
          {label:t=>`在网吧门口的台阶上坐下，问${t}在打什么`,hint:a=>`${TA(a)}愣了很久，然后真的讲了。讲了二十分钟，讲到${TA(a)}在那个游戏里是队长。`,
           eff:{teaching:-2,discipline:-4},run:a=>{applyEff({trust:14,mood:10,stress:-9},a);},flag:"gameListen"},
          {label:"记下来，回学校再处理",hint:a=>`你没在网吧里发作。第二天的检讨写得很标准，一个字的真话都没有。`,
           eff:{discipline:5},run:a=>{applyEff({mood:-4,stress:4},a);},flag:"gameLater"}
        ]},
      { eyebrow:"两周之后", gap:2, title:a=>`${TA(a)}为什么在那儿`,
        text:a=>hasFlag("gameListen")
          ? `${TA(a)}又去了一次，这次是自己回来的。${TA(a)}跟你说：“老师，我知道那没用。但我在那儿是有人要的。在这儿我就是倒数第几名。”`
          : `${TA(a)}又逃了两次晚自习。班主任手册上，${a.name}这一栏已经记了三行。教务处问你，还要不要再给一次机会。`,
        choices:[
          {label:t=>`给${t}一件班上非${t}不可的事`,hint:a=>`你把班级电脑和多媒体交给了${TA(a)}。${TA(a)}第二天提前二十分钟到了教室。`,
           eff:{morale:5,discipline:3},run:a=>{applyEff({mood:16,trust:12,stress:-10,study:5},a);},flag:"gameRole"},
          {label:"联系家长断网，严格盯人",hint:a=>`最见效的一种。${TA(a)}没再逃过课，也没再跟你说过一句多余的话。`,
           eff:{discipline:9},run:a=>{applyEff({study:11,mood:-14,stress:10,trust:-13},a);},flag:"gameLock"},
          {label:"“你自己想清楚，我不管了。”",hint:a=>`你把话撂在那儿。${TA(a)}愣了一下，说好。`,
           eff:{teaching:4,morale:-6},run:a=>{applyEff({study:-9,mood:-10,stress:6,trust:-10},a);},flag:"gameDrop"}
        ]}
    ]}
};

function chainState(){ state.chains=state.chains||{active:null,stage:0,cast:[],done:[],nextWeek:0}; return state.chains; }
// 已经开了头的事，到了该来的那一周就一定会来
function activeChainDue(){
  const c=chainState();
  if(!c.active) return null;
  return state.week>=(c.nextWeek||0)?CHAINS[c.active]:null;
}
function newChainAvailable(){
  const c=chainState();
  if(c.active) return null;
  // 太晚开头的事收不了尾，就不要开头了
  const avail=Object.values(CHAINS).filter(x=>!c.done.includes(x.id)&&state.week>=x.minWeek
    &&state.week<=12-(x.stages.length-1)*2);
  return avail.length?avail[rint(0,avail.length-1)]:null;
}
function showChain(ch,next){
  const c=chainState();
  if(!c.active){
    const cast=ch.cast();
    if(!cast){ c.done.push(ch.id); next(); return; }
    c.active=ch.id; c.stage=0; c.cast=cast.map(s=>s.id);
  }
  const cast=c.cast.map(id=>studentById(id));
  if(cast.some(s=>!s||s.out)){ c.done.push(c.active); c.active=null; next(); return; }
  const st=CHAINS[c.active].stages[c.stage];
  const [a,b]=cast;
  openModal({eyebrow:st.eyebrow,title:st.title(a,b),
    body:`<div class="event-scene">${portraitHTML(a)}<div class="dialogue">${st.text(a,b).replace(/\n\n/g,"</div><div class=\"dialogue\" style=\"margin-top:8px\">")}</div></div>`
      +(b?`<p style="opacity:.75;font-size:.88em">牵涉到的是 <b>${a.name}</b>（${a.tag}）和 <b>${b.name}</b>（${b.tag}）。</p>`
          :`<p style="opacity:.75;font-size:.88em">${a.name}，${a.tag}。学业 ${Math.round(a.study)}，心情 ${Math.round(a.mood)}。</p>`),
    choices:st.choices.map(ch2=>({label:TX(ch2.label,TA(a)),hint:ch2.hint(a,b),onChoose:()=>{
      const d=applyEff(ch2.eff); ch2.run&&ch2.run(a,b); setFlag(ch2.flag);
      addLog(`${st.title(a,b)}：${TX(ch2.label,TA(a))}`);
      const cur=CHAINS[c.active];
      c.stage++;
      if(c.stage>=cur.stages.length){ c.done.push(c.active); c.active=null; c.stage=0; c.nextWeek=0; }
      else {
        const g=cur.stages[c.stage].gap||2;
        const at=cur.stages[c.stage].notBefore||0;
        c.nextWeek=Math.max(state.week+g,at);
      }
      closeModal(false);
      showOutcome({title:TX(ch2.label,TA(a)),text:ch2.hint(a,b),portrait:portraitHTML(a),delta:d},next);
    }}))});
}


// ── 家访：电话里听不出来的东西，进了门就全明白了 ──────────────────
const HOME_SCENES=[
  {when:s=>/走读/.test(s.tag)&&s.study<58,
   scene:s=>`楼道里堆满纸箱。${s.name}家在六楼，门一开是店面的后半间——父母开了个小超市，凌晨两点才关门。${TA(s)}的书桌就是收银台旁边那张折叠桌，上面压着账本。`,
   insight:s=>`你终于知道${TA(s)}为什么总在第一节课睡觉。`},
  {when:s=>/住校/.test(s.tag),
   scene:s=>`要坐一个半小时的中巴。${s.name}家在镇上，爷爷奶奶带大的，父母在南方，一年回来一次。墙上贴着从小学到高二的所有奖状，最新的那张停在两年前。`,
   insight:s=>`奶奶一直在给你剥橘子，一句话也没问成绩。`},
  {when:s=>s.stress>=78,
   scene:s=>`房间收拾得过分整齐。墙上贴着倒计时，每天一张，撕到今天。母亲在客厅里说了四十分钟，${s.name}全程站在门口没进来。`,
   insight:s=>`你临走时${TA(s)}送你到楼下，说了一句：老师，我妈不是坏人。`},
  {when:s=>/艺考/.test(s.tag),
   scene:s=>`客厅摆着画架和一整面墙的画。父亲说这两年学画花了三十来万，说完看了${s.name}一眼。${TA(s)}低头收拾颜料，没接话。`,
   insight:s=>`你看见画架背面写着一行小字，是${TA(s)}自己的名字，写了很多遍。`},
  {when:()=>true,
   scene:s=>`很普通的一户人家。${s.name}的房间不大，书桌正对着窗户，窗外是另一栋楼。母亲一直在道歉说家里乱，其实很干净。`,
   insight:s=>`饭桌上${TA(s)}话很少，但你注意到${TA(s)}给你添了两次汤。`}
];
function doHomeVisit(){
  chooseStudent("这个周末，去谁家？","家访要占掉你一整个休息日。但有些事，进了那个门才看得见。",s=>{
    const sc=HOME_SCENES.find(h=>h.when(s));
    openModal({eyebrow:"家访",title:`${s.name}家`,
      body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">${sc.scene(s)}</div></div><p>${sc.insight(s)}</p>`,
      choices:[
        {label:"把你看见的说给家长听",hint:`你没谈成绩，谈的是${TA(s)}这个人。家长听完沉默了很久。`,
         eff:{trust:14,mood:12,stress:-14,prestige:2}},
        {label:"只谈成绩和高考",hint:"专业、客气、有效率。你走的时候，${T}在门口说了声老师再见。",
         eff:{trust:5,study:7,mood:2,stress:-5}},
        {label:"什么都没多说，坐了半小时就走",hint:"有些家庭，多说一句都是伤害。你只是去了一趟。",
         eff:{trust:9,mood:6,stress:-8}}
      ].map(c=>({label:c.label,hint:c.hint.replace(/\$\{T\}/g,TA(s)),onChoose:()=>{
        const d=applyEff(c.eff,s);
        s.visited=true; state.visits=(state.visits||0)+1;
        state.stats.teaching=clamp(state.stats.teaching-2);
        setScene("office",`你从${s.name}家出来的时候天已经黑了。`,s);
        spend("visit",`家访：${s.name}家。`);
        closeModal(false);
        showOutcome({title:c.label,text:c.hint.replace(/\$\{T\}/g,TA(s)),portrait:portraitHTML(s),delta:d});
      }}))});
  });
}

// ── 家长会：四十多个家长坐满教室的那四十分钟 ────────────────────────
const PTA=[
  {id:"pta1", after:3,
   title:"第一次家长会",
   text:"月考成绩单印了四十八份，摆在每张课桌上。七点整，教室坐满了。后排站着来晚的，靠门口那位一直在看表。",
   choices:[
     {label:"从年级排名讲起，把差距摆出来",hint:"数据很清楚，家长很满意。散会后有三个家长堵在门口问怎么补课。",
      eff:{prestige:8,teaching:2},all:{stress:6,mood:-5}},
     {label:"先讲这两个月班上发生的好事",hint:"你念了四个名字，说的都是跟分数无关的事。有位母亲当场红了眼睛，也有人在下面小声说“讲这些有什么用”。",
      eff:{prestige:-3,trust:9,morale:7},all:{mood:7,stress:-6}},
     {label:"把话筒交给学生，让他们自己说",hint:"你冒了很大的险。前十分钟很尴尬，后三十分钟没有一个家长说话。",
      eff:{prestige:-6,trust:14,morale:10},all:{mood:10,stress:-9,study:-2}}
   ]},
  {id:"pta2", after:9,
   title:"一模之后的家长会",
   text:"这一次没人迟到。一模成绩贴在黑板上，后十名的家长坐在最后一排，从头到尾没抬头。前排有位父亲带了笔记本，你每说一句他记一句。",
   choices:[
     {label:"公开成绩，逐个分析",hint:"最有效率的开法。后排那几位散会后没有留下来，走得很快。",
      eff:{prestige:7,teaching:3,morale:-6},all:{stress:8,study:3}},
     {label:"只讲趋势，不点名字",hint:"你把后十名的分析单独装进了信封。有家长觉得你在藏，也有家长记住了这个信封。",
      eff:{prestige:2,trust:8,morale:4},all:{mood:5,stress:-4}},
     {label:"讲最后这五十天你打算怎么带",hint:"你把课表、晚自习安排、心理疏导计划全都摊开讲。有人问，那成绩怎么办；你说，这就是成绩怎么办。",
      eff:{prestige:4,trust:10,morale:8,teaching:-2},all:{mood:6,stress:-7}}
   ]}
];
function duePTA(){
  return PTA.find(p=>state.week>=p.after&&!(state.ptaDone||[]).includes(p.id));
}
function showPTA(p,next){
  state.ptaDone=(state.ptaDone||[]).concat(p.id);
  openModal({eyebrow:"家长会",title:p.title,
    body:`<div class="event-scene"><div class="event-portrait portrait-teacher"></div><div class="dialogue">${p.text}</div></div>
    <p style="opacity:.75;font-size:.88em">四十八个家庭坐在下面。你说的每句话，今晚都会被复述四十八遍。</p>`,
    choices:p.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const d=applyEff(c.eff);
      active().forEach(s=>{ Object.entries(c.all||{}).forEach(([k,v])=>{
        s[k]=clamp(s[k]+v,0,k==="study"?(s.ceiling||100):100); }); });
      addLog(`${p.title}：${c.label}`);
      closeModal(false);
      showOutcome({title:c.label,text:c.hint,portrait:`<div class="event-portrait portrait-teacher"></div>`,delta:d},next);
    }}))});
}

// ── 班干部：用人是班主任最实在的权力 ────────────────────────────
const POSTS=[
  {id:"monitor",name:"班长",  need:"要镇得住场面，也要有人望", stat:s=>s.mood*0.5+s.trust*0.5},
  {id:"study",  name:"学习委员",need:"要自己站得住，也要肯管别人", stat:s=>s.study},
  {id:"disc",   name:"纪律委员",need:"要敢得罪人", stat:s=>s.study*0.3+(100-s.mood)*0.3+s.trust*0.4}
];
function postEffects(){
  const p=state.posts||{};
  POSTS.forEach(post=>{
    const s=studentById(p[post.id]);
    if(!s||s.out) return;
    const q=post.stat(s);
    if(post.id==="monitor"){ state.stats.morale=clamp(state.stats.morale+(q>=62?1.1:q>=48?0.3:-0.8)); }
    if(post.id==="study"){ state.stats.teaching=clamp(state.stats.teaching+(q>=74?0.9:q>=60?0.3:-0.5)); }
    if(post.id==="disc"){ state.stats.discipline=clamp(state.stats.discipline+(q>=58?1.2:q>=45?0.3:-0.9)); }
    s.stress=clamp(s.stress+0.7); s.trust=clamp(s.trust+0.4);   // 当干部是要花时间的
  });
}
function showPosts(){
  const p=state.posts||{};
  const cur=id=>{const s=studentById(p[id]);return s&&!s.out?s:null;};
  const rows=POSTS.map(post=>{
    const s=cur(post.id);
    const q=s?Math.round(post.stat(s)):0;
    const fit=!s?"":q>=62?`<span class="chem good">称职</span>`:q>=48?`<span class="chem ok">勉强</span>`:`<span class="chem bad">压不住</span>`;
    return `<div class="post-row"><div class="post-name"><b>${post.name}</b><small>${post.need}</small></div>`+
      `<button class="seat-name" data-post="${post.id}">${s?s.name:"（空缺）"}<small>${s?`学业 ${Math.round(s.study)} · 心情 ${Math.round(s.mood)} · 信任 ${Math.round(s.trust)}`:"点这里任命"}</small></button>${fit}</div>`;
  }).join("");
  openModal({eyebrow:"班委",title:"这个班谁来管",
    body:`<p>三个位置。称职的人能顶事，不称职的人会把整块拖下去——而且当干部本身就要占掉那个孩子的时间。</p>${rows}`,
    choices:[{label:"就这么定",onChoose:()=>{closeModal();render();}}]});
  $$('[data-post]').forEach(b=>b.addEventListener("click",()=>{
    const id=b.dataset.post, post=POSTS.find(x=>x.id===id);
    const cands=[...active()].sort((a,b2)=>post.stat(b2)-post.stat(a)).slice(0,10);
    openModal({eyebrow:`任命 · ${post.name}`,title:post.need,
      body:`<p>按适合程度排的前十个人。</p>`,
      choices:cands.map(s=>({label:`${s.name} · ${s.tag}`,
        hint:`学业 ${Math.round(s.study)} / 心情 ${Math.round(s.mood)} / 信任 ${Math.round(s.trust)}　—— ${Math.round(post.stat(s))>=62?"顶得住":Math.round(post.stat(s))>=48?"勉强能用":"恐怕压不住"}`,
        onChoose:()=>{
          state.posts=state.posts||{}; state.posts[id]=s.id;
          addLog(`${s.name}当了${post.name}。`);
          closeModal(false); showPosts();
        }}))});
  }));
}

// ── 周记本：他们不敢说的话，会写在本子上 ──────────────────────────
function journalOf(s){
  const t=TA(s);
  if(s.stress>=84) return {text:`这周做了七套卷子。晚上闭上眼全是选择题。我不知道自己在赶什么，但停下来会更慌。`,
    mood:"焦虑",reply:[
    {label:"写：先睡够，再谈别的",hint:"你在本子上画了一条横线，把这句写在下面。",eff:{stress:-13,mood:7,trust:6}},
    {label:"写：再撑一撑，快到了",hint:"你写了两行鼓励的话。这话你自己都不太信。",eff:{stress:2,study:3,trust:1}}]};
  if(s.mood<=38) return {text:`没什么好写的。这周和上周一样，上周和上上周一样。`,
    mood:"低落",reply:[
    {label:"写：那就写点不一样的，比如今天的云",hint:"下一周，${T}真的写了云。三行，写得很认真。",eff:{mood:11,trust:7,stress:-5}},
    {label:"写：字数不够，重写",hint:"你按规矩批了。本子还回去以后，${T}再没写超过五行。",eff:{mood:-7,trust:-6,discipline:3}}]};
  if(s.study<52) return {text:`老师，我上课其实听不懂。但是举手会显得很傻，所以我一般就抄。`,
    mood:"跟不上",reply:[
    {label:"写：下次直接来办公室问我",hint:"${T}真的来了一次。就一次，但来了。",eff:{study:7,trust:9,mood:6}},
    {label:"写：先把基础补上",hint:"你给了一份书单。书单压在了课本底下。",eff:{study:3,trust:1}}]};
  if(s.key&&!s.met) return {text:`这周没什么事。真的没什么事。`,
    mood:"欲言又止",reply:[
    {label:"写：有事随时来找我",hint:"${T}看了很久，没有回。但这句话${T}记住了。",eff:{trust:8,mood:4,stress:-4}},
    {label:"打个勾，交下一本",hint:"四十八本，你手上还有很多。",eff:{trust:-2}}]};
  return {text:`这周物理终于及格了。我妈说才及格有什么好高兴的。但我还是挺高兴的。`,
    mood:"平常",reply:[
    {label:"写：值得高兴。我也替你高兴",hint:"${T}把这一页折了个角。",eff:{mood:10,trust:8,study:2}},
    {label:"写：继续保持",hint:"四个字，端端正正。",eff:{mood:3,trust:2}}]};
}
function doJournal(){
  if(state.journalDone) return;
  const pool=byNeed(active()).slice(0,10);
  const pick=[pool[rint(0,Math.min(4,pool.length-1))]];
  const rest=active().filter(x=>x!==pick[0]);
  pick.push(rest[rint(0,rest.length-1)]);
  let idx=0;
  const show=()=>{
    const s=pick[idx], j=journalOf(s);
    openModal({eyebrow:`周记本 ${idx+1}/2`,title:`${s.name} · ${s.tag}`,
      body:`<div class="journal"><div class="journal-mood">${j.mood}</div><p>${j.text}</p><div class="journal-sign">——${s.name}，${dateOf(state.week)}</div></div>
      <p style="opacity:.75;font-size:.88em">你只来得及认真回一本。</p>`,
      choices:[...j.reply.map(r=>({label:r.label,hint:r.hint.replace(/\$\{T\}/g,TA(s)),onChoose:()=>{
        const d=applyEff(r.eff,s); state.journalDone=true; state.journalTotal=(state.journalTotal||0)+1;
        addLog(`你在${s.name}的周记本上写了回复。`);
        closeModal(false);
        showOutcome({title:"你回了这一本",text:r.hint.replace(/\$\{T\}/g,TA(s)),portrait:portraitHTML(s),delta:d},()=>render());
      }})),
      ...(idx<pick.length-1?[{label:"先看下一本",hint:"两本都看完再决定回哪一本",onChoose:()=>{idx++;closeModal(false);show();}}]
        :[{label:"两本都先放着",hint:"本子摞在桌角。你今晚大概不会再翻开了。",onChoose:()=>{state.journalDone=true;closeModal();render();}}])]});
  };
  show();
}

// ── 学生上门：不是每件事都跟高考有关 ──────────────────────────────
const STUDENT_ASKS=[
  {id:"seat",t:s=>`“老师，我能不能换个座位。”`,d:s=>`${TA(s)}没说为什么。问了两次，只说“就是想换”。`,
   choices:[
     {label:"“行，你想坐哪儿？”",hint:"你没追问。座位表改了，理由你到毕业都不知道。",eff:{trust:8,mood:7,stress:-6}},
     {label:"“先告诉我原因。”",hint:"${T}站了一会儿，说算了。然后回座位了。",eff:{trust:-5,mood:-6,discipline:2}}]},
  {id:"leave",t:s=>`“老师，我周五想请半天假。”`,d:s=>`家里的事，${TA(s)}说了一半就停住了。请假条上父母那一栏是空的。`,
   choices:[
     {label:"批了，什么都没多问",hint:"周一${T}回来，交了两套补做的卷子。",eff:{trust:9,mood:6,study:-3}},
     {label:"要家长签字才能批",hint:"规矩是规矩。${T}最后没请成，那天一整天没怎么说话。",eff:{discipline:5,trust:-7,mood:-8}}]},
  {id:"club",t:s=>`“我想退社团。”`,d:s=>`${TA(s)}在文学社待了两年半。退社申请写得很短，只有一行。`,
   choices:[
     {label:"“再想三天，三天后你说了算。”",hint:"三天后${T}没来找你。社团活动照常去了。",eff:{mood:8,trust:7,study:-2}},
     {label:"“现在这个阶段，退了也好。”",hint:"你替${T}做了决定。省下来的时间确实用在了刷题上。",eff:{study:8,mood:-9,stress:4}}]},
  {id:"alone",t:s=>`“老师，他们一起吃饭都不叫我。”`,d:s=>`说完${TA(s)}自己先笑了一下，说没事，可能是我想多了。`,
   choices:[
     {label:"安排一次小组任务，把人凑到一起",hint:"你做了点手脚。那顿饭之后，${T}有了两个能说话的人。",eff:{mood:12,trust:9,stress:-9,morale:3}},
     {label:"“别太在意，专心学习。”",hint:"最省事的一句话。${T}点点头，说好。",eff:{mood:-8,stress:5,trust:-4}}]},
  {id:"question",t:s=>`“老师，这道题……”`,d:s=>`${TA(s)}举着卷子在办公室门口站了十分钟，等你手上的电话打完。`,
   choices:[
     {label:"放下手上的事，讲完这道题",hint:"讲了二十分钟。你原本要写的材料拖到了半夜。",eff:{study:9,trust:8,mood:5,teaching:-2}},
     {label:"“晚自习去问课代表。”",hint:"${T}说好，把卷子收起来了。",eff:{teaching:2,trust:-4}}]},
  {id:"gift",t:s=>`“老师，这个给您。”`,d:s=>`一小盒润喉糖。${TA(s)}说，听您这两周嗓子一直哑着。`,
   choices:[
     {label:"收下，说谢谢",hint:"你当着${T}的面拆开吃了一颗。${T}笑得很开心。",eff:{mood:10,trust:10,morale:4}},
     {label:"“心意收下，东西你拿回去。”",hint:"你讲了一遍规定。${T}说好，把盒子放回了书包。",eff:{discipline:4,mood:-5,trust:-3}}]}
];
function showStudentAsk(next){
  const a=STUDENT_ASKS[rint(0,STUDENT_ASKS.length-1)];
  const cands=byNeed(active()).slice(0,14);
  const s=cands[rint(0,cands.length-1)];
  const T=TA(s);
  openModal({eyebrow:"有人敲门",title:`${s.name} 站在办公室门口`,
    body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">${a.t(s)}</div></div><p>${a.d(s)}</p>`,
    choices:a.choices.map(c=>({label:c.label,hint:c.hint.replace(/\$\{T\}/g,T),onChoose:()=>{
      const d=applyEff(c.eff,s); addLog(`${s.name}来办公室找过你。`);
      closeModal(false);
      showOutcome({title:c.label,text:c.hint.replace(/\$\{T\}/g,T),portrait:portraitHTML(s),delta:d},next);
    }}))});
}

// ── 座位表：谁跟谁坐，是能改变成绩的 ────────────────────────────
function buildSeats(list){
  const ids=list.map(s=>s.id), pairs=[];
  for(let i=0;i<ids.length;i+=2) pairs.push([ids[i],ids[i+1]||null]);
  return pairs;
}
function seatChemistry(a,b){
  if(!a||!b||a.out||b.out) return 0;
  const gap=Math.abs(a.study-b.study);
  const bothLow=a.mood<45&&b.mood<45;
  const bothHigh=a.mood>=62&&b.mood>=62;
  if(bothLow) return -2;            // 两个都垮着，互相往下拽
  if(gap>=22) return 1;             // 一带一，带得动
  if(bothHigh) return 2;            // 处得来，互相拉
  return 0;
}
function applySeats(){
  (state.seats||[]).forEach(([x,y])=>{
    const a=studentById(x), b=studentById(y);
    const c=seatChemistry(a,b);
    if(!c) return;
    [a,b].forEach(p=>{ if(!p||p.out) return;
      if(c>0){ p.mood=clamp(p.mood+c); p.stress=clamp(p.stress-c*0.8); }
      else { p.mood=clamp(p.mood+c); p.stress=clamp(p.stress-c*0.9); }
    });
    if(c===1){ const weak=a.study<b.study?a:b; weak.study=clamp(weak.study+0.6,0,weak.ceiling||100); }
    if(c===2){ [a,b].forEach(p=>p.study=clamp(p.study+0.3,0,p.ceiling||100)); }
  });
}
function showSeats(){
  const seats=state.seats||[];
  const rows=seats.map(([x,y],i)=>{
    const a=studentById(x), b=studentById(y);
    const c=seatChemistry(a,b);
    const tag=c===2?`<span class="chem good">处得来</span>`:c===1?`<span class="chem ok">一带一</span>`
      :c<0?`<span class="chem bad">互相拖</span>`:`<span class="chem">—</span>`;
    const cell=p=>p?`<button class="seat-name ${p.out?"out":""} ${state.seatPick===p.id?"picked":""}" data-seat="${p.id}" ${p.out?"disabled":""}>${p.name}<small>${Math.round(p.study)} / ${Math.round(p.mood)}</small></button>`:`<span class="seat-name empty">空位</span>`;
    return `<div class="seat-row"><span class="seat-no">${i+1}</span>${cell(a)}${cell(b)}${tag}</div>`;
  }).join("");
  const left=2-(state.seatSwaps||0);
  openModal({eyebrow:"座位表",title:"这周谁跟谁坐",
    body:`<p>点两个名字交换位置。本周还能换 <b>${left}</b> 次。</p>
    <p style="opacity:.72;font-size:.86em">格子里是「学业 / 心情」。成绩差得多的两个人坐一起，好的那个能把差的带一点；两个都情绪低落的坐一起，会一起往下掉。</p>
    <div class="seat-wrap">${rows}</div>`,
    choices:[{label:"就这么排",onChoose:()=>{state.seatPick=null;closeModal();render();}}]});
  $$('[data-seat]').forEach(b=>b.addEventListener("click",()=>{
    const id=b.dataset.seat;
    if(!state.seatPick){ state.seatPick=id; showSeats(); return; }
    if(state.seatPick===id){ state.seatPick=null; showSeats(); return; }
    if((state.seatSwaps||0)>=2){ toast("这周已经换过两次了。"); return; }
    const A=state.seatPick, B=id;
    state.seats=state.seats.map(pr=>pr.map(v=>v===A?B:v===B?A:v));
    state.seatSwaps=(state.seatSwaps||0)+1; state.seatPick=null;
    playTone(520,.05); addLog("你调了一次座位。"); save(); showSeats();
  }));
}

// ── 不占行动力的日常：不改数值，只让你看见班上正在发生什么 ────────────
const LOOKS=[
  {id:"homework",name:"翻作业本",desc:"翻几本是几本",
   run:()=>{
     const need=byNeed(active()).slice(0,3);
     const others=active().filter(x=>!need.includes(x));
     const happy=[...others].sort((a,b)=>b.mood-a.mood)[0]||others[0];
     const rest=others.filter(x=>x!==happy);
     const r1=rest[rint(0,rest.length-1)], r2=rest.filter(x=>x!==r1)[rint(0,rest.length-2)]||r1;
     const tell=x=>{
       const w=x.lastSub?weakSubject(x.lastSub):null;
       return (x.stress>=82?"字迹越写越潦草，最后三页是空的。":x.stress>=72?"做完了，但一半是照答案抄的。":"做得意外地认真。")+(w?`${w}那本一直没交。`:"");
     };
     const books=[
       {s:need[0],t:tell(need[0])},{s:need[1],t:tell(need[1])},{s:need[2],t:tell(need[2])},
       {s:happy,t:`最后一页的角落画了一只很小的猫，旁边写着：老师应该看不到这里。`},
       {s:r1,t:`每道大题后面都给自己写了批注，最新一条是：这次真的懂了（第四次）。`},
       {s:r2,t:`本子后面夹着一张手绘的「错题率走势图」，画得像股票，还标了「抄底点」。`}
     ];
     return {title:"桌上摞着四十八本",
       body:`<p>今晚肯定翻不完全部。点开几本，翻几本是几本。</p><div class="hw-grid">${
         books.map((b,i)=>`<button class="hw-book" data-hw="${i}"><span>${b.s.name}</span><small>${b.s.tag}</small></button>`).join("")}</div>`,
       bind:()=>{
         $$('[data-hw]').forEach(btn=>btn.addEventListener("click",()=>{
           const b=books[+btn.dataset.hw];
           btn.classList.add("open"); btn.disabled=true;
           btn.innerHTML=`<span>${b.s.name}</span><p>${b.t}</p>`;
           playTone(480,.04);
         }));
       }};
   }},
  {id:"corridor",name:"课间转一圈",desc:"十分钟，走不完整层楼",
   run:()=>{
     const hot=active().filter(x=>x.stress>=78);
     const low=[...active()].sort((a,b)=>a.mood-b.mood);
     const spots=[
       {k:"水房",t:hot.length?`水房那边站着${hot.slice(0,2).map(x=>`<b>${x.name}</b>`).join("和")}，谁都没说话，水接满了也没走。`:`水房排着队。有人在用凉水洗脸，说这样背书快。`},
       {k:"教室后排",t:`<b>${low[0].name}</b>趴在桌上没出去，说不困，就是不想动。`},
       {k:"后门口",t:`倒计时又被人改了一个数字。改的人手法越来越熟练，笔迹越来越放松。`},
       {k:"走廊尽头",t:`几个人围着一部手机看年级群。看见你过来，手机以肉眼可见的速度消失了。`}
     ];
     let seen=0;
     return {title:"课间十分钟",
       body:`<p>十分钟，最多够你走两个地方。</p><div class="spot-grid">${
         spots.map((p,i)=>`<button class="spot-btn" data-spot="${i}"><span>${p.k}</span></button>`).join("")}</div><p id="spotBell" class="echo-note" style="display:none">上课铃响了。剩下的地方，下周再说。</p>`,
       bind:()=>{
         $$('[data-spot]').forEach(btn=>btn.addEventListener("click",()=>{
           const p=spots[+btn.dataset.spot];
           btn.classList.add("open"); btn.disabled=true; seen++;
           btn.innerHTML=`<span>${p.k}</span><p>${p.t}</p>`;
           playTone(480,.04);
           if(seen>=2){ $$('[data-spot]').forEach(b=>{ if(!b.classList.contains("open")) b.disabled=true; }); const bell=$("#spotBell"); if(bell) bell.style.display=""; }
         }));
       }};
   }},
  {id:"backdoor",name:"站后门听课",desc:"看别人怎么上你的班",
   run:()=>{
     const sleepy=byNeed(active()).slice(0,2);
     const top=[...active()].sort((a,b)=>b.study-a.study)[0];
     return {title:"从后门看进去",body:`<ul class="report-list">
       <li>物理老师在讲电磁感应。<b>${top.name}</b>提前把下一页翻开了。</li>
       <li><b>${sleepy[0].name}</b>撑了十分钟，第十一分钟头还是低下去了。</li>
       <li><b>${sleepy[1].name}</b>一直在抄，抄得比谁都快，但你看不出${TA(sleepy[1])}有没有在想。</li>
       <li style="opacity:.75">你站了半节课，没有进去。</li></ul>`};
   }}
];
function doLook(l){
  if(state.looked&&state.looked.includes(l.id)) return;
  state.looked=(state.looked||[]).concat(l.id);
  state.lookTotal=(state.lookTotal||0)+1;
  const r=l.run();
  openModal({eyebrow:"这一周里",title:r.title,body:r.body+`<p class="echo-note">你什么也没做。只是看了看。</p>`,
    choices:[{label:"回办公室",onChoose:()=>{closeModal();render()}}]});
  r.bind&&r.bind();
}
function renderLooks(){
  const el=$("#lookRow"); if(!el) return;
  const extra=[
    {id:"journal",name:"批周记",desc:"收上来两本",done:state.journalDone,run:doJournal},
    {id:"seats",name:"调座位",desc:`本周还能换 ${2-(state.seatSwaps||0)} 次`,done:(state.seatSwaps||0)>=2,run:showSeats},
    {id:"posts",name:"班委",desc:"谁来管这个班",done:false,run:showPosts}
  ];
  el.innerHTML=LOOKS.map(l=>{
    const used=(state.looked||[]).includes(l.id);
    return `<button class="look-btn" data-look="${l.id}" ${used||state.finished?"disabled":""}><strong>${l.name}</strong><small>${used?"这周看过了":l.desc}</small></button>`;
  }).join("")+extra.map(x=>
    `<button class="look-btn" data-extra="${x.id}" ${state.finished||(x.id==="journal"&&x.done)?"disabled":""}><strong>${x.name}</strong><small>${x.id==="journal"&&x.done?"这周批过了":x.desc}</small></button>`
  ).join("");
  LOOKS.forEach(l=>{const b=$(`[data-look="${l.id}"]`); if(b&&!b.disabled) b.addEventListener("click",()=>doLook(l));});
  extra.forEach(x=>{const b=$(`[data-extra="${x.id}"]`); if(b&&!b.disabled) b.addEventListener("click",x.run);});
}

function renderActions(){
  const sub=SUBJECTS[state.subject];
  const actions=[
    {id:"lesson",icon:"book",name:sub.lesson,desc:sub.desc,run:doLesson},
    {id:"tutor",icon:"target",name:"精准辅导",desc:"单人提分最快，也最容易把人逼到边上",run:chooseTutor},
    {id:"talk",icon:"heart",name:"个别谈心",desc:"推进个人故事线。故事会改变结局，但不会提分",run:chooseTalk},
    {id:"meeting",icon:"people",name:"主题班会",desc:"稳住集体情绪，代价是一节正课",run:doMeeting},
    {id:"parent",icon:"phone",name:"家校沟通",desc:"降压有效，但家长会记住你说过的每句话",run:chooseParent},
    {id:"study",icon:"moon",name:"夜间备课",desc:"用你自己的身体换教学质量，效果会越来越差",run:doStudy},
    {id:"visit",icon:"people",name:"周末家访",desc:"占掉一个休息日。有些事进了那个门才看得见",run:doHomeVisit}
  ];
  $("#actionGrid").innerHTML=actions.map(a=>{
    const fade=dim(a.id)<.8?`<span class="action-cost" style="opacity:.75">效果 ${Math.round(dim(a.id)*100)}%</span>`:`<span class="action-cost">−1</span>`;
    return `<button class="action-card" data-action="${a.id}" ${state.energy<1||state.finished?"disabled":""}>${fade}<span class="action-icon">${ICONS[a.icon]}</span><strong>${a.name}</strong><small>${a.desc}</small></button>`;
  }).join("");
  actions.forEach(a=>{const el=$(`[data-action="${a.id}"]`);if(el)el.addEventListener("click",a.run)});
  const end=$("#endWeekBtn");end.disabled=state.energy>0||state.finished;
  end.textContent=state.finished?"这一届已经毕业":state.energy>0?`这周还有 ${state.energy} 件事没安排`:"这一周就到这里";
}
function TA(s){ return s&&s.female?"她":"他"; }
function portraitHTML(s,gray=false){
  const g=gray?' style="filter:grayscale(1)"':"";
  return s.portrait?`<div class="event-portrait ${s.portrait}"${g}></div>`
    :`<div class="event-portrait avatar-initial" style="--hue:${(s.name.charCodeAt(0)*47)%360}deg${gray?";filter:grayscale(1)":""}">${s.initial||s.name[0]}</div>`;
}
function avatarHTML(s){
  return s.portrait
    ? `<div class="student-avatar ${s.portrait}"></div>`
    : `<div class="student-avatar avatar-initial" style="--hue:${(s.name.charCodeAt(0)*47)%360}deg">${s.initial||s.name[0]}</div>`;
}
function studentCard(s){
  if(s.out) return `<div class="student-item is-out"><div class="student-avatar avatar-gone">—</div><div class="student-main"><div class="student-name">${s.name}<span class="student-tag">已离班</span></div><div class="student-metrics"><span>${dateOf(s.outWeek)}走的</span></div></div><div class="student-alert">—</div></div>`;
  const talk=s.key&&s.met&&s.node;
  const alert=s.stress>=80||s.mood<=38;
  const stressColor=s.stress>=86?"#c0392b":s.stress>75?"#d6664f":"#d7a53d";
  return `<div class="student-item ${talk?"has-story":""}" data-student="${s.id}">${avatarHTML(s)}<div class="student-main">`+
    `<div class="student-name">${s.name}<span class="student-tag">${talk?"有话要说":s.tag}</span></div>`+
    `<div class="student-metrics"><span>学业</span><span class="mini-bar"><i style="width:${s.study}%"></i></span><b>${Math.round(s.study)}</b></div>`+
    `<div class="student-metrics"><span>压力</span><span class="mini-bar"><i style="width:${s.stress}%;background:${stressColor}"></i></span><b>${Math.round(s.stress)}</b></div>`+
    `</div><div class="student-alert ${alert?"":"ok"}">${s.strain>=1?"⚠":alert?"!":"✓"}</div></div>`;
}
function renderStudents(){
  // 面板只放最需要你的人：有故事线要推进的，和状态最差的
  const pending=metKeys().filter(s=>s.node);
  const rest=byNeed(active().filter(s=>!pending.includes(s))).slice(0,6);
  $("#studentList").innerHTML=[...pending,...rest].map(studentCard).join("")+
    `<button id="rosterBtn" class="roster-btn">查看全班 ${classSize()} 人名单 →</button>`;
  $$('[data-student]').forEach(el=>el.addEventListener("click",()=>showStudent(studentById(el.dataset.student))));
  const rb=$("#rosterBtn"); if(rb) rb.addEventListener("click",showRoster);
}
function showRoster(){
  const rows=byNeed(state.students).map(s=>{
    const tag=s.out?"已离班":s.key&&s.met&&s.node?"有话要说":s.tag;
    const color=s.out?"#a09384":s.stress>=86?"#c0392b":s.stress>=78?"#d6664f":"var(--muted)";
    return `<tr data-row="${s.id}" style="cursor:pointer${s.out?";opacity:.4":""}">`+
      `<td><b>${s.name}</b><br><small style="color:var(--muted)">${tag}</small></td>`+
      `<td>${Math.round(s.study)}</td><td>${Math.round(s.mood)}</td>`+
      `<td style="color:${color}"><b>${Math.round(s.stress)}</b></td>`+
      `<td><small>${s.out?`第${s.outWeek}周退出`:bandOf(rawScore(s)).tier}</small></td></tr>`;
  }).join("");
  const risky=active().filter(s=>s.stress>=80).length;
  openModal({eyebrow:`高三（7）班 · 花名册`,title:`全班 ${classSize()} 人`,
    body:`<p>按“最需要你”排序。${risky?`<b style="color:#c0392b">${risky} 人压力已进入危险区。</b>`:"目前没有人处在危险区。"}点任意一行查看档案。</p>
    <div class="scroll-box"><table class="score-table roster-table"><thead><tr><th>学生</th><th>学业</th><th>心情</th><th>压力</th><th>预估</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    choices:[{label:"合上花名册",onChoose:()=>closeModal()}],dismissible:true});
  $$('[data-row]').forEach(el=>el.addEventListener("click",()=>showStudent(studentById(el.dataset.row))));
}
function renderStories(){
  const met=keyStudents().filter(s=>s.met);
  $("#storyProgress").textContent=met.length?`${met.length} 张`:"空的";
  if(!met.length){
    $("#storyList").innerHTML=`<div class="note-empty">桌上还是空的。<br>有事的孩子会自己来。</div>`;
    return;
  }
  $("#storyList").innerHTML=met.map(s=>{
    const state_=s.out?(s.injured?"gone":"left"):s.node===null?"closed":"open";
    const tail={gone:"已经不在学校了",left:`${dateOf(s.outWeek)}走的`,closed:"这件事过去了",
      open:`${TA(s)}还有话没说`}[state_];
    return `<div class="desknote ${state_}"><div class="note-pin"></div>`+
      `<strong>${s.name}</strong><span class="note-thread">${s.thread}</span>`+
      `<small>${tail}</small></div>`;
  }).join("");
}
function renderLog(){
  $("#eventLog").innerHTML=state.log.map(x=>`<div class="log-entry"><span class="log-time">${dateOf(x.week)}</span><p>${x.text}</p></div>`).join("");
}
function setScene(scene,text,speaker=null){
  const art=$("#sceneArt");art.className=`scene-art scene-${scene}`;
  $("#sceneLocation").textContent={classroom:"高三（7）班教室",office:"班主任办公室",corridor:"教学楼走廊"}[scene]||"明德中学";
  $("#sceneNarration p").textContent=text;
  const wrap=$("#speakerPortrait");
  if(speaker){wrap.classList.remove("hidden");wrap.querySelector(".portrait").className=`portrait ${speaker.portrait||PORTRAITS[speaker.id]||"portrait-teacher"}`;wrap.querySelector(".speaker-name").textContent=speaker.name||"你";}
  else wrap.classList.add("hidden");
}
function spend(actionId,text){ state.energy--;state.actionsThisWeek.push(actionId);noteUse(actionId);addLog(text);playTone(560);render(); }

// ── 行动 ──────────────────────────────────────────────────────────
// ── 每个行动都要做一次取舍，没有一键了事的 ────────────────────────
function pickSub({eyebrow,title,hint,scene,options},run){
  openModal({eyebrow,title,body:`<p>${hint}</p>`,
    choices:options.map(o=>({label:o.label,hint:o.hint,onChoose:()=>{closeModal(false);run(o)}}))});
}

// 一节课照顾不到所有人。你得决定这四十五分钟给谁。
const LESSON_FOCUS=[
  {id:"middle",label:"抓中间",hint:"照顾大多数人的进度。稳，但谁也没被特别照顾到。",
   gain:s=>s.study<52?1:s.study<74?2:1, stress:1, tail:"你把节奏压在中等偏下。中间那一片跟上了，前排有人开始翻别的书。"},
  {id:"high",label:"拔高",hint:"讲难题、讲拓展。尖子吃得饱，后排从第三分钟起就听不懂了。",
   gain:s=>s.study>=74?3:s.study>=58?1:0, stress:2, moodLow:-4,
   tail:"你讲到第二问的时候，最后两排已经没有人在动笔了。"},
  {id:"low",label:"补差",hint:"回头补基础。后排跟上来了，尖子生这节课基本是浪费。",
   gain:s=>s.study<58?3:s.study<74?1:0, stress:0, moodHigh:-4, moodLowUp:3,
   tail:"你把三年前的公式重新推了一遍。有个学生小声说，原来是这样。"}
];
function doLesson(){
  pickSub({eyebrow:"这节课",title:SUBJECTS[state.subject].lesson,
    hint:"四十五分钟，照顾不到所有人。今天讲给谁听？",
    options:LESSON_FOCUS},o=>{
    const f=dim("lesson");
    state.stats.teaching=clamp(state.stats.teaching+Math.round((o.id==="middle"?5:4)*f));
    active().forEach(s=>{
      s.study=clamp(s.study+Math.round(o.gain(s)*f),0,s.ceiling||100);
      s.stress=clamp(s.stress+o.stress);
      if(o.moodLow&&s.study<58) s.mood=clamp(s.mood+o.moodLow);
      if(o.moodHigh&&s.study>=74) s.mood=clamp(s.mood+o.moodHigh);
      if(o.moodLowUp&&s.study<58) s.mood=clamp(s.mood+o.moodLowUp);
    });
    setScene("classroom",o.tail,{id:"teacher",name:"你",portrait:"portrait-teacher"});
    spend("lesson",`${SUBJECTS[state.subject].lesson}（${o.label}）。`);
  });
}

const MEETING_TOPIC=[
  {id:"method",label:"讲方法",hint:"复习节奏、错题本、时间分配。实用，但解决不了心里的事。",
   eff:{teaching:3,morale:3,discipline:2}, study:2, stress:-3,
   tail:"你在黑板上画了一张十二周的时间表。有人当场就开始抄。"},
  {id:"heart",label:"谈心态",hint:"把焦虑摊开讲。这节课不提分，但很多人今晚能睡着。同一套话讲第二遍就没人听了。",
   eff:{morale:8,trust:5,teaching:-2}, mood:6, stress:-6,
   tail:"你让每个人写下一件“希望同桌在高考前记得的事”。收上来的纸条有人写了满满一面。"},
  {id:"rule",label:"整纪律",hint:"迟到、手机、晚自习说话。班风会紧起来，代价是气氛。",
   eff:{discipline:10,teaching:1,morale:-6}, stress:3,
   tail:"你把班规又念了一遍。教室很安静，安静得有点过头。"}
];
function doMeeting(){
  pickSub({eyebrow:"这周的班会",title:"四十分钟，开什么",
    hint:"班会占掉一节正课。开什么，班上就往哪边走。",
    options:MEETING_TOPIC},o=>{
    const f=dimSub("meeting",o.id);
    Object.entries(o.eff).forEach(([k,v])=>state.stats[k]=clamp(state.stats[k]+Math.round(v*f)));
    active().forEach(s=>{
      if(o.study) s.study=clamp(s.study+o.study*f,0,s.ceiling||100);
      if(o.mood) s.mood=clamp(s.mood+o.mood*f);
      if(o.stress) s.stress=clamp(s.stress+(o.stress<0?o.stress*f:o.stress));  // 副作用不打折
    });
    noteUse("meeting:"+o.id);
    setScene("classroom",o.tail,{id:"teacher",name:"你",portrait:"portrait-teacher"});
    spend("meeting",`主题班会（${o.label}）。`);
  });
}

const PREP_KIND=[
  {id:"next",label:"备下周的课",hint:"最扎实的一种笨办法。教学涨得最多。",
   eff:{teaching:8,morale:-2}, tail:"办公室的灯亮到两点。你把三套卷子剪开重组，凑出一份真正适合七班的练习。"},
  {id:"exam",label:"编一套模拟卷",hint:"押题不一定准，但能让全班先见一次场面。",
   eff:{teaching:4}, allStudy:2, allStress:3, tail:"你照着近三年的题型编了一套。印出来的时候天已经亮了。"},
  {id:"remedy",label:"给后进生做专项",hint:"只对后排那十几个人有用。教学涨得少，但那十几个人是真的差在这。",
   eff:{teaching:2}, lowStudy:5, lowMood:4, tail:"你把最基础的二十道题挑出来，重新排了顺序。名单上是十四个名字。"}
];
function doStudy(){
  pickSub({eyebrow:"今晚",title:"办公室的灯还亮着",
    hint:"这一晚是你自己的时间。拿去干什么？",
    options:PREP_KIND},o=>{
    const f=dim("study");
    Object.entries(o.eff).forEach(([k,v])=>state.stats[k]=clamp(state.stats[k]+Math.round(v*f)));
    active().forEach(s=>{
      if(o.allStudy) s.study=clamp(s.study+o.allStudy,0,s.ceiling||100);
      if(o.allStress) s.stress=clamp(s.stress+o.allStress);
      if(o.lowStudy&&s.study<58) s.study=clamp(s.study+o.lowStudy,0,s.ceiling||100);
      if(o.lowMood&&s.study<58) s.mood=clamp(s.mood+o.lowMood);
    });
    if((state.actionUse?.study||0)>=3 && !hasFlag("delayedHealth")) setFlag("delayedHealth");
    setScene("office",o.tail,{id:"teacher",name:"你",portrait:"portrait-teacher"});
    spend("study",`夜间备课（${o.label}）。`);
  });
}

function chooseStudent(title,hint,onPick,{storyFirst=false}={}){
  const all=active();
  if(!all.length){ toast("班上已经没有人了。"); return; }
  const pending=storyFirst?metKeys().filter(s=>s.node):[];
  const rest=byNeed(all.filter(s=>!pending.includes(s))).slice(0,pending.length?7:9);
  const mk=s=>({
    label:`${s.name} · ${s.key&&s.met&&s.node?"有话要说":s.tag}`,
    hint:`学业 ${Math.round(s.study)} / 心情 ${Math.round(s.mood)} / 压力 ${Math.round(s.stress)}${s.strain?" · 已发出预警":""}`,
    onChoose:()=>{closeModal(false);onPick(s)}
  });
  const pick=list=>openModal({eyebrow:"选择学生",title,
    body:`<p>${hint}</p><p style="opacity:.7;font-size:.88em">默认按“最需要你”排序${pending.length?"，有故事线要推进的排在最前":""}。</p>`,
    choices:[...list.map(mk),{label:"翻开全班花名册…",hint:`从 ${classSize()} 人里自己找`,onChoose:()=>{closeModal(false);pickFromRoster()}}]});
  function pickFromRoster(){
    const rows=byNeed(active()).map(s=>`<tr data-pick="${s.id}" style="cursor:pointer"><td><b>${s.name}</b><br><small style="color:var(--muted)">${s.tag}</small></td><td>${Math.round(s.study)}</td><td>${Math.round(s.mood)}</td><td><b>${Math.round(s.stress)}</b></td></tr>`).join("");
    openModal({eyebrow:"全班花名册",title,
      body:`<p>${hint}</p><div class="scroll-box"><table class="score-table roster-table"><thead><tr><th>学生</th><th>学业</th><th>心情</th><th>压力</th></tr></thead><tbody>${rows}</tbody></table></div>`,
      choices:[{label:"返回",onChoose:()=>{closeModal(false);pick([...pending,...rest])}}]});
    $$('[data-pick]').forEach(el=>el.addEventListener("click",()=>{closeModal(false);onPick(studentById(el.dataset.pick))}));
  }
  pick([...pending,...rest]);
}
function chooseTutor(){chooseStudent("这节课，坐到谁身边？","单人提分最有效，但会明显推高压力。",s=>{
  const sub=s.lastSub, keys=Object.keys(SUBJECT_FULL);
  const weak=sub?keys.reduce((a,b)=>sub[a]/SUBJECT_FULL[a]<sub[b]/SUBJECT_FULL[b]?a:b):null;
  const opts=keys.map(k=>({k,
    label:`补${SUBJECT_NAME[k]}${k===weak?"（丢分最多）":""}`,
    hint:sub?`上次 ${sub[k]} / ${SUBJECT_FULL[k]}${k===state.subject?" · 你自己教的科目":""}`
      :(k===state.subject?"你自己教的科目，讲起来最顺手":"还没考过，看不出深浅")
  }));
  pickSub({eyebrow:`辅导 · ${s.name}`,title:"补哪一科",hint:"时间只够啃一科。",options:opts},o=>{
    const f=dim("tutor"), own=o.k===state.subject, aimed=o.k===weak;
    applyEff({study:Math.round((own?10:aimed?9:6)*f),trust:3,stress:own?4:6,mood:-2},s);
    state.stats.teaching=clamp(state.stats.teaching+(own?2:0));
    if(s.lastSub) s.lastSub[o.k]=Math.min(Math.round(SUBJECT_FULL[o.k]*SUBJECT_CAP[o.k]),s.lastSub[o.k]+(aimed?4:2));
    setScene("classroom",own
      ?`你把椅子拉到${s.name}桌边，从最基础的一步重讲。讲到第三遍，草稿纸上的问号变成了一条直线。`
      :`${SUBJECT_NAME[o.k]}不是你的科目。你现学现卖，讲得磕磕绊绊，${TA(s)}倒是听进去了。`,s);
    spend("tutor",`辅导${s.name}的${SUBJECT_NAME[o.k]}。`);
  });
})}
const PARENT_TONE=[
  {id:"praise",label:"只说好的",hint:"挑三件做得好的小事讲。孩子今晚能松一口气，家长可能觉得你在敷衍。",
   eff:{mood:6,trust:4},reliefMul:1.2,prestige:0,risk:.22,
   tail:s=>`电话那端沉默了一会儿。你没告状，只把${s.name}最近做得好的三件小事说了一遍。`},
  {id:"honest",label:"实话实说",hint:"成绩、状态、你担心的地方，一样不瞒。有用，但今晚那个家里不会太平。",
   eff:{mood:-5,trust:2,study:3},reliefMul:.5,prestige:3,risk:.42,
   tail:s=>`你把话说得很直。挂掉电话之后，${TA(s)}的手机响了很久。`},
  {id:"ask",label:"先问，再说",hint:"先问家里最近怎么样。可能问出你不知道的事，也可能什么都问不出来。",
   eff:{trust:7,mood:3},reliefMul:1.5,prestige:1,risk:.18,probe:true,
   tail:s=>`你先问了一句“孩子在家吃得怎么样”。对面愣了一下，然后说了很多。`}
];
function chooseParent(){chooseStudent("给谁的家里打电话？","降压最有效的手段。但你说出口的每句话，家长都会记住并复述。",s=>{
  pickSub({eyebrow:`电话 · ${s.name}家`,title:"怎么开口",
    hint:`${s.name}，${s.tag}。压力 ${Math.round(s.stress)}，心情 ${Math.round(s.mood)}。`,
    options:PARENT_TONE},o=>{
    const f=dim("parent"), relief=Math.round((s.stress>=70?14:8)*f*o.reliefMul);
    applyEff({...o.eff,stress:-relief},s);
    if(rand()<o.risk){ state.stats.prestige=clamp(state.stats.prestige-4); addLog(`${s.name}的家长把你的话转述给了别人，版本变了。`); }
    else state.stats.prestige=clamp(state.stats.prestige+o.prestige);
    if(o.probe&&rand()<.45){ s.mood=clamp(s.mood+6); s.stress=clamp(s.stress-6); addLog(`你问出了${s.name}家里最近的一件事。`); }
    setScene("office",o.tail(s),{id:"teacher",name:"你",portrait:"portrait-teacher"});
    spend("parent",`打给${s.name}家（${o.label}）。`);
  });
})}
function chooseTalk(){chooseStudent("今天，听谁把话说完？","谈心不提分，但能把人从边上拉回来。班上任何一个人都可以。",s=>startStoryBeat(s),{storyFirst:true})}

const SMALL_TALK=[
  ["“我妈昨天问我，是不是不想读了。我说没有。”", t=>`${t}说完就低下头，没再往下讲。`],
  ["“老师，我最近老是背到一半就走神。”", ()=>"不是大问题，但也不是没问题。"],
  ["“其实我挺喜欢这个班的。就是……有点跟不上。”", t=>`这是${t}这学期第一次主动跟你说话。`],
  ["“我爸下个月就不出差了。他说要来陪我考。”", t=>`${t}难得笑了一下。`],
  ["“没什么事。就是想找个人说说话。”", ()=>"有时候这句话本身就是全部内容。"],
  ["“我数学又退步了。您别跟我妈说。”", t=>`${t}把成绩单折了两折，塞回口袋。`]
];
const STORY_PAUSE=[
  t=>`${t}走到门口又停下来，说还有件事，改天再说。`,
  t=>`上课铃响了。${t}把没说完的半句咽了回去。`,
  t=>`${t}点点头，没有再往下讲。`,
  t=>`办公室里进来了别的老师。${t}站起来说，我先回去了。`,
  t=>`${t}看了一眼表，说妈妈还在校门口等。`
];
function startStoryBeat(s){
  // 还没有故事找上门的学生：一次普通的谈话，没有剧情，但一样有用
  if(!s.key||!s.met){
    const i=Math.abs(s.name.charCodeAt(0)+state.week)%SMALL_TALK.length, t=SMALL_TALK[i];
    const hint2=s.key?"你说不上为什么，但这个学生你会想再多看两眼。":"一次普通的谈话。班上四十多个人，每一个都值得这十分钟。";
    openModal({eyebrow:"课后谈心",title:`${s.name} · ${s.tag}`,
      body:`<div class="event-scene">${avatarHTML(s).replace("student-avatar","event-portrait")}<div class="dialogue">${t[0]}</div></div><p>${t[1](TA(s))}</p>`,
      choices:[{label:"听他说完",hint:hint2,onChoose:()=>{
        applyEff({trust:5,stress:-9,mood:6},s);closeModal();
        setScene("office",`你和${s.name}聊了十分钟。窗外的操场慢慢空了。`,s);
        spend("talk",`与${s.name}谈心：压力下降，信任上升。`);
      }}]});
    return;
  }
  if(s.node===null){
    openModal({eyebrow:"课后谈心",title:`${s.name} · 故事之后`,
      body:`<div class="event-scene"><div class="event-portrait ${s.portrait}"></div><div class="dialogue">“最近还行。真的。”</div></div><p>《${s.thread}》已经走到结尾。你能做的只剩陪着。</p>`,
      choices:[{label:"陪他坐十分钟",hint:"没有大道理，只有几句近况。",onChoose:()=>{
        applyEff({trust:3,stress:-6,mood:4},s);closeModal();
        setScene("office",`你和${s.name}聊了十分钟。窗外的操场慢慢空了。`,s);
        spend("talk",`与${s.name}日常谈心：状态更稳定。`);
      }}]});
    return;
  }
  const beat=s.nodes[s.node];
  openModal({eyebrow:`${s.thread} · 第 ${s.story+1} 章`,title:beat.title,
    body:`<div class="event-scene"><div class="event-portrait ${s.portrait}"></div><div><div class="dialogue">${beat.quote}</div></div></div><p>${beat.text}</p>`,
    choices:beat.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const d=applyEff(c.eff,s); setFlag(c.flag); s.story++; s.node=c.next||null;
      closeModal(false); setScene("office",c.hint,s);
      spend("talk",`${s.name}《${s.thread}》第 ${s.story} 章：${c.label}。`);
      showOutcome({title:c.label,text:c.hint,portrait:portraitHTML(s),delta:d,flag:c.flag,
        extra:s.node===null?`<p class="echo-note">${TA(s)}站起来，把椅子推回原位，说了声谢谢老师。这件事到这里就结束了。</p>`
          :`<p class="echo-note">${STORY_PAUSE[state.week%STORY_PAUSE.length](TA(s))}</p>`});
    }}))});
}
function showStudent(s){
  const nextTitle=s.node?s.nodes[s.node].title:"故事已完成";
  const info=s.key&&s.met
    ? `<p><b>优势：</b>${s.strength}</p><p><b>风险：</b>${s.risk}</p><p><b>故事线：</b>《${s.thread}》${s.story}/3</p>`
    : `<p><b>身份：</b>${s.tag}</p><p><b>任课老师评估：</b>再拼一学期，大概能到 ${s.ceiling||100} 分档${(s.ceiling||100)<70?"。底子薄，急不来":(s.ceiling||100)>90?"。是块料":""}</p>`+
      `<p style="opacity:.75">${s.stress>=80?`最近状态不太好。有空的话，找${TA(s)}说说话。`:"目前没什么特别的事。"}</p>`;
  openModal({eyebrow:`学生档案 · ${s.tag}`,title:s.name,
    body:`<div class="event-scene">${(s.portrait?`<div class="event-portrait ${s.portrait}"></div>`:avatarHTML(s).replace("student-avatar","event-portrait"))}<div>${info}</div></div>
    ${s.out?"":`<p style="opacity:.8;font-size:.92em"><b>班上的说法：</b>${quirkOf(s)}。</p>`}
    <div class="result-grid"><div class="result-cell"><strong>${Math.round(s.study)}</strong><small>学业</small></div><div class="result-cell"><strong>${Math.round(s.mood)}</strong><small>心情</small></div><div class="result-cell"><strong>${Math.round(s.stress)}</strong><small>压力</small></div></div>
    ${s.strain?`<p style="color:#c0392b"><b>警告：</b>${TA(s)}已经处在崩溃边缘。再有一周不下降，就会永久退出。</p>`:""}
    <p><b>当前估分：</b>${projectedPersonal(s)} 分 · 预计可上 <b>${bandOf(projectedPersonal(s)).tier}</b>（${bandOf(projectedPersonal(s)).cut}）</p>
    ${s.lastSub?`<p><b>最近一次考试：</b>${Object.keys(SUBJECT_FULL).map(k=>`${SUBJECT_NAME[k]} ${s.lastSub[k]}`).join(" · ")}　总分 <b>${s.lastScore}</b>${weakSubject(s.lastSub)?`　<span style="color:#a4483a">${weakSubject(s.lastSub)}明显偏弱</span>`:""}</p>`:""}
`,
    choices:[{label:"合上档案",hint:s.summary||`${s.tag} · 高三（7）班`,onChoose:()=>closeModal()}],dismissible:true});
}

// ── 周末结算 ────────────────────────────────────────────────────────
// 高考越近，基础压力越重。原来只有第 7、10 周各 +1，被士气的 -2 完全盖住，
// 结果士气一上 68，全班压力每周净降 2，第七周之后就再没有人靠近危机线。
function baseTension(w){ return w>=11?3.4 : w>=9?2.8 : w>=7?2.2 : w>=4?1.4 : 0.8; }
// 压力地板：高三班上没有人是真的松弛的
function stressFloor(w){ return w>=9?34 : w>=5?30 : 27; }

function weeklyDrift(){
  const late=baseTension(state.week);
  const floor=stressFloor(state.week);
  active().forEach(s=>{
    let d=late;   // 周末多少能缓一点，但缓不过倒计时
    if(state.stats.discipline<40) d+=1;
    if(state.stats.morale>=68) d-=1.5; else if(state.stats.morale>=58) d-=1; else if(state.stats.morale<45) d+=1;
    s.stress=clamp(s.stress+d);
    if(s.stress<floor) s.stress=Math.min(floor, s.stress+2.2);        // 松下来的人，下一周又被倒计时提上去一点
    s.mood=clamp(s.mood+(state.stats.morale>=60?1.5:-2));
    if(state.stats.trust<40) s.trust=clamp(s.trust-1);
    // 被你真正接住的孩子，天花板自己会往上长一点——否则第 6 周之后教学全打在空气上
    if(s.mood>=64&&state.stats.morale>=64&&s.stress<72&&(s.ceiling||100)<97) s.ceiling=Math.min(97,(s.ceiling||100)+0.8);
    // 熬到这个份上，最先垮掉的是成绩本身
    if(s.stress>=86){ s.study=clamp(s.study-(s.stress>=93?2:1),0,s.ceiling||100); s.mood=clamp(s.mood-2); }
    if(state.incident) s.stress=clamp(s.stress+1);   // 出事之后，整个班都没缓过来
  });
  // 没有哪个状态是冲到顶就不用再管的：高位自己会往回掉
  ["teaching","morale","discipline","trust"].forEach(k=>{
    if(state.stats[k]>=88) state.stats[k]=clamp(state.stats[k]-2);
    else if(state.stats[k]>=76) state.stats[k]=clamp(state.stats[k]-1);
  });

  // 对手不是在原地等你：后程发力，被你压过还会加码
  const ours=projectedScore();
  state.rivals.forEach(r=>{
    let g=(r.growth||3)+rand()*1.6-0.8;
    if(state.week>=7) g+=(r.push||0);
    if(state.week>=10) g+=(r.push||0)*0.6;
    if(ours>r.score+5) g+=(r.react||0)*0.8;      // 你真冒头了，他们才会加码
    r.score+=g;
  });
  // 每周有一个班会有自己的动静
  if(rand()<.55){
    const r=state.rivals[rint(0,state.rivals.length-1)];
    const m=RIVAL_MOVES[rint(0,RIVAL_MOVES.length-1)];
    r.score+=m.g; state.rivalNews=m.t(r);
  } else state.rivalNews=null;
}

// ── 撑不住的时候会发生什么 ──────────────────────────────────────────
// 绝大多数情况下，长期高压只是让人考砸：成绩往下掉，最后去复读或读大专。
// 真正离开这个班的，一届最多一两个。
// 但如果一个孩子一路滑到底、而你一次都没有停下来看他，会有不可挽回的事。

const CRISIS_STAGES = [
  { // 第 1 级：可以被听见的信号
    eyebrow:"有人跟你提起",
    title:()=>`数学老师在办公室叫住了你`,
    text:()=>`“你们班那个孩子，这两周上课一直在发呆。作业本最后一页写了一句话，我拍下来了——‘反正也没什么意思’。我不知道该不该当回事。”`,
    signs:["成绩断崖式下滑","请假变多、上课长时间发呆","作业本上出现消极的字句"],
    choices:[
      {label:t=>`当天就把${t}叫来，问清楚`, hint:"你占用了备课的时间，也可能问不出什么。但你去了。",
       eff:{stress:-16,mood:8,trust:6,teaching:-3}, calm:true},
      {label:()=>"先记下来，等这阵子忙完", hint:t=>`月考、家长会、公开课。你确实很忙，而且${t}看上去还行。`,
       eff:{stress:4}, calm:false}
    ]},
  { // 第 2 级：更难忽视的信号
    eyebrow:"更清楚的信号",
    title:()=>`同桌来找你，说了一件事`,
    text:t=>`“老师，${t}这几天把喜欢的书都送人了。我问${t}为什么，${t}说用不上了。还有……${t}昨天问我，如果一个人不在了，大家会难过多久。”`,
    signs:["把珍视的东西送人","睡眠与食欲明显变化","开始谈论“如果我不在了”"],
    choices:[
      {label:()=>"立刻联系家长和心理老师，今天就见面", hint:"要惊动很多人，家长可能不配合，学校会记一笔。但这不是你一个人扛得住的事。",
       eff:{stress:-26,mood:14,trust:10,prestige:-8,teaching:-4}, calm:true},
      {label:t=>`找${t}谈了一次，让${t}先熬过这阵`, hint:t=>`你说了很多鼓励的话。${t}点了头，说知道了。`,
       eff:{stress:-4,mood:2}, calm:false}
    ]},
  { // 第 3 级：最后一扇还开着的门
    eyebrow:"最后的窗口",
    title:t=>`${t}今天特别平静`,
    text:t=>`${t}把课桌收拾得很干净，作业一样不落地交齐了，还主动跟几个同学道了谢。任课老师说，这孩子好像想通了。\n\n你想起心理培训上讲过的一句话：长期低落之后突然的平静，不一定是好转。`,
    signs:["长期低落后突然的平静","反常地整理东西、逐一道别","把该交代的都交代清楚"],
    choices:[
      {label:t=>`停课。今天就带${t}去医院，联系监护人到场`, hint:"你越权了，年级会追究，这件事会进学校的记录。但你不打算赌。",
       eff:{stress:-40,mood:20,trust:14,prestige:-14,teaching:-6}, calm:true, resolve:true},
      {label:t=>`叮嘱了几句，让${t}早点回家休息`, hint:"你注意到了，也说了。你希望这就够了。",
       eff:{stress:2}, calm:false}
    ]}
];
const TX=(v,t)=>typeof v==="function"?v(t):v;

function crisisStudent(){ return state.crisis&&state.crisis.id?studentById(state.crisis.id):null; }

function crisisCheck(done){
  const seq=[];

  // 1) 长期高压首先侵蚀的是成绩本身——这才是绝大多数孩子的结局
  active().forEach(s=>{
    if(s.stress>=88) s.strain=(s.strain||0)+1;
    else if(s.stress<80) s.strain=0;
  });

  // 2) 心理危机：一届最多一条线，锁定滑得最深的那个孩子
  const c=state.crisis;
  const locked=crisisStudent();
  if(!state.incident){
    if(locked&&!locked.out){
      if(locked.stress<74){                 // 你把他拉回来了
        if(c.stage>0) seq.push(n=>crisisEasedModal(locked,n));
        state.crisis={id:null,stage:0,sinceWeek:0};
      } else if(state.week>c.sinceWeek){
        if(c.stage>=CRISIS_STAGES.length) seq.push(n=>incidentModal(locked,n));
        else seq.push(n=>crisisStageModal(locked,n));
      }
    } else if(!locked){
      const cand=active().filter(s=>s.strain>=2).sort((a,b)=>b.stress-a.stress)[0];
      if(cand){ state.crisis={id:cand.id,stage:0,sinceWeek:state.week-1}; seq.push(n=>crisisStageModal(cand,n)); }
    }
  }

  // 3) 真正办手续离开的，一届最多两个，而且要压到极处
  // 一届最多两个人真的走；危机线已经升到高位时不再另外送人走
  if(state.lost.length<2 && !state.incident && (!state.crisis.id||state.crisis.stage<2)){
    const quit=active().find(s=>s.stress>=93&&s.strain>=3&&state.crisis.id!==s.id);
    if(quit) seq.push(n=>withdrawModal(quit,n));
  }

  runSteps(seq,done);
}

function crisisStageModal(s,next){
  const st=CRISIS_STAGES[state.crisis.stage];
  state.crisis.sinceWeek=state.week;
  addLog(`${s.name}：${TX(st.title,TA(s))}`);
  const t=TA(s);
  openModal({eyebrow:st.eyebrow,title:TX(st.title,t),
    body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">${TX(st.text,t).replace(/\n\n/g,"</div><div class=\"dialogue\" style=\"margin-top:8px\">")}</div></div>
    <div class="warning-signs"><b>你注意到的：</b><ul>${st.signs.map(x=>`<li>${x}</li>`).join("")}</ul></div>
    <p class="echo-note">${s.name}，${s.tag}。这周记在本子上的压力值：<b style="color:#c0392b">${Math.round(s.stress)}</b>。</p>`,
    choices:st.choices.map(c=>({label:TX(c.label,t),hint:TX(c.hint,t),onChoose:()=>{
      const d=applyEff(c.eff,s);
      let tail;
      if(c.resolve||s.stress<74){
        state.crisis={id:null,stage:0,sinceWeek:0};
        addLog(`${s.name}的状态好转了。`);
        tail=`<p class="echo-note">这周${TA(s)}把落下的作业补齐了。${TA(s)}母亲发来消息说，孩子昨晚十点就睡了。</p>`;
      }else{
        state.crisis.stage++;
        state.crisis.sinceWeek=state.week+(c.calm?1:0);
        const left=CRISIS_STAGES.length-state.crisis.stage;
        tail=`<p class="echo-note">${left>0
          ?`${TA(s)}说知道了，然后回教室了。走廊很长，${TA(s)}走得很慢。`
          :`${TA(s)}谢过你，把门轻轻带上。你听着脚步声一直走到楼梯口。`}</p>`;
      }
      closeModal(false);
      showOutcome({title:TX(c.label,t),text:TX(c.hint,t),portrait:portraitHTML(s),delta:d,extra:tail},next);
    }}))});
}

function crisisEasedModal(s,next){
  state.stats.trust=clamp(state.stats.trust+4);
  addLog(`${s.name}的状态明显好转了。`);
  unlockMedal("m_saved");
  openModal({eyebrow:"缓过来了",title:`${s.name} 今天笑了一下`,
    body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">“老师，我这周睡得挺好的。真的。”</div></div>
    <p>他把没写完的作业补交了。这件事不会写进任何一份材料里，但你知道它发生过。</p>`,
    choices:[{label:"很好",hint:"班级信任 +4",onChoose:()=>{closeModal(false);next()}}]});
}

function incidentModal(s,next){
  s.out=true; s.outWeek=state.week; s.node=null; s.injured=true;
  state.incident={id:s.id,name:s.name,week:state.week};
  state.lost.push({id:s.id,name:s.name,week:state.week,thread:s.thread||null,story:s.story||0,injured:true});
  state.stats.morale=clamp(state.stats.morale-34);
  state.stats.trust=clamp(state.stats.trust-26);
  state.stats.prestige=clamp(state.stats.prestige-30);
  state.stats.discipline=clamp(state.stats.discipline-12);
  active().forEach(x=>{ x.mood=clamp(x.mood-16); x.stress=clamp(x.stress+10); });
  addLog(`${s.name}出事了。这一周之后，什么都不一样了。`);
  openModal({eyebrow:"不可挽回",title:"那天早上",
    body:`<p>周一早读，教学楼下围了很多人。</p>
    <p>救护车来得很快。${s.name}活了下来，脊髓损伤，腰部以下没有知觉。医生说，以后大概率要靠轮椅。</p>
    <p>${TA(s)}母亲在急诊室外问了你一句话：“老师，${TA(s)}最近……是不是跟您说过什么？”</p>
    <p style="opacity:.85">说过。数学老师跟你提过，同桌来找过你，${TA(s)}把书送人的时候你也听说了。每一次你都在忙别的事。</p>
    <hr style="border:0;border-top:1px solid var(--line);margin:16px 0">
    <p><b>高三（7）班停课三天。</b>心理干预小组进驻，家长会开到夜里十一点。你写了六千字的情况说明。</p>
    <p>这一届剩下的每一周，都会在这件事之后进行。</p>`,
    choices:[{label:"接着往下走",hint:"没有别的选项了",onChoose:()=>{closeModal(false);playTone(140,.6);next()}}]});
}

function withdrawModal(s,next){
  s.out=true; s.outWeek=state.week; s.node=null; s.study=clamp(s.study-12);
  state.lost.push({id:s.id,name:s.name,week:state.week,thread:s.thread||null,story:s.story||0});
  state.stats.morale=clamp(state.stats.morale-9);
  state.stats.trust=clamp(state.stats.trust-6);
  const why=({linxiaoyu:"她母亲办了休学，说先去看病，明年再考。",
    zhouyang:"他签了退队申请，也签了休学申请，两张纸一起交上来的。",
    suqing:"抚养权判给了父亲。她跟着转去了另一座城市。",
    chengmo:"家里给他办了走读，说在家复习更安静。他再没回来过。",
    luming:"第二张转学申请交了上去。这次没有人拦得住。"})[s.id]
    ||`家里给${s.name}办了休学手续。说是身体原因，让${TA(s)}明年再来。`;
  openModal({eyebrow:"离开",title:`${s.name} 走了`,
    body:`<div class="event-scene">${portraitHTML(s,true)}<div class="dialogue">${why}</div></div>
    <p>课桌搬到了教室后面。这是这一届第 ${state.lost.length} 个走的人。</p>
    <p style="opacity:.8">班级士气与信任受损。高考名单上会少一个名字。</p>`,
    choices:[{label:"在点名册上划掉这个名字",hint:"",onChoose:()=>{closeModal(false);playTone(180,.3);next()}}]});
}

function dueCallbacks(){
  return CALLBACKS.filter(cb=>hasFlag(cb.flag)
    && state.week >= state.flags[cb.flag].week + cb.after
    && !state.firedCallbacks.includes(cb.id)
    && !(cb.flag.startsWith("lin")&&studentById("linxiaoyu").out)
    && !(cb.flag.startsWith("zhou")&&studentById("zhouyang").out)
    && !(cb.flag.startsWith("cheng")&&studentById("chengmo").out)
    && !(cb.flag.startsWith("su")&&studentById("suqing").out)
    && !(cb.flag.startsWith("lu")&&studentById("luming").out));
}
function dueCallback(){ return dueCallbacks()[0]; }
function showCallback(cb,next){
  state.firedCallbacks.push(cb.id);
  openModal({eyebrow:"旧账",title:cb.title,
    body:`<div class="event-scene"><div class="event-portrait ${cb.portrait}"></div><div class="dialogue">${cb.text}</div></div>
    <p class="echo-note">${agoPhrase(state.flags[cb.flag].week,state.week)}那个决定，现在轮到你还了。</p>`,
    choices:cb.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const d=applyEff(c.eff);setFlag(c.flag);addLog(`【后果】${cb.title}：${c.label}。`);closeModal(false);
      showOutcome({title:c.label,text:c.hint,portrait:`<div class="event-portrait ${cb.portrait}"></div>`,delta:d,flag:c.flag,
        extra:`<p class="echo-note">这一笔的起头，是${dateOf(state.flags[cb.flag]?state.flags[cb.flag].week:state.week)}那天。</p>`},next);
    }}))});
}
function drawEvent(){
  let pool=WEEK_EVENTS.filter(e=>!state.usedEvents.includes(e.id)&&(!e.req||e.req(state)));
  if(!pool.length){ state.usedEvents=[]; pool=WEEK_EVENTS.filter(e=>!e.req||e.req(state)); }
  if(!pool.length) return null;
  return pool[rint(0,pool.length-1)];
}
function showEvent(ev,next){
  state.usedEvents.push(ev.id);
  openModal({eyebrow:"这一周",title:ev.title,
    body:`<div class="event-scene"><div class="event-portrait ${ev.portrait}"></div><div class="dialogue">${ev.text}</div></div>`,
    choices:ev.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const d=applyEff(c.eff);setFlag(c.flag);addLog(`${ev.title}：${c.label}。`);closeModal(false);
      showOutcome({title:c.label,text:c.hint,portrait:`<div class="event-portrait ${ev.portrait}"></div>`,delta:d,flag:c.flag},next);
    }}))});
}

function endWeek(){
  if(state.energy>0||state.finished)return;
  playTone(350,.1);
  weeklyDrift();
  applyTimetable();
  applySeats();
  postEffects();
  const steps=[n=>crisisCheck(n)];
  if([3,6,9,12].includes(state.week)) steps.push(n=>runExam(n));
  else {
    // 你自己种下的事，到点一定会来敲门
    const cbs=dueCallbacks().slice(0,3);
    cbs.forEach(cb=>steps.push(n=>showCallback(cb,n)));
    const pta=duePTA();
    if(pta) steps.push(n=>showPTA(pta,n));
    const ch=activeChainDue();
    if(ch) steps.push(n=>showChain(ch,n));
    // 日历上的日子，到了就是到了——不参与抽签
    const egg=dueEgg();
    if(egg) steps.push(n=>showLight(egg,n));
    // 没有旧账要结，才轮到新的事情发生
    if(!cbs.length&&!ch&&!pta){
      const r=rand(), fresh=newChainAvailable();
      if(fresh&&r<.42) steps.push(n=>showChain(fresh,n));
      else if(r<.58){ const st=drawStaffEvent(); if(st) steps.push(n=>showStaffEvent(st,n)); else { const ev=drawEvent(); if(ev) steps.push(n=>showEvent(ev,n)); } }
      else if(r<.72) steps.push(n=>showStudentAsk(n));
      else if(r<.82){ const lm=drawLight(); if(lm) steps.push(n=>showLight(lm,n)); else { const ev=drawEvent(); if(ev) steps.push(n=>showEvent(ev,n)); } }
      else { const ev=drawEvent(); if(ev) steps.push(n=>showEvent(ev,n)); }
    }
  }
  if(state.week<12) steps.push(n=>weeklyReport(n));
  runSteps(steps,()=>{ if(!state.finished) advanceWeek(); });
}

const ACTION_NAME={lesson:"课堂教学",tutor:"精准辅导",talk:"个别谈心",meeting:"主题班会",parent:"家校沟通",study:"夜间备课",visit:"周末家访"};
function subjectBlock(alive){
  if(!alive.length) return "";
  const keys=Object.keys(SUBJECT_FULL);
  const avg=k=>alive.reduce((n,s)=>n+s.lastSub[k],0)/alive.length;
  const cells=keys.map(k=>{
    const a=avg(k), rate=a/SUBJECT_FULL[k];
    const mine=k===state.subject;
    return `<div class="subj-cell ${mine?"mine":""}"><small>${SUBJECT_NAME[k]}${mine?" · 你教的":""}</small>`+
      `<strong>${a.toFixed(1)}</strong><em>满分 ${SUBJECT_FULL[k]} · 得分率 ${(rate*100).toFixed(0)}%</em></div>`;
  }).join("");
  const star=keys.map(k=>{
    const top=alive.reduce((a,b)=>a.lastSub[k]>b.lastSub[k]?a:b);
    return `${SUBJECT_NAME[k]} <b>${top.name}</b> ${top.lastSub[k]}`;
  }).join(" · ");
  const weak=alive.map(s=>({s,w:weakSubject(s.lastSub)})).filter(x=>x.w);
  return `<div class="report-block"><div class="report-label">分科均分</div>
    <div class="subj-grid">${cells}</div>
    <div class="report-mini">单科最高 · ${star}</div>
    ${weak.length?`<div class="report-mini" style="color:#a4483a">偏科预警 ${weak.length} 人：${weak.slice(0,6).map(x=>`${x.s.name}（${x.w}）`).join("、")}${weak.length>6?" 等":""}</div>`:""}
    </div>
    <button class="roster-btn" id="fullSheetBtn">展开全班成绩单（${alive.length} 人）</button>
    <div id="fullSheet" class="full-sheet" style="display:none">${scoreSheetHTML(alive)}</div>`;
}
function scoreSheetHTML(alive){
  const keys=Object.keys(SUBJECT_FULL);
  const rows=[...alive].sort((a,b)=>b.lastScore-a.lastScore).map((s,i)=>{
    const w=weakSubject(s.lastSub);
    return `<tr><td>${i+1}</td><td><b>${s.name}</b><br><small style="color:var(--muted)">${s.tag}</small></td>`+
      keys.map(k=>`<td${w===SUBJECT_NAME[k]?' class="weak"':""}>${s.lastSub[k]}</td>`).join("")+
      `<td><b>${s.lastScore}</b></td><td><small>${bandOf(s.lastScore).tier}</small></td></tr>`;
  }).join("");
  return `<p style="opacity:.75;font-size:.86em;margin:10px 0 6px">标红的是明显拖后腿的科目（得分率比本人平均低 12 个百分点以上）。</p>
    <div class="scroll-box sheet-scroll"><table class="score-table sheet-table"><thead><tr><th>名次</th><th>学生</th>${keys.map(k=>`<th>${SUBJECT_NAME[k]}</th>`).join("")}<th>总分</th><th>层次</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function bindSheet(){
  const b=$("#fullSheetBtn"); if(!b) return;
  b.addEventListener("click",()=>{
    const el=$("#fullSheet"); const open=el.style.display!=="none";
    el.style.display=open?"none":"block";
    b.textContent=open?`展开全班成绩单（${active().filter(x=>x.lastSub).length} 人）`:"收起成绩单";
  });
}
function fmtDelta(v){ const r=Math.round(v); return r>0?`+${r}`:r<0?`${r}`:"±0"; }
function weeklyReport(next){
  const snap=state.snap||snapshot();
  const acts=state.actionsThisWeek.length
    ? state.actionsThisWeek.map(a=>`<span class="act-chip">${ACTION_NAME[a]||a}</span>`).join("")
    : `<span style="opacity:.6">这一周你什么都没安排。</span>`;
  const clsRow=CLASS_KEYS.map(k=>{
    const v=Math.round(state.stats[k]-snap.stats[k]);
    return `<span class="delta-chip ${v>0?"up":v<0?"down":"flat"}">${CLASS_LABEL[k]} ${v>0?"+":""}${v||"±0"}</span>`;
  }).join("");

  const moved=active().filter(s=>snap.per[s.id]).map(s=>({s,d:s.study-snap.per[s.id].study,st:s.stress-snap.per[s.id].stress}));
  const up=[...moved].sort((a,b)=>b.d-a.d)[0];
  const down=[...moved].sort((a,b)=>b.st-a.st)[0];
  const worst=byNeed(active())[0];
  const pending=metKeys().filter(s=>s.node);
  const risky=active().filter(s=>s.stress>=80);
  const nextExam=[3,6,9,12].find(w=>w>=state.week);
  const examName={3:"月考",6:"期中考",9:"一模",12:"高考"}[nextExam];

  const PAUSED=[
    "在办公室门口站过一次，没进来",
    "值日的时候留到最后，欲言又止",
    "交作业时多站了两秒，最后什么也没说",
    "在走廊上叫住你，又说没事"
  ];
  const lines=[];
  if(state.rivalNews) lines.push(`<li style="color:#8a6a3a">${state.rivalNews}</li>`);
  if(up&&up.d>0) lines.push(`<li><b>${up.s.name}</b>这周明显跟上来了，学业 ${Math.round(snap.per[up.s.id].study)} → ${Math.round(up.s.study)}。</li>`);
  if(down&&down.st>0) lines.push(`<li><b>${down.s.name}</b>眼下的黑眼圈很重，压力 ${Math.round(snap.per[down.s.id].stress)} → ${Math.round(down.s.stress)}。</li>`);
  if(worst&&worst.stress>=76) lines.push(`<li>全班状态最差的是<b>${worst.name}</b>（${worst.tag}），压力 <b style="color:#c0392b">${Math.round(worst.stress)}</b>。</li>`);
  if(risky.length>1) lines.push(`<li>压力过 80 的一共 ${risky.length} 个人。</li>`);
  pending.forEach((x,i)=>lines.push(`<li><b>${x.name}</b>${PAUSED[(state.week+i)%PAUSED.length]}。</li>`));
  if(state.crisis&&state.crisis.id){ const c=studentById(state.crisis.id); if(c&&!c.out) lines.push(`<li style="color:#c0392b"><b>${c.name}</b>这周还是那个样子。</li>`); }
  // 闲笔：手记里也会记一些跟分数无关的事
  if(rand()<.5){
    const a=active(), sl=a[rint(0,a.length-1)];
    const L=[
      `${sl.name}这周把橡皮切成了两半，说一半要留着高考用。`,
      `${sl.name}在课本侧面画的翻页小人动画更新了，剧情进展到主角学会了二段跳。`,
      `${sl.name}的水杯里泡的东西，这周看起来更像中药了。`,
      `倒计时牌旁边多了一行小字：「也距离暑假」。没人承认是谁写的。`,
      `${sl.name}打饭的速度刷新了纪录：从教室到食堂窗口，一分五十秒。`,
      `第三组不知何时集体换上了同款红色笔袋，上面印着「过过过」。`,
      `${sl.name}背书的音量毫无长进，前后桌已经会背${TA(sl)}那一篇了。`,
      `扫地的时候从讲台底下扫出七个粉笔头和一张三年前的假条。`
    ];
    lines.push(`<li style="opacity:.85">${L[rint(0,L.length-1)]}</li>`);
  }
  const goodPair=(state.seats||[]).map(([x,y])=>[studentById(x),studentById(y)]).find(([a2,b2])=>a2&&b2&&seatChemistry(a2,b2)===2);
  if(goodPair&&rand()<.35) lines.push(`<li style="opacity:.85"><b>${goodPair[0].name}</b>和<b>${goodPair[1].name}</b>把两张桌子拼得越来越近，美其名曰「学习共同体」。</li>`);
  if(!lines.length) lines.push("<li>这一周班上没出什么事。</li>");

  const proj=projectedScore(), rk=1+state.rivals.filter(r=>r.score>proj).length;
  openModal({eyebrow:"本周小结",title:`班主任手记 · ${dateOf(state.week)}`,
    body:`<div class="report-block"><div class="report-label">这周你做了</div><div class="act-list">${acts}</div></div>
    <div class="report-block"><div class="report-label">班级变化</div><div class="delta-row">${clsRow}</div>
      <div class="report-mini">全班平均 · 学业 ${Math.round(avgStudent("study"))}（${fmtDelta(avgStudent("study")-snap.study)}） · 压力 ${Math.round(avgStudent("stress"))}（${fmtDelta(avgStudent("stress")-snap.stress)}） · 心情 ${Math.round(avgStudent("mood"))}（${fmtDelta(avgStudent("mood")-snap.mood)}）</div></div>
    <div class="report-block"><div class="report-label">这周的琐事</div><ul class="report-list">${lines.join("")}</ul></div>
    <div class="report-block"><div class="report-label">眼下</div>
      <div class="report-mini">班级均分预估 <b>${proj}</b> · 年级第 <b>${rk}</b>${nextExam?` · ${examName}${["就在这周","就在下周","还有两周","还有三周"][nextExam-state.week]||"还早"}`:""}</div></div>`,
    choices:[{label:state.week>=11?"翻到高考那一周":`翻到 ${dateOf(state.week+1)}`,onChoose:()=>{closeModal(false);next&&next()}}]});
}

function runExam(next){
  const examNames={3:"第一次月考",6:"期中考试",9:"全市一模",12:"高考"},name=examNames[state.week];
  const surprises=[], personals={};
  active().forEach(s=>{
    let p=rawScore(s)+rint(-10,10);
    if(s.stress>=82&&rand()<.45){ p-=rint(25,48); surprises.push(`${s.name}发挥失常，比平时低了一大截。`); }
    else if(s.trust>=70&&s.mood>=62&&rand()<.3){ p+=rint(12,28); surprises.push(`${s.name}考出了从没有过的分数。`); }
    personals[s.id]=Math.max(280,Math.min(742,Math.round(p)));
  });
  const alive=active();
  const all=alive.map(s=>personals[s.id]);
  const mean=all.length?all.reduce((n,v)=>n+v,0)/all.length:0;
  // 缺考不计入均分，但会拖累学校对这个班的评价
  const ours=Math.max(0,Math.round(mean-state.lost.length*6+state.stats.morale*.06+state.stats.discipline*.04));
  state.lastClassScores=all;
  const rows=[...state.rivals.map(r=>({name:r.name,score:Math.round(r.score)+rint(-5,6)})),{name:"高三（7）班",score:ours}].sort((a,b)=>b.score-a.score);
  const rank=rows.findIndex(r=>r.name==="高三（7）班")+1;
  state.examHistory.push({week:state.week,name,score:ours,rank});
  alive.forEach(s=>{
    s.lastScore=personals[s.id];
    s.lastSub=splitSubjects(s,personals[s.id]);
    s.study=clamp(s.study+2,0,s.ceiling||100);
    s.stress=clamp(s.stress-(state.week===12?12:5)+(rank>=state.rivals.length?3:0));
  });

  const total=state.rivals.length+1;
  state.stats.prestige=clamp(state.stats.prestige+Math.round((total/2+.5-rank)*1.6));
  state.stats.morale=clamp(state.stats.morale+(rank<=2?5:rank<=4?1:rank>=total-1?-5:-2));
  addLog(`${name}：七班均分 ${ours}，年级第 ${rank}。${surprises.join("")}`);

  const body=`<div class="result-grid">
    <div class="result-cell"><strong>${ours}</strong><small>班级均分</small></div>
    <div class="result-cell"><strong>${rank} / ${state.rivals.length+1}</strong><small>年级排名</small></div>
    <div class="result-cell"><strong>${Math.round(avgStudent("stress"))}</strong><small>平均压力</small></div>
    <div class="result-cell"><strong>${active().length}</strong><small>在册人数</small></div></div>
    <table class="score-table"><thead><tr><th>排名</th><th>班级</th><th>均分</th></tr></thead><tbody>
    ${rows.map((r,i)=>`<tr><td>${i+1}</td><td>${r.name}${r.name==="高三（7）班"?" · 你":""}</td><td><b>${r.score}</b></td></tr>`).join("")}
    </tbody></table>
    ${subjectBlock(alive)}
    ${surprises.length?`<p><b>考场之外：</b>${surprises.join("")}</p>`:""}
    <p><b>全班 ${classSize()} 人上线估算：</b>${(()=>{const g={};all.forEach(v=>{const t=bandOf(v).cut;g[t]=(g[t]||0)+1});
      return ["一本","二本","专科","落榜"].filter(k=>g[k]).map(k=>`${k} ${g[k]} 人`).join(" · ")||"—"})()}${state.lost.length?`（另有 ${state.lost.length} 人缺考）`:""}</p>
    <p style="opacity:.75;font-size:.9em">全班最高 ${Math.max(...all)} · 最低 ${Math.min(...all)} 分。</p>
    ${state.lost.length?`<p style="opacity:.75">缺考 ${state.lost.length} 人：${state.lost.map(l=>l.name).join("、")}。这部分分数永远补不回来。</p>`:""}
    ${alive.length?"":`<p style="color:#c0392b"><b>这个班已经没有人了。</b></p>`}
    <p>${rank===1?"八个班里，七班排在第一。教务处让你在年级会上发言，你推了两次，最后还是去了。"
      :rank<=3?"一个平行班挤进了年级前三。教研会上有人问你，你们班到底怎么带的。"
      :rank<=5?"不上不下。有人开始相信七班能往上走，也有人已经不抱指望了。"
      :"成绩单很沉，名次贴在楼道里。你把批评的话划掉，先圈出真正能改的题。"}</p>`;

  if(state.week===12){ runWishes(()=>finishGame(ours,rank,body)); return; }
  openModal({eyebrow:`${dateOf(state.week)} · 阶段考试`,title:name,body,
    choices:[{label:"收好成绩单，继续向前",hint:`距高考还有 ${daysLeft(state.week)} 天`,onChoose:()=>{closeModal(false);next()}}]});
  bindSheet();
}

const AWAKEN_INTRO = {
  linxiaoyu:"晚自习散了很久，办公室门口还站着一个人。她手里攥着一张卷子，已经攥皱了。",
  zhouyang:"教务处把迟到记录送了过来。同一个名字出现了七次，后面画着红圈。",
  suqing:"批到第三十一本作文时，你翻到一页空白。名字栏写着苏晴，正文一个字都没有。",
  chengmo:"数学老师把一本草稿本放在你桌上：“最后一页你自己看吧，我不知道该怎么处理。”",
  luming:"转学生陆鸣的请假条这个月第四次递上来。班长说，他上课一直戴着耳机。"
};
function dueAwaken(){
  return keyStudents().find(s=>!s.met&&!s.out&&(state.week>=s.awakenWeek||s.stress>=84));
}
function openAwaken(s){
  s.met=true;
  const beat=s.nodes[s.node];
  addLog(`${s.name}的事情找上了你。《${s.thread}》开始。`);
  openModal({eyebrow:"有人找上门",title:beat.title,
    body:`<p style="opacity:.8">${AWAKEN_INTRO[s.id]||""}</p>
    <div class="event-scene"><div class="event-portrait ${s.portrait}"></div><div><div class="dialogue">${beat.quote}</div></div></div>
    <p>${beat.text}</p>
`,
    choices:beat.choices.map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
      const d=applyEff(c.eff,s); setFlag(c.flag); s.story++; s.node=c.next||null;
      addLog(`${s.name}《${s.thread}》第 1 章：${c.label}。`);
      closeModal(false); setScene("office",c.hint,s); render();
      showOutcome({title:c.label,text:c.hint,portrait:portraitHTML(s),delta:d,flag:c.flag,
        extra:`<p class="echo-note">${STORY_PAUSE[state.week%STORY_PAUSE.length](TA(s))}</p>`},()=>render());
    }}))});
}
function snapshot(){
  return {stats:{...state.stats}, study:avgStudent("study"), stress:avgStudent("stress"), mood:avgStudent("mood"),
    per:Object.fromEntries(active().map(s=>[s.id,{study:s.study,stress:s.stress,mood:s.mood}]))};
}
function advanceWeek(){
  state.week++;state.energy=3;state.actionsThisWeek=[];state.looked=[];state.journalDone=false;state.seatSwaps=0;state.seatPick=null;
  if(state.tt) state.tt.seized=[];
  state.snap=snapshot();
  setScene("classroom",`${dateOf(state.week)}，星期一。上周的账还没结完，新的一周已经开始了。`);
  render();window.scrollTo({top:0,behavior:"smooth"});
  const k=dueAwaken();          // 每周最多一个人找上门
  if(k) setTimeout(()=>openAwaken(k),420);
}

// ── 结局 ────────────────────────────────────────────────────────────
// ── 录取系统：分数段 → 批次 → 院校；部分学生有专属升学路径 ──────────
const BANDS = [
  {min:664, tier:"顶尖", cut:"提前批", pool:["清华大学","北京大学"]},
  {min:638, tier:"华五", cut:"一本", pool:["复旦大学","上海交通大学","浙江大学","南京大学","中国科学技术大学"]},
  {min:614, tier:"985", cut:"一本", pool:["武汉大学","华中科技大学","四川大学","中山大学","厦门大学","北京师范大学"]},
  {min:590, tier:"211", cut:"一本", pool:["郑州大学","苏州大学","西南大学","河海大学","中国地质大学","南京师范大学"]},
  {min:562, tier:"一本", cut:"一本", pool:["省属重点大学","本省师范大学","地方理工大学"]},
  {min:498, tier:"二本", cut:"二本", pool:["市属本科学院","本省第二师范学院","地方财经学院"]},
  {min:436, tier:"专科", cut:"专科", pool:["职业技术学院","高等专科学校"]},
  {min:0,   tier:"未上线", cut:"落榜", pool:["复读班"]}
];
const MAJORS = {
  linxiaoyu:()=>hasFlag("linFree")?"天文学":hasFlag("linDeferred")?"临床医学（母亲填的）":"金融学",
  zhouyang:()=>"体育教育",
  suqing:()=>hasFlag("suNamed")||hasFlag("suSubmitted")?"新闻学":"汉语言文学",
  chengmo:()=>"数学与应用数学",
  luming:()=>"英语（翻译方向）"
};
function bandOf(score){ return BANDS.find(b=>score>=b.min); }
// 确定性选校，避免刷新时变来变去
function pickFrom(pool,score,name){ return pool[(Math.round(score)+name.charCodeAt(0))%pool.length]; }

function admissionFor(s){
  if(s.injured) return {school:"—",major:"",note:"在康复中心 · 未参加高考",cls:"none"};
  const w=admissionFromWish(s); if(w) return w;
  if(s.out) return {school:"—",major:"",note:`${dateOf(s.outWeek)}离开 · 未参加高考`,cls:"none"};
  if(s.id==="luming"&&hasFlag("luLeft")) return {school:"（外地考点）",major:"",note:"已转学，不在本班录取名单上",cls:"none"};
  const sc=s.lastScore||0;
  // 专属升学路径：绕开纯分数
  if(s.id==="zhouyang"&&hasFlag("zhouPath")&&sc>=430)
    return {school:"北京体育大学",major:"体育教育",note:"体育单招录取",cls:"special"};
  if(s.id==="zhouyang"&&hasFlag("zhouWait"))
    return {school:"复读班",major:"",note:"决定再来一年",cls:"none"};
  if(s.id==="chengmo"&&hasFlag("chengBet"))
    return sc>=612
      ? {school:"中国科学技术大学",major:"数学与应用数学",note:"强基计划录取",cls:"special"}
      : {school:"省属重点大学",major:"数学与应用数学",note:"强基落选，走了普通批",cls:"low"};
  if(s.id==="linxiaoyu"&&hasFlag("linFree")&&sc>=614)
    return {school:"南京大学",major:"天文学",note:"她自己填的第一志愿",cls:"special"};
  const b=bandOf(sc);
  return {school:pickFrom(b.pool,sc,s.name),major:MAJORS[s.id]?MAJORS[s.id]():"",note:b.tier===b.cut?b.tier:`${b.tier} · ${b.cut}`,cls:b.tier==="未上线"?"none":b.min>=590?"high":b.min>=562?"mid":"low"};
}
function projectedPersonal(s){ return Math.round(rawScore(s)); }


// ── 志愿填报：分数出来之后，才是班主任最忙的那一周 ────────────────────
function bandIndex(score){ return BANDS.findIndex(b=>score>=b.min); }
// 每个孩子心里本来就有一个想法，那想法未必跟你一致
function ownWish(s){
  if(s.id==="linxiaoyu") return hasFlag("linFree")?{plan:"rush",why:"她想去南京看星星，志愿表上那一栏她自己写了三遍。"}
    :{plan:"steady",why:"她母亲已经把志愿表填好了，只等她签字。"};
  if(s.id==="zhouyang") return hasFlag("zhouPath")?{plan:"steady",why:"体育单招那条路已经走通了，他只想稳住文化课这一栏。"}
    :{plan:"safe",why:"他说，能有个学上就行。"};
  if(s.id==="suqing")  return {plan:"rush",why:"她想读中文。分数够不够，她自己心里没底。"};
  if(s.id==="chengmo") return hasFlag("chengBet")?{plan:"rush",why:"强基那条路要么成，要么什么都不剩。"}
    :{plan:"steady",why:"他把四所学校的数学系分数线抄在了本子背面。"};
  if(s.id==="luming")  return {plan:"steady",why:"他只提了一个要求：不要留在这座城市。"};
  return {plan:"steady",why:""};
}
const PLANS=[
  {id:"rush", label:"冲一冲", desc:"往上够一个档。够着了是这辈子的事，够不着就得看服从不服从调剂。"},
  {id:"steady",label:"稳一稳", desc:"按分数正常报。稳妥，也意味着不会有惊喜。"},
  {id:"safe",  label:"保一保", desc:"往下报一个档，换一个好专业。分数是浪费了，但四年读得舒服。"}
];

function wishResult(s,plan,obey){
  const i=bandIndex(s.lastScore);
  const up=Math.max(0,i-1), down=Math.min(BANDS.length-1,i+1);
  const gap=i>0?BANDS[i-1].min-s.lastScore:99;          // 离上一档还差多少
  if(plan==="rush"){
    const p=gap<=6?0.62:gap<=14?0.36:gap<=24?0.15:0.04;
    if(rand()<p) return {band:up,note:"压线冲上去了",good:true,mood:16};
    if(obey)     return {band:i,note:"没冲上去，被调剂到了冷门专业",good:false,mood:-6,forceMajor:"（服从调剂）"};
    return {band:Math.min(BANDS.length-1,i+2),note:"滑档了",good:false,mood:-22,slip:true};
  }
  if(plan==="safe") return {band:down,note:"稳稳落地，进了那个专业的王牌班",good:true,mood:9,best:true};
  return {band:i,note:"按分数正常录取",good:true,mood:4};
}
// 信任不够的孩子，回家以后会把志愿改掉
function willObeyYou(s){ return s.trust>=48 || rand()<s.trust/90; }

function runWishes(done){
  const list=keyStudents().filter(s=>!s.out&&s.lastScore);
  if(!list.length){ done(); return; }
  state.wishes={};
  let i=0;
  const step=()=>{
    if(i>=list.length){ done(); return; }
    const s=list[i++], own=ownWish(s), b=bandIndex(s.lastScore);
    const cur=BANDS[b], upName=b>0?BANDS[b-1].tier:"更高一档", downName=BANDS[Math.min(BANDS.length-1,b+1)].tier;
    const gap=b>0?BANDS[b-1].min-s.lastScore:0;
    openModal({eyebrow:"志愿表",title:`${s.name} · ${s.lastScore} 分`,
      body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">${own.why||"“老师，您帮我看看。”"}</div></div>
      <div class="wish-info">
        <div><b>${s.lastScore}</b> 分 · 现在这个分数对应 <b>${cur.tier}</b>${gap>0&&gap<=25?`，离 <b>${upName}</b> 差 ${gap} 分`:""}</div>
        <div>${keyMajorLine(s)}</div>
        <div style="opacity:.75">对你的信任 ${Math.round(s.trust)}${s.trust<48?"　——他未必会照你说的填":""}</div>
      </div>`,
      choices:PLANS.map(pl=>[
        {label:`${pl.label} · 服从调剂`,hint:`${pl.desc}${pl.id==="rush"?"服从调剂能兜住滑档，代价是专业不由你挑。":""}`,plan:pl.id,obey:true},
        {label:`${pl.label} · 不服从调剂`,hint:`${pl.desc}${pl.id==="rush"?"不服从就是把全部赌在那一个专业上。滑档了，就只剩复读。":"专业能保住。"}`,plan:pl.id,obey:false}
      ]).flat().filter(c=>c.plan==="rush"||c.obey).map(c=>({label:c.label,hint:c.hint,onChoose:()=>{
        const listens=willObeyYou(s);
        const finalPlan=listens?c.plan:(own.plan==="rush"&&c.plan!=="rush"?"rush":own.plan);
        const r=wishResult(s,finalPlan,c.obey);
        s.wish={plan:finalPlan,obey:c.obey,listened:listens,res:r};
        state.wishes[s.id]=s.wish;
        s.mood=clamp(s.mood+r.mood);
        addLog(`${s.name}的志愿：${PLANS.find(p=>p.id===finalPlan).label}${listens?"":"（${TA(s)}没听你的）".replace("${TA(s)}",TA(s))}——${r.note}。`);
        closeModal(false);
        openModal({eyebrow:"投档结果",title:`${s.name}`,
          body:`<div class="event-scene">${portraitHTML(s)}<div class="dialogue">${
            listens?(r.good?"“真的？老师，真的吗？”":r.slip?"“……那我复读吧。”":"“没关系的老师，我知道您尽力了。”")
            :(r.good?"“对不起老师，我回家改了。但是……成了。”":"“我没听您的。是我自己的事。”")}</div></div>
          <p>${listens?"":`<b>${TA(s)}回家以后把志愿改了。</b>`}${r.note}。</p>
          <p><b>${BANDS[r.band].tier}</b>${r.slip?"　滑档之后只剩下这一档":""}</p>`,
          choices:[{label:"下一个",onChoose:()=>{closeModal(false);step();}}]});
      }}))});
  };
  step();
}
function keyMajorLine(s){
  const m={linxiaoyu:hasFlag("linFree")?"她想报天文学":"家里要她报临床医学",
    zhouyang:"体育教育",suqing:hasFlag("suNamed")||hasFlag("suSubmitted")?"她想报新闻":"她想报中文",
    chengmo:"数学与应用数学",luming:"英语，翻译方向"}[s.id];
  return m?`想读的是：${m}`:"";
}
// 志愿的结果覆盖原来的按分数直接录取
function admissionFromWish(s){
  if(!s.wish) return null;
  const b=BANDS[s.wish.res.band];
  const school=pickFrom(b.pool,s.lastScore,s.name);
  const major=(MAJORS[s.id]?MAJORS[s.id]():"")+(s.wish.res.forceMajor||"");
  const note=(s.wish.listened?"":"没照你说的填 · ")+s.wish.res.note;
  return {school:b.tier==="未上线"?"复读班":school,major:b.tier==="未上线"?"":major,note,
    cls:s.wish.res.slip?"none":b.min>=590?"high":b.min>=562?"mid":"low"};
}

function epilogueFor(s){
  if(s.injured) return `${dateOf(s.outWeek)}出事。在康复中心，能坐起来了，握笔还不太稳。`;
  if(s.out) return `${dateOf(s.outWeek)}离开。${s.thread?`《${s.thread}》停在第 ${s.story} 章。`:"没能等到高考。"}`;
  const F=hasFlag;
  const map={
    linxiaoyu: F("linFree")?"填了那所学校的天文系。志愿表上母亲的签名，是她自己去谈下来的。"
      :F("linDeferred")?"分数够了，志愿还是母亲填的。她说这样也挺好。"
      :F("linRescued")?"晚了两天回校，最后一门考完时她睡了整整十四个小时。"
      :F("linAbandoned")?"考出了理想的分数。开学后她再没有回过这所学校。"
      :"名字排在光荣榜第一个。你不太确定她是不是真的高兴。",
    zhouyang: F("zhouPath")?"体育单招过线。他把那张诊断书压在录取通知底下。"
      :F("zhouWait")?"复读一年。走的时候说，老师你别不好意思。"
      :F("zhouMended")?"文化课刚好过线。谢师宴上他第一个站起来。"
      :F("zhouGrind")?"考了全班第九，创了他自己的纪录。他没有笑。"
      :"分数不高不低。他说这样就行了。",
    suqing: F("suAnon")?"那篇散文没人知道是谁写的。她说这样最好。"
      :F("suNamed")?"拿了奖，也被议论了整整一个学期。她把两件事都写进了新的稿子。"
      :F("suKept")?"《旁听》只有你们两个人读过。"
      :"作文分是全班最高的一个。",
    chengmo: F("chengBet")?"自主招生初审过了。他第一次主动来办公室，说了三分钟的话。"
      :F("chengConverted")?"总分上了一本线。数学满分，其余科刚好及格。他再没参加过任何竞赛。"
      :F("chengCovered")||F("tookTheFall")?"填志愿那天他站在办公室门口很久，最后只说了句谢谢。"
      :"偏科到最后。分数不好看，但他自己算过，够。",
    luming: F("luStayed")?"毕业照上他站在人群中间。没有戴耳机。"
      :F("luLeft")?"第二次转学的手续办得很顺利。毕业照上那个位置空着。"
      :"照片里他站在最边上，但确实站在了里面。"
  };
  return map[s.id]||"顺利参加了高考。";
}
function finishGame(score,rank,examBody){
  state.finished=true;state.energy=0;save();
  const completed=keyStudents().filter(s=>!s.out&&s.met&&s.node===null).length;
  const lost=state.lost.length;
  const avgMood=Math.round(avgStudent("mood"));
  // 你在这四十八个人身上花过多少时间——这比名次更能决定这一届是什么样子
  const talked=(state.actionUse?.talk||0), called=(state.actionUse?.parent||0);
  const met=(state.actionUse?.meeting||0), looked=state.lookTotal||0;
  const invest=talked*3+called*2+met*2+completed*4+Math.min(looked,12)+(state.journalTotal||0)*2+(state.visits||0)*4;
  const cold=invest<14;
  let ending,verdict;
  if(cold&&!state.incident){
    if(rank<=3){
      ending="课上完了";
      verdict=`八个班里七班排第 ${rank}，比开学时高了不少。年级会上有人让你介绍经验，你讲了四十分钟的教学法。`+
        `\n\n散会以后有个老师问你，你们班那个总坐最后一排的孩子叫什么来着。你想了很久。`+
        `\n\n你教完了这一届。四十八个名字你都点过，但没有一个人在毕业那天单独来找过你。`;
    }else{
      ending="就这么过去了";
      verdict=`年级第 ${rank}。没什么好说的，也没什么人来问。`+
        `\n\n最后一节课下课，学生收拾书包走了，教室很快就空了。你把讲台上的粉笔灰擦干净，关灯，锁门。`+
        `\n\n十二周，你上了很多节课。剩下的事，你没来得及碰，也没打算碰。`;
    }
  }
  else
  if(state.incident){
    ending="那天之后";
    verdict=`高考成绩出来那天，你先想起的不是均分，是${state.incident.name}。${TA(studentById(state.incident.id))}现在能坐起来了，握笔还不太稳。你每个月去一次，家里每次都留你吃饭，你每次都说不了。`+
      `\n\n你后来把那几次提醒都想了一遍：数学老师说的、同桌说的、把书送人的那次。信号一次比一次清楚，而你每一次都在忙别的事。`+
      `\n\n这个班的均分是 ${score}，年级第 ${rank}。没有人再提这个数字。`;
  }
  else if(lost>=2){ ending="有两张空课桌"; verdict="四十八个人来，四十六个人走到最后。搬走的那两张课桌，你到毕业都没让人补上。"; }
  else if(lost===1&&rank<=2){ ending="第一名的代价"; verdict="喜报贴在教学楼门口，七班的名字排在最前面。你每次进门，先看见的是那个空位。"; }
  else if(rank<=2&&completed>=4&&avgMood>=55){ ending="不只是一张高分答卷"; verdict="分数和人，这一次你都接住了。八个班里，这样的年份不多。"; }
  else if(completed>=3&&avgMood>=67&&rank<=5){ ending="他们记得你"; verdict=`年级第 ${rank}，不算亮眼。但毕业那天，办公室门口排了很久的队。`; }
  else if(rank===1){ ending="逆袭的七班"; verdict="一个平行班压过了实验班。你赢了排名。有些话，到最后也没来得及听完。"; }
  else if(rank<=3){ ending="挤进前三"; verdict="年级第 "+rank+"。开学时没人把七班算在里面。你没说什么，把成绩单折好放进了抽屉。"; }
  else if(completed>=4){ ending="比排名更长的回声"; verdict="八个班里七班排在中游。但十年后还会有人给你发消息。"; }
  else if(hasFlag("delayedHealth")&&hasFlag("pushedThrough")){ ending="你也在这一届里"; verdict="学生都送出去了。第二天你才想起抽屉里那张体检单。"; }
  else { ending="把每个人送到门口"; verdict="不算漂亮的一届。但没有人在半路掉队。"; }

  // 纪念册：这一届留下的页码
  recordEnding(ending);
  if(completed>=5) unlockMedal("m_all5");
  if(((state.chains&&state.chains.done)||[]).length>=3) unlockMedal("m_chains");
  if(!lost&&!state.incident&&avgMood>=60) unlockMedal("m_noloss");
  if(rank===1) unlockMedal("m_rank1");
  if((state.journalTotal||0)>=10) unlockMedal("m_journal");
  if((state.visits||0)>=4) unlockMedal("m_visit");
  if((state.lookTotal||0)>=30) unlockMedal("m_looker");

  keyStudents().forEach(s=>s.admission=admissionFor(s));
  const admitted=keyStudents().filter(s=>s.admission.cls==="high"||s.admission.cls==="special").length;
  const rows=keyStudents().map(s=>{
    const a=s.admission;
    const color=a.cls==="special"?"#b8860b":a.cls==="high"?"#3f8581":a.cls==="none"?"#a09384":"#5c6f6d";
    const sub=s.lastSub&&!s.out?`<br><small style="color:var(--muted)">${Object.keys(SUBJECT_FULL).map(k=>`${SUBJECT_NAME[k]} ${s.lastSub[k]}`).join(" · ")}</small>`:"";
    return `<tr${s.out?' style="opacity:.45"':''}><td><b>${s.name}</b></td><td data-l="高考">${s.out?"缺考":`<b>${s.lastScore}</b>${sub}`}</td>`+
      `<td data-l="录取"><b style="color:${color}">${a.school}</b>${a.major?`<br><small style="color:var(--muted)">${a.major}</small>`:""}<br><small style="color:var(--muted)">${a.note}</small></td>`+
      `<td data-l="后来">${epilogueFor(s)}</td></tr>`;
  }).join("");
  // 全班上线情况
  const cs=state.lastClassScores||[];
  const g={}; cs.forEach(v=>{const t=bandOf(v).cut;g[t]=(g[t]||0)+1});
  const yiben=g["一本"]||0, benke=yiben+(g["二本"]||0);
  const rate=cs.length?Math.round(yiben/classSize()*100):0;
  const classRow=["一本","二本","专科","落榜"].filter(k=>g[k]).map(k=>`<div class="result-cell"><strong>${g[k]}</strong><small>${k}</small></div>`).join("");

  openModal({eyebrow:"2026 届 · 毕业结局",title:ending,
    body:`${examBody}<div class="ending-stamp">高三（7）班 · 毕业</div>
    <p>${state.incident
      ? `铃声响起，学生从考场里涌出来。你数了一遍，四十几个人，少一个。`
      : `铃声响起，四十多个学生从考场里涌出来。你在人群里一个一个数过去${lost?`——少了 ${lost} 个。`:"，一个不少。"}`}</p>
    <h3 style="margin:18px 0 6px;font-size:15px">全班 ${classSize()} 人上线情况</h3>
    <div class="result-grid">${classRow}${lost?`<div class="result-cell"><strong>${lost}</strong><small>缺考</small></div>`:""}</div>
    <p style="opacity:.85">一本上线 <b>${yiben}</b> 人（${rate}%），本科上线 <b>${benke}</b> 人。这是学校年底会写进总结里的数字。</p>
    <h3 style="margin:18px 0 6px;font-size:15px">你陪着走完的那几个</h3>
    <table class="score-table admit-table"><thead><tr><th>学生</th><th>高考</th><th>录取</th><th>后来</th></tr></thead><tbody>${rows}</tbody></table>
    <p style="opacity:.8">其中 211 及以上 ${admitted} 人。</p>
    <p>这一学期，你找学生谈过 ${talked} 次话，往家里打过 ${called} 个电话，开过 ${met} 次班会，去过 ${state.visits||0} 次家访。走完的事 ${completed}/5，中途离开 ${lost} 人，全班平均心情 ${avgMood}。</p>
    ${verdict.split("\n\n").map(x=>`<p><b>${x}</b></p>`).join("")}`,
    choices:[
      {label:"回看这一学期",hint:"保留毕业成绩与手记",onChoose:()=>{closeModal();render()}},
      {label:"再带一届学生",hint:"清空本局，从选科开始",onChoose:()=>{dropSave();location.reload()}}
    ]});
  bindSheet();
}

// ── 弹窗与说明 ──────────────────────────────────────────────────────
// dismissible=true 才允许 ✕ / 点背景关掉。
// 带选项的剧情弹窗一律锁住：以前手机上误触背景就能白嫖掉一整个事件和它的代价。
function openModal({eyebrow="校园事件",title,body,choices=[],dismissible=false}){
  $("#modalEyebrow").textContent=eyebrow;$("#modalTitle").textContent=title;$("#modalBody").innerHTML=body;
  $("#modalChoices").innerHTML=choices.map((c,i)=>`<button class="choice-btn" data-choice="${i}"><strong>${c.label}</strong>${c.hint?`<small>${c.hint}</small>`:""}</button>`).join("");
  choices.forEach((c,i)=>$(`[data-choice="${i}"]`).addEventListener("click",()=>{playTone(630);c.onChoose?.()}));
  const canClose=dismissible||choices.length===0;
  $("#modal").dataset.dismissible=canClose?"1":"0";
  $("#modalClose").classList.toggle("hidden",!canClose);
  $("#modalBackdrop").classList.remove("hidden");document.body.style.overflow="hidden";
  $("#modalBody").scrollTop=0;                       // 长弹窗要从头开始读
  $("#modal").scrollTop=0;
}
function closeModal(runCallback=true){
  $("#modalBackdrop").classList.add("hidden");document.body.style.overflow="";
  if(runCallback&&pendingModalCallback){const cb=pendingModalCallback;pendingModalCallback=null;cb()}
}
function showHelp(){
  openModal({eyebrow:"班主任手册",title:"这十二周怎么过？",
    body:`<p><b>没有双赢的选项。</b>每个选择都会明确拿走一样东西——分数、信任、你的声望，或者你自己的健康。提示里写的是代价，不是收益。</p>
    <p><b>后果会延迟兑现。</b>重大决定过一阵子会回来找你，而且带着新的两难。它到点必到，不会被别的事挤掉——三月底做的事，四月底才知道贵不贵。</p>
    <p><b>学生会真的失去。</b>压力连续两周高于 86，该学生永久退出这一届：故事线中断、高考缺考、班级士气重创。会有一次预警，只有一次。</p>
    <p><b>重复行动会衰减。</b>同一个行动用得越多效果越差，逼你换手段。夜间备课用满三次会给你自己留下后遗症。</p>
    <p><b>每周 3 件事，每件都要再做一次取舍：</b>上课要定讲给谁听（抓中间／拔高／补差），班会要定开什么（讲方法／谈心态／整纪律），备课要定备什么，辅导要定补哪一科，打电话要定怎么开口。没有一键了事的行动。</p>
    <p><b>还有三件不占时间的事：</b>翻作业本、课间转一圈、站后门听课。它们不改任何数值，只让你看见班上正在发生什么。看不看随你——但结局会算上你花过多少心思。</p>
    <p><b>全班 48 人：</b>教学和班会作用于所有人；辅导、谈心、家校沟通可以指定任何一个学生。班级均分与上线率按 48 人统计。</p>
    <p><b>有些事会自己找上门：</b>几个孩子会在某一周带着自己的麻烦出现在你面前，不消耗行动力。之后要不要继续听下去，取决于你愿不愿意花“个别谈心”。没接着往下走的事，就停在半路。</p>
    <p><b>撑不住的时候：</b>长期高压最先垮掉的是成绩——考砸、复读、读大专，绝大多数是这个结局。真正办手续离开的，一届最多一两个。</p>
    <p><b>但也有例外。</b>如果一个孩子一路滑到底，会有人来提醒你，一次比一次清楚。信号最多来三次。第三次之后，就没有提醒了。</p>
    <p><b>四次大考：</b>三月底月考、四月下旬期中、五月中一模、六月七号高考。高压学生有较大概率发挥失常；被你真正接住的学生可能超常发挥。</p>
    <p><b>不是每周都出大事。</b>有些周找上门的只是一只仓鼠、一首点给全班的歌、或者一根拔河的绳子。这些事也要你拿主意。</p>
    <p><b>执教纪念册</b>（右上角的册子）跨届保存：名场面、见过的结局，都会留在里面。带的届数多了，册子会越来越厚。</p>`,
    choices:[{label:"明白了",onChoose:()=>closeModal()}],dismissible:true});
}
function confirmReset(){
  openModal({eyebrow:"重新开始",title:"要放下这一届吗？",
    body:"<p>当前进度会被清空，学生故事、后果链与考试记录无法恢复。</p>",
    choices:[{label:"继续带当前班级",onChoose:()=>closeModal()},{label:"确认重新开始",hint:"清空本机存档",onChoose:()=>{dropSave();location.reload()}}],dismissible:true});
}

boot();
