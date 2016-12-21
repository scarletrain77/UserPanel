var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyName, desc) {
    //const getter = desc.get;
    var method = desc.value;
    /*desc.get = function () {
        return getter.apply(this);
    }
    return desc;*/
    desc.value = function () {
        //没有修改过数据时，输出原本的
        if (this["_cacheFightPower"] != null && this["_dirty"] == false) {
            console.log("haven't revise");
            return target["_cacheFightPower"];
        }
        else {
            this["_cacheFightPower"] = method.apply(this);
            console.log("revised");
            return method.apply(this);
        }
    };
    return desc;
};
var User = (function () {
    //heroesInTeam:Hero[] = [];
    function User() {
        this._gold = 0;
        this._exp = 0;
        this._totalExp = 0;
        this._level = 0;
        this._heroes = [];
        this._cacheFighterPower = 0;
        this._cacheDefensePower = 0;
        this._dirty = false;
    }
    var d = __define,c=User,p=c.prototype;
    p.addHero = function (hero) {
        hero.setIsInteam(true);
        this._heroes.push(hero);
        this._dirty = true;
    };
    d(p, "hearoesInTeam"
        ,function () {
            return this._heroes.filter(function (hero) { return hero.isInTeam; });
        }
    );
    //@Logger
    p.print = function () {
        console.log("hello");
    };
    p.getFightPower = function () {
        /* var arr:Hero[] = [];
         function test(hero:Hero){
             return true;
         }
         arr.every(hero=>hero.isInteam);*/
        if (!this._cacheFighterPower) {
            var result = 0;
            this.hearoesInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
            //result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        console.log("User:" + this._cacheFighterPower);
        return this._cacheFighterPower;
    };
    //@Cache
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this.hearoesInTeam.forEach(function (hero) { return result += hero.getDefensePower(); });
            //result += this.pet.getFightPower();
            this._cacheDefensePower = result;
        }
        console.log("User:" + this._cacheDefensePower);
        return this._cacheDefensePower;
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(name, strength, quick, wisdom) {
        this._isInTeam = false;
        this._equipments = [];
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
        this._hp = 50;
        this._name = name;
    }
    var d = __define,c=Hero,p=c.prototype;
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "isInTeam"
        ,function () {
            return this._isInTeam;
        }
    );
    p.setIsInteam = function (is) {
        this._isInTeam = is;
    };
    // @Cache
    p.getFightPower = function () {
        if (!this._cacheFightPower) {
            var result = 0;
            this._equipments.forEach(function (e) { return result += e.getFightPower(); });
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
        }
        return this._cacheFightPower;
    };
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this._equipments.forEach(function (e) { return result += e.getDefensePower(); });
            this._wisdom += this._level * 0.3;
            result += this._wisdom;
            this._cacheDefensePower = result;
        }
        return this._cacheDefensePower;
    };
    p.addEquipment = function (equipment) {
        this._equipments.push(equipment);
    };
    p.getEquipmentsText = function () {
        var text = "";
        this._equipments.forEach(function (e) { return text = text + "fightPower:" + e.getFightPower() + "\n"
            + "defensePower:" + e.getDefensePower() + "\n"; });
        return text;
    };
    p.getJewelsText = function () {
        var text = "";
        this._equipments.forEach(function (e) { return text += e.getJewelsText(); });
        return text;
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(strength, quick, wisdom) {
        this._jewels = [];
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewel = function (jewel) {
        this._jewels.push(jewel);
    };
    //@Cache
    p.getFightPower = function () {
        if (!this._cacheFightPower) {
            var result = 0;
            this._jewels.forEach(function (jewel) { return result += jewel.getFightPower(); });
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
        }
        //console.log("Equipment:" + result);
        return this._cacheFightPower;
    };
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this._jewels.forEach(function (jewel) { return result += jewel.getDefensePower(); });
            this._wisdom += this._level * 0.3;
            result += this._wisdom;
            this._cacheDefensePower = result;
        }
        //console.log("Equipment:" + result);
        return this._cacheDefensePower;
    };
    p.getJewelsText = function () {
        var text = "";
        this._jewels.forEach(function (e) { return text = text + "fightPower:" + e.getFightPower() + "\n"
            + "defensePower:" + e.getDefensePower() + "\n"; });
        return text;
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(type, level) {
        this._type = type;
        this._level = level;
        if (this._type == "strength") {
            this._strength = 10;
            this._quick = 0;
            this._wisdom = 0;
        }
        else if (this._type == "quick") {
            this._strength = 0;
            this._quick = 10;
            this._wisdom = 0;
        }
        else if (this._type == "wisdom") {
            this._strength = 0;
            this._quick = 0;
            this._wisdom = 10;
        }
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.getFightPower = function () {
        this._strength += this._level * 0.5;
        //console.log("jewel:" + this._strength);
        return this._strength;
    };
    p.getDefensePower = function () {
        this._wisdom += this._level * 0.3;
        return this._wisdom;
    };
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=User.js.map