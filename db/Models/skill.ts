import { DataTypes, Model, Relationships } from '../../deps.ts';
import { Game, Job, User } from "./index.ts";

export class Skill extends Model {
  static table = 'skills'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    type: DataTypes.enum(['hard', 'soft']),
    image: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es', 'both']),
  };

  static user() {
    return this.hasOne(User);
  }

  static games() {
    return this.hasMany(Game);
  }

  static jobs() {
    return this.hasMany(Job);
  }
}

Relationships.belongsTo(Skill, User);
