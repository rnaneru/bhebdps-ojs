describe('Итоговое домашнее задание по курсу', () => {

    describe('Задача №1. RPG-персонажи. Оружие', () => {
        describe('Базовый класс Weapon', () => {
            it('создание оружия с заданными параметрами', () => {
                const weapon = new Weapon('Старый меч', 20, 10, 1);
                expect(weapon.name).toBe('Старый меч');
                expect(weapon.attack).toBe(20);
                expect(weapon.durability).toBe(10);
                expect(weapon.initDurability).toBe(10);
                expect(weapon.range).toBe(1);
            });

            it('takeDamage уменьшает прочность', () => {
                const weapon = new Weapon('Старый меч', 20, 10, 1);
                weapon.takeDamage(5);
                expect(weapon.durability).toBe(5);
                weapon.takeDamage(50);
                expect(weapon.durability).toBe(0);
            });

            it('getDamage возвращает полный урон при прочности >= 30%', () => {
                const weapon = new Weapon('Тест', 20, 100, 1);
                expect(weapon.getDamage()).toBe(20);
                weapon.takeDamage(30);
                expect(weapon.getDamage()).toBe(20);
            });

            it('getDamage возвращает половину урона при прочности < 30%', () => {
                const weapon = new Weapon('Тест', 20, 100, 1);
                weapon.takeDamage(71);
                expect(weapon.getDamage()).toBe(10);
                weapon.takeDamage(29);
                expect(weapon.getDamage()).toBe(0);
            });

            it('isBroken возвращает true при durability = 0', () => {
                const weapon = new Weapon('Тест', 20, 10, 1);
                expect(weapon.isBroken()).toBe(false);
                weapon.takeDamage(10);
                expect(weapon.isBroken()).toBe(true);
            });
        });

        describe('Классы оружия (таблица 1)', () => {
            it('Arm: Рука с бесконечной прочностью', () => {
                const arm = new Arm();
                expect(arm.name).toBe('Рука');
                expect(arm.attack).toBe(1);
                expect(arm.durability).toBe(Infinity);
                expect(arm.initDurability).toBe(Infinity);
                expect(arm.range).toBe(1);
                arm.takeDamage(20);
                expect(arm.durability).toBe(Infinity);
                expect(arm.isBroken()).toBe(false);
            });

            it('Bow: Лук', () => {
                const bow = new Bow();
                expect(bow.name).toBe('Лук');
                expect(bow.attack).toBe(10);
                expect(bow.durability).toBe(200);
                expect(bow.initDurability).toBe(200);
                expect(bow.range).toBe(3);
            });

            it('Sword: Меч', () => {
                const sword = new Sword();
                expect(sword.name).toBe('Меч');
                expect(sword.attack).toBe(25);
                expect(sword.durability).toBe(500);
                expect(sword.initDurability).toBe(500);
                expect(sword.range).toBe(1);
            });

            it('Knife: Нож', () => {
                const knife = new Knife();
                expect(knife.name).toBe('Нож');
                expect(knife.attack).toBe(5);
                expect(knife.durability).toBe(300);
                expect(knife.range).toBe(1);
            });

            it('Staff: Посох', () => {
                const staff = new Staff();
                expect(staff.name).toBe('Посох');
                expect(staff.attack).toBe(8);
                expect(staff.durability).toBe(300);
                expect(staff.range).toBe(2);
            });
        });

        describe('Усиленное оружие (таблица 2)', () => {
            it('LongBow: Длинный лук (наследуется от Bow)', () => {
                const bow = new LongBow();
                expect(bow.name).toBe('Длинный лук');
                expect(bow.attack).toBe(15);
                expect(bow.durability).toBe(200);
                expect(bow.range).toBe(4);
                expect(bow instanceof Bow).toBe(true);
            });

            it('Axe: Секира (наследуется от Sword)', () => {
                const axe = new Axe();
                expect(axe.name).toBe('Секира');
                expect(axe.attack).toBe(27);
                expect(axe.durability).toBe(800);
                expect(axe.initDurability).toBe(800);
                expect(axe.range).toBe(1);
                expect(axe instanceof Sword).toBe(true);
            });

            it('StormStaff: Посох Бури (наследуется от Staff)', () => {
                const staff = new StormStaff();
                expect(staff.name).toBe('Посох Бури');
                expect(staff.attack).toBe(10);
                expect(staff.durability).toBe(300);
                expect(staff.range).toBe(3);
                expect(staff instanceof Staff).toBe(true);
            });
        });
    });

    describe('Задача №1. RPG-персонажи. Персонажи', () => {
        describe('Базовый класс Player', () => {
            it('создание игрока с начальными параметрами', () => {
                const player = new Player(10, 'Бэтмен');
                expect(player.life).toBe(100);
                expect(player.magic).toBe(20);
                expect(player.speed).toBe(1);
                expect(player.attack).toBe(10);
                expect(player.agility).toBe(5);
                expect(player.luck).toBe(10);
                expect(player.description).toBe('Игрок');
                expect(player.weapon instanceof Arm).toBe(true);
                expect(player.position).toBe(10);
                expect(player.name).toBe('Бэтмен');
            });

            it('getLuck возвращает число в диапазоне', () => {
                const player = new Player(10, 'Бэтмен');
                const luck = player.getLuck();
                expect(luck).toBeGreaterThanOrEqual(0.1);
                expect(luck).toBeLessThanOrEqual(1.1);
            });

            it('getDamage возвращает 0 если distance > range оружия', () => {
                const player = new Player(10, 'Человек паук');
                expect(player.getDamage(2)).toBe(0);
                expect(player.getDamage(4)).toBe(0);
            });

            it('getDamage возвращает урон если distance <= range', () => {
                const player = new Player(10, 'Человек паук');
                const damage = player.getDamage(1);
                expect(damage).toBeGreaterThan(0);
            });

            it('takeDamage уменьшает жизнь', () => {
                const player = new Player(10, 'Хоббит');
                player.takeDamage(10);
                expect(player.life).toBe(90);
                player.takeDamage(80);
                expect(player.life).toBe(10);
                player.takeDamage(90);
                expect(player.life).toBe(0);
            });

            it('isDead возвращает true при life = 0', () => {
                const player = new Player(10, 'Хоббит');
                expect(player.isDead()).toBe(false);
                player.takeDamage(100);
                expect(player.isDead()).toBe(true);
            });
        });

        describe('Классы бойцов (таблица 3)', () => {
            it('Warrior: Воин', () => {
                const warrior = new Warrior(10, 'Алёша Попович');
                expect(warrior.life).toBe(120);
                expect(warrior.magic).toBe(20);
                expect(warrior.speed).toBe(2);
                expect(warrior.attack).toBe(10);
                expect(warrior.agility).toBe(5);
                expect(warrior.luck).toBe(10);
                expect(warrior.description).toBe('Воин');
                expect(warrior.weapon instanceof Sword).toBe(true);
                expect(warrior instanceof Player).toBe(true);
            });

            it('Archer: Лучник', () => {
                const archer = new Archer(10, 'Леголас');
                expect(archer.life).toBe(80);
                expect(archer.magic).toBe(35);
                expect(archer.speed).toBe(1);
                expect(archer.attack).toBe(5);
                expect(archer.agility).toBe(10);
                expect(archer.luck).toBe(10);
                expect(archer.description).toBe('Лучник');
                expect(archer.weapon instanceof Bow).toBe(true);
                expect(archer instanceof Player).toBe(true);
            });

            it('Mage: Маг', () => {
                const mage = new Mage(10, 'Гендальф');
                expect(mage.life).toBe(70);
                expect(mage.magic).toBe(100);
                expect(mage.speed).toBe(1);
                expect(mage.attack).toBe(5);
                expect(mage.agility).toBe(8);
                expect(mage.luck).toBe(10);
                expect(mage.description).toBe('Маг');
                expect(mage.weapon instanceof Staff).toBe(true);
                expect(mage instanceof Player).toBe(true);
            });
        });

        describe('Улучшенные классы бойцов (таблица 4)', () => {
            it('Dwarf: Гном (усиленный Воин)', () => {
                const dwarf = new Dwarf(10, 'Гимли');
                expect(dwarf.life).toBe(130);
                expect(dwarf.speed).toBe(2);
                expect(dwarf.attack).toBe(15);
                expect(dwarf.luck).toBe(20);
                expect(dwarf.description).toBe('Гном');
                expect(dwarf.weapon instanceof Axe).toBe(true);
                expect(dwarf instanceof Warrior).toBe(true);
            });

            it('Crossbowman: Арбалетчик (усиленный Лучник)', () => {
                const cb = new Crossbowman(10, 'Арбалетчик');
                expect(cb.life).toBe(85);
                expect(cb.speed).toBe(1);
                expect(cb.attack).toBe(8);
                expect(cb.agility).toBe(20);
                expect(cb.luck).toBe(15);
                expect(cb.description).toBe('Арбалетчик');
                expect(cb.weapon instanceof LongBow).toBe(true);
                expect(cb instanceof Archer).toBe(true);
            });

            it('Demiurge: Демиург (усиленный Маг)', () => {
                const demi = new Demiurge(10, 'Саурон');
                expect(demi.life).toBe(80);
                expect(demi.magic).toBe(120);
                expect(demi.speed).toBe(1);
                expect(demi.attack).toBe(6);
                expect(demi.luck).toBe(12);
                expect(demi.description).toBe('Демиург');
                expect(demi.weapon instanceof StormStaff).toBe(true);
                expect(demi instanceof Mage).toBe(true);
            });
        });

        describe('Особенности классов', () => {
            it('Archer.getDamage использует особую формулу', () => {
                const archer = new Archer(10, 'Леголас');
                const damageAtRange = archer.getDamage(3);
                expect(damageAtRange).toBeGreaterThan(0);
            });

            it('Warrior.takeDamage поглощает урон маной при условиях', () => {
                const warrior = new Warrior(10, 'Алёша Попович');
                expect(warrior.life).toBe(120);
                expect(warrior.magic).toBe(20);

                warrior.takeDamage(50);
                expect(warrior.life).toBe(70);
                expect(warrior.magic).toBe(20);

                warrior.takeDamage(20);
                expect(warrior.life).toBe(50);
                expect(warrior.magic).toBe(20);
            });

            it('Mage.takeDamage уменьшает урон вдвое при мане > 50%', () => {
                const mage = new Mage(10, 'Гендальф');
                expect(mage.life).toBe(70);
                expect(mage.magic).toBe(100);

                mage.takeDamage(50);
                expect(mage.life).toBe(45);
                expect(mage.magic).toBe(88);

                mage.takeDamage(20);
                expect(mage.life).toBe(35);
                expect(mage.magic).toBe(76);
            });

            it('Dwarf получает пониженный урон каждый 6-й удар', () => {
                const dwarf = new Dwarf(10, 'Гимли');
                dwarf.hitCount = 5;
                const lifeBefore = dwarf.life;
                dwarf.takeDamage(10);
                expect(dwarf.hitCount).toBe(6);
            });

            it('Demiurge наносит повышенный урон при мане > 0 и удаче', () => {
                const demi = new Demiurge(10, 'Саурон');
                const baseDamage = demi.getDamage(1);
                expect(demi.magic).toBe(120);
            });
        });
    });

    describe('Задача RPG-поединки', () => {
        describe('Движение', () => {
            it('moveLeft уменьшает позицию с учётом скорости', () => {
                const player = new Warrior(6, 'Алёша Попович');
                expect(player.speed).toBe(2);
                expect(player.position).toBe(6);
                player.moveLeft(5);
                expect(player.position).toBe(4);
            });

            it('moveRight увеличивает позицию с учётом скорости', () => {
                const player = new Warrior(6, 'Алёша Попович');
                player.moveRight(2);
                expect(player.position).toBe(8);
                player.moveRight(1);
                expect(player.position).toBe(9);
            });

            it('move вызывает moveLeft при отрицательном distance', () => {
                const player = new Player(10, 'Тест');
                player.move(-3);
                expect(player.position).toBe(9);
            });

            it('move вызывает moveRight при положительном distance', () => {
                const player = new Player(10, 'Тест');
                player.move(3);
                expect(player.position).toBe(11);
            });

            it('перемещение не превышает скорость', () => {
                const player = new Player(10, 'Тест');
                player.moveLeft(100);
                expect(player.position).toBe(9);
                player.moveRight(100);
                expect(player.position).toBe(10);
            });
        });

        describe('Защита', () => {
            it('isAttackBlocked возвращает boolean', () => {
                const player = new Warrior(6, 'Алёша Попович');
                const result = player.isAttackBlocked();
                expect(typeof result).toBe('boolean');
            });

            it('dodged возвращает boolean', () => {
                const player = new Warrior(6, 'Алёша Попович');
                const result = player.dodged();
                expect(typeof result).toBe('boolean');
            });
        });

        describe('Атака', () => {
            it('tryAttack не атакует если враг вне досягаемости', () => {
                const player = new Warrior(0, 'Алёша Попович');
                const archer = new Archer(2, 'Леголас');
                expect(archer.life).toBe(80);
                player.tryAttack(archer);
                expect(archer.life).toBe(80);
            });

            it('tryAttack атакует если враг в досягаемости', () => {
                const player = new Warrior(0, 'Алёша Попович');
                const archer = new Archer(2, 'Леголас');
                player.moveRight(1);
                player.tryAttack(archer);
                expect(archer.life).toBeLessThan(80);
            });

            it('tryAttack наносит удвоенный урон и отталкивает при одном положении', () => {
                const player = new Warrior(0, 'Алёша Попович');
                const archer = new Archer(2, 'Леголас');
                player.moveRight(2);
                const posBefore = archer.position;
                player.tryAttack(archer);
                expect(archer.position).toBe(posBefore + 1);
            });
        });

        describe('Выбор цели', () => {
            it('chooseEnemy выбирает противника с минимальным здоровьем', () => {
                const player = new Warrior(0, 'Воин');
                const archer = new Archer(2, 'Лучник');
                const mage = new Mage(3, 'Маг');
                archer.takeDamage(30);
                mage.takeDamage(10);
                const enemy = player.chooseEnemy([player, archer, mage]);
                expect(enemy).toBe(archer);
            });

            it('chooseEnemy игнорирует мёртвых', () => {
                const player = new Warrior(0, 'Воин');
                const archer = new Archer(2, 'Лучник');
                const mage = new Mage(3, 'Маг');
                archer.takeDamage(200);
                const enemy = player.chooseEnemy([player, archer, mage]);
                expect(enemy).toBe(mage);
            });

            it('chooseEnemy возвращает null если нет живых врагов', () => {
                const player = new Warrior(0, 'Воин');
                const enemy = player.chooseEnemy([player]);
                expect(enemy).toBeNull();
            });
        });

        describe('Игровой процесс', () => {
            it('play определяет победителя', () => {
                const warrior = new Warrior(0, 'Алёша Попович');
                const archer = new Archer(2, 'Леголас');
                const winner = play([warrior, archer]);
                expect(winner).toBeDefined();
                expect(winner.isDead()).toBe(false);
            });

            it('play возвращает null если нет живых', () => {
                const warrior = new Warrior(0, 'Мёртвый');
                warrior.takeDamage(200);
                const winner = play([warrior]);
                expect(winner).toBeNull();
            });

            it('checkWeapon меняет сломанное оружие на следующее в цепочке', () => {
                const warrior = new Warrior(0, 'Воин');
                expect(warrior.weapon instanceof Sword).toBe(true);
                warrior.weapon.takeDamage(1000);
                expect(warrior.weapon.isBroken()).toBe(true);
                warrior.checkWeapon();
                expect(warrior.weapon instanceof Knife).toBe(true);
            });

            it('checkWeapon не меняет оружие если оно не сломано', () => {
                const warrior = new Warrior(0, 'Воин');
                warrior.checkWeapon();
                expect(warrior.weapon instanceof Sword).toBe(true);
            });
        });
    });
});
