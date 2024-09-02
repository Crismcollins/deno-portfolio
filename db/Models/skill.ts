import { DataTypes, Model, Relationships } from '../../deps.ts';
import { User } from "./index.ts";

export class Skill extends Model {
  static table = 'skills'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    type: DataTypes.enum(['hard', 'soft']),
    language: DataTypes.enum(['en', 'es']),
  };

  static user() {
    return this.hasOne(User);
  }
}

Relationships.belongsTo(Skill, User);
