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
                "FightPower" + hero.getFightPower() + "\n" +
                "DefensePower" + hero.getDefensePower();
        this._heroText.textColor = 0x000000;
        this._heroText.x = this._heroBody.x;
        this._heroText.y = this._heroBody.y + this._heroBody.height;
        this.addChild(this._heroBody);
        this.addChild(this._jewelButton);
        this.addChild(this._equipmentButton);
        this.addChild(this._heroText);
    }
    var d = __define,c=UserPanel,p=c.prototype;
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
//# sourceMappingURL=UserPanel.js.map