export class Food {
    private type: number;
    private name: string;
    private hungPoints: number;
    private tiredPoints: number;
    private healthPoints: number;
    private cssClassName: string;
    private canEat: boolean = false;

    constructor(type: number, name: string, cssClassName: string, healthPoints: number, hungPoints: number, tiredPoints: number) {
        this.type = type;
        this.name = name;
        this.hungPoints = hungPoints;
        this.healthPoints = healthPoints;
        this.tiredPoints = tiredPoints;
        this.cssClassName = cssClassName;

    };

    public getType(): number {
        return this.type;
    }
    public getCssClassName(): string {
        return this.cssClassName;
    }
    public getName(): string{
        return this.name;
    }
    public getTiredPoints(): number{
        return this.tiredPoints;
    }
    public getHungerPoints(): number{
        return this.hungPoints;
    }
    public getHealthPoints(): number{
        return this.healthPoints;
    }
    public setType(type: number){
        this.type = type;
    }
    public getCanEat(): boolean{
        return this.canEat;
    }
    public setCanEat(can: boolean){
        this.canEat = can;
    }
    /*draw(){
        switch(this.type){
            case 1:

            break;
        }
    }*/

    
}