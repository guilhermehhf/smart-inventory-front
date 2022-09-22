export class Regex{
    public emailTest(campo:string) : boolean{
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(campo)
    }
    public minMaxTest(min:number, max:number, campo:string): boolean{
        const minMax = new RegExp("^.{" + min + "," + max + "}$")
        // const minMaxRegex = /^.{min,max}$/
        return minMax.test(campo)
    }
    
}