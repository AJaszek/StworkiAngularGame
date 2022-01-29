export class Creature {
    private type: number;
    private kind: string;
    private description: string;
    private name: string;
    private level: number;
    private health: number;
    private hunger: number;
    private tiredness: number;
    private sleep: boolean = false;

    constructor(
        type: number,
        kind: string,
        description: string,
        name: string = "",
        level: number = 0,
        health: number = 0,
        hunger: number = 0,
        tiredness: number = 0) {

        this.type = type;
        this.kind = kind;
        this.description = description;
        this.name = name;
        this.level = level;
        this.health = health;
        this.hunger = hunger;
        this.tiredness = tiredness;
    }

    public setSleep(sleep:boolean){
        this.sleep=sleep;
    }
    public getSleep(){
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