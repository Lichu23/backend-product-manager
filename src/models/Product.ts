import {Table, Column, Model, DataType, Default} from "sequelize-typescript"

@Table({
    tableName:"products",

})

class Product extends Model {
    @Column({
        type: DataType.STRING(100) //maximo 100 caracteres
    })
    declare name:string
    @Column({
        type: DataType.FLOAT //maximo 6 caracteres y 2 decimales
    })
    declare price:number
    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN 
    })
    declare availability:boolean
}

export default Product

