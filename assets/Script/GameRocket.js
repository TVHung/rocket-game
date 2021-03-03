cc.Class({
  extends: cc.Component,

  properties: {
    rocket: {
      default: null,
      type: cc.Node,
    },

    readyLabel: {
      default: null,
      type: cc.Label,
    },

    countDown: {
      //dem nguoc
      default: null,
      type: cc.Prefab,
    },
    icon: {
      //icon
      default: null,
      type: cc.SpriteAtlas,
    },
    character: {
      //nhan vat dong hanh
      default: null,
      type: cc.Node,
    },
    score: {
      //diem
      default: null,
      type: cc.Label,
    },

    tableResult: {
      //bang ket qua
      default: null,
      type: cc.Node,
    },
    scoreTable: {
      //bang diem
      default: null,
      type: cc.Label,
    },
    tableResume: {
      //bang tam dung
      default: null,
      type: cc.Node,
    },

    _gameStart: false,
  },

  start() {
    setTimeout(() => {
      // this.node.getComponent("SoundManager").playBackGroundSound();
    }, 2500);
  },

  onLoad() {
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    cc.debug.setDisplayStats(false);

    this.rocket.on(cc.Node.EventType.TOUCH_START, this.RocketStart, this); //chạm vào rocket để bắt đầu game
    this.readyLabel.node.getComponent(cc.Animation).play("readyAni");
    console.log(this.readyLabel);
  },

  RocketStart() {
    this._gameStart = true;
    console.log("Bat dau game");
    this.readyLabel.node.active = false; //ẩn text
    this.rocket.getChildByName("power").active = true; //năng lượng hiển thị
    this.rocket //chạy animation
      .getChildByName("power")
      .getComponent(cc.Animation)
      .play("powerAni");

    this.rocket.getComponent(cc.Animation).play("upAni");
  },

  startTimeRoller() {
    //hàm đếm ngược
    var times = 3;
    this.schedule(
      () => {
        if (times !== 0) {
          if (!this.countDownNode) {
            this.countDownNode = cc.instantiate(this.countDown);
            this.node.addChild(this.countDownNode);
            this.countDownNode.parent = this.wheelParent;
          }
          this.countDownNode.getChildByName("Sp Num").opacity = 255;
          this.countDownNode.getChildByName("Nodes start").opacity = 0;
          let spriteFrameName = "num_" + times;
          this.countDownNode
            .getChildByName("Sp Num")
            .getComponent(cc.Sprite).spriteFrame = this.icon.getSpriteFrame(
            spriteFrameName
          );
          this.node
            .getComponent("SoundManager")
            .playEffectSound("second", false);
        } else {
          this.countDownNode.getChildByName("Sp Num").opacity = 0;
          this.countDownNode.getChildByName("Nodes start").opacity = 255;
          this.countDownNode.runAction(cc.fadeOut(1));
          this.node
            .getComponent("SoundManager")
            .playEffectSound("begin", false);
          this.schedule(this.countDownScheduleCallBack);
        }
        times--;
      },
      1,
      3
    );
  },

  countDownScheduleCallBack() {
    //các thông số qua các level khác nhau
  },

  onFinishGameEvent() {
    //kết thúc game
  },

  onClickBack() {
    // cc.director.loadScene("MainGame");
  },

  onClickReplay() {
    cc.director.resume();
    cc.director.loadScene("");
  },

  onclickHomeInBackGround() {
    this.tableResume.active = true;
    cc.director.pause();
  },

  onClickResume() {
    cc.director.resume();
    this.tableResume.active = false;
  },

  update(dt) {},
});
