/**
 * Twilight Feimao Sanctuary - Staff Intranet Terminal & ARG Lore Engine
 */

class IntranetTerminal {
  constructor() {
    this.isLoggedIn = false;
    this.user = "GUEST";
    this.history = [];
    this.historyIndex = 0;
    
    this.fileSystem = {
      "README.txt": "【暮色伴侣动物安养所 - 内部终端说明】\n当前会话仅限员工授权访问。未授权访问将记录IP并通报保卫科。\n键入 'help' 查看可用指令集。\n键入 'login <用户名> <密码>' 提升权限。",
      "notice_1999.txt": "【全院紧急通告 1999-10-28】\n近期黄昏（17:30-18:45）期间，严禁任何员工独自进入放养庭院。\n若目击天空中出现巨大悬浮猫形黑影，请立即低头并重复念诵《安神规程》，切勿拍照或呼喊。",
      "memo_director.txt": "【院长私密备忘录】\n神藤院长批注：领养手续只是幌子。肥猫所需要的从来不是食物，而是‘对视’时的生机剥离。\n只要每月按时送入12只样本，本院的庇护契约就能延续。\n保险柜密码提示：声谱分析仪中的隐藏频率就是密钥2。",
      "specimen_00.dat": "【特异实体档案：Specimen-00「肥猫 / Feimao」】\n发现地：群马县暮岳村后山裂谷（1998年11月）。\n形态特征：高约2.4米至无穷大的全黑轮廓，头部具粉色晕斑与闭口谜之微笑。\n生理特征：无内脏、无骨骼、无质量（0.00kg）。悬浮于地面0.5至30米。\n异常效应：任何与其对视超过3秒的哺乳动物，其发声器官将退化为猫科呼噜声，并自发走向B2焚化间。",
      "incident_b2.log": "【地下二层事故记录 1999-10-31 03:33】\n夜班巡检员高桥未按规定佩戴遮光镜，在配餐冷库直接目击了进食过程。\n高桥的衣物在焚化炉前被发现，体内未提取出人类DNA，唯有黑色猫毛若干。\n[系统已锁定：需管理员权限解锁冷库门]"
    };

    this.init();
  }

