class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.initDurability = durability;
        this.range = range;
    }

    takeDamage(damage) {
        if (this.durability !== Infinity) {
            this.durability = Math.max(0, this.durability - damage);
        }
    }

    getDamage() {
        if (this.durability <= 0) return 0;
        if (this.durability >= this.initDurability * 0.3) {
            return this.attack;
        }
        return this.attack / 2;
    }

    isBroken() {
        return this.durability === 0;
    }
}

class Arm extends Weapon {
    constructor() {
        super('Рука', 1, Infinity, 1);
    }
}

class Bow extends Weapon {
    constructor() {
        super('Лук', 10, 200, 3);
    }
}

class Sword extends Weapon {
    constructor() {
        super('Меч', 25, 500, 1);
    }
}

class Knife extends Weapon {
    constructor() {
        super('Нож', 5, 300, 1);
    }
}

class Staff extends Weapon {
    constructor() {
        super('Посох', 8, 300, 2);
    }
}

class LongBow extends Bow {
    constructor() {
        super();
        this.name = 'Длинный лук';
        this.attack = 15;
        this.range = 4;
    }
}

class Axe extends Sword {
    constructor() {
        super();
        this.name = 'Секира';
        this.attack = 27;
        this.durability = 800;
        this.initDurability = 800;
    }
}

class StormStaff extends Staff {
    constructor() {
        super();
        this.name = 'Посох Бури';
        this.attack = 10;
        this.range = 3;
    }
}

class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
        this.maxLife = this.life;
        this.maxMagic = this.magic;
    }

    getLuck() {
        return (Math.random() * 100 + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) return 0;
        return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
    }

    takeDamage(damage) {
        this.life = Math.max(0, this.life - damage);
    }

    isDead() {
        return this.life === 0;
    }

    moveLeft(distance) {
        this.position -= Math.min(distance, this.speed);
    }

    moveRight(distance) {
        this.position += Math.min(distance, this.speed);
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(Math.abs(distance));
        } else {
            this.moveRight(distance);
        }
    }

    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.weapon.takeDamage(damage);
            this.checkWeapon();
        } else if (!this.dodged()) {
            this.takeDamage(damage);
        }
    }

    checkWeapon() {
        if (this.weapon.isBroken()) {
            const chain = this.constructor.weaponChain;
            const currentIndex = chain.findIndex(w => this.weapon instanceof w);
            if (currentIndex >= 0 && currentIndex < chain.length - 1) {
                this.weapon = new chain[currentIndex + 1]();
            }
        }
    }

    tryAttack(enemy) {
        this.checkWeapon();
        const distance = Math.max(1, Math.abs(this.position - enemy.position));
        if (distance > this.weapon.range) return;

        this.weapon.takeDamage(10 * this.getLuck());
        let damage = this.getDamage(distance);

        if (this.position === enemy.position) {
            enemy.position += 1;
            damage *= 2;
        }

        enemy.takeAttack(damage);
    }

    chooseEnemy(players) {
        const alive = players.filter(p => !p.isDead() && p !== this);
        if (alive.length === 0) return null;
        return alive.reduce((min, p) => p.life < min.life ? p : min);
    }

    moveToEnemy(enemy) {
        const distance = enemy.position - this.position;
        this.move(distance);
    }

    turn(players) {
        const enemy = this.chooseEnemy(players);
        if (enemy) {
            this.moveToEnemy(enemy);
            this.tryAttack(enemy);
        }
    }
}

class Warrior extends Player {
    static weaponChain = [Sword, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 120;
        this.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
        this.maxLife = 120;
    }

    takeDamage(damage) {
        if (this.life < this.maxLife * 0.5 && this.getLuck() > 0.8) {
            const manaDamage = Math.min(damage, this.magic);
            this.magic -= manaDamage;
            damage -= manaDamage;
        }
        super.takeDamage(damage);
    }
}

class Archer extends Player {
    static weaponChain = [Bow, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 35;
        this.attack = 5;
        this.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow();
        this.maxLife = 80;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) return 0;
        return (this.attack + this.weapon.getDamage()) * this.getLuck() * distance / this.weapon.range;
    }
}

class Mage extends Player {
    static weaponChain = [Staff, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
        this.maxLife = 70;
        this.maxMagic = 100;
    }

    takeDamage(damage) {
        if (this.magic > this.maxMagic * 0.5) {
            damage = damage / 2;
            this.magic -= 12;
        }
        super.takeDamage(damage);
    }
}

class Dwarf extends Warrior {
    static weaponChain = [Axe, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.maxLife = 130;
        this.hitCount = 0;
    }

    takeDamage(damage) {
        this.hitCount++;
        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            damage = damage / 2;
        }
        super.takeDamage(damage);
    }
}

class Crossbowman extends Archer {
    static weaponChain = [LongBow, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 85;
        this.attack = 8;
        this.agility = 20;
        this.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
        this.maxLife = 85;
    }
}

class Demiurge extends Mage {
    static weaponChain = [StormStaff, Knife, Arm];

    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
        this.maxLife = 80;
        this.maxMagic = 120;
    }

    getDamage(distance) {
        let damage = super.getDamage(distance);
        if (this.magic > 0 && this.getLuck() > 0.6) {
            damage *= 1.5;
        }
        return damage;
    }
}

function play(players) {
    let round = 0;
    while (players.filter(p => !p.isDead()).length > 1 && round < 1000) {
        for (const player of players) {
            if (!player.isDead()) {
                player.turn(players);
            }
        }
        round++;
    }
    return players.find(p => !p.isDead()) || null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Weapon, Arm, Bow, Sword, Knife, Staff,
        LongBow, Axe, StormStaff,
        Player, Warrior, Archer, Mage,
        Dwarf, Crossbowman, Demiurge,
        play
    };
}
