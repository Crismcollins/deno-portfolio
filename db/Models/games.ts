import { DataTypes, Model, Relationships } from '../../deps.ts';
import { User } from "./index.ts";

export class Game extends Model {
  static table = 'games'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    background: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    duration: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es']),
  };

  static user() {
    return this.hasOne(User);
  };
}


Relationships.belongsTo(Game, User);
