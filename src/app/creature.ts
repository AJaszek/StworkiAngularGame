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
    private appearance: string;

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

        this.type = type * 1;
        this.kind = kind;
        this.description = description;
        this.name = name;
        this.level = level;
        this.health = health;
        this.hunger = hunger;
        this.tiredness = tiredness;
        this.sleep = sleep;
        this.appearance = this.setAppearance(type);
    }

    setSleep(sleep: boolean, animation: boolean) {
        this.sleep = sleep;
        if (sleep) {
            if (animation) {
                for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
                    (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
                //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
                (document.querySelector('.sleepTime') as HTMLElement).style.animation = "darkenWindow 2s linear forwards";
            }
            else {
                for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
                    (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.height = "0.4%";
                //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "0.4%";
                (document.querySelector('.sleepTime') as HTMLElement).style.opacity = "100%";
            }
            (document.querySelector('.lamp') as HTMLElement).style.backgroundColor = "rgb(238, 255, 0)";
            window.removeEventListener("touchmove", this.process_touchmove, false);
        }
        else {
            if (animation) {
                for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
                    (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.animation = "openEyes 1s linear forwards";
                //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "openEyes 1s linear forwards";


                (document.querySelector('.sleepTime') as HTMLElement).style.animation = "lightenWindow 2s linear forwards";

            } else {
                for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
                    (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.height = "10%";
                //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "10%";
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
        for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
            (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
            (document.querySelectorAll('.pupil')[i] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";
        //(document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";

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

        for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
            (document.querySelectorAll('.creatureEye')[i] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
        for (let i = 0; i < document.querySelectorAll('.pupil').length; i++)
            (document.querySelectorAll('.pupil')[i] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";
        //(document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX / 6 + "vh," + posY / 3 + "vh)";

        (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX / 2 + "vh," + posY / 2 + "vh)";


    }


    private setAppearance(type: number): string {

        switch (type) {
            case 1:
                return "polygon(20% 100%, 20% 41%, 23% 22%, 33% 8%, 50% 3%, 66% 8%, 76% 22%, 80% 41%, 80% 100%)";
            case 2:
                return "polygon(50% 1%, 79% 7%, 90% 31%, 92% 66%, 82% 99%, 51% 84%, 22% 98%, 12% 65%, 10% 33%, 20% 6%)";
            case 3:
                return "polygon(30% 0%, 70% 0%, 100% 30%, 78% 30%, 80% 100%, 0 100%, 3% 59%, 18% 33%)";
            case 4:
                return "polygon(36% 30%, 68% 32%, 84% 0, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 18% 0)";
        }
        return "polygon(20% 100%, 20% 41%, 23% 22%, 33% 8%, 50% 3%, 66% 8%, 76% 22%, 80% 41%, 80% 100%)";

    }

    draw(creatureDiv: HTMLElement) {
        switch (this.getType()) {
            case 1:
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureMouth'><span class='upperLip'></span></div>";
                creatureDiv.style.clipPath = this.setAppearance(this.getType());
                break;
            case 2:
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureMouth'><span class='upperLip'></span></div>";
                creatureDiv.style.clipPath = this.setAppearance(this.getType());
                break;
            case 3:
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                // creatureDiv.innerHTML += "  <div class='creatureEye'><div class='pupil'></div></div>";
                creatureDiv.innerHTML += "  <div class='creatureMouth'><span class='upperLip'></span></div>";
                creatureDiv.style.clipPath = this.setAppearance(this.getType());
                for (let i = 0; i < creatureDiv.getElementsByTagName('div').length; i++)
                    creatureDiv.getElementsByTagName('div')[i].style.top = "5%";
                break;
            case 4:
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureEye'><span class='pupil'></span></div>";
                creatureDiv.innerHTML += "  <div class='creatureMouth'><span class='upperLip'></span></div>";
                creatureDiv.style.clipPath = this.setAppearance(this.getType());
                for (let i = 0; i < creatureDiv.getElementsByTagName('div').length; i++)
                    creatureDiv.getElementsByTagName('div')[i].style.top = "40%";

                break;
        }
        // return "polygon(20% 100%, 20% 41%, 23% 22%, 33% 8%, 50% 3%, 66% 8%, 76% 22%, 80% 41%, 80% 100%)";


    }




    public getAppearance() {
        return this.appearance;
    }
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
    public addHealth(health: number): void {
        this.health = Number(this.health) + Number(health);
        if (this.health > 100)
            this.health = 100;
    }

    public getHunger(): number {
        return this.hunger;
    }

    public setHunger(hunger: number): void {
        this.hunger = hunger;
    }
    public addHunger(hunger: number): void {
        this.hunger = Number(this.hunger) + Number(hunger);
        if (this.hunger > 100)
            this.hunger = 100;
    }
    public getTiredness(): number {
        return this.tiredness;
    }

    public setTiredness(tiredness: number): void {
        this.tiredness = tiredness;
    }
    public addTiredness(tiredness: number): void {
        this.tiredness = Number(this.tiredness) + Number(tiredness);
        if (this.tiredness > 100)
            this.tiredness = 100;
    }

}