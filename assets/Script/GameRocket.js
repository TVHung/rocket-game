cc.Class({
    extends: cc.Component,

    properties: {
        rocket: {
            default: null,
            type: cc.Node,
        },
        //thiếu aniamtion đứng yên nên cần tạo 1 hình khác để khi bắt đầu chưa phóng lửa
        rocketOnTouch: {
            default: null,
            type: cc.Node,
        },
        questionBox: {
            default: null,
            type: cc.Node,
        },
        questionText: {
            default: null,
            type: cc.Label,
        },
        resultTextA: {
            default: null,
            type: cc.Label,
        },
        resultTextB: {
            default: null,
            type: cc.Label,
        },
        resultTextC: {
            default: null,
            type: cc.Label,
        },
        BtnA: {
            default: null,
            type: cc.Button,
        },
        BtnB: {
            default: null,
            type: cc.Button,
        },
        BtnC: {
            default: null,
            type: cc.Button,
        },
        readyLabel: {
            default: null,
            type: cc.Label,
        },
        background1: {
            default: null,
            type: cc.Sprite,
        },
        background2: {
            default: null,
            type: cc.Sprite,
        },
        nofiTable: {
            default: null,
            type: cc.Node,
        },
        nofiChangePlanet: {
            default: null,
            type: cc.Label,
        },
        layerColor: {
            default: null,
            type: cc.Node,
        },
        planet: {
            default: null,
            type: cc.Sprite,
        },
        namePlanet: {
            default: null,
            type: cc.Label,
        },
        planetAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        starDrop: {
            default: null,
            type: cc.Node,
        },
        earth: {
            default: null,
            type: cc.Sprite,
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
        heartTimesLabel: {
            default: null,
            type: cc.Label,
        },

        _gameStart: false, //state game
        _runBackground: false,
        _numCurrentQuestion: 0, //so cau hoi da tra loi
        _numTrueQuestion: 0, //so cau tra loi dung hien tai
        numOfQuestion: 0, //số lượng câu hỏi (input)
        numOfQuestionNextPlanet: 0, //số lượng câu hỏi thì sẽ đến hành tinh mới
        _trueResult: 0, //Kết quả đúng
        _valueLimit: 10, //giới hạn số sẽ được học tới
        _gravitation: 5000, //trọng lực sẽ quyết định tốc độ rơi nhanh hay chậm
        _dropRocket: false,
        _typeFly: false, //change type fly
        _flyUp: true, //bay len hay xuong
        _flyRight: true, // bay sang trai hay phai
        _win: false,
        _gameOver: false,
        _backgroundWidth: 0, //kich thuoc background
        _backgroundHeight: 0,
        _indexPlanet: 0, //thu tu cac hanh tinh se duoc goi
        _speedBackground: 1,
        _speedDrop: 2,
        _choiced: 0,
        _khoangCach: 74,
        _khoangCach1Cau: 0,
        _heart: 10,
        _checkGiamHeart: 0, // kiem tra khi nao thi moi la luc giam tro giup = 0 thi moi chay
        _typeQuestionSoSanh: 0, //loai cau hoi so sanh
        _rightAnswer: true, // trả lời đúng hay sai

        //data
        _typeCaculator: 0,
        _numValue: 0,
        _typeOption: null,
    },

    onLoad() {
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.debug.setDisplayStats(false);

        this._valueLimit = parseInt(window.localStorage.getItem("valueInput"));
        console.log(this._valueLimit);

        const data = JSON.parse(window.localStorage.getItem("data"));
        this._typeCaculator = parseInt(data.type);
        this._numValue = parseInt(data.num);
        this._typeOption = parseInt(data.option);

        this.questionBox.active = false;
        this.nofiChangePlanet.active = false;
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("loinoidau", false);

        this._backgroundWidth = this.background2.node.getContentSize().width;
        this._backgroundHeight = this.background2.node.getContentSize().height;
        this.background1.node.setPosition(0, 0);
        this.background2.node.setPosition(0, this._backgroundHeight);

        window.width = cc.view._designResolutionSize.width;
        window.height = cc.view._designResolutionSize.height;

        this._khoangCach1Cau = this._khoangCach / this.numOfQuestion;
        console.log(this._khoangCach1Cau);

        window.arrNamePlanet = new Array(
            "Sao Thổ",
            "Mặt Trăng",
            "Sao Kim",
            "Sao Thiên Vương",
            "Sao Hỏa",
            "Sao Diêm Vương",
            "Sao Thủy",
            "Mặt Trời",
            "Sao Mộc",
            "Trái Đất"
        ); //ten cac hanh tinh

        window.arrNamePlanetImg = new Array(
            "saotho",
            "mattrang",
            "saokim",
            "saothienvuong",
            "saohoa",
            "saodiemvuong",
            "saothuy",
            "mattroi",
            "saomoc",
            "traidat"
        ); //ten cac hanh tinh

        window.arrPickerColor = new Array(
            { r: 155, g: 73, b: 13 },
            { r: 150, g: 150, b: 150 },
            { r: 99, g: 64, b: 18 },
            { r: 0, g: 68, b: 160 },
            { r: 158, g: 29, b: 0 },
            { r: 169, g: 75, b: 10 },
            { r: 0, g: 196, b: 255 },
            { r: 250, g: 128, b: 6 },
            { r: 255, g: 180, b: 0 },
            { r: 1, g: 51, b: 220 }
        ); //mang ma mau

        this.rocket.active = false;
        this.rocketOnTouch.on(
            cc.Node.EventType.TOUCH_START,
            this.RocketStart,
            this
        ); //chạm vào rocket để bắt đầu game
        this.readyLabel.node.getComponent(cc.Animation).play("readyAni");
        this._heart = 10;
    },

    //start game
    RocketStart() {
        if (this._gameStart === false && this._gameOver === false) {
            this.node
                .getComponent("SoundManagerGameRocket")
                .playBackGroundSound();
            this.readyLabel.node.active = false; //ẩn text
            this.earth.getComponent(cc.Animation).play("earthAni");

            setTimeout(() => {
                this.callCreateQuestion();
            }, 2000);
            console.log("Cham start");
            this._runBackground = true;
            this.rocket.active = true;
            this.rocketOnTouch.active = false;
        }
        if (this._gameOver === false) {
            this._gameStart = true;
        }
        console.log("cham");
        console.log(window.arrNamePlanet);
    },

    // create question data
    generateRandomCalculations(valueLimit) {
        //hàm sinh ngẫu nhiên câu hỏi và câu trả lời
        //random phep tinh

        console.log("Chon dung khong: " + this._rightAnswer);
        var typeCal = this._typeCaculator;
        var num1,
            num2,
            result,
            hchuc1,
            hchuc2,
            hchucSum,
            hdonvi1,
            hdonvi2,
            hdonviSum;
        var stateReturn = false; //trang thai phep tinh co thoa man
        if (this._rightAnswer === true) {
            if (typeCal === 1) {
                //phep cong
                if (this._typeOption === 0) {
                    //xu ly cong voi
                    var posNum = Math.floor(Math.random() * 2); //random vi tri so _numValue xuat hien
                    if (posNum === 0) {
                        num1 = this._numValue;
                        num2 =
                            Math.floor(Math.random() * (10 - this._numValue)) +
                            1;
                    } else {
                        num1 =
                            Math.floor(Math.random() * (10 - this._numValue)) +
                            1;
                        num2 = this._numValue;
                    }
                    result = num1 + num2;
                } else {
                    //xu ly cong trong pham vi
                    this._valueLimit = this._numValue;
                    while (stateReturn === false) {
                        num1 = Math.floor(
                            Math.random() * (this._valueLimit + 1)
                        );
                        num2 = Math.floor(
                            Math.random() * (this._valueLimit + 1)
                        );

                        hchuc1 = num1 / 10;
                        hdonvi1 = num1 % 10;
                        hchuc2 = num2 / 10;
                        hdonvi2 = num2 % 10;
                        hchucSum = hchuc1 + hchuc2;
                        hdonviSum = hdonvi1 + hdonvi2;
                        result = num1 + num2;
                        if (
                            result <= valueLimit &&
                            hchucSum < 10 &&
                            hdonviSum < 10
                        ) {
                            stateReturn = true;
                        }
                    }
                }
                // console.log(num1 + num2);
            } else if (typeCal === 2) {
                //phep tru
                if (this._typeOption === 0) {
                    //xu ly cong voi
                    num1 = this._numValue;
                    num2 = Math.floor(Math.random() * this._numValue) + 1;
                    result = num1 - num2;
                } else {
                    //xu ly cong trong pham vi
                    this._valueLimit = this._numValue;
                    while (stateReturn === false) {
                        num1 = Math.floor(
                            Math.random() * (this._valueLimit + 1)
                        );
                        num2 = Math.floor(
                            Math.random() * (this._valueLimit + 1)
                        );

                        hchuc1 = num1 / 10;
                        hdonvi1 = num1 % 10;
                        hchuc2 = num2 / 10;
                        hdonvi2 = num2 % 10;

                        //kiem tra chia het
                        if (
                            num1 >= num2 &&
                            hchuc1 >= hchuc2 &&
                            hdonvi1 >= hdonvi2
                        ) {
                            result = num1 - num2;
                            if (result <= valueLimit) {
                                stateReturn = true;
                            }
                        }
                    }
                }
            } else if (typeCal === 3) {
                //phep nhan

                //theo gioi han
                // while (stateReturn === false) {
                //     num1 = Math.floor(Math.random() * (this._valueLimit + 1));
                //     num2 = Math.floor(Math.random() * (this._valueLimit + 1));
                //     result = num1 * num2;
                //     if (result <= valueLimit) {
                //         stateReturn = true;
                //     }
                // }

                //bang cuu chuong
                num1 = this._numValue;
                num2 = Math.floor(Math.random() * 10) + 1;
                result = num1 * num2;
            } else if (typeCal === 4) {
                //phep chia
                // while (stateReturn === false) {
                //     num1 = Math.floor(Math.random() * (this._valueLimit + 1));
                //     num2 = Math.floor(Math.random() * this._valueLimit) + 1;
                //     //kiem tra chia het
                //     if (num1 % num2 === 0) {
                //         result = num1 / num2;
                //         if (result <= valueLimit) {
                //             stateReturn = true;
                //         }
                //     }
                // }

                num1 = (Math.floor(Math.random() * 10) + 1) * this._numValue;
                num2 = this._numValue;
                result = num1 / num2;
            } else if (typeCal === 5) {
                //so sanh
                if (this._numValue > 3) {
                    var posNum = Math.floor(Math.random() * 2); //random vi tri so _numValue xuat hien
                } else {
                    var posNum = Math.floor(Math.random() * 3); //random vi tri so _numValue xuat hien
                }
                this._typeQuestionSoSanh = posNum; //loai cau hoi so sanh
                if (posNum === 0) {
                    //dạng 1: Chọn đáp án đúng hoặc sai, 5 > 3??
                    num1 = Math.floor(Math.random() * this._numValue) + 1; //chon bua 2 so bat ki trong khoang gia tri
                    num2 = Math.floor(Math.random() * this._numValue) + 1;
                    //result de xac dinh dap an dung cho phep tinh
                    if (num1 > num2) {
                        result = 0;
                    } else if (num2 > num1) {
                        result = 1;
                    } else {
                        result = 2;
                    }
                } else if (posNum === 1) {
                    //dạng 2: điền dấu > < = , vd 5 ? 4
                    num1 = Math.floor(Math.random() * this._numValue) + 1;
                    num2 = Math.floor(Math.random() * this._numValue) + 1;
                    if (num1 > num2) {
                        result = 1;
                    } else if (num1 < num2) {
                        result = 2;
                    } else {
                        result = 3;
                    }
                } else {
                    //dạng 3 điền số trong khoảng, vd: 6 < ? < 9, dạng này đối với phạm vi 3 thì không sử dụng
                    while (stateReturn === false) {
                        num1 = Math.floor(Math.random() * this._numValue) + 1;
                        num2 = Math.floor(Math.random() * this._numValue) + 1;
                        //kiem tra chia het
                        var max, min;
                        if (num1 >= num2 + 2) {
                            max = num1 - 1;
                            min = num2 + 1;
                            result =
                                Math.floor(Math.random() * (max - min + 1)) +
                                min; //random trong khoang
                            stateReturn = true;
                        } else if (num1 + 2 <= num2) {
                            max = num2 - 1;
                            min = num1 + 1;
                            result =
                                Math.floor(Math.random() * (max - min + 1)) +
                                min; //random trong khoang
                            stateReturn = true;
                        } else {
                            stateReturn = false;
                        }
                    }
                }
            } else {
                //tong hop
            }
        }

        return [typeCal, num1, num2, result];
    },

    callCreateQuestion() {
        // this._numCurrentQuestion++;
        this.BtnA.node.getChildByName("BackgroundGreen").active = false;
        this.BtnA.node.getChildByName("BackgroundRed").active = false;
        this.BtnB.node.getChildByName("BackgroundGreen").active = false;
        this.BtnB.node.getChildByName("BackgroundRed").active = false;
        this.BtnC.node.getChildByName("BackgroundGreen").active = false;
        this.BtnC.node.getChildByName("BackgroundRed").active = false;
        this.CreateValueQuestion(this._valueLimit);
        if (this._gameStart === true) {
            this.questionBox.active = true;
        }
    },

    CreateValueQuestion(valueLimit) {
        //neu van tra loi sai thi khong sua lai cau hoi
        if (this._rightAnswer === true) {
            var arr = this.generateRandomCalculations(valueLimit); //[0] loai phep tinh, [1] num1, [2] num2. [3] ket qua dung
            var randomDau;
            var pheptinh = "";
            var pheptinh2 = "";
            var pheptinh3 = "";
            if (arr[0] === 1) {
                pheptinh = "+";
            } else if (arr[0] === 2) {
                pheptinh = "-";
            } else if (arr[0] === 3) {
                pheptinh = "x";
            } else if (arr[0] === 4) {
                pheptinh = ":";
            } else if (arr[0] === 5) {
                //xu ly chon phep tinh
                //xu ly ben duoi
            } else {
                //xu ly tong hop
            }

            //set cau hoi
            if (
                this._typeCaculator === 1 ||
                this._typeCaculator === 2 ||
                this._typeCaculator === 3 ||
                this._typeCaculator === 4
            ) {
                this.questionText.string =
                    arr[1] + " " + pheptinh + " " + arr[2] + " = ?";
            } else {
                //xu ly doi voi dang 1
                if (this._typeQuestionSoSanh === 0) {
                    randomDau = Math.floor(Math.random() * 3); //dap an chay tu 0 den 2
                    if (randomDau === 0) {
                        pheptinh = ">";
                    } else if (randomDau === 1) {
                        pheptinh = "<";
                    } else {
                        pheptinh = "=";
                    }
                    this.questionText.string =
                        arr[1] + " " + pheptinh + " " + arr[2] + " ?";
                } else if (this._typeQuestionSoSanh === 1) {
                    this.questionText.string =
                        arr[1] + " " + "?" + " " + arr[2];
                    if (arr[1] > arr[2]) {
                        pheptinh = ">";
                        pheptinh2 = "<";
                        pheptinh3 = "=";
                    } else if (arr[1] < arr[2]) {
                        pheptinh = "<";
                        pheptinh2 = ">";
                        pheptinh3 = "=";
                    } else {
                        pheptinh = "=";
                        pheptinh2 = "<";
                        pheptinh3 = ">";
                    }
                } else {
                    if (arr[1] > arr[2]) {
                        this.questionText.string =
                            arr[1] + " > " + "?" + " > " + arr[2];
                    } else {
                        this.questionText.string =
                            arr[1] + " < " + "?" + " < " + arr[2];
                    }
                }
            }

            //set dap an
            //random dap an dung
            var trueResult = Math.floor(Math.random() * 3) + 1;
            this._trueResult = trueResult;
            //random 2 dam an nhung can check truong hop dap an trung nhau
            var checkRandomResult = false;
            var randomresult1, randomresult2;
            if (this._typeCaculator != 5) {
                while (checkRandomResult === false) {
                    if (arr[3] > 2) {
                        randomresult1 =
                            Math.floor(Math.random() * arr[3]) +
                            Math.floor(arr[3] / 2);
                        randomresult2 =
                            Math.floor(Math.random() * arr[3]) +
                            Math.floor(arr[3] / 2);
                    } else {
                        randomresult1 = Math.floor(Math.random() * 10);
                        randomresult2 = Math.floor(Math.random() * 10);
                    }
                    //kiem tra neu trung nhau
                    if (
                        arr[3] != randomresult1 &&
                        arr[3] != randomresult2 &&
                        randomresult1 != randomresult2
                    ) {
                        checkRandomResult = true;
                    }
                }
                this.BtnC.node.active = true;
                if (trueResult === 1) {
                    this.resultTextA.string = "A. " + arr[3];
                    this.resultTextB.string = "B. " + randomresult1;
                    this.resultTextC.string = "C. " + randomresult2;
                } else if (trueResult === 2) {
                    this.resultTextB.string = "B. " + arr[3];
                    this.resultTextA.string = "A. " + randomresult1;
                    this.resultTextC.string = "C. " + randomresult2;
                } else {
                    this.resultTextC.string = "C. " + arr[3];
                    this.resultTextA.string = "A. " + randomresult1;
                    this.resultTextB.string = "B. " + randomresult2;
                }
            } else {
                //doi voi truong hop so sanh se xu ly cau tra loi se duoc in ra
                if (this._typeQuestionSoSanh === 0) {
                    if (randomDau === arr[3]) {
                        this._trueResult = 1;
                    } else {
                        this._trueResult = 2;
                    }
                    this.BtnC.node.active = false;
                    this.resultTextA.string = "A. Đúng";
                    this.resultTextB.string = "B. Sai";
                } else if (this._typeQuestionSoSanh === 1) {
                    this.BtnC.node.active = true;
                    if (trueResult === 1) {
                        this.resultTextA.string = "A. " + pheptinh;
                        this.resultTextB.string = "B. " + pheptinh2;
                        this.resultTextC.string = "C. " + pheptinh3;
                    } else if (trueResult === 2) {
                        this.resultTextB.string = "B. " + pheptinh;
                        this.resultTextA.string = "A. " + pheptinh2;
                        this.resultTextC.string = "C. " + pheptinh3;
                    } else {
                        this.resultTextC.string = "C. " + pheptinh;
                        this.resultTextA.string = "A. " + pheptinh2;
                        this.resultTextB.string = "B. " + pheptinh3;
                    }
                } else {
                    while (checkRandomResult === false) {
                        if (arr[1] > arr[2]) {
                            randomresult1 =
                                Math.floor(Math.random() * 10) + arr[1];
                            randomresult2 = Math.floor(Math.random() * arr[2]);
                        } else {
                            randomresult1 = Math.floor(Math.random() * arr[1]);
                            randomresult2 =
                                Math.floor(Math.random() * 10) + arr[2];
                        }
                        //kiem tra neu trung nhau
                        if (
                            arr[3] != randomresult1 &&
                            arr[3] != randomresult2 &&
                            randomresult1 != randomresult2
                        ) {
                            checkRandomResult = true;
                        }
                    }
                    this.BtnC.node.active = true;
                    if (trueResult === 1) {
                        this.resultTextA.string = "A. " + arr[3];
                        this.resultTextB.string = "B. " + randomresult1;
                        this.resultTextC.string = "C. " + randomresult2;
                    } else if (trueResult === 2) {
                        this.resultTextB.string = "B. " + arr[3];
                        this.resultTextA.string = "A. " + randomresult1;
                        this.resultTextC.string = "C. " + randomresult2;
                    } else {
                        this.resultTextC.string = "C. " + arr[3];
                        this.resultTextA.string = "A. " + randomresult1;
                        this.resultTextB.string = "B. " + randomresult2;
                    }
                }
            }
        }
    },

    // data change follow time
    repeatBackground() {
        this.background1.node.y -= this._speedBackground;
        this.background2.node.y -= this._speedBackground;
        if (this.background1.node.y >= -20 && this.background1.node.y <= 0) {
            this.background2.node.setPosition(0, window.height + 190);
        }
        if (this.background2.node.y >= -20 && this.background2.node.y <= 0) {
            this.background1.node.setPosition(0, window.height + 190);
        }
    },

    runAnimationPlanet(index) {
        var randomAni = Math.floor(Math.random() * 2) + 1;
        //get image planet
        this.planet.getComponent(
            cc.Sprite
        ).spriteFrame = this.planetAtlas.getSpriteFrame(
            window.arrNamePlanetImg[this._indexPlanet]
        );
        this.namePlanet.string = window.arrNamePlanet[index];
        if (randomAni === 1) {
            this.planet.getComponent(cc.Animation).play("planetAni1");
        } else {
            this.planet.getComponent(cc.Animation).play("planetAni2");
        }

        if (this._indexPlanet < 10 - 1) {
            this._indexPlanet++;
        }
    },

    effectOnClickButton(index, trueOrFalse, type) {
        // index la thu tu nut se chay, trueOrFalse do se la nut dung hay sai, type la loai chon hay loai goi y
        if (trueOrFalse === true) {
            if (index === 1) {
                this.BtnA.node.getChildByName("BackgroundGreen").active = true;
                this.BtnA.node.getChildByName("BackgroundRed").active = false;
                this.BtnA.node.getComponent(cc.Animation).play("buttonAni");
                // if (type === 2) {
                //     this.BtnA.node.getChildByName(
                //         "BackgroundGreen"
                //     ).active = false;
                // }
            } else if (index === 2) {
                this.BtnB.node.getChildByName("BackgroundGreen").active = true;
                this.BtnB.node.getChildByName("BackgroundRed").active = false;
                this.BtnB.node.getComponent(cc.Animation).play("buttonAni");
                // if (type === 2) {
                //     this.BtnB.node.getChildByName(
                //         "BackgroundGreen"
                //     ).active = false;
                // }
            } else {
                this.BtnC.node.getChildByName("BackgroundGreen").active = true;
                this.BtnC.node.getChildByName("BackgroundRed").active = false;
                this.BtnC.node.getComponent(cc.Animation).play("buttonAni");
                // if (type === 2) {
                //     this.BtnC.node.getChildByName(
                //         "BackgroundGreen"
                //     ).active = false;
                // }
            }
        } else {
            if (index === 1) {
                this.BtnA.node.getChildByName("BackgroundGreen").active = false;
                this.BtnA.node.getChildByName("BackgroundRed").active = true;
                this.BtnA.node.getComponent(cc.Animation).play("buttonAni");
            } else if (index === 2) {
                this.BtnB.node.getChildByName("BackgroundGreen").active = false;
                this.BtnB.node.getChildByName("BackgroundRed").active = true;
                this.BtnB.node.getComponent(cc.Animation).play("buttonAni");
            } else {
                this.BtnC.node.getChildByName("BackgroundGreen").active = false;
                this.BtnC.node.getChildByName("BackgroundRed").active = true;
                this.BtnC.node.getComponent(cc.Animation).play("buttonAni");
            }
        }
    },

    speedForLevel() {
        this._speedDrop = this._speedDrop * 1.15;
    },

    changeColorBackground(r, g, b) {
        // console.log(this.layerColor.color);
        this.layerColor.color = new cc.Color(r, g, r);
    },

    onRocketDie() {
        this._heart--;
        //run animation no tung

        //xu ly hoi sinh rocket
    },

    //on click button
    handleCheckResult(event, customEventData) {
        this._choiced++; //khong cho an nhieu lan
        customEventData = parseInt(customEventData); //dap an do nguoi choi chon
        if (this._choiced === 1) {
            if (
                customEventData == this._trueResult &&
                this._numCurrentQuestion < this.numOfQuestion
            ) {
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("trueClick", false);
                this._numCurrentQuestion++;
                if (
                    this._numCurrentQuestion % this.numOfQuestionNextPlanet ===
                    0
                ) {
                    this.nofiChangePlanet.active = true;
                    this.nofiChangePlanet.string =
                        window.arrNamePlanet[this._indexPlanet] +
                        "\n" +
                        "Lực hút: " +
                        Math.ceil(this._speedDrop) +
                        " Newton";
                    this.nofiTable //run animation
                        .getComponent(cc.Animation)
                        .play("nofiTableAni");

                    this.changeColorBackground(
                        window.arrPickerColor[this._indexPlanet].r,
                        window.arrPickerColor[this._indexPlanet].g,
                        window.arrPickerColor[this._indexPlanet].b
                    );
                    this.runAnimationPlanet(this._indexPlanet);
                    this.speedForLevel();
                }
                //xử lý rocket sẽ bay lên hay gì đó
                this._dropRocket = false; //khong roi nua ma bay len
                this._rightAnswer = true;
                //xu ly nhap nhay khi chon dung
                this.effectOnClickButton(customEventData, true, 1);
            } else {
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("wrongClick", false);

                //xu ly nhap nhay khi chon sai
                this.effectOnClickButton(customEventData, false, 1);
                this._rightAnswer = false;
                if (this._heart > 0) {
                    this._heart--;
                    this.heartTimesLabel.string = this._heart + "";
                }
            }

            setTimeout(() => {
                this.questionBox.active = false;
            }, 600);

            if (
                this._gameStart === true &&
                this._numCurrentQuestion < this.numOfQuestion
            ) {
                setTimeout(() => {
                    this.callCreateQuestion();
                    this._choiced = 0;
                }, 900);
            }
        }

        if (this._numCurrentQuestion >= this.numOfQuestion) {
            this._win = true;
            this.onFinishGameEvent();
        }
        console.log(this._numCurrentQuestion);
    },

    onClickBack() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        cc.director.loadScene("GameInput");
    },

    onClickReplay() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        cc.director.resume();
        cc.director.loadScene("GameRocket");
    },

    onclickHomeInBackGround() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        this.node.getComponent("SoundManagerGameRocket").pauseMusic();
        this.tableResume.active = true;
        cc.director.pause();
    },

    onClickResume() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
        // this.node.getComponent("SoundManagerGameRocket").resumeMusic();
        cc.director.resume();
        this.tableResume.active = false;
    },

    // goi y dap an khi gan chet
    suggestAnswer() {
        if (this._heart > 0) {
            this._heart--;
            this.heartTimesLabel.string = this._heart + "";
            //run animation nhap nhay
            this.effectOnClickButton(this._trueResult, true, 2);
        }
    },

    // on end game
    onFinishGameEvent() {
        //kết thúc game
        this._gameStart = false; //trang thai game false
        this._gameOver = true;
        this.questionBox.active = false;

        setTimeout(() => {
            var chinhPhuc = 0;
            if (this._win === true) {
                //thang
                chinhPhuc = this._khoangCach;
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("win", false);
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("hoanthanh", false);
                this.tableResult
                    .getChildByName("hanhTinhDungLai")
                    .getComponent(cc.Label).string = "Chiến Thắng";

                //bay ra khoi man hinh khi chien thang
                cc.tween(this.rocket)
                    .to(2, {
                        position: cc.v2(this.rocket.x, this.rocket.y + 2000),
                    })
                    .start();
                console.log("thang");
            } else {
                //thua
                chinhPhuc = Math.ceil(
                    this._khoangCach1Cau * this._numCurrentQuestion
                );
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("lose", false);
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("cancogang", false);
                this.tableResult
                    .getChildByName("hanhTinhDungLai")
                    .getComponent(cc.Label).string =
                    window.arrNamePlanet[this._indexPlanet];
            }
            var chinhPhuc = Math.ceil(
                this._khoangCach1Cau * this._numCurrentQuestion
            );
            this.tableResult
                .getChildByName("ChinhPhuc")
                .getComponent(cc.Label).string =
                "Chinh Phục: " + chinhPhuc + " tỷ km";
            this.tableResult
                .getChildByName("ThanhTuu")
                .getComponent(cc.Label).string =
                "Thành Tích: " + (this._indexPlanet + 1) + "/10";
            this.tableResult.getComponent(cc.Animation).play();
        }, 1000);
    },

    update(dt) {
        //repeat background
        if (this._runBackground === true) {
            this.repeatBackground();
        }
        //xử lý máy bay sẽ bị rơi dần dần xuống nếu không chọn đáp án đúng hoặc chọn sai
        if (this._dropRocket === true) {
            this._speedBackground = 1;
            if (this._flyUp === true) {
                this.rocket._components[0].animation = "nomal_fly";
                this.starDrop.active = false;
            }
            if (
                this.rocket.y < -(window.height / 2 - 400) &&
                this._checkGiamHeart === 0 &&
                this._heart > 0
            ) {
                this._checkGiamHeart++;
                this.suggestAnswer();
            }
            this._flyUp = false;
            //xu ly truong hop bay ngang
            if (this._flyRight === false) {
                this.rocket.x = this.rocket.x + 1;
                if (this.rocket.x > 150) {
                    this._flyRight = true;
                }
            } else {
                this.rocket.x = this.rocket.x - 1;
                if (this.rocket.x < -150) {
                    this._flyRight = false;
                }
            }

            this.rocket.y = this.rocket.y - this._speedDrop;
            if (this.rocket.y < -(window.height / 2 - 75)) {
                this._dropRocket = false;
                this._win = false;
                this.onFinishGameEvent();
            }
        } else if (this._gameStart === true && this._gameOver === false) {
            this._checkGiamHeart = 0;
            this._speedBackground = 10; //tăng tốc độ
            if (this._flyUp === false) {
                this.rocket._components[0].animation = "fast_fly";
            }
            this.starDrop.active = true;
            this._flyUp = true;

            if (this._flyRight === true) {
                this.rocket.x = this.rocket.x + 1;
                if (this.rocket.x > 150) {
                    this._flyRight = false;
                }
            } else {
                this.rocket.x = this.rocket.x - 1;
                if (this.rocket.x < -150) {
                    this._flyRight = true;
                }
            }

            this.rocket.y = this.rocket.y + 10;
            if (this.rocket.y > window.height / 2 - 200) {
                this._dropRocket = true;
            }
        }
    },
});
