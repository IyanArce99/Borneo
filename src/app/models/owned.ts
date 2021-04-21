export class Owned{
    constructor(public id:number,public nombre:string,public descripcion:string,public personas:number, public access:boolean,
    public salas_reuniones:boolean,public reception:boolean,public eventos_network:boolean,public terraza:boolean, 
    public cafe_relax:boolean, public seguridad:boolean,public limpieza:boolean,public tarifa:number,public tipo_propiedad:string,
    public imagen:string, public direccion:string, public ciudad:string, public comunidad_autonoma:string){}
}