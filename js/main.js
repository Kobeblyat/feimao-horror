/**
 * Twilight Feimao Sanctuary - Bilingual Main Controller & Database
 * Fully Supports Japanese (Default) and Chinese with Instant Toggle
 */

class SanctuaryMainController {
  constructor() {
    this.currentPetCategory = 'all';
    this.quizStep = 0;
    this.quizAnswers = [];
    this.spec12Unlocked = false;
    this.cctvUnlocked = false;
    this.spectrumUnlocked = false;
    this.memorialUnlocked = false;
    this.dossiersReadCount = 0;
    
    // 12 Dedicated Bilingual Pet Profiles with Exact Image Bindings
    this.pets = [
      {
        id: "SPEC-001",
        soundType: "cat",
        image: "assets/pet_calico.jpg",
        intakeDate: "1997-11-04",
        ja: {
          name: "小琥 (Kohaku)",
          species: "三毛猫 (Calico Cat)",
          age: "推定 3歳",
          status: "譲渡対象 (隔離観察)",
          tags: ["人懐っこい", "無心拍", "不眨眼", "室内限定"],
          desc: "暮岳村の廃神社で保護された三毛猫。性格は極めて温厚だが、照明の変化に関わらず瞳孔は常に垂直に拡大したまま。夜間、乳児の囁きに似た喉鳴らし音を発する。",
          medical: "体温: 0.0℃ (外気と同調) | 心拍数: 0回/分 | 備考: 通常のキャットフードを拒絶し、新鮮な生肉に対してのみ強い嚥下反射を示す。",
          secretNote: "【医師の極秘記録】小琥の腹部レントゲンには内臓が存在せず、未定形の黒い毛玉と極小の人歯が隙間なく充填されていた。"
        },
        zh: {
          name: "小琥 (Kohaku)",
          species: "三花母猫 (Calico Cat)",
          age: "估计 3岁",
          status: "待领养 (隔离观察)",
          tags: ["温顺", "嗜睡", "不眨眼", "室内纯养"],
          desc: "在暮岳村荒废神社被发现。性格极其安静，但无论外界光线如何变化，其瞳孔始终保持竖直放大状态。夜间会发出类似婴儿低语的呼噜声。",
          medical: "体温：0.0℃ (无生命体征波动) | 心率：0次/分 | 备注：进食时拒绝任何猫粮，仅对新鲜红肉有剧烈吞咽反射。",
          secretNote: "【医生私密记录】小琥的腹腔X光片显示，其胃部不存在器官结构，而是塞满了密密麻麻的未定型黑色毛球与微型人齿。"
        }
      },
      {
        id: "SPEC-002",
        soundType: "dog",
        image: "assets/pet_retriever.jpg",
        intakeDate: "1996-05-18",
        ja: {
          name: "阿金 (Kintaro)",
          species: "ゴールデン・レトリバー",
          age: "5歳",
          status: "譲渡対象 (特級看護)",
          tags: ["従順", "大型犬", "固定着席", "記憶消去"],
          desc: "元の飼い主は村の小学校教諭（1996年秋に行方不明）。阿金は完全に静止したお座りの姿勢を72時間以上維持できる。「肥猫」という単語に顕著に反応する。",
          medical: "関節可動域: 完全硬直 | 咬合力: 計測不能 (上限突破) | 備考: 首輪の内側に名簿番号と血指紋が刻印。",
          secretNote: "【警備室警告】阿金の前で背中を向けて屈んではならない。先週ブラッシングを試みた職員の前で下顎が180度左右に裂開し成人の笑い声を発した。"
        },
        zh: {
          name: "阿金 (Kintaro)",
          species: "金毛寻回犬 (Golden Retriever)",
          age: "5岁",
          status: "待领养 (特级看护)",
          tags: ["亲人", "大型犬", "固定坐姿", "记忆消除"],
          desc: "前主人为村内小学教师（已于1996年秋失踪）。阿金能够保持完全静止的端坐姿势连续超过72小时。对特定词汇‘肥猫’有明显歪头反应。",
          medical: "关节活动度：完全僵直 | 咬合力：测试仪上限溢出 | 备注：颈圈内侧刻有未知名录代码与血指纹印记。",
          secretNote: "【保卫科警告】严禁在阿金面前背对它蹲下。上周一名志愿者尝试给其梳毛时，阿金的下颌骨向两侧撕裂开至180度并发出成人笑声。"
        }
      },
      {
        id: "SPEC-003",
        soundType: "cat",
        image: "assets/fatcat.png",
        intakeDate: "1998-10-31",
        ja: {
          name: "暮光肥猫 (Feimao / Specimen-00)",
          species: "未知浮遊実体 (Entity)",
          age: "無窮",
          status: "絶対奉納 (譲渡厳禁)",
          tags: ["神明", "全知", "暮色浮遊", "祭祀中枢"],
          desc: "安養所の全職員が崇める至高の象徴。上空または隔離104号室の天井付近に常時静止浮遊する。丸みを帯びた黒い輪郭の奥に、彼岸へと通じる深淵が口を開いている。",
          medical: "物理形態: 接触不能 | 質量: 0.00kg | 空間歪曲: 極大 | 備考: 正面を光学機器で撮影しようとすると3秒以内に機器が過熱発火する。",
          secretNote: "【神藤院長の最終手記】これは救助した動物ではない…我々が死の恐怖から逃れるため、夕陽の果てから召喚した主宰者なのだ。"
        },
        zh: {
          name: "暮光肥猫 (Feimao / Specimen-00)",
          species: "未知浮空实体 (Entity)",
          age: "永恒",
          status: "绝对供奉 (严禁领养)",
          tags: ["神明", "全知", "暮色悬浮", "祭祀核心"],
          desc: "安养所全体职工供奉的至高象征。它常年漂浮于安养所上空或104隔离室顶部。其黑色圆润的外表下，隐藏着连接彼岸世界的大门。",
          medical: "物理形态：不可触及 | 质量：0.00kg | 空间扰动：极强 | 备注：任何企图用摄影机拍摄其面部正面的设备均在3秒内过热自燃。",
          secretNote: "【神藤院长终极批注】它不是我们救助的动物...是我们为了逃避死亡，而从夕阳的尽头召唤来的主宰者。"
        }
      },
      {
        id: "SPEC-004",
        soundType: "cat",
        image: "assets/pet_black_cat.jpg",
        intakeDate: "1998-03-12",
        ja: {
          name: "黒豆 (Kuromame)",
          species: "純黒短毛猫 (Bombay Cat)",
          age: "2歳",
          status: "譲渡対象",
          tags: ["暗視", "影同化", "漆黒"],
          desc: "小柄で部屋の隅の影を好む。照明が完全に消えると、その琥珀色の双眸が数メートルにわたる亀裂状の空間ゲートへと伸長する。",
          medical: "視力: 暗視限界測定不能 | 備考: 体表から未凝固の黒色タール状分泌物が滲出。",
          secretNote: "深夜に肥猫の巨大な身体へと融解し、翌朝焼却炉の排気管から再構成される様子が目撃されている。"
        },
        zh: {
          name: "黑豆 (Kuro)",
          species: "纯黑短毛猫 (Bombay Cat)",
          age: "2岁",
          status: "待领养",
          tags: ["活泼", "夜行性", "影子里穿行"],
          desc: "体型小巧，喜欢躲在房间角落的椅子暗处。当灯光完全熄灭时，能在黑暗中看到其黄色眼眸拉长为数米长的裂缝状通道。",
          medical: "视力：夜视极限灵敏 | 备注：身上常带有未干透的黑色焦油状分泌物。",
          secretNote: "黑豆曾在深夜被目击融入了肥猫的巨大身体中，次日清晨又从焚化炉的排气管中重新凝聚成型。"
        }
      },
      {
        id: "SPEC-005",
        soundType: "cat",
        image: "assets/pet_rabbit.jpg",
        intakeDate: "1999-01-09",
        ja: {
          name: "雪丸 (Yukimaru)",
          species: "白兎 (Japanese White Rabbit)",
          age: "1歳",
          status: "特異観察中",
          tags: ["金属咀嚼", "モールス信号", "赤眼"],
          desc: "純白の体毛を持つが、木製ケージ内で二本足で直立し監視カメラを凝視し続ける。干し草を噛むリズムはモールス符号の救難信号と完全に一致する。",
          medical: "聴覚: 100kHz以上の超音波を受信可能 | 備考: 排泄物が純粋な金属球体。",
          secretNote: "ケージの外から雪丸に呼びかけると、亡くなった肉親の溜息のような声がケージ奥から返ってくる。"
        },
        zh: {
          name: "雪丸 (Yukimaru)",
          species: "白兔 (Japanese White Rabbit)",
          age: "1岁",
          status: "特异观察中",
          tags: ["草食性?", "双眼血红", "多足"],
          desc: "全身洁白无暇，但经常在木笼中双足直立凝视走廊尽头的红外镜头。其咀嚼干草的节律与人类莫尔斯电码求救信号完全一致。",
          medical: "耳部听力：能接收100kHz以上高频超声波 | 备注：排泄物为纯净金属球体。",
          secretNote: "志愿者报告：深夜在笼外呼唤雪丸时，听到了已故亲人的叹息声从笼内传出。"
        }
      },
      {
        id: "SPEC-006",
        soundType: "dog",
        image: "assets/pet_pug.jpg",
        intakeDate: "1997-08-20",
        ja: {
          name: "バジ (Bagi)",
          species: "パグ (Pug)",
          age: "7歳",
          status: "終末期安養",
          tags: ["呼吸異常", "顔面皺襞", "夢遊"],
          desc: "重度の気道狭窄。熟睡時の喘鳴は廊下に反響し、時に在籍職員の氏名と生年月日を明瞭に呟く。",
          medical: "呼吸音: 異常な三重複合共鳴 | 肺活量: 通常犬類の5倍以上。",
          secretNote: "鎮静剤を投与した際、バジの顔面の皺の間から8つの微小な複眼が一斉に開眼した。"
        },
        zh: {
          name: "巴吉 (Baji)",
          species: "巴哥犬 (Pug)",
          age: "7岁",
          status: "临终安养",
          tags: ["呼吸困难", "面部褶皱", "梦呓"],
          desc: "患有严重呼吸道狭窄。沉睡时发出的喘息声在走廊中回荡，有时会清晰地念出在职员工的全名及出生年月日。",
          medical: "呼吸音：异常复杂共鸣 | 肺活量：远超生理常规。",
          secretNote: "上个月神藤院长在为其注射镇静剂时，巴吉的面部褶皱中睁开了额外的八只微型复眼。"
        }
      },
      {
        id: "SPEC-007",
        soundType: "dog",
        image: "assets/pet_shiba.jpg",
        intakeDate: "1998-06-15",
        ja: {
          name: "千代 (Chiyo)",
          species: "柴犬 (Shiba Inu)",
          age: "4歳",
          status: "譲渡対象",
          tags: ["後退歩行", "西面凝視", "沈黙"],
          desc: "村の石橋の袂で保護。どこへ連れて行こうとしても後退歩行しか行わない。視線は常に西の夕陽沈下点に固定されている。",
          medical: "脊椎構造: 関節が逆方向に180度湾曲。",
          secretNote: "頭部を無理に正面に向けようとすると、千代の体表から冷たい灰白色の粉塵が瞬時に噴出する。"
        },
        zh: {
          name: "千代 (Chiyo)",
          species: "柴犬 (Shiba Inu)",
          age: "4岁",
          status: "待领养",
          tags: ["固执", "不吠叫", "逆向行走"],
          desc: "在村口石桥下被发现。无论带它前往何处，千代永远只肯倒退着走。其视线始终固定在西方的夕阳落点。",
          medical: "脊椎结构：关节呈现逆向180度弯曲迹象。",
          secretNote: "一旦强行将其头部转向正前方，千代的身体会瞬间渗出冰冷的灰白色粉尘。"
        }
      },
      {
        id: "SPEC-008",
        soundType: "cat",
        image: "assets/pet_tabby.jpg",
        intakeDate: "1996-12-01",
        ja: {
          name: "花子 (Hanako)",
          species: "トラ猫 (Tabby Cat)",
          age: "6歳",
          status: "譲渡対象",
          tags: ["親和的", "施錠開錠", "壁面透過"],
          desc: "職員がタイピングしているとキーボードに乗る。開錠痕を一切残さず、施錠されたB2地下氷庫内に出現することが度々ある。",
          medical: "体密度: 時間帯によって周期的に0へと減少。",
          secretNote: "花子の足跡に紫外線を照射すると、五本指の人間の手形として発光する。"
        },
        zh: {
          name: "花子 (Hanako)",
          species: "虎斑猫 (Tabby Cat)",
          age: "6岁",
          status: "待领养",
          tags: ["亲和", "爪子锐利", "门禁穿透"],
          desc: "喜欢在员工打字时趴在键盘上。多次在没有任何开锁痕迹的情况下，出现在反锁的B2地下冰库内部。",
          medical: "体密度：在不同时段测算呈现周期性归零。",
          secretNote: "花子留下的脚印在紫外灯照射下呈现出五指人类手印轮廓。"
        }
      },
      {
        id: "SPEC-009",
        soundType: "cat",
        image: "assets/pet_fold.jpg",
        intakeDate: "1999-04-10",
        ja: {
          name: "茶茶 (Chacha)",
          species: "スコティッシュフォールド",
          age: "2歳",
          status: "隔離中",
          tags: ["折れ耳", "骨格異変", "無音吸音"],
          desc: "両耳が頭部に密着。レントゲン検査により、両耳の奥が未知の空洞回音トンネルへと直結していることが判明。",
          medical: "聴力: 外部反応なし、体内で440Hz基準音を自発生成。",
          secretNote: "茶茶の背中に耳を当てると、何万人もの人々が囁き祈るような読経と咽び泣きが聴こえる。"
        },
        zh: {
          name: "茶茶 (Chacha)",
          species: "茶色折耳猫 (Scottish Fold)",
          age: "2岁",
          status: "隔离中",
          tags: ["折耳", "骨骼异变", "无声"],
          desc: "双耳极度贴紧头部。根据X光检测，其双耳下方直接连通着未知的空腔回音隧道。",
          medical: "听力：无外界反应，但体内自发产生440Hz标准音。",
          secretNote: "将耳朵贴近茶茶的背部时，能听到如同万人低语的诵经与哭泣声。"
        }
      },
      {
        id: "SPEC-010",
        soundType: "dog",
        image: "assets/pet_shepherd.jpg",
        intakeDate: "1995-10-10",
        ja: {
          name: "ライカ (Laika)",
          species: "シェパード混血犬",
          age: "8歳",
          status: "特級警備",
          tags: ["警備犬", "不食", "黒タール分泌"],
          desc: "創設時からの最初の収容犬。過去4年間固形食物を一切摂取していないが、強靭な筋力と警戒姿勢を維持。",
          medical: "新陳代謝: 完全停止 | 血液: 透明ゲル状。",
          secretNote: "神藤院長のメモ:「ライカはもはや犬ではない。肥猫が残した地上警備用信標である。」"
        },
        zh: {
          name: "莱卡 (Laika)",
          species: "混血牧羊犬 (Mixed Shepherd)",
          age: "8岁",
          status: "特级护卫",
          tags: ["护卫犬", "警惕", "不进食"],
          desc: "本所建立时的首批收容犬。过去四年间未曾摄入任何固体食物，依然保持高强度肌肉活力与警觉姿态。",
          medical: "新陈代谢：完全停滞 | 血液检测：呈透明胶质状。",
          secretNote: "神藤院长曾批示：莱卡已不再是犬类，而是肥猫所留下的警卫信标之一。"
        }
      },
      {
        id: "SPEC-011",
        soundType: "cat",
        image: "assets/pet_siamese.jpg",
        intakeDate: "1998-09-03",
        ja: {
          name: "ルル (Lulu)",
          species: "シャム猫 (Siamese Cat)",
          age: "3歳",
          status: "譲渡対象",
          tags: ["乳児啼泣", "夜間徘徊", "誘引"],
          desc: "夜間の鳴き声は人間の乳児の泣き声と周波数が完全に一致し、近隣の住民を山奥の禁足地へと誘引する。",
          medical: "声帯構造: 人間咽頭組織のハイブリッド。",
          secretNote: "ルルが抱き上げられた際、抱いた人間の手首に青黒い指圧痕が自動的に焼き付く。"
        },
        zh: {
          name: "露露 (Lulu)",
          species: "暹罗猫 (Siamese Cat)",
          age: "3岁",
          status: "待领养",
          tags: ["婴儿啼哭", "诱引", "瞳孔异变"],
          desc: "夜间叫声与人类初生儿啼哭声波完全一致，常诱引附近村民走进后山禁地。",
          medical: "声带构造：呈现人类咽喉与猫科声带的嵌合结构。",
          secretNote: "被露露注视超过一分钟的人，手腕内侧均会出现一圈青黑色的猫爪按压青紫印记。"
        }
      },
      {
        id: "SPEC-012",
        soundType: "cat",
        image: "assets/pet_shadow.jpg",
        intakeDate: "1999-10-31",
        ja: {
          name: "零号の影 (Shadow Zero)",
          species: "肥猫脱皮残影 (Entity)",
          age: "無",
          status: "絶密封印",
          tags: ["終極残影", "端末侵食", "禁忌"],
          desc: "肥猫が最初に脱皮した外皮から生じた自律意識体。現在ブラウザのキャッシュ領域を侵食中。",
          medical: "観測不能 | 質量: 0.00kg。",
          secretNote: "【封印記録】このファイルを開いた端末のIPアドレスは、既に安養所の供奉台帳に永久登録されました。"
        },
        zh: {
          name: "零号影子 (Shadow Zero)",
          species: "肥猫脱皮残影 (Entity)",
          age: "无",
          status: "绝密封存",
          tags: ["终极残影", "意识蔓延", "禁忌"],
          desc: "这是肥猫脱落的第一层外皮所形成的自主意识体。目前正在您的浏览器缓存区蔓延。",
          medical: "观测指标：无法测定 | 质量：0.00kg。",
          secretNote: "【封印记录】点开此档案的设备IP地址，已被自动登记至神藤院长的午夜同化名单中。"
        }
      }
    ];

    // Bilingual Quiz Database
    this.quizData = {
      ja: [
        {
          q: "問題 01：新しい伴侶を迎えるにあたり、ご自宅の環境で最も重視する条件は何ですか？",
          options: [
            { text: "A. 日当たりが良く、風通しの良い清潔なリビング", sanityCost: 0 },
            { text: "B. 外光が遮断され、常時夕暮れのような薄暗い静寂", sanityCost: 5 },
            { text: "C. 窓も鏡も一切存在しない地下の完全密閉区画", sanityCost: 8 },
            { text: "D. 黄昏の長い影さえ伸びていればどこでも良い", sanityCost: 15 }
          ]
        },
        {
          q: "問題 02：夜中の3時にペットが何もない部屋の隅を凝視して低く喉を鳴らしていたら、どうしますか？",
          options: [
            { text: "A. 起きて優しく声をかけ、虫や物音がないか確認する", sanityCost: 0 },
            { text: "B. 気づかないふりをして毛布を被り眠り直す", sanityCost: 5 },
            { text: "C. 同じ視線の先を凝視し、壁の亀裂の中の瞳を探す", sanityCost: 15 },
            { text: "D. ペットの隣に正座し、共に神明の啓示を拝聴する", sanityCost: 25 }
          ]
        },
        {
          q: "問題 03：ペットの体重が日ごとに減り、体重計が 0.00kg を示してもなお浮遊活動を続けている場合、どうしますか？",
          options: [
            { text: "A. 直ちに動物病院へ連れて行きレントゲン検査を行う", sanityCost: 5 },
            { text: "B. その超凡なる新形態を受け入れ、特製生肉を供える", sanityCost: 15 },
            { text: "C. 夕陽へ飛び去らぬよう赤い紐で寝床に結びつける", sanityCost: 20 },
            { text: "D. 体重を補うため、自らの肉体の一部を捧げる", sanityCost: 35 }
          ]
        },
        {
          q: "問題 04：【最終誓約】譲渡契約を締結した場合、あなたの記憶と名前はすべて「肥猫」に預託されることに同意しますか？",
          options: [
            { text: "A. 断じて同意しない！直ちにテストを中断し退出する！", sanityCost: 10, endingFlag: 'escape' },
            { text: "B. 同意する。自ら暮色安養所の新たな看護員となる。", sanityCost: 40, endingFlag: 'assimilate' },
            { text: "C. 今夜の地下B2焼却室の給食原料となることを望む。", sanityCost: 50, endingFlag: 'food' }
          ]
        }
      ],
      zh: [
        {
          q: "问题 01：在迎接新的伴侣宠物时，您认为最理想的居住环境是？",
          options: [
            { text: "A. 阳光明媚、通风良好且宽敞明亮的起居室", sanityCost: 0 },
            { text: "B. 遮光帘常年紧闭、保持黄昏微光与静谧的暗室", sanityCost: 5 },
            { text: "C. 没有任何窗户与镜子的地下密闭隔间", sanityCost: 8 },
            { text: "D. 只要有黄昏时分的长长阴影即可", sanityCost: 15 }
          ]
        },
        {
          q: "问题 02：当您的伴侣宠物在半夜三点盯着空无一物的墙角低声呼噜时，您会？",
          options: [
            { text: "A. 起床安抚它，检查是否有蚊虫或老鼠", sanityCost: 0 },
            { text: "B. 假装没看见，翻身继续睡觉", sanityCost: 5 },
            { text: "C. 顺着它的视线望去，直到看见墙壁裂缝里的眼睛", sanityCost: 15 },
            { text: "D. 和它一起面朝墙角整齐跪下，聆听神明谕示", sanityCost: 25 }
          ]
        },
        {
          q: "问题 03：如果新宠物的体重每天都在减轻，直到磅秤显示 0.00kg 却依然漂浮活动，您愿意？",
          options: [
            { text: "A. 立即送往神藤兽医院进行紧急血液与X光透视", sanityCost: 5 },
            { text: "B. 接受它超凡的崭新形态，准备特制肉质贡品", sanityCost: 15 },
            { text: "C. 用红色绳结将其固定在床头，防止它飞向落日", sanityCost: 20 },
            { text: "D. 献出自己的部分躯体以增加它的重量", sanityCost: 35 }
          ]
        },
        {
          q: "问题 04：【终极协议】您是否同意：一旦签署领养协议，您的一切记忆与名字将由‘肥猫’代为保管？",
          options: [
            { text: "A. 绝不同意！我要立即终止测试并离开网站！", sanityCost: 10, endingFlag: 'escape' },
            { text: "B. 我同意。我自愿成为暮色安养所的新看护者。", sanityCost: 40, endingFlag: 'assimilate' },
            { text: "C. 我愿意成为今晚 B2 焚化间的配餐原料。", sanityCost: 50, endingFlag: 'food' }
          ]
        }
      ]
    };

    // Bilingual Endings Database
    this.endingsData = {
      ja: {
        'A': {
          code: "ENDING-A // 盲目的譲渡",
          title: "【結末 A：合格なる飼料】",
          narrative: "あなたは微塵の違和感にも気づかず、喜んで譲渡契約に署名した。夜の帳が下り、羽のように軽い黒猫を抱いて帰宅する。部屋の灯りを消した瞬間、猫は瞬きひとつせず、あなたの声は永遠に低く響く猫の喉鳴らしへと変貌した……"
        },
        'B': {
          code: "ENDING-B // 意識同化",
          title: "【結末 B：観測者の同化】",
          narrative: "あなたの理智は度重なる凝視によって完全に潰えた。自ら104号隔離病室へと歩み入り、両足がゆっくりと床を離れていく。夕暮れの暮色の中、あなたは肥猫の巨大な身体の一部となり、次の訪問者を永久に見つめ続ける。"
        },
        'C': {
          code: "ENDING-C // 焼却残渣",
          title: "【結末 C：真夜中の給食】",
          narrative: "地下二階の探索は守護者の怒りを買った。午前03:33の鐘が鳴り響き、数トンの焼却炉の扉があなたの背後で音もなく閉ざされる。高熱が肉体を焼き尽くし、肥猫の微笑みの記憶だけが黒い灰となって降り注いだ。"
        },
        'D': {
          code: "ENDING-D // 暮色破暁 [TRUE ENDING]",
          title: "【真結末 D：暮色の夜明け・終極の真相】",
          narrative: "4つの核心暗号（監視目撃、院長権限、奉納信物、音響暗号）を揃えたあなたは、1998年以来の祭祀ネットワークを完全に上書きした！制御中枢から超高周波の浄化音波が解き放たれ、空を覆っていた肥猫の巨影は朝焼けの光の中に消滅した。囚われていたすべての魂は解放され、あなたは果てしない黄昏の悪夢から生還した！"
        }
      },
      zh: {
        'A': {
          code: "ENDING-A // 盲目领养",
          title: "【结局 A：合格的饲料】",
          narrative: "你未能察觉任何异样，欣然签署了领养协议。夜幕降临，你抱着轻如鸿毛的黑猫回到家中。当你关上灯的那一刻，它没有眨眼，而你的声音永远变成了猫咪的低沉呼噜……"
        },
        'B': {
          code: "ENDING-B // 意识同化",
          title: "【结局 B：观测者同化】",
          narrative: "你的理智在一次次凝视中彻底归零。你自愿走入了104号隔离观察室，双脚慢慢离开了地面。在夕阳的暮色中，你成为了肥猫巨大身体的一部分，永远注视着下一位打开网页的访客。"
        },
        'C': {
          code: "ENDING-C // 焚化残渣",
          title: "【结局 C：午夜配餐】",
          narrative: "你在地下二层的探寻触怒了守护者。03:33的钟声准时敲响，重达数吨的焚化炉门在你的身后无声合拢。高温将一切肉体洗净，唯有你对肥猫微笑的记忆化作了黑色的灰烬。"
        },
        'D': {
          code: "ENDING-D // 暮色破晓 [TRUE ENDING]",
          title: "【真结局 D：暮色破晓·终极真相】",
          narrative: "通过集齐4枚核心密钥（监控目击、院长权限、供奉信物、声学暗号），你成功覆写了安养所自1998年以来的祭祀网络！控制中枢释放了超高频净化声波，笼罩在天空的肥猫巨影在晨曦的破晓光芒中发出哀鸣并逐渐消散。所有被困宠物的灵魂重获自由，你成功逃脱了这场永无止境的黄昏梦魇！"
        }
      }
    };

    this.init();
  }

  init() {
    this.renderPetGrid();
    this.bindEvents();
    this.initQuiz();
    
    // Initial i18n run
    if (window.I18N) {
      window.I18N.setLanguage(window.I18N.currentLang);
    }
  }

  onLanguageChange(lang) {
    this.renderPetGrid();
    this.renderQuizQuestion();
  }

  unlockCCTV(quiet = false) {
    if (this.cctvUnlocked) return;
    this.cctvUnlocked = true;
    const overlay = document.getElementById('cctvLockOverlay');
    if (overlay) overlay.classList.add('unlocked');
    if (!quiet && window.Corruption) {
      const msg = window.I18N && window.I18N.currentLang === 'zh'
        ? "【权限提升】CCTV 6路实时监视网络信号已接入！"
        : "【権限昇格】CCTV 6系統生中継監視ネットワークが復旧しました！";
      window.Corruption.showToast(msg);
      window.Corruption.addCorruption(8, "Unlocked CCTV");
    }
  }

  unlockSpectrum(quiet = false) {
    if (this.spectrumUnlocked) return;
    this.spectrumUnlocked = true;
    const overlay = document.getElementById('spectrumLockOverlay');
    if (overlay) overlay.classList.add('unlocked');
    if (!quiet && window.Corruption) {
      const msg = window.I18N && window.I18N.currentLang === 'zh'
        ? "【电源恢复】后山 1999 年磁带调频解密台已通电！"
        : "【電源復旧】後山 1999年テープ周波数解析機に通電しました！";
      window.Corruption.showToast(msg);
      window.Corruption.addCorruption(10, "Unlocked Spectrum");
    }
  }

