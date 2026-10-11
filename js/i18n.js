/**
 * Twilight Feimao Sanctuary - Bilingual i18n Engine (Japanese Default / Chinese Switchable)
 * Default Language: 'ja' (日本語)
 */

class SanctuaryI18n {
  constructor() {
    this.currentLang = localStorage.getItem('feimao_sanctuary_lang') || 'ja';

    this.translations = {
      ja: {
        // Site Brand & Header
        siteTitle: "暮色伴侶動物安養所",
        siteSub: "TWILIGHT COMPANION SANCTUARY & RESCUE (1998)",
        navAdoption: "🐾 譲渡カルテ",
        navCctv: "📹 監視カメラ",
        navQuiz: "📝 適性診断",
        navSpectrum: "📼 音声解析",
        navMemorial: "🕯 安魂堂",
        searchPlaceholder: "検索...",
        searchModalPlaceholder: "検索キーワードを入力（肥猫、104、神藤、肉塊、安楽死、1999 など）...",
        searchModalHint: "院内カルテ、監視カメラ番号、職員名簿を検索中...",
        searchModalTitle: "院内機密アーカイブ全文検索",
        langButtonText: "🌐 日本語",

        // Ticker
        ticker01Tag: "所内通知",
        ticker01Text: "【1999年度】秋季伴侶動物健康診断・終末期ケアおよび終生譲渡の受付（暮岳村本部）",
        ticker02Tag: "来所案内",
        ticker02Text: "当施設は深山に位置するため日没前の到着を推奨します。黄昏時、一部の個体が西の空を見つめる現象が確認されています",
        ticker03Tag: "譲渡規約",
        ticker03Text: "当所は終生安養制を採用しております。夜間に直射光のない環境を用意でき、無心拍の伴侶を受け入れ可能な方に限ります",
        ticker04Tag: "神藤院長",
        ticker04Text: "「生命の形はひとつではない。迷えるすべての魂に、永遠の帰宿を。」",

        // Hero
        heroTagline: "夕陽が沈むとき、すべての魂はひとつになる",
        heroHeading: "迷えるすべての魂へ、<br>決して色褪せぬ永遠の安らぎを。",
        heroDesc: "群馬県暮岳村の静謐なる山深くに佇む。1998年の創立以来、傷つき、異常行動を示し、あるいは終末期を迎えた伴侶動物たちの終生保護と形態再構築に尽力してまいりました。ここでは、飢えも死の苦しみも存在しません。",
        heroBtnAdoption: "🐾 譲渡対象個体を閲覧",
        heroBtnCctv: "📹 リアルタイム監視網へ",

        // Adoption Section
        adoptionSectionSub: "ADOPTION & RESCUE DOSSIERS",
        adoptionSectionTitle: "特殊伴侶個体・譲渡カルテ一覧",
        adoptionSectionIntro: "以下は当施設で保護・観察されている特異個体です。【詳細カルテを閲覧】をクリックすると、神藤院長直筆の生理記録と異変報告書を照会できます。",
        filterAll: "全個体 (12)",
        filterCat: "猫科サンプル (Cat)",
        filterDog: "犬類サンプル (Canine)",
        filterSpecial: "特異奉納実体 (Specimen-00)",
        intakeDateLabel: "入所日: ",
        viewDossierBtn: "詳細カルテを閲覧 ➔",
        listenVoiceTitle: "鳴き声を試聴",

        // Sealed Card
        sealedBadge: "🔒 絶密封印カルテ [SPEC-012]",
        sealedName: "████ (秘匿残影)",
        sealedDesc: "この個体の記録は神藤院長により永久封印されています。CCTV-02 隔離104号室で浮遊本体を目撃・観測後に自動解錠されます。",
        sealedBreakBtn: "⚡ [ 封印の封蝋を強制破棄 ]",

        // CCTV Section
        cctvSectionSub: "24-HOUR SURVEILLANCE MATRIX",
        cctvSectionTitle: "収容施設リアルタイム監視マトリクス",
        cctvSectionIntro: "全天候型6系統閉回路監視システム。微光暗視および赤外線熱画像に対応。画面内の異常な影や浮遊物体をクリックして記録してください。",
        cctvLockTitle: "【閉回路監視網 // 警備システムオフライン】",
        cctvLockDesc: "現在、監視信号は夜間巡回専用回線に切り替えられています。【適性診断テスト】を完了するか、カルテを2件以上閲覧すると自動的に回線が復旧します。",
        cctvLockOverride: "⚡ [ 警備室回線へ強制割込接続 ]",
        cctvSignalNormal: "通常回線 (RGB)",
        cctvSignalNV: "微光暗視 (NV-G)",
        cctvSignalThermal: "赤外線熱画像 (IR)",
        cctvCh1: "主犬舎 A棟",
        cctvCh2: "隔離104号室 ⚠️",
        cctvCh3: "院長執務室",
        cctvCh4: "黄昏放養庭園",
        cctvCh5: "地下B2 焼却室 🔥",
        cctvCh6: "地下B1 給食冷蔵庫",

        // Questionnaire Section
        quizSectionSub: "PSYCHOLOGICAL EVALUATION",
        quizSectionTitle: "里親適格審査および精神同調診断",
        quizSectionIntro: "収容個体と里親の精神的安定性を担保するため、直感に従い選択してください。診断結果は譲渡契約の可否に直接影響します。",

        // Spectrogram Section
        spectrumSectionSub: "AUDIO SPECTROGRAPH & TAPE ARCHIVES",
        spectrumSectionTitle: "暮岳村異常音響スペクトログラム解析機",
        spectrumSectionIntro: "1999年10月31日 午前03:33に録音されたカセットテープ音声。バンドパスフィルターのつまみを調整し、隠された暗号周波数を特定してください。",
        spectrumLockTitle: "【旧式周波数無線機 // 電源切断中】",
        spectrumLockDesc: "後山の1999年磁帯解析機は現在休眠状態です。CCTV監視網で異常信号を特定するか、第一の鍵を入手すると通電します。",
        spectrumLockOverride: "⚡ [ 予備電源ブレーカーを強制投入 ]",
        tapeTitle: "📼 TAPE-99: [DUSK_RITUAL_AUDIO.DAT]",
        playTapeBtn: "▶ テープ #99 を再生",
        stopTapeBtn: "⏹ テープを停止",
        freqLabel: "周波数微調整:",
        btnStartFeedingText: "🍖 夜間給食プロトコル模擬演習を起動",

        // Memorial Section
        memorialSectionSub: "MEMORIAL & ETERNAL SANCTUARY",
        memorialSectionTitle: "永劫安魂堂・昇華記念壁",
        memorialSectionIntro: "すでに「昇華」を遂げ肥猫の肉体へと還った伴侶たちへ、夕暮れの光を手向けます。灯火を灯し、彼岸の静謐な声をお聴きください。",
        memorialLockTitle: "【永劫安魂記念壁 // 看護員認証が必要】",
        memorialLockDesc: "往生名簿には1998〜1999年に昇華した全個体および失踪職員の記録が保管されています。周波数暗号を解読するか適性テストを完了すると公開されます。",
        memorialLockOverride: "⚡ [ 秘匿名簿を閲覧 ]",
        memorialHeading: "「死は終焉にあらず、暮色の蒼穹へと還る旅立ち」",
        memorialDesc: "当施設では1998年以来、計1,999回の非公開安魂儀式を執り行ってまいりました。以下は初期に形態再構築を完了した先駆者たちの碑銘です：",
        lightCandleBtn: "🕯️ 永遠の安魂灯を灯す",

        // Chat Widget
        chatHeadTitle: "🐾 暮色愛寵 24H 相談窓口 (小暮)",
        chatWelcomeMsg: "こんにちは！暮色伴侶動物安養所の自動窓口【小暮】です。<br>【譲渡規約】、【104号病室】、【神藤院長】、【地下給食庫】や特定のペットについてご質問いただけます。下のボタンからも直接お尋ねいただけます。",
        chatInputPlaceholder: "ご相談内容を入力 (例: 譲渡、104、暗号)...",
        chatSendBtn: "送信",
        chatChipAdoption: "🐾 譲渡規約",
        chatChip104: "🩺 104号室",
        chatChipDirector: "👨‍⚕️ 神藤院長",
        chatChipMeat: "🥩 地下給食庫",
        chatChipFeimao: "🖤 暮色肥猫",
        chatChipEscape: "🚪 施設から脱出",

        // Footer
        footerOrgName: "暮色伴侶動物安養所",
        footerOrgDesc: "トワイライト・コンパニオン・サンクチュアリ<br>設置許可：群馬県動保管第 1998-333 号<br>理念：すべての形態異常および終末期動物に永遠の安らぎと昇華庇護を提供します。",
        footerLinksTitle: "案内リンク",
        footerContactTitle: "救護ホットライン",
        footerPhone: "027-333-XXXX (夜間専用回線)",
        footerAddress: "群馬県暮岳村3-14-1 (深山終点)",
        footerHours: "黄昏受付 17:00 - 04:00",
        footerDisclaimerTitle: "免責事項および誓約",
        footerDisclaimerText: "当サイトを閲覧した時点で『暮色精神同調免責規約』に同意したものとみなされます。閲覧中に生じた幻聴、視野異常、記憶混濁、および肥猫による凝視現象について、当所は一切の責任を負いかねます。",
        footerCopyright: "© 1998-1999 Twilight Companion Sanctuary. All rights reserved.",
        footerIntranetBtn: "[ 職員専用イントラネット端末ログイン / INTRANET LOGIN ]",

        // Restart
        btnRestartText: "初めから再探索 ➔"
      },

      zh: {
        // Site Brand & Header
        siteTitle: "暮色伴侣动物安养所",
        siteSub: "TWILIGHT COMPANION SANCTUARY & RESCUE (1998)",
        navAdoption: "🐾 领养档案",
        navCctv: "📹 实时监控",
        navQuiz: "📝 心理评估",
        navSpectrum: "📼 声谱解析",
        navMemorial: "🕯 往生安魂堂",
        searchPlaceholder: "搜索...",
        searchModalPlaceholder: "输入搜索关键词（如：肥猫、104、神藤、肉块、安乐死、1999）...",
        searchModalHint: "输入关键词搜索全院档案、监控编号或员工名录...",
        searchModalTitle: "院内机密档案全文检索",
        langButtonText: "🌐 中文",

        // Ticker
        ticker01Tag: "所内通知",
        ticker01Text: "【1999年度】秋季伴侣动物健康体检、老龄临终关怀与终身领养受理中（暮岳村本部）",
        ticker02Tag: "访客须知",
        ticker02Text: "由于安养所地处群山深处，自驾访客请于日落前抵达；黄昏时段部分收容个体会自发聚集注视西方天空",
        ticker03Tag: "领养需知",
        ticker03Text: "本所推行终身安养协议，领养人请确保居所夜间无强直射光并能接受特殊伴侣个体",
        ticker04Tag: "神藤院长",
        ticker04Text: "“生命的形态并非唯一，给每一个迷途的灵魂一份永恒归宿。”",

        // Hero
        heroTagline: "夕陽が沈むとき、すべての魂はひとつになる",
        heroHeading: "给每一个迷途的灵魂，<br>一份永不褪色的永恒安养。",
        heroDesc: "坐落于群马县暮岳村幽静群山之中。自1998年创立以来，我们致力于为遭受创伤、行为异常及老龄临终伴侣动物提供终身庇护与形态重构。在这里，它们将不再受饥饿与死亡的困扰。",
        heroBtnAdoption: "🐾 浏览待领养档案",
        heroBtnCctv: "📹 调阅实时监视网",

        // Adoption Section
        adoptionSectionSub: "ADOPTION & RESCUE DOSSIERS",
        adoptionSectionTitle: "特殊伴侣个体领养档案库",
        adoptionSectionIntro: "以下为当前在所内接受照护与观察的特异个体。点击【查阅详细病历档案】可调阅由神藤院长亲笔记录的生理监测与行为异变报告。",
        filterAll: "全部个体 (12)",
        filterCat: "猫科样本 (Cat)",
        filterDog: "犬类样本 (Canine)",
        filterSpecial: "特异供奉实体 (Specimen-00)",
        intakeDateLabel: "入所日: ",
        viewDossierBtn: "查阅详细病历档案 ➔",
        listenVoiceTitle: "试听叫声",

        // Sealed Card
        sealedBadge: "🔒 绝密封存档案 [SPEC-012]",
        sealedName: "████ (保密残影)",
        sealedDesc: "该个体档案已被神藤院长永久封存。在 CCTV-02 隔离104室捕获异常目击信号后自动解密。",
        sealedBreakBtn: "⚡ [ 强行破坏火漆封条 ]",

        // CCTV Section
        cctvSectionSub: "24-HOUR SURVEILLANCE MATRIX",
        cctvSectionTitle: "收容设施实时监控矩阵",
        cctvSectionIntro: "全天候 6 路闭路监视回传系统。支持微光夜视与热成像红外切换。请密切观察画面中的异常移动并在画面中点击标记。",
        cctvLockTitle: "【闭路监视网 // 保卫科离线中】",
        cctvLockDesc: "当前时段监视信号已切断至夜间巡逻专用线。完成【心理资格审查】或查阅2份病历档案后将自动激活。",
        cctvLockOverride: "⚡ [ 尝试强行接入保卫科信号 ]",
        cctvSignalNormal: "标准通道 (RGB)",
        cctvSignalNV: "微光夜视 (NV-G)",
        cctvSignalThermal: "红外热成像 (IR)",
        cctvCh1: "主犬舍 A区",
        cctvCh2: "隔离104室 ⚠️",
        cctvCh3: "院长办公室",
        cctvCh4: "黄昏放养庭院",
        cctvCh5: "B2 焚化间 🔥",
        cctvCh6: "B1 配餐冷库",

        // Questionnaire Section
        quizSectionSub: "PSYCHOLOGICAL EVALUATION",
        quizSectionTitle: "领养人资质审查与精神共鸣测试",
        quizSectionIntro: "为了确保收容个体与领养人之间的精神稳定性，请根据您的第一直觉如实选择。测试结果将直接决定您能否签署领养契约。",

        // Spectrogram Section
        spectrumSectionSub: "AUDIO SPECTROGRAPH & TAPE ARCHIVES",
        spectrumSectionTitle: "暮岳村异常声频解密台",
        spectrumSectionIntro: "播放 1999年10月31日 凌晨 03:33 于后山收容所录制的磁带音频。调节带通滤波器旋钮以分离高低频，在声谱瀑布图中搜寻隐藏的暗号与密码。",
        spectrumLockTitle: "【旧式调频无线电台 // 频段未通电】",
        spectrumLockDesc: "后山 1999 年磁带解密台处于休眠状态。需在 CCTV 监控中排查出异常信号或集齐第一枚密钥后自动激活。",
        spectrumLockOverride: "⚡ [ 强行合上备用电闸 ]",
        tapeTitle: "📼 TAPE-99: [DUSK_RITUAL_AUDIO.DAT]",
        playTapeBtn: "▶ 播放磁带 #99",
        stopTapeBtn: "⏹ 停止磁带",
        freqLabel: "频段微调:",
        btnStartFeedingText: "🍖 启动夜班喂食协议模拟",

        // Memorial Section
        memorialSectionSub: "MEMORIAL & ETERNAL SANCTUARY",
        memorialSectionTitle: "往生净洗与永恒安魂堂",
        memorialSectionIntro: "在此为所有已“升华”并融入肥猫身躯的伴侣宠物献上一束虚拟黄昏之光。点燃烛火，倾听彼岸的静谧回音。",
        memorialLockTitle: "【往生净洗纪念壁 // 需看护员权限认证】",
        memorialLockDesc: "往生名录收录了 1998-1999 年间所有升华个体与失踪员工档案。需在调频电台解密暗号或完成心理测评后解锁。",
        memorialLockOverride: "⚡ [ 翻开绝密封存名册 ]",
        memorialHeading: "“死亡并非终结，而是重回暮色苍穹”",
        memorialDesc: "安养所自1998年以来共举行 1,999 次闭门安魂仪式。以下为首批完成形态重构的先驱名录：",
        lightCandleBtn: "🕯️ 点燃永恒安魂烛火",

        // Chat Widget
        chatHeadTitle: "🐾 暮色爱宠 24H 在线咨询 (小暮)",
        chatWelcomeMsg: "您好！这里是暮色伴侣动物安养所自动客服【小暮】。<br>您可以直接向我询问【领养规程】、【104号病房】、【神藤院长】、【夜班配餐】或特定宠物档案。点击下方快捷气泡可直接提问。",
        chatInputPlaceholder: "输入咨询消息 (如: 领养、104、密码)...",
        chatSendBtn: "发送",
        chatChipAdoption: "🐾 领养条件",
        chatChip104: "🩺 104病房",
        chatChipDirector: "👨‍⚕️ 神藤院长",
        chatChipMeat: "🥩 地下肉库",
        chatChipFeimao: "🖤 暮色肥猫",
        chatChipEscape: "🚪 逃离安养所",

        // Footer
        footerOrgName: "暮色伴侣动物安养所",
        footerOrgDesc: "トワイライト・コンパニオン・サンクチュアリ<br>设立许可：群马县动保管第 1998-333 号<br>宗旨：为所有形态异常与临终宠物提供终极归宿与升华庇护。",
        footerLinksTitle: "导航链接",
        footerContactTitle: "救助热线",
        footerPhone: "027-333-XXXX (夜间专线)",
        footerAddress: "群马县暮岳村3-14-1 (深山尽头)",
        footerHours: "黄昏受付 17:00 - 04:00",
        footerDisclaimerTitle: "免责声明与契约",
        footerDisclaimerText: "进入本网站即视为您已签署《暮色精神共鸣免责声明》。对于浏览过程中发生的幻听、视力倒错、记忆丢失及被肥猫注视现象，本所概不承担法律责任。",
        footerCopyright: "© 1998-1999 Twilight Companion Sanctuary. All rights reserved.",
        footerIntranetBtn: "[ 员工内部内网终端登录入口 / INTRANET LOGIN ]",

        // Restart
        btnRestartText: "重新开始探索 ➔"
      }
    };
  }

  t(key) {
    const langObj = this.translations[this.currentLang] || this.translations.ja;
    return langObj[key] || this.translations.ja[key] || key;
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'ja' ? 'zh' : 'ja';
    this.setLanguage(nextLang);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('feimao_sanctuary_lang', lang);
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'zh-CN';
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update Language Toggle Button text
    const btn = document.getElementById('btnLangToggle');
    if (btn) {
      btn.innerHTML = lang === 'ja' ? `🌐 <span>日本語</span>` : `🌐 <span>中文</span>`;
      btn.title = lang === 'ja' ? '言語切替 (現在: 日本語)' : '切换语言 (当前: 中文)';
    }

    // Refresh Controllers
    if (window.MainController) {
      window.MainController.onLanguageChange(lang);
    }
    if (window.Chat) {
      window.Chat.onLanguageChange(lang);
    }
    if (window.CCTV) {
      window.CCTV.onLanguageChange(lang);
    }
    if (window.Terminal) {
      window.Terminal.onLanguageChange(lang);
    }
    if (window.Corruption) {
      window.Corruption.onLanguageChange(lang);
    }
  }
}

window.I18N = new SanctuaryI18n();
