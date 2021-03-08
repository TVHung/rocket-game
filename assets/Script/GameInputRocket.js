cc.Class({
    extends: cc.Component,

    properties: {
        //screens
        screen1: {
            default: null,
            type: cc.Node,
        },
        screen2: {
            default: null,
            type: cc.Node,
        },

        //options
        optionCong: {
            default: null,
            type: cc.Node,
        },
        optionTru: {
            default: null,
            type: cc.Node,
        },
        optionNhan: {
            default: null,
            type: cc.Node,
        },
        optionChia: {
            default: null,
            type: cc.Node,
        },
        optionLonNhoBang: {
            default: null,
            type: cc.Node,
        },
        optionTongHop: {
            default: null,
            type: cc.Node,
        },

        //value option
        valueOptionCong: {
            default: null,
            type: cc.Node,
        },
        valueOptionTru: {
            default: null,
            type: cc.Node,
        },
        valueOptionNhan: {
            default: null,
            type: cc.Node,
        },
        valueOptionChia: {
            default: null,
            type: cc.Node,
        },
        valueOptionLonNhoBang: {
            default: null,
            type: cc.Node,
        },
        valueOptionTongHop: {
            default: null,
            type: cc.Node,
        },

        tableResume: {
            //bang tam dung
            default: null,
            type: cc.Node,
        },
        _valueInput: "",
        _direction: false,
        _typeCaculator: 0, //1: cong, 2: tru, 3: nhan, 4: nhan, 5: lon nho, 6: tong hop
    },

    onLoad() {
        cc.debug.setDisplayStats(false);
        // this.node.getComponent("SoundManagerGameRocket").playBackGroundSound();

        window.width = cc.view._designResolutionSize.width;
        window.height = cc.view._designResolutionSize.height;

        this.screen1.active = true;
        this.screen2.active = false;
    },

    hideScreen1ShowScreen2(s1, s2) {
        this.screen1.active = s1;
        this.screen2.active = s2;
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic cong
    //---------------------------------------------------------------------------------------
    onClickCong() {
        this.hideScreen1ShowScreen2(false, true);
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic tru
    //---------------------------------------------------------------------------------------
    onClickTru() {
        this.hideScreen1ShowScreen2(false, true);
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic nhan
    //---------------------------------------------------------------------------------------
    onClickNhan() {
        this._typeCaculator = 3;
        this.hideScreen1ShowScreen2(false, true);
        this.valueOptionNhan.active = true;
    },
    onClickValueNhan(event, customEventData) {
        //lay du lieu
        customEventData = parseInt(customEventData);
        const dataNhan = {
            type: this._typeCaculator,
            num: customEventData,
            option: null,
        };

        window.localStorage.setItem("data", JSON.stringify(dataNhan));
        cc.director.loadScene("GameRocket");
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic chia
    //---------------------------------------------------------------------------------------
    onClickChia() {
        this._typeCaculator = 4;
        this.hideScreen1ShowScreen2(false, true);
        this.valueOptionChia.active = true;
    },
    onClickValueChia(event, customEventData) {
        //lay du lieu
        customEventData = parseInt(customEventData);
        const dataChia = {
            type: this._typeCaculator,
            num: customEventData,
            option: null,
        };

        window.localStorage.setItem("data", JSON.stringify(dataChia));
        cc.director.loadScene("GameRocket");
    },

    //---------------------------------------------------------------------------------------
    //xu ly so sanh
    //---------------------------------------------------------------------------------------
    onClickLonNho() {
        this.hideScreen1ShowScreen2(false, true);
    },

    //---------------------------------------------------------------------------------------
    //xu ly tong hop
    //---------------------------------------------------------------------------------------
    onClickTongHop() {
        this.hideScreen1ShowScreen2(false, true);
    },

    onClickBack() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        this.hideScreen1ShowScreen2(true, false);
        // cc.director.loadScene("MainGame");
    },

    onClickReplay() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        cc.director.resume();
        cc.director.loadScene("GameRocket");
    },

    onclickHomeInBackGround() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        this.tableResume.active = true;
        cc.director.pause();
    },

    onClickResume() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        cc.director.resume();
        this.tableResume.active = false;
    },

    update(dt) {},
});
