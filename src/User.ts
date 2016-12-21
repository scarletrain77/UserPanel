var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    //const getter = desc.get;
    const method = desc.value;
    /*desc.get = function () {
        return getter.apply(this);
    }
    return desc;*/

    desc.value = function () {
        //没有修改过数据时，输出原本的
        if (this["_cacheFightPower"] != null && this["_dirty"] == false) {
            console.log("haven't revise");
            return target["_cacheFightPower"];
        } else {
            this["_cacheFightPower"] = method.apply(this);
            console.log("revised");
            return method.apply(this);
        }
    }
    return desc;
}

class User {
    private _gold: number = 0;
    private _exp: number = 0;
    private _totalExp: number = 0;
    private _level: number = 0;

    private _heroes: Hero[] = [];
    private _cacheFighterPower: number = 0;
    private _cacheDefensePower: number = 0;

    private _dirty: boolean = false;
    //heroesInTeam:Hero[] = [];

    constructor() {
    }

    public addHero(hero: Hero): void {
        hero.setIsInteam(true);
        this._heroes.push(hero);
        this._dirty = true;
    }

    get hearoesInTeam() {
        return this._heroes.filter(hero => hero.isInTeam);
    }

    //@Logger
    print() {
        console.log("hello");
    }

    @Cache
    getFightPower() {
        /* var arr:Hero[] = [];
         function test(hero:Hero){
             return true;
         }
         arr.every(hero=>hero.isInteam);*/
        if (!this._cacheFighterPower) {
            var result = 0;
            this.hearoesInTeam.forEach(hero => result += hero.getFightPower());
            //result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        console.log("User:" + this._cacheFighterPower);
        return this._cacheFighterPower;
    }

    //@Cache
    getDefensePower() {
        if (!this._cacheDefensePower) {
            var result = 0;
            this.hearoesInTeam.forEach(hero => result += hero.getDefensePower());
            //result += this.pet.getFightPower();
            this._cacheDefensePower = result;
        }
        console.log("User:" + this._cacheDefensePower);
        return this._cacheDefensePower;
    }
}

class Hero {
    private _isInTeam: boolean = false;
    private _equipments: Equipment[] = [];
    private _hp: number;
    private _name: string;
    // level = 1;
    //quality: number = 2.0;
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _cacheFightPower: number;
    private _cacheDefensePower: number;

    constructor(name: string, strength: number, quick: number, wisdom: number) {
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
        this._hp = 50;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get isInTeam() {
        return this._isInTeam;
    }

    setIsInteam(is: boolean) {
        this._isInTeam = is;
    }

    // @Cache
    getFightPower() {
        if (!this._cacheFightPower) {
            var result = 0;
            this._equipments.forEach(e => result += e.getFightPower());
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
            //console.log("Hero:" + result);
        }
        return this._cacheFightPower;
    }

    getDefensePower() {
        if (!this._cacheDefensePower) {
            var result = 0;
            this._equipments.forEach(e => result += e.getDefensePower());
            this._wisdom += this._level * 0.3;
            result += this._wisdom;
            this._cacheDefensePower = result;
            //console.log("Hero:" + result);
        }
        return this._cacheDefensePower;
    }

    public addEquipment(equipment: Equipment): void {
        this._equipments.push(equipment);
    }

    public getEquipmentsText(): string {
        var text: string = "";
        this._equipments.forEach(e => text = text + "fightPower:" + e.getFightPower() + "\n"
            + "defensePower:" + e.getDefensePower() + "\n"
        );
        return text;
    }

    public getJewelsText(): string {
        var text: string = "";
        this._equipments.forEach(e => text += e.getJewelsText()
        );
        return text;
    }
}

class Equipment {
    private _jewels: Jewel[] = [];
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _cacheFightPower: number;
    private _cacheDefensePower: number;
    constructor(strength: number, quick: number, wisdom: number) {
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
    }

    public addJewel(jewel: Jewel): void {
        this._jewels.push(jewel);
    }

    //@Cache
    getFightPower() {
        if (!this._cacheFightPower) {
            var result: number = 0;
            this._jewels.forEach(jewel => result += jewel.getFightPower());
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
        }
        //console.log("Equipment:" + result);
        return this._cacheFightPower;
    }

    getDefensePower() {
        if (!this._cacheDefensePower) {
            var result: number = 0;
            this._jewels.forEach(jewel => result += jewel.getDefensePower());
            this._wisdom += this._level * 0.3;
            result += this._wisdom;
            this._cacheDefensePower = result;
        }
        //console.log("Equipment:" + result);
        return this._cacheDefensePower;
    }

    public getJewelsText(): string {
        var text: string = "";
        this._jewels.forEach(e => text = text + "fightPower:" + e.getFightPower() + "\n"
            + "defensePower:" + e.getDefensePower() + "\n"
        );
        return text;
    }
}

class Jewel {
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _type: string;

    constructor(type: string, level: number) {
        this._type = type;
        this._level = level;
        if (this._type == "strength") {
            this._strength = 10;
            this._quick = 0;
            this._wisdom = 0;
        } else if (this._type == "quick") {
            this._strength = 0;
            this._quick = 10;
            this._wisdom = 0;
        } else if (this._type == "wisdom") {
            this._strength = 0;
            this._quick = 0;
            this._wisdom = 10;
        }
    }

    getFightPower() {
        this._strength += this._level * 0.5;
        //console.log("jewel:" + this._strength);
        return this._strength;
    }

    getDefensePower() {
        this._wisdom += this._level * 0.3;
        return this._wisdom;
    }
}