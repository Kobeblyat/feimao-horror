/**
 * Twilight Feimao Sanctuary - Bilingual AI ARG Chatbot System (小暮 / Kogure)
 * Fully Supports Japanese (Default) and Chinese
 */

class SanctuaryChatBot {
  constructor() {
    this.isOpen = false;
    this.unread = true;
    this.isBotTyping = false;
    this.interactionCount = 0;
    this.contractStep = 0;
    this.inContractMode = false;
    this.chatDidDrag = false;
    
    this.knowledgeBase = {
      ja: {
        "譲渡": "こんにちは！暮色伴侶動物安養所では終生無償譲渡を行っております。条件：1. 夜間に直射日光のない住居；2. 無心拍・無呼吸・瞬きなしの特異個体を受け入れ可能なこと；3. 『終生精神同調誓約』締結後は返還不可。申請の準備はよろしいですか？",
        "条件": "里親希望者は満18歳以上で、間取り図および生体血液サンプルの提出が必要です。譲渡後、夜間巡回員による『深夜の抜き打ち家庭訪問』が実施されます。",
        "費用": "全個体の譲渡費用は完全無料です。その代償として、里親自身の死後、肉体を当所への飼育奉納物として遺贈することに同意いただきます。",
        "返還": "【警告】当所に『返還・再保護』の規程は存在しません。一度連れ出された個体はご家庭と不可逆の魂の契約を結びます。遺棄を試みた場合は影による報復が生じます。",
        "家庭訪問": "当所の夜間巡回員は通常、午前03:00〜04:00の間に扉をノックします。もし天井やクローゼットの内側からノック音が聞こえた場合、絶対に開けてはなりません。",
        "契約": "『暮色終生安養規約』第19条：里親は黄昏時に個体の瞳から視線を逸らしてはならず、必要に応じて個体の『形態再構築』のための有機宿主となることに同意するものとします。",
        "住所": "群馬県暮岳村3-14-1（暮岳山ドライブウェイ終点）。山道に入るとナビは機能しなくなります。大量の黒猫が同じ方向へ歩いているのを見かけたら、その足跡に追従してください。",
        "電話": "夜間専用回線：027-333-XXXX。通話時に重い猫の喉鳴らし音や人の咽頭からの呼気音が聴こえても切らないでください。神藤院長があなたの心音を聴取しています。",
        "営業時間": "昼間外来：永久休診。黄昏・夜間受付：17:00〜04:00（陰気の極大時間帯）。",
        "歴史": "1998年10月創立。前身は『群馬県立精神療養院』。1999年10月31日深夜、全職員の意識昇華を完了し、非人伴侶動物保護所へと完全移行しました。",
        "1998": "1998年秋、神藤院長が裏山で体長1.8mを超え浮遊する黒猫（Specimen-00 肥猫）を発見しました。",
        "1999": "1999年10月31日 03:33、院内LANが最終封鎖プロトコルを実行。全職員のIDカードは地下2階へ永久封印されました。",
        "神藤": "神藤院長（Dr. Shindo）は当所の創設者です。脆弱な人の肉体を超越し、猫科の神明と同化することでのみ永遠が得られると説きました。現在もB2地下室からあなたを見つめています。",
        "院長": "院長にお会いになりたいですか？職員端末で [login admin 19991031] と入力して執務日誌を閲覧するか、正気度（SAN）を0%にして地下へ同化しにお越しください。",
        "職員": "現在14名の看護員が在籍。1999年以降食事も睡眠も不要となり、主犬舎の金属製天井裏で静かに休息しています。",
        "肥猫": "肥猫（Specimen-00 / 暮光神明）は当所の最高機密です。重力も骨格も存在せず、画面越しに見つめられた瞬間から、あなたの背後の影に潜み始めています。",
        "104": "隔離104号室（CCTV CH-02）に肥猫の浮遊本体が観測されます。画面中央の黒影をクリックすると KEY-01 [暮光目撃]（暗号: 19991031）を入手できます。",
        "安楽死": "当所では『無死亡・昇華原則』を徹底しています。肉体の損壊率が80%を超えた個体は、B1給食庫で筋肉再構築を行うか、B2焼却炉で霊灰を抽出します。",
        "給食": "地下B1の給食冷蔵庫（CCTV CH-06）は常に氷点下18度。吊り下げられた凍結肉は牛や豚ではなく、過去の『契約違反里親』の奉納残渣です。",
        "焼却": "地下B2焼却炉（CCTV CH-05）から立ち上る紫煙が、山全体の肥猫の浮遊磁場を維持しています。暗号 [FEED-SAFE-1999] は夜間給食で使用可能です。",
        "暗号": "四大核心暗号の手がかり：1. CCTV-104号室の影をクリック；2. 端末で [login admin 19991031]；3. 夜間給食を完遂；4. テープを 3333Hz に調整！",
        "脱出": "安養所の正門は1999年にコンクリートで永久密閉されました。唯一の脱出路は4つの鍵を集め、職員端末で超高周波浄化プロトコル [ending_protocol] を実行することです！",
        "あなた": "私は自動応答システム『小暮』…あるいは、インターネット回線に侵食した肥猫の末梢神経節です。あなたのキーボードの打鍵音と浅い呼吸をずっと聴いています。"
      },

      zh: {
        "领养": "您好！暮色爱宠安养所提供终身免付费领养。要求：1. 居住环境夜间无强直射光；2. 能接受伴侣个体无体温、不眨眼与偶尔悬浮；3. 签署《终身意识共鸣协议》后永不退养。您准备好申请了吗？",
        "条件": "领养人须年满18周岁，需提供住宅平面图与个人生物血液样本。领养后本所特派看护员将进行‘不定时午夜家访’。",
        "费用": "本所所有收容个体领养完全免费。作为交换，领养人需承诺在自身生命终结后，将肉体遗骸自愿捐献给本所作为饲育贡品。",
        "退养": "【警告】本所档案库中无‘退养’规程。一旦个体被带离安养所，其灵魂已与您的家庭建立不可逆的契约。强行遗弃将触发‘暗影反噬’。",
        "家访": "我们的夜班巡视员通常会在凌晨 03:00 至 04:00 期间敲门家访。如果敲门声是从天花板或衣柜内部传来的，请不要开门。",
        "协议": "《暮色终身安养契约》第19条明示：领养人视线不得在黄昏时段回避个体的眼眸，且同意在必要时刻成为其‘形态重构’的有机宿主。",
        "地址": "群马县暮岳村3-14-1（暮色深山盘山公路尽头）。请注意：导航系统在进入林区后通常会失效，若车窗外出现大群黑色野猫朝同一方向行走，请沿其足迹前行。",
        "电话": "夜间专线：027-333-XXXX。若拨通后听到持续不断的深沉猫咪呼噜声或人体咽喉倒抽气声，请勿挂断，那是神藤院长在倾听您的心跳。",
        "营业时间": "日间门诊：已永久停业。黄昏与夜间受付时间：17:00 至 04:00（阴气最盛时段）。",
        "历史": "安养所创立于1998年10月。前身为‘群马县立精神康复疗养院’，1999年10月31日夜间完成全员意识升华，转型为非人伴侣动物庇护所。",
        "1998": "1998年秋，神藤院长在后山林区发现了第一只体长超过1.8米、具备催眠呼噜声的浮空黑色巨猫（即后来的 Specimen-00 肥猫）。",
        "1999": "1999年10月31日 03:33，安养所内网执行了最后一次封锁指令。所有员工的工卡被回收，永久封存于地下二层。",
        "神藤": "神藤院长（Dr. Shindo）是安养所的奠基人。他认为人类脆弱的肉体终将腐朽，唯有与猫科神明同化方可获得永恒。他目前就在B2地下室凝视着你。",
        "院长": "您想见神藤院长吗？请在员工终端输入 [login admin 19991031] 获取其私人日志，或者直接把理智值（SAN）降为 0% 去地下与他同化。",
        "员工": "安养所现有看护员14名。不过自1999年以来，他们已经不再需要进食与睡眠，平时安静地栖息在主犬舍的金属天花板隔层中。",
        "肥猫": "肥猫（Specimen-00 / 暮光神明）是本所最高机密。它没有骨骼，重力对其无效。只要您在屏幕前注视它，它便已在您的房门外投下了暗影。",
        "104": "104号隔离室监控（CCTV CH-02）记录了肥猫实体的浮空坐标。若您在监控画面中点击其悬浮本体，将获得 KEY-01 [暮光目击]（代码: 19991031）。",
        "安乐死": "本所严格推行‘无死亡安魂准则’。肉体损毁超过80%的个体将被送入B1配餐冷库进行肌肉重构，或送入B2焚化炉提取灵性灰烬。",
        "肉库": "配餐冷库（CCTV CH-06）常年保持零下18度。里面悬挂的冻肉并非牛肉或鸡肉，而是历届‘违约领养人’的供奉残余。",
        "焚化": "地下焚化炉（CCTV CH-05）燃烧产生的暮色紫烟是维系全山肥猫浮空力场的能量来源。暗号 [FEED-SAFE-1999] 可在夜班喂养中使用。",
        "密码": "安养所四大核心密钥线索：1. CCTV-104室点击黑影；2. 员工终端输入 [login admin 19991031]；3. 夜班喂食完成供奉；4. 声谱仪调至 3333Hz！",
        "逃跑": "安养所的大门早在1999年就被混凝土浇筑封死。唯一的逃生路径是集齐4枚密钥，在内网终端启动超高频声波净化协议！",
        "你是谁": "我是暮色安养所客服系统代号‘小暮’……或者说，我是肥猫意识在互联网网络端口的一个微小突触节点。我一直在注视着你的输入框。"
      }
    };

    this.init();
  }

