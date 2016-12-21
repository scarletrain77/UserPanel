var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel(user) {
        _super.call(this);
        this._user = user;
        this._userBody = new egret.Bitmap();
        this._userBody.texture = RES.getRes("hero_png");
        //this._userBody.x = 0;
        //this._userBody.y = 0;
        this._userBody.width = 500;
        this._userBody.height = 500;
        PictureMiddle.putPictureMiddle(this._userBody);
        this.addChild(this._userBody);
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