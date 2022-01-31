export class Creature {
    private type: number;
    private kind: string;
    private description: string;
    private name: string;
    private level: number;
    private health: number;
    private hunger: number;
    private tiredness: number;
    private sleep: boolean;

    constructor(
        type: number,
        kind: string,
        description: string,
        name: string = "",
        level: number = 0,
        health: number = 0,
        hunger: number = 0,
        tiredness: number = 0,
        sleep: boolean = false) {

        this.type = type;
        this.kind = kind;
        this.description = description;
        this.name = name;
        this.level = level;
        this.health = health;
        this.hunger = hunger;
        this.tiredness = tiredness;
        this.sleep = sleep;
    }

    setSleep(sleep: boolean, animation: boolean) {
        this.sleep = sleep;
        if (sleep) {
            if (animation) {
                (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
                (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
                (document.querySelector('.sleepTime') as HTMLElement).style.animation = "darkenWindow 2s linear forwards";
            }
            else {
                (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.height = "0.4%";
                (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "0.4%";
                (document.querySelector('.sleepTime') as HTMLElement).style.opacity = "100%";
            }
            (document.querySelector('.lamp') as HTMLElement).style.backgroundColor = "rgb(238, 255, 0)";
            window.removeEventListener("touchmove", this.process_touchmove, false);
        }
        else {
            if (animation) {

                (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.animation = "openEyes 1s linear forwards";
                (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "openEyes 1s linear forwards";


                (document.querySelector('.sleepTime') as HTMLElement).style.animation = "lightenWindow 2s linear forwards";

            } else {
                (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.height = "10%";
                (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "10%";
                (document.querySelector('.sleepTime') as HTMLElement).style.opacity = "0%";
            }
            window.addEventListener("touchmove", this.process_touchmove, false);
            (document.querySelector('.lamp') as HTMLElement).style.backgroundColor = "rgba(238, 255, 0, 0)";
        }
    }



    moveAfterCursor(x: number, y: number) {

        let posX = (x / window.innerWidth) * 16 - 8;
        let posY = (y / window.innerHeight) * 8 - 1;
        if (posX > 6) posX = 6;
        else if (posX < -6) posX = -6;
        if (posY > 5) posY = 5;
        else if (posY < -5) posY = -5;
        (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";

        (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";
        (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";

        (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX / 2 + "vh," + posY / 2 + "vh)";

        return 0;

        //(document.querySelector('.upperLip') as HTMLElement).style.height = "";
        //element.getBoundingClientRect() - x, y elementu
    }
    process_touchmove(ev: any) {
        let x: number = ev.touches[0].screenX;
        let y: number = ev.touches[0].screenY;
        let posX = (x / window.innerWidth) * 16 - 8;
        let posY = (y / window.innerHeight) * 8 - 3;
        if (posX > 6) posX = 6;
        else if (posX < -6) posX = -6;
        if (posY > 5) posY = 5;
        else if (posY < -5) posY = -5;
        (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";

        (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";
        (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";

        (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX / 2 + "vh," + posY / 2 + "vh)";


    }















    /*public setSleep(sleep:boolean){
        this.sleep=sleep;
    }*/
    public getSleep() {
        return this.sleep;
    }
    public getType(): number {
        return this.type;
    }

    public getKind(): string {
        return this.kind;
    }

    public getDescription(): string {
        return this.description;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLevel(): number {
        return this.level;
    }

    public setLevel(level: number): void {
        this.level = level;
    }

    public getHealth(): number {
        return this.health;
    }

    public setHealth(health: number): void {
        this.health = health;
    }

    public getHunger(): number {
        return this.hunger;
    }

    public setHunger(hunger: number): void {
        this.hunger = hunger;
    }

    public getTiredness(): number {
        return this.tiredness;
    }

    public setTiredness(tiredness: number): void {
        this.tiredness = tiredness;
    }

}