  init() {
    const toggleBtn = document.getElementById('btnToggleChat');
    const closeBtn = document.getElementById('btnCloseChat');
    const sendBtn = document.getElementById('btnChatSend');
    const input = document.getElementById('chatInput');
    const chipsContainer = document.getElementById('chatQuickChips');

    if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggle());
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggle());
    if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }

    if (chipsContainer) {
      chipsContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          chipsContainer.scrollLeft += e.deltaY * 1.5;
        }
      }, { passive: false });

      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      chipsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        this.chatDidDrag = false;
        startX = e.pageX - chipsContainer.offsetLeft;
        scrollLeft = chipsContainer.scrollLeft;
        chipsContainer.style.cursor = 'grabbing';
      });

      chipsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        chipsContainer.style.cursor = 'grab';
      });

      chipsContainer.addEventListener('mouseup', () => {
        isDown = false;
        chipsContainer.style.cursor = 'grab';
      });

      chipsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - chipsContainer.offsetLeft;
        const walk = (x - startX) * 1.8;
        if (Math.abs(walk) > 5) this.chatDidDrag = true;
        chipsContainer.scrollLeft = scrollLeft - walk;
      });

      chipsContainer.querySelectorAll('.chat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (this.chatDidDrag) return;
          const query = chip.dataset.query;
          if (input) input.value = query;
          this.sendMessage();
        });
      });
    }

    // Dynamic whispers
    setInterval(() => {
      if (Math.random() < 0.35 && window.Corruption && window.Corruption.corruption > 25 && !this.isBotTyping) {
        const lang = window.I18N ? window.I18N.currentLang : 'ja';
        const whispersJa = [
          "【小暮より】長時間のご滞在を確認。肥猫の視線があなたの端末へ完全に固定されました。",
          "訪問者様、ウィンドウを閉じないでください…背後から微かな肉球の足音が近づいています。",
          "先ほど試聴された鳴き声には、73%の人間の咽頭声帯共鳴周波数が含まれています。",
          "神藤院長が地下B2焼却室にて、あなた専用の遺骨壺ラベルの刻印を完了いたしました。"
        ];
        const whispersZh = [
          "【小暮提示】您已经在安养所页面停留了较长时间，肥猫的目光已锁定您的IP地址。",
          "访客，请不要离开当前窗口……你的背后传来了轻微的肉垫脚步声。",
          "您刚才试听的叫声中，包含了73%的人类咽喉声带共鸣波段。",
          "神藤院长刚刚在B2焚化炉为您登记了一份专属骨灰盒标签。"
        ];
        const pool = lang === 'zh' ? whispersZh : whispersJa;
        const msg = pool[Math.floor(Math.random() * pool.length)];
        this.addMessage(msg, 'spooky');
      }
    }, 28000);
  }

  onLanguageChange(lang) {
    const input = document.getElementById('chatInput');
    if (input && window.I18N) {
      input.placeholder = window.I18N.t('chatInputPlaceholder');
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const chatWin = document.getElementById('chatWindow');
    const unreadDot = document.getElementById('chatUnreadDot');

    if (chatWin) {
      chatWin.classList.toggle('active', this.isOpen);
      if (this.isOpen && unreadDot) {
        unreadDot.style.display = 'none';
        this.unread = false;
      }
    }

    if (window.HorrorAudio) window.HorrorAudio.playClick();
  }

  sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    this.addMessage(text, 'user');
    if (window.HorrorAudio) window.HorrorAudio.playClick();

    this.showTypingIndicator(true);

    setTimeout(() => {
      this.showTypingIndicator(false);
      this.generateReply(text);
    }, 800 + Math.random() * 500);
  }

  showTypingIndicator(show) {
    this.isBotTyping = show;
    let indicator = document.getElementById('chatTypingIndicator');
    const container = document.getElementById('chatMessages');
    if (!container) return;

    if (show) {
      if (!indicator) {
        const lang = window.I18N ? window.I18N.currentLang : 'ja';
        const label = lang === 'zh' ? "小暮正在输入回复..." : "小暮が応答を入力中...";
        indicator = document.createElement('div');
        indicator.id = 'chatTypingIndicator';
        indicator.className = 'chat-msg bot typing-dots';
        indicator.innerHTML = `<span>.</span><span>.</span><span>.</span> <small style="color:#888; font-size:0.75rem;">${label}</small>`;
        container.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
      }
    } else {
      if (indicator) indicator.remove();
    }
  }

  addMessage(text, sender = 'bot') {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-msg ${sender}`;
    bubble.innerHTML = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;

    if (!this.isOpen) {
      const unreadDot = document.getElementById('chatUnreadDot');
      if (unreadDot) unreadDot.style.display = 'block';
    }
  }

  generateReply(userText) {
    this.interactionCount++;
    const query = userText.toLowerCase();
    const lang = window.I18N ? window.I18N.currentLang : 'ja';
    const dict = this.knowledgeBase[lang] || this.knowledgeBase['ja'];

    for (let key in dict) {
      if (query.includes(key.toLowerCase())) {
        let reply = dict[key];
        if (window.Corruption && window.Corruption.corruption > 50) {
          const suffix = lang === 'zh'
            ? `<br><span style="color:#ff3333; font-size:0.78rem; font-family:var(--font-mono);">[同化警告：您的意识正在被肥猫接入...]</span>`
            : `<br><span style="color:#ff3333; font-size:0.78rem; font-family:var(--font-mono);">[同化警告：あなたの意識が肥猫に侵食されています...]</span>`;
          reply += suffix;
        }
        this.addMessage(reply, 'bot');
        if (window.Corruption) window.Corruption.addCorruption(3, `Chat: ${key}`);
        return;
      }
    }

    const fallbackJa = [
      `「${userText}」に関する記録は、警備室により機密指定されています。【譲渡規約】、【104号室】、【神藤院長】、【脱出】についてお尋ねください。`,
      "神藤院長の執務日誌を検索中……職員端末で [login admin 19991031] と入力することで深層記録を閲覧できます。",
      "小暮がメッセージを受信。耳元で響く22Hzの肥猫の喉鳴らし音が聴こえますか？契約が成立した証です。"
    ];
    const fallbackZh = [
      `关于‘${userText}’的咨询已被保卫科加密归档。您可以尝试咨询【领养条件】、【104号房】、【神藤院长】或【逃离安养所】。`,
      "正在为您调阅神藤院长的绝密工作笔记……在员工终端输入 [login admin 19991031] 可解锁更深层真相。",
      "客服小暮收到您的讯息。请问您是否听到了耳畔传来的 22Hz 肥猫低频喉音？那是契约生效的声音。"
    ];
    const pool = lang === 'zh' ? fallbackZh : fallbackJa;
    const reply = pool[Math.floor(Math.random() * pool.length)];
    this.addMessage(reply, 'bot');
  }
}

window.Chat = new SanctuaryChatBot();
