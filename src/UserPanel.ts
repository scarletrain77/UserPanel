class UserPanel extends egret.DisplayObjectContainer {
    private _user: User;
    private _userBody: egret.Bitmap;

    constructor(user: User) {
        super();
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
}

class PictureMiddle{
    public static putPictureMiddle(pic: egret.Bitmap){
        pic.x = 320 - pic.width / 2;
        pic.y = 568 - pic.height / 2;
    }
}