  unlockMemorial(quiet = false) {
    if (this.memorialUnlocked) return;
    this.memorialUnlocked = true;
    const overlay = document.getElementById('memorialLockOverlay');
    if (overlay) overlay.classList.add('unlocked');
    if (!quiet && window.Corruption) {
      const msg = window.I18N && window.I18N.currentLang === 'zh'
        ? "【档案解密】往生安魂堂 8 尊先驱铭牌与失踪名单已公开！"
        : "【記録解錠】永劫安魂堂 8柱の先駆者銘牌と失踪名簿が公開されました！";
      window.Corruption.showToast(msg);
      window.Corruption.addCorruption(10, "Unlocked Memorial");
    }
  }

  unsealSpec12(force = false) {
    if (this.spec12Unlocked) return;
    this.spec12Unlocked = true;
    this.renderPetGrid();
    if (window.Corruption) {
      const msg = window.I18N && window.I18N.currentLang === 'zh'
        ? "【档案解密】SPEC-012 [零号影子] 绝密病历已解除封印！"
        : "【記録解錠】SPEC-012 [零号の影] 絶密カルテの封印が解除されました！";
      window.Corruption.showToast(msg);
      window.Corruption.addCorruption(force ? 15 : 8, "Unsealed SPEC-012");
    }
    if (window.HorrorAudio) window.HorrorAudio.playFeimaoPurr();
  }

