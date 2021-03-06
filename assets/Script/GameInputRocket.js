cc.Class({
    extends: cc.Component,

    properties: {
        rocket: {
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

        _gameStart: false, //state game
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
        _indexPlanet: 1, //thu tu cac hanh tinh se duoc goi
    },

    onLoad() {
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.debug.setDisplayStats(false);
        this.questionBox.active = false;
        this.nofiChangePlanet.active = false;
        this.node.getComponent("SoundManagerGameRocket").playBackGroundSound();

        this._backgroundWidth = this.background2.node.getContentSize().width;
        this._backgroundHeight = this.background2.node.getContentSize().height;
        this.background1.node.setPosition(0, 0);
        this.background2.node.setPosition(0, this._backgroundHeight);

        window.width = cc.view._designResolutionSize.width;
        window.height = cc.view._designResolutionSize.height;

        arrNamePlanet = new Array(); //ten cac hanh tinh
        this.arrNamePlanet = [
            "Sao Thổ",
            "Mặt Trăng",
            "Sao Kim",
            "Sao Thiên Vương",
            "Sao Hỏa",
            "Sao Diêm Vương",
            "Sao Thủy",
            "Mặt Trời",
            "Sao Mộc",
            "Trái Đất",
        ];
        arrNamePlanetImg = new Array(); //ten cac hanh tinh
        this.arrNamePlanetImg = [
            "saotho",
            "mattrang",
            "saokim",
            "saothienvuong",
            "saohoa",
            "saodiemvuong",
            "saothuy",
            "mattroi",
            "saomoc",
            "traidat",
        ];
        arrPickerColor = new Array(); //mang ma mau
        this.arrPickerColor = [
            { r: 255, g: 0, b: 0 },
            { r: 252, g: 140, b: 3 },
            { r: 252, g: 240, b: 3 },
            { r: 152, g: 252, b: 3 },
            { r: 28, g: 252, b: 3 },
            { r: 2, g: 252, b: 152 },
            { r: 3, g: 248, b: 252 },
            { r: 3, g: 132, b: 252 },
            { r: 11, g: 3, b: 252 },
            { r: 177, g: 3, b: 252 },
        ];
        this.rocket.on(cc.Node.EventType.TOUCH_START, this.RocketStart, this); //chạm vào rocket để bắt đầu game
        this.readyLabel.node.getComponent(cc.Animation).play("readyAni");
    },

    RocketStart() {
        if (this._gameStart === false && this._gameOver === false) {
            this.readyLabel.node.active = false; //ẩn text
            this.earth.getComponent(cc.Animation).play("earthAni");

            setTimeout(() => {
                this.callCreateQuestion();
            }, 2000);
            console.log("Cham start");
        }
        if (this._gameOver === false) {
            this._gameStart = true;
        }
        console.log("cham");
    },

    repeatBackground() {
        this.background1.node.y -= 1;
        this.background2.node.y -= 1;
        if (this.background1.node.y <= -this._backgroundHeight) {
            this.background1.node.setPosition(0, this._backgroundHeight);
        }
        if (this.background2.node.y <= -this._backgroundHeight) {
            this.background2.node.setPosition(0, this._backgroundHeight);
        }
    },

    runAnimationPlanet(index) {
        var randomAni = Math.floor(Math.random() * 2) + 1;
        this.planet.getComponent(
            cc.Sprite
        ).spriteFrame = this.planetAtlas.getSpriteFrame(
            this.arrNamePlanetImg[this._indexPlanet]
        );
        this.namePlanet.string = this.arrNamePlanet[index];
        if (randomAni === 1) {
            this.planet.getComponent(cc.Animation).play("planetAni1");
        } else {
            this.planet.getComponent(cc.Animation).play("planetAni2");
        }

        if (this._indexPlanet < 10 - 1) {
            this._indexPlanet++;
        }
    },

    changeColorBackground(r1, g1, b1, r2, g2, b2) {
        // console.log(this.layerColor.color);
        this.layerColor.color = new cc.Color(r2, g2, b2);
    },

    generateRandomCalculations(valueLimit) {
        //hàm sinh ngẫu nhiên câu hỏi và câu trả lời
        //random phep tinh
        var typeCal = Math.floor(Math.random() * 4) + 1;
        var num1, num2, result;
        var stateReturn = false; //trang thai phep tinh co thoa man
        if (typeCal === 1) {
            //phep nhan

            while (stateReturn === false) {
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                result = num1 * num2;
                if (result <= valueLimit) {
                    stateReturn = true;
                }
            }
        } else if (typeCal === 2) {
            //phep chia
            while (stateReturn === false) {
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 9) + 1;
                //kiem tra chia het
                if (num1 % num2 === 0) {
                    result = num1 / num2;
                    if (result <= valueLimit) {
                        stateReturn = true;
                    }
                }
            }
        } else if (typeCal === 3) {
            //phep cong
            while (stateReturn === false) {
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                result = num1 + num2;
                if (result <= valueLimit) {
                    stateReturn = true;
                }
            }
        } else {
            //phep tru
            while (stateReturn === false) {
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 9) + 1;
                //kiem tra chia het
                if (num1 >= num2) {
                    result = num1 - num2;
                    if (result <= valueLimit) {
                        stateReturn = true;
                    }
                }
            }
        }
        return [typeCal, num1, num2, result];
    },

    callCreateQuestion() {
        // this._numCurrentQuestion++;
        this.CreateValueQuestion(this._valueLimit);
        this.questionBox.active = true;
    },

    CreateValueQuestion(valueLimit) {
        var arr = this.generateRandomCalculations(valueLimit); //[0] loai phep tinh, [1] num1, [2] num2. [3] ket qua dung
        var pheptinh = "";
        if (arr[0] === 1) {
            pheptinh = "x";
        } else if (arr[0] === 2) {
            pheptinh = ":";
        } else if (arr[0] === 3) {
            pheptinh = "+";
        } else {
            pheptinh = "-";
        }

        //set cau hoi
        this.questionText.string = arr[1] + pheptinh + arr[2] + " = ?";

        //set dap an
        //random dap an dung
        var trueResult = Math.floor(Math.random() * 3) + 1;
        this._trueResult = trueResult;
        //random 2 dam an nhung can check truong hop dap an trung nhau
        var checkRandomResult = false;
        var randomresult1, randomresult2;
        while (checkRandomResult === false) {
            if (arr[3] > 2) {
                randomresult1 =
                    Math.floor(Math.random() * arr[3]) + Math.floor(arr[3] / 2);
                randomresult2 =
                    Math.floor(Math.random() * arr[3]) + Math.floor(arr[3] / 2);
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
    },

    handleCheckResult(event, customEventData) {
        this.questionBox.active = false;
        if (
            customEventData == this._trueResult &&
            this._numCurrentQuestion < this.numOfQuestion
        ) {
            this.node
                .getComponent("SoundManagerGameRocket")
                .playEffectSound("trueClick", false);
            this._numCurrentQuestion++;
            if (this._numCurrentQuestion % this.numOfQuestionNextPlanet === 0) {
                this.nofiChangePlanet.active = true;
                this.nofiChangePlanet.string =
                    "Con đã đến" + "\n" + this.arrNamePlanet[this._indexPlanet];
                this.nofiChangePlanet //run animation
                    .getComponent(cc.Animation)
                    .play("nofiChangePlanetAni");

                this.runAnimationPlanet(this._indexPlanet);
                this.changeColorBackground(
                    this.arrPickerColor[this._indexPlanet - 1].r,
                    this.arrPickerColor[this._indexPlanet - 1].g,
                    this.arrPickerColor[this._indexPlanet - 1].b,
                    this.arrPickerColor[this._indexPlanet].r,
                    this.arrPickerColor[this._indexPlanet].g,
                    this.arrPickerColor[this._indexPlanet].b
                );
            }
            // console.log("Ban da chon dap an dung");
            //xử lý rocket sẽ bay lên hay gì đó
            this._dropRocket = false; //khong roi nua ma bay len
        } else {
            // console.log("Ban da chon sai dap an");
            this.node
                .getComponent("SoundManagerGameRocket")
                .playEffectSound("wrongClick", false);
        }
        if (
            this._gameStart === true &&
            this._numCurrentQuestion < this.numOfQuestion
        ) {
            setTimeout(() => {
                this.callCreateQuestion();
            }, 1000);
        }
        if (this._numCurrentQuestion >= this.numOfQuestion) {
            this._win = true;
            this.onFinishGameEvent();
        }
        this.questionBox.active = false;
        console.log(this._numCurrentQuestion);
    },

    //may bay roi
    dropRocket() {
        this._dropRocket = true;
    },

    spawnNewBackround() {
        var newBackround = cc.instantiate(this.objectChainPrefab);
        this.node.addChild(newBackround);
        newBackround.setPosition(0, 1500);
        // newBackround.parent = this.chainsParent;
    },

    onFinishGameEvent() {
        //kết thúc game
        this._gameStart = false; //trang thai game false
        this._gameOver = true;
        this.questionBox.active = false;

        setTimeout(() => {
            if (this._win === true) {
                //thang
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("win", false);
                this.tableResult
                    .getChildByName("ChucMung")
                    .getComponent(cc.Label).string =
                    "Chúc mừng con đã vượt qua thử thách";
                console.log("thang");
            } else {
                //thua
                this.node
                    .getComponent("SoundManagerGameRocket")
                    .playEffectSound("lose", false);
                this.tableResult
                    .getChildByName("ChucMung")
                    .getComponent(cc.Label).string = "Con cần cố gắng hơn nữa";
                console.log("thua");
            }
            this.tableResult.getComponent(cc.Animation).play();
        }, 1500);
    },

    onClickBack() {
        this.node
            .getComponent("SoundManagerGameRocket")
            .playEffectSound("onClick", false);
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

    update(dt) {
        //repeat background
        if (this._gameStart === true) {
            this.repeatBackground();
        }
        //xử lý máy bay sẽ bị rơi dần dần xuống nếu không chọn đáp án đúng hoặc chọn sai
        if (this._dropRocket === true) {
            if (this._flyUp === true) {
                this.rocket._components[0].animation = "nomal_fly";
                this.starDrop.active = false;
            }
            this._flyUp = false;
            this.rocket.y = this.rocket.y - 2;
            if (this.rocket.y < -(window.height / 2 - 75)) {
                this._dropRocket = false;
                this._win = false;
                this.onFinishGameEvent();
            }
        } else if (this._gameStart === true && this._gameOver === false) {
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
