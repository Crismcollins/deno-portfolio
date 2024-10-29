import { DataTypes, Model, Relationships } from '../../deps.ts';
import { Job, Skill, User } from "./index.ts";

export class Game extends Model {
  static table = 'games'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    background: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    duration: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es']),
  };

  static user() {
    return this.hasOne(User);
  };

  static skills() {
    return this.hasMany(Skill);
  };

  static job() {
    return this.hasOne(Job);
  };
}


Relationships.belongsTo(Game, User);
