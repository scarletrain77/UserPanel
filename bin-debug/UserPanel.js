var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel(hero) {
        _super.call(this);
        this._hero = hero;
        this._heroBody = new egret.Bitmap();
        this._heroBody.texture = RES.getRes("hero_png");
        //this._userBody.x = 0;
        //this._userBody.y = 0;
        this._heroBody.width = 500;
        this._heroBody.height = 500;
        PictureMiddle.putPictureMiddle(this._heroBody);
        this._jewelButton = new egret.Bitmap();
        this._jewelButton.texture = RES.getRes("jewel_png");
        this._jewelButton.x = this._heroBody.x + this._heroBody.width;
        this._jewelButton.y = this._heroBody.y;
        this._jewelButton.width = 50;
        this._jewelButton.height = 50;
        this._equipmentButton = new egret.Bitmap();
        this._equipmentButton.texture = RES.getRes("equipment_png");
        this._equipmentButton.x = this._jewelButton.x;
        this._equipmentButton.y = this._jewelButton.y + this._jewelButton.height + 5;
        this._equipmentButton.width = 50;
        this._equipmentButton.height = 50;
        this._heroText = new egret.TextField();
        this._heroText.text =
            "Name:" + hero.name + "\n" +
                "FightPower:" + hero.getFightPower() + "\n" +
                "DefensePower:" + hero.getDefensePower();
        this._heroText.textColor = 0x000000;
        this._heroText.x = this._heroBody.x;
        this._heroText.y = this._heroBody.y + this._heroBody.height;
        var result = hero.getJewelsText();
        this._jewelPanel = new exceptPanel(result, this._jewelButton.x - 300, this._jewelButton.y);
        result = hero.getEquipmentsText();
        this._equipmentsPanel = new exceptPanel(result, this._jewelButton.x - 300, this._equipmentButton.y);
        this._jewelButton.touchEnabled = true;
        this._equipmentButton.touchEnabled = true;
        this._jewelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickJewel, this);
        this._jewelButton.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this._jewelPanel.showOut, this);
        this._equipmentButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipment, this);
        //this._jewelPanel.showIn();
        this.addChild(this._heroBody);
        this.addChild(this._jewelButton);
        this.addChild(this._equipmentButton);
        this.addChild(this._heroText);
        this.addChild(this._jewelPanel);
        this.addChild(this._equipmentsPanel);
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.onClickJewel = function () {
        this._jewelPanel.showIn();
    };
    p.onClickEquipment = function () {
        this._equipmentsPanel.showIn();
    };
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
var PictureMiddle = (function () {
    function PictureMiddle() {
    }
    var d = __define,c=PictureMiddle,p=c.prototype;
    PictureMiddle.putPictureMiddle = function (pic) {
        pic.x = 320 - pic.width / 2;
        pic.y = 568 - pic.height / 2;
    };
    return PictureMiddle;
}());
egret.registerClass(PictureMiddle,'PictureMiddle');
var exceptPanel = (function (_super) {
    __extends(exceptPanel, _super);
    function exceptPanel(text, x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this._background = new egret.Shape();
        this._background.graphics.beginFill(0x000000, 0.5);
        this._background.graphics.drawRect(0, 0, 300, 300);
        this._background.graphics.endFill();
        this._background.alpha = 0;
        this._heroText = new egret.TextField();
        this._heroText.text = text;
        this._heroText.alpha = 0;
        this._heroText.textColor = 0xFFFAF0;
        this._heroText.x = 0;
        this._heroText.y = 0;
        this.addChild(this._background);
        this.addChild(this._heroText);
    }
    var d = __define,c=exceptPanel,p=c.prototype;
    p.showIn = function () {
        this._background.alpha = 1;
        this._heroText.alpha = 1;
    };
    p.showOut = function () {
        this._background.alpha = 0;
        this._heroText.alpha = 0;
    };
    return exceptPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(exceptPanel,'exceptPanel');
//# sourceMappingURL=UserPanel.js.map