  renderPetGrid() {
    const grid = document.getElementById('petGrid');
    if (!grid) return;

    const lang = window.I18N ? window.I18N.currentLang : 'ja';

    grid.innerHTML = '';
    const filtered = this.pets.filter(pet => {
      if (this.currentPetCategory === 'all') return true;
      if (this.currentPetCategory === 'cat') return pet[lang].species.includes('猫') || pet.id === 'SPEC-003';
      if (this.currentPetCategory === 'dog') return pet[lang].species.includes('犬');
      if (this.currentPetCategory === 'special') return pet.id === 'SPEC-003' || pet.id === 'SPEC-012' || pet[lang].status.includes('供奉') || pet[lang].status.includes('奉納');
      return true;
    });

    filtered.forEach(pet => {
      const pData = pet[lang] || pet['ja'];
      const card = document.createElement('div');
      
      // Sealed SPEC-012 Check
      if (pet.id === 'SPEC-012' && !this.spec12Unlocked) {
        card.className = 'pet-card sealed-card';
        card.innerHTML = `
          <div class="sealed-card-badge">${window.I18N ? window.I18N.t('sealedBadge') : '🔒 絶密封印 [SPEC-012]'}</div>
          <div class="pet-thumb-box" style="filter:blur(8px) brightness(0.25);">
            <img src="${pet.image}" alt="Sealed" class="pet-thumb-img" />
          </div>
          <div class="pet-info-body">
            <h3 class="pet-name">${window.I18N ? window.I18N.t('sealedName') : '████ (秘匿残影)'}</h3>
            <p class="pet-desc">${window.I18N ? window.I18N.t('sealedDesc') : 'この個体の記録は封印されています。'}</p>
            <button class="btn-unlock-override" onclick="window.MainController.unsealSpec12(true)" style="width:100%; margin-top:8px;">${window.I18N ? window.I18N.t('sealedBreakBtn') : '⚡ [ 封印を強制破棄 ]'}</button>
          </div>
        `;
        grid.appendChild(card);
        return;
      }

      card.className = 'pet-card';
      card.innerHTML = `
        <div class="pet-thumb-box">
          <img src="${pet.image}" onerror="this.src='assets/pet_calico.jpg'" alt="${pData.name}" class="pet-thumb-img" loading="lazy" />
          <span class="pet-status-badge">🐾 ${pData.status}</span>
          <span class="pet-id-tag">${pet.id}</span>
          <button class="pet-audio-btn" data-id="${pet.id}" title="${window.I18N ? window.I18N.t('listenVoiceTitle') : '試聴'}">🔊</button>
        </div>
        <div class="pet-info-body">
          <div class="pet-name-row">
            <h3 class="pet-name">${pData.name}</h3>
            <span class="pet-meta-sub">${pData.species} · ${pData.age}</span>
          </div>
          <div class="pet-tags">
            ${pData.tags.map(t => `<span class="pet-tag">${t}</span>`).join('')}
          </div>
          <p class="pet-desc">${pData.desc}</p>
          <div class="pet-footer-action">
            <span class="pet-intake-date">${window.I18N ? window.I18N.t('intakeDateLabel') : '入所日: '}${pet.intakeDate}</span>
            <button class="btn-view-dossier" data-id="${pet.id}">${window.I18N ? window.I18N.t('viewDossierBtn') : '詳細カルテ ➔'}</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Bind audio button
    grid.querySelectorAll('.pet-audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petId = btn.dataset.id;
        const corrupted = window.Corruption ? window.Corruption.corruption > 40 : false;
        
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 800);

        if (window.HorrorAudio) {
          window.HorrorAudio.playPetSound(petId, corrupted);
        }
      });
    });

    // Bind view dossier buttons
    grid.querySelectorAll('.btn-view-dossier').forEach(btn => {
      btn.addEventListener('click', () => {
        const petId = btn.dataset.id;
        this.openDossier(petId);
      });
    });
  }

  bindEvents() {
    // Language Toggle
    const btnLang = document.getElementById('btnLangToggle');
    if (btnLang) {
      btnLang.addEventListener('click', () => {
        if (window.I18N) window.I18N.toggleLanguage();
      });
    }

    // Override buttons
    const btnCctvOverride = document.getElementById('btnUnlockCCTVOverride');
    if (btnCctvOverride) {
      btnCctvOverride.addEventListener('click', () => this.unlockCCTV());
    }

    const btnSpectrumOverride = document.getElementById('btnUnlockSpectrumOverride');
    if (btnSpectrumOverride) {
      btnSpectrumOverride.addEventListener('click', () => this.unlockSpectrum());
    }

    const btnMemorialOverride = document.getElementById('btnUnlockMemorialOverride');
    if (btnMemorialOverride) {
      btnMemorialOverride.addEventListener('click', () => this.unlockMemorial());
    }

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentPetCategory = tab.dataset.category;
        this.renderPetGrid();
        if (window.HorrorAudio) window.HorrorAudio.playClick();
      });
    });

    // Sanity Pill Click Drain Easter Egg
    const sanityPill = document.querySelector('.sanity-meter-pill');
    if (sanityPill) {
      sanityPill.style.cursor = 'pointer';
      sanityPill.addEventListener('click', () => {
        if (window.Corruption) {
          window.Corruption.drainSanity(25);
          const toast = window.I18N && window.I18N.currentLang === 'zh'
            ? "【凝视深渊】强行窥探了未知维度，理智值急剧下降！"
            : "【深淵凝視】未知の次元を覗き込み、正気度が激しく低下！";
          window.Corruption.showToast(toast);
        }
      });
    }

    // Logo 3-Click Secret ARG Easter Egg
    const logoArea = document.querySelector('.logo-area');
    let logoClicks = 0;
    if (logoArea) {
      logoArea.addEventListener('click', (e) => {
        logoClicks++;
        if (logoClicks >= 3) {
          e.preventDefault();
          if (window.HorrorAudio) window.HorrorAudio.playFeimaoPurr();
          if (window.Corruption) {
            const toast = window.I18N && window.I18N.currentLang === 'zh'
              ? "【触发绝密便签】神藤院长留：104室特异个体浮空坐标代码为 [19991031]！"
              : "【極秘メモ出現】神藤院長の手記：104号室の浮遊座標暗号は [19991031]！";
            window.Corruption.showToast(toast);
            window.Corruption.addCorruption(10, "Found secret logo memo");
          }
          logoClicks = 0;
        }
      });
    }

    // Audio Toggle in Header
    const audioBtn = document.getElementById('btnAudioToggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (window.HorrorAudio) {
          const isPlaying = window.HorrorAudio.toggleMute();
          audioBtn.classList.toggle('playing', isPlaying);
          audioBtn.textContent = isPlaying ? '🔊' : '🔇';
        }
      });
    }

    // Search Trigger & Modal
    const searchTrigger = document.getElementById('btnSearchTrigger');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('btnSearchClose');
    const searchInput = document.getElementById('searchInput');

    if (searchTrigger && searchModal) {
      searchTrigger.addEventListener('click', () => {
        searchModal.classList.add('active');
        if (searchInput) searchInput.focus();
        if (window.HorrorAudio) window.HorrorAudio.playClick();
      });
    }

    if (searchClose && searchModal) {
      searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value.trim());
      });
    }

    // Dossier Modal Close
    const dossierModal = document.getElementById('dossierModal');
    const dossierClose = document.getElementById('btnDossierClose');
    if (dossierClose && dossierModal) {
      dossierClose.addEventListener('click', () => {
        dossierModal.classList.remove('active');
      });
    }

    // Intranet Trigger
    const intranetBtn = document.getElementById('btnOpenIntranet');
    if (intranetBtn) {
      intranetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.Terminal) window.Terminal.open();
      });
    }

    // Endings Restart Button
    const restartBtn = document.getElementById('btnRestartGame');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        document.body.classList.remove('ending-active', 'san-zero-nightmare');
        window.location.reload();
      });
    }
  }

  openDossier(petId) {
    const pet = this.pets.find(p => p.id === petId);
    if (!pet) return;

    const lang = window.I18N ? window.I18N.currentLang : 'ja';
    const pData = pet[lang] || pet['ja'];

    const modal = document.getElementById('dossierModal');
    const titleEl = document.getElementById('dossierTitle');
    const imgEl = document.getElementById('dossierPhoto');
    const tableEl = document.getElementById('dossierTableBody');
    const secretNoteEl = document.getElementById('dossierSecretNote');

    const titlePrefix = lang === 'zh' ? "【机密健康与行为档案】" : "【機密健康・行動カルテ】";
    if (titleEl) titleEl.textContent = `${titlePrefix}${pData.name} (${pet.id})`;
    if (imgEl) {
      imgEl.src = pet.image;
      imgEl.onerror = () => { imgEl.src = 'assets/pet_calico.jpg'; };
    }
    if (secretNoteEl) secretNoteEl.textContent = pData.secretNote;

    const thSpecies = lang === 'zh' ? "物种品系" : "種別品系";
    const thAge = lang === 'zh' ? "预估年龄" : "推定年齢";
    const thIntake = lang === 'zh' ? "入所日期" : "入所年月日";
    const thStatus = lang === 'zh' ? "当前状态" : "現在状態";
    const thMedical = lang === 'zh' ? "生理体征" : "生理所見";
    const thTags = lang === 'zh' ? "性格特征" : "性格特徴";

    if (tableEl) {
      tableEl.innerHTML = `
        <tr><th>${thSpecies}</th><td>${pData.species}</td></tr>
        <tr><th>${thAge}</th><td>${pData.age}</td></tr>
        <tr><th>${thIntake}</th><td>${pet.intakeDate}</td></tr>
        <tr><th>${thStatus}</th><td>${pData.status}</td></tr>
        <tr><th>${thMedical}</th><td>${pData.medical}</td></tr>
        <tr><th>${thTags}</th><td>${pData.tags.join("、")}</td></tr>
      `;
    }

    if (modal) {
      modal.classList.add('active');
      if (window.HorrorAudio) window.HorrorAudio.playClick();
      
      this.dossiersReadCount++;
      if (this.dossiersReadCount >= 2) {
        this.unlockCCTV();
      }

      if (window.Corruption) {
        window.Corruption.addCorruption(6, `Inspected dossier ${pet.id}`);
        if (pet.id === 'SPEC-003') {
          const jumpCaption = lang === 'zh' ? "特 异 个 体 // 禁 忌 窥 视" : "特 異 実 体 // 禁 忌 凝 視";
          window.Corruption.triggerJumpscare(jumpCaption, "assets/jumpscare_feimao.jpg", 2000);
        }
      }
    }
  }

  handleSearch(query) {
    const list = document.getElementById('searchResultsList');
    if (!list) return;
    const lang = window.I18N ? window.I18N.currentLang : 'ja';

    if (!query) {
      list.innerHTML = `<p style="color:#888; font-size:0.85rem;">${window.I18N ? window.I18N.t('searchModalHint') : '検索中...'}</p>`;
      return;
    }

    const q = query.toLowerCase();
    let results = [];

    // Filter pet dossiers
    this.pets.forEach(pet => {
      const p = pet[lang] || pet['ja'];
      if (p.name.toLowerCase().includes(q) || pet.id.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({
          title: `[カルテ/档案] ${p.name} (${pet.id})`,
          text: p.desc.substring(0, 70) + '...',
          action: () => {
            document.getElementById('searchModal').classList.remove('active');
            this.openDossier(pet.id);
          }
        });
      }
    });

    if (results.length === 0) {
      list.innerHTML = `<p style="color:#ff3333; font-family:var(--font-mono); font-size:0.85rem;">>> NO RECORDS FOUND FOR '${query}' <<</p>`;
    } else {
      list.innerHTML = '';
      results.forEach(res => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `<strong>${res.title}</strong><p style="font-size:0.8rem; color:#666; margin-top:2px;">${res.text}</p>`;
        item.addEventListener('click', res.action);
        list.appendChild(item);
      });
    }
  }

  initQuiz() {
    this.quizStep = 0;
    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const lang = window.I18N ? window.I18N.currentLang : 'ja';
    const questions = this.quizData[lang] || this.quizData['ja'];

    if (this.quizStep >= questions.length) {
      this.showQuizResult();
      return;
    }

    const qData = questions[this.quizStep];
    const qNumEl = document.getElementById('quizQNum');
    const qTitleEl = document.getElementById('quizTitle');
    const optionsList = document.getElementById('quizOptionsList');
    const progressFill = document.getElementById('quizProgressFill');

    if (qNumEl) qNumEl.textContent = `QUESTION 0${this.quizStep + 1} / 0${questions.length}`;
    if (qTitleEl) qTitleEl.textContent = qData.q;
    if (progressFill) {
      progressFill.style.width = `${((this.quizStep + 1) / questions.length) * 100}%`;
    }

    if (optionsList) {
      optionsList.innerHTML = '';
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span style="font-weight:bold; color:var(--accent-twilight);">${opt.text.substring(0, 2)}</span> ${opt.text.substring(3)}`;
        btn.addEventListener('click', () => {
          if (window.HorrorAudio) window.HorrorAudio.playClick();
          if (window.Corruption && opt.sanityCost > 0) {
            window.Corruption.drainSanity(opt.sanityCost);
          }

          if (opt.endingFlag) {
            if (opt.endingFlag === 'assimilate') {
              this.triggerEnding('B');
              return;
            } else if (opt.endingFlag === 'food') {
              this.triggerEnding('C');
              return;
            }
          }

          this.quizStep++;
          this.renderQuizQuestion();
        });
        optionsList.appendChild(btn);
      });
    }
  }

  showQuizResult() {
    this.unlockCCTV();
    this.unlockMemorial();

    const lang = window.I18N ? window.I18N.currentLang : 'ja';
    const box = document.getElementById('quizResultBox');
    const cardBody = document.getElementById('quizCardBody');
    if (cardBody) cardBody.style.display = 'none';
    if (box) {
      box.style.display = 'block';
      const title = lang === 'zh' ? "【领养资格心理审查完成】" : "【里親適性審査・精神同調完了】";
      const desc = lang === 'zh'
        ? "系统评定：您的心理波段与【Specimen-00 肥猫】高度吻合。<br>您已被列入安养所【终身看护契约名录】。保卫科监控与往生安魂堂权限已为您解锁。"
        : "判定結果：あなたの精神波長は【Specimen-00 肥猫】と極めて高度に同調しています。<br>あなたは当所の【終生看護契約名簿】に正式登録されました。監視網および安魂堂のアクセスが許可されました。";
      const btnText = lang === 'zh' ? "重新填写问卷" : "診断をやり直す";

      box.innerHTML = `
        <h3 style="color:#d97443; margin-bottom:12px;">${title}</h3>
        <p style="font-size:0.95rem; color:#444; line-height:1.7; margin-bottom:16px;">${desc}</p>
        <button class="btn-primary" id="btnRestartQuiz" style="margin:0 auto;">${btnText}</button>
      `;
      document.getElementById('btnRestartQuiz').addEventListener('click', () => {
        if (cardBody) cardBody.style.display = 'block';
        box.style.display = 'none';
        this.quizStep = 0;
        this.renderQuizQuestion();
      });
    }

    if (window.Corruption) {
      window.Corruption.addCorruption(18, "Completed Psychological Evaluation");
    }
  }

  triggerEnding(endingType) {
    const modal = document.getElementById('endingModal');
    const codeEl = document.getElementById('endingCode');
    const titleEl = document.getElementById('endingTitle');
    const narrativeEl = document.getElementById('endingNarrative');

    const lang = window.I18N ? window.I18N.currentLang : 'ja';
    const pool = this.endingsData[lang] || this.endingsData['ja'];
    const target = pool[endingType] || pool['A'];

    if (codeEl) codeEl.textContent = target.code;
    if (titleEl) titleEl.textContent = target.title;
    if (narrativeEl) narrativeEl.textContent = target.narrative;

    if (modal) {
      document.body.classList.add('ending-active');
      document.body.style.overflow = 'hidden';

      // Hide all nightmare overlays that could obstruct ending text
      const giantFeimao = document.querySelector('.giant-nightmare-feimao');
      if (giantFeimao) giantFeimao.style.display = 'none';
      const stalker = document.getElementById('feimaoStalker');
      if (stalker) stalker.style.display = 'none';
      const bloodBorder = document.querySelector('.san-zero-blood-border');
      if (bloodBorder) bloodBorder.style.display = 'none';
      const bloodDrip = document.querySelector('.blood-drip-layer');
      if (bloodDrip) bloodDrip.style.display = 'none';

      modal.style.top = '';
      modal.style.left = '';
      modal.style.width = '';
      modal.style.height = '';
      modal.scrollTop = 0;
      modal.classList.add('active');

      if (window.HorrorAudio) {
        if (endingType === 'D') {
          window.HorrorAudio.playFeimaoPurr();
        } else {
          window.HorrorAudio.playJumpscare();
        }
      }
    }
  }
}

window.MainController = new SanctuaryMainController();
