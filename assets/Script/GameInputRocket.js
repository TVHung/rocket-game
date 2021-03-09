cc.Class({
    extends: cc.Component,

    properties: {
        //---------------------------------------------------------------------------------------
        //screens
        //---------------------------------------------------------------------------------------
        screen1: {
            default: null,
            type: cc.Node,
        },
        screen2: {
            default: null,
            type: cc.Node,
        },
        //---------------------------------------------------------------------------------------
        //options
        //---------------------------------------------------------------------------------------
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

        //---------------------------------------------------------------------------------------
        //value option
        //---------------------------------------------------------------------------------------
        //value option cong
        valueOptionCong: {
            default: null,
            type: cc.Node,
        },
        valueOptionBangCongVoi: {
            default: null,
            type: cc.Node,
        },
        valueOptionCongTrongPhamVi: {
            default: null,
            type: cc.Node,
        },
        //---------------------------------------
        //value option tru
        //---------------------------------------
        valueOptionTru: {
            default: null,
            type: cc.Node,
        },
        valueOptionBangTruVoi: {
            default: null,
            type: cc.Node,
        },
        valueOptionTruTrongPhamVi: {
            default: null,
            type: cc.Node,
        },

        //---------------------------------------
        //value option nhan
        //---------------------------------------
        valueOptionNhan: {
            default: null,
            type: cc.Node,
        },
        valueOptionBangCuuChuongNhan: {
            default: null,
            type: cc.Node,
        },

        //---------------------------------------
        //value option chia
        //---------------------------------------
        valueOptionChia: {
            default: null,
            type: cc.Node,
        },
        valueOptionBangCuuChuongChia: {
            default: null,
            type: cc.Node,
        },

        //---------------------------------------
        //value option lon nho bang
        //---------------------------------------
        valueOptionLonNhoBang: {
            default: null,
            type: cc.Node,
        },
        valueOptionPhamViSoSanh: {
            default: null,
            type: cc.Node,
        },

        //---------------------------------------
        //value option tong hop
        //---------------------------------------
        valueOptionTongHop: {
            default: null,
            type: cc.Node,
        },
        valueOptionPhamViTongHop: {
            default: null,
            type: cc.Node,
        },

        valueLabel: {
            default: null,
            type: cc.Label,
        },
        tableResume: {
            //bang tam dung
            default: null,
            type: cc.Node,
        },
        _valueInput: "",
        _direction: false,
        _typeCaculator: 0, //1: cong, 2: tru, 3: nhan, 4: nhan, 5: lon nho, 6: tong hop
        _typeValue: 0, //các kiểu bài học (tùy thuộc vào số lượng, bắt đầu tư 0)
    },

    onLoad() {
        cc.debug.setDisplayStats(false);
        // this.node.getComponent("SoundManagerGameRocket").playBackGroundSound();

        window.width = cc.view._designResolutionSize.width;
        window.height = cc.view._designResolutionSize.height;

        this.screen1.active = true;
        this.screen2.active = false;

        this.node.getComponent("SoundManagerGameRocket").playBackMenuSound();
    },

    //---------------------------------------------------------------------------------------
    //xu ly hien, an cac components
    //---------------------------------------------------------------------------------------
    hideScreen1ShowScreen2(s1, s2) {
        this.screen1.active = s1;
        this.screen2.active = s2;
    },
    //chon loai option se duoc hien thi
    hideShowOption(
        optionCong,
        optionTru,
        optionNhan,
        optionChia,
        optionLonNhoBang,
        optionTongHop
    ) {
        this.optionCong.active = optionCong;
        this.optionTru.active = optionTru;
        this.optionNhan.active = optionNhan;
        this.optionChia.active = optionChia;
        this.optionLonNhoBang.active = optionLonNhoBang;
        this.optionTongHop.active = optionTongHop;
    },

    hideAllValue() {
        this.valueOptionCong.active = false;
        this.valueOptionTru.active = false;
        this.valueOptionNhan.active = false;
        this.valueOptionChia.active = false;
        this.valueOptionLonNhoBang.active = false;
        this.valueOptionTongHop.active = false;
    },

    //chon loai value cua option cong
    hideShowValueOptionCong(
        valueOptionBangCongVoi,
        valueOptionCongTrongPhamVi
    ) {
        this.valueOptionCong.active = true;
        this.valueOptionBangCongVoi.active = valueOptionBangCongVoi;
        this.valueOptionCongTrongPhamVi.active = valueOptionCongTrongPhamVi;
    },

    //chon loai value cua option tru
    hideShowValueOptionTru(valueOptionBangTruVoi, valueOptionTruTrongPhamVi) {
        this.valueOptionTru.active = true;
        this.valueOptionBangTruVoi.active = valueOptionBangTruVoi;
        this.valueOptionTruTrongPhamVi.active = valueOptionTruTrongPhamVi;
    },

    //chon loai value cua option nhan
    hideShowValueOptionNhan(valueOptionBangCuuChuongNhan) {
        this.valueOptionNhan.active = true;
        this.valueOptionBangCuuChuongNhan.active = valueOptionBangCuuChuongNhan;
    },

    //chon loai value cua option chia
    hideShowValueOptionChia(valueOptionBangCuuChuongChia) {
        this.valueOptionChia.active = true;
        this.valueOptionBangCuuChuongChia.active = valueOptionBangCuuChuongChia;
    },

    hideShowValueSoSanh(valueOptionPhamViSoSanh) {
        this.valueOptionLonNhoBang.active = true;
        this.valueOptionPhamViSoSanh.active = valueOptionPhamViSoSanh;
    },

    hideShowValueTongHop(valueOptionPhamViTongHop) {
        this.valueOptionTongHop.active = true;
        this.valueOptionPhamViTongHop.active = valueOptionPhamViTongHop;
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic cong
    //---------------------------------------------------------------------------------------
    onClickCong() {
        this._typeCaculator = 1;
        this.valueLabel.string = "Hãy chọn bảng phép cộng";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(true, false, false, false, false, false);
        this.hideAllValue();
        this.onClickSound();
    },
    onClickOptionBangCongVoi() {
        this.hideShowValueOptionCong(true, false);
        this.onClickSound();
        this._typeValue = 0; //Loai phep cong voi so x
    },
    onClickOptionCongTrongPhamVi() {
        this.hideShowValueOptionCong(false, true);
        this.onClickSound();
        this._typeValue = 1; //loai phep cong trong pham vi
    },
    //ham xu ly khi nhan vao gia tri choi
    onClickValueCong(event, customEventData) {
        customEventData = parseInt(customEventData);
        const dataCong = {
            type: this._typeCaculator,
            typeValue: this._typeValue,
            num: customEventData,
            option: this._typeValue, //kieu phep cong
        };
        window.localStorage.setItem("data", JSON.stringify(dataCong));
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        cc.director.loadScene("GameRocket");
        this.onClickSound();
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic tru
    //---------------------------------------------------------------------------------------
    onClickTru() {
        this._typeCaculator = 2;
        this.valueLabel.string = "Hãy chọn bảng phép trừ";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(false, true, false, false, false, false);
        this.hideAllValue();
        this.onClickSound();
    },
    onClickOptionBangTruVoi() {
        this.hideShowValueOptionCong(true, false);
        this.onClickSound();
    },
    onClickOptionTruTrongPhamVi() {
        this.hideShowValueOptionCong(false, true);
        this.onClickSound();
    },
    //ham xu ly khi nhan vao gia tri choi
    onClickValueTru() {},

    //---------------------------------------------------------------------------------------
    //xu ly logic nhan
    //---------------------------------------------------------------------------------------
    onClickNhan() {
        this._typeCaculator = 3;
        this.valueLabel.string = "Hãy chọn bảng phép nhân";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(false, false, true, false, false, false); //hien option nhan, nhung hien tai chi co bang cuu chuong
        this.hideAllValue();
        this.onClickSound();
    },

    onClickOptionBangCuuChuongNhan() {
        this.hideShowValueOptionNhan(true);
        this.onClickSound();
    },

    onClickValueNhan(event, customEventData) {
        //lay du lieu
        customEventData = parseInt(customEventData);
        const dataNhan = {
            type: this._typeCaculator,
            num: customEventData,
            option: this._typeValue,
        };

        window.localStorage.setItem("data", JSON.stringify(dataNhan));
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        cc.director.loadScene("GameRocket");
        this.onClickSound();
    },

    //---------------------------------------------------------------------------------------
    //xu ly logic chia
    //---------------------------------------------------------------------------------------
    onClickChia() {
        this._typeCaculator = 4;
        this.valueLabel.string = "Hãy chọn bảng phép chia";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(false, false, false, true, false, false);
        this.hideAllValue();
        this.onClickSound();
    },

    onClickOptionBangCuuChuongChia() {
        this.hideShowValueOptionChia(true);
        this.onClickSound();
    },

    onClickValueChia(event, customEventData) {
        //lay du lieu
        customEventData = parseInt(customEventData);
        const dataChia = {
            type: this._typeCaculator,
            num: customEventData,
            option: this._typeValue,
        };

        window.localStorage.setItem("data", JSON.stringify(dataChia));
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        cc.director.loadScene("GameRocket");
        this.onClickSound();
    },

    //---------------------------------------------------------------------------------------
    //xu ly so sanh
    //---------------------------------------------------------------------------------------
    onClickLonNho() {
        this._typeCaculator = 5;
        this.valueLabel.string = "Hãy chọn bảng giá trị";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(false, false, false, false, true, false);
        this.hideAllValue();
        this.onClickSound();
    },
    onClickOptionPhamViSoSanh() {
        this.hideShowValueSoSanh(true);
        this.onClickSound();
    },
    //ham xu ly khi nhan vao gia tri choi
    onClickValueSoSanh() {},

    //---------------------------------------------------------------------------------------
    //xu ly tong hop
    //---------------------------------------------------------------------------------------
    onClickTongHop() {
        this._typeCaculator = 6;
        this.valueLabel.string = "Hãy chọn giá trị";
        this.hideScreen1ShowScreen2(false, true);
        this.hideShowOption(false, false, false, false, false, true);
        this.hideAllValue();
        this.onClickSound();
    },
    onClickOptionPhamViTongHop() {
        this.hideShowValueTongHop(true);
        this.onClickSound();
    },
    //ham xu ly khi nhan vao gia tri choi
    onClickValueTongHop() {},

    //---------------------------------------------------------------------------------------

    onClickBack() {
        this.hideScreen1ShowScreen2(true, false);
        //hide all option value
        this.hideShowOption(false, false, false, false, false, false);
        this.hideAllValue();

        // cc.director.loadScene("MainGame");
        this.onClickSound();
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
        // cc.director.pause();
        //chuyen sang man hinh ngoai
    },

    onClickResume() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        cc.director.resume();
        this.tableResume.active = false;
    },

    onClickSound() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
    },

    update(dt) {},
});