  init() {
    const input = document.getElementById('terminalInput');
    const modal = document.getElementById('terminalModal');
    const closeBtn = document.getElementById('btnTerminalClose');
    const openBtn = document.getElementById('btnOpenIntranet');

    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          input.value = '';
          if (cmd) {
            this.handleCommand(cmd);
          }
        }
      });
    }
  }

  open() {
    const modal = document.getElementById('terminalModal');
    if (modal) {
      modal.classList.add('active');
      document.getElementById('terminalInput').focus();
      if (window.HorrorAudio) window.HorrorAudio.playClick();
    }
  }

  close() {
    const modal = document.getElementById('terminalModal');
    if (modal) modal.classList.remove('active');
  }

  print(text, isError = false) {
    const output = document.getElementById('terminalOutput');
    if (!output) return;
    const line = document.createElement('div');
    line.className = isError ? 'term-line error' : 'term-line';
    if (isError) line.style.color = '#ff4444';
    line.textContent = text;
    output.appendChild(line);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
  }

  handleCommand(rawCmd) {
    this.print(`[${this.user}@SANCTUARY-TERMINAL ~]$ ${rawCmd}`);
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        this.print(
          "可用指令系统：\n" +
          "  ls / dir              - 列出当前目录下的文件与记录\n" +
          "  cat <文件名>           - 读取指定机密文件内容\n" +
          "  login <账号> <密码>    - 登录内部管理员账号\n" +
          "  search <关键词>        - 检索全院实验与监控记录\n" +
          "  keys                  - 查看当前已搜集的绝密密钥\n" +
          "  feimao                - 与收容实体建立直连通信（危险）\n" +
          "  ending_protocol       - 执行破晓脱出协议（需集齐4枚密钥）\n" +
          "  clear                 - 清除屏幕"
        );
        break;

      case 'ls':
      case 'dir':
        let fileList = Object.keys(this.fileSystem).join("    ");
        this.print(fileList);
        break;

      case 'cat':
        if (!arg) {
          this.print("用法: cat <文件名>", true);
        } else if (this.fileSystem[arg]) {
          this.print(this.fileSystem[arg]);
          if (window.Corruption) {
            window.Corruption.addCorruption(5, `Read ${arg}`);
          }
          if (window.CCTV) {
            if (arg === 'memo_director.txt') window.CCTV.grantClue('office');
            else if (arg === 'notice_1999.txt') window.CCTV.grantClue('courtyard');
            else if (arg === 'incident_b2.log') window.CCTV.grantClue('incinerator');
          }
        } else {
          this.print(`错误: 文件 '${arg}' 不存在或无读取权限。`, true);
        }
        break;

      case 'login':
        const [username, password] = arg.split(' ');
        if (!username || !password) {
          this.print("用法: login <用户名> <密码>", true);
        } else if ((username === 'admin' || username === 'shindo') && (password === '19991031' || password === 'fatcat99')) {
          this.isLoggedIn = true;
          this.user = "DR_SHINDO_ADMIN";
          this.print(">>> 身份认证成功：神藤院长（最高安全等级）已登录！");
          this.print(">>> 已解锁绝密权限：获得 KEY-02 [院长信物]！");
          if (window.Corruption) {
            window.Corruption.addKey("KEY-02 [院长权限]", "掌握了神藤院长的权限凭证 [代码: FATCAT-OVERRIDE]");
          }
        } else {
          this.print("认证失败：用户名或密码错误。尝试记录已发送至监控日志。", true);
          if (window.Corruption) window.Corruption.drainSanity(5);
        }
        break;

      case 'keys':
        if (window.Corruption) {
          const keys = Array.from(window.Corruption.collectedKeys);
          if (keys.length === 0) {
            this.print("当前尚未收集到任何密钥。（提示：多探索CCTV监控、声谱仪、在线问卷与夜班喂食）");
          } else {
            this.print(`已收集密钥 (${keys.length}/4)：\n` + keys.join('\n'));
          }
        }
        break;

      case 'feimao':
      case '666':
      case '104':
      case 'horror':
        this.print(">>> 正在尝试向暮色苍穹发送低频探测讯号...");
        if (window.HorrorAudio) window.HorrorAudio.playFeimaoPurr();
        setTimeout(() => {
          this.print("................................................");
          this.print("【肥猫回应了你的呼唤】");
          this.print("‘你 找 到 我 了 吗 ？ 我 就 在 你 的 屏 幕 背 后 。’");
          if (window.Corruption) {
            window.Corruption.triggerJumpscare("它 在 凝 视 你", "assets/jumpscare_feimao.jpg", 2000);
            window.Corruption.addCorruption(20, "Contacted Feimao");
          }
        }, 800);
        break;

      case 'ending_protocol':
        if (window.Corruption && window.Corruption.collectedKeys.size >= 4) {
          this.print(">>> 验证通过：4 枚核心密钥均已确认！");
          this.print(">>> 正在启动【暮色破晓与全域净化协议】...");
          setTimeout(() => {
            this.close();
            if (window.MainController) {
              window.MainController.triggerEnding('D');
            }
          }, 2000);
        } else {
          this.print("错误：核心密钥不足 4 枚，无法执行破晓脱出协议！", true);
        }
        break;

      case 'ending':
      case 'end':
        const targetEnding = (arg || '').toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(targetEnding)) {
          this.print(`>>> 正在调取【结局 ${targetEnding}】历史结算记录...`);
          setTimeout(() => {
            this.close();
            if (window.MainController) window.MainController.triggerEnding(targetEnding);
          }, 600);
        } else {
          this.print("用法: ending <A|B|C|D> (例如: ending D)", true);
        }
        break;

      case 'clear':
        const output = document.getElementById('terminalOutput');
        if (output) output.innerHTML = '';
        break;

      default:
        this.print(`未知指令: '${cmd}'。键入 'help' 获取帮助。`, true);
        break;
    }
  }
}

window.Terminal = new IntranetTerminal();
