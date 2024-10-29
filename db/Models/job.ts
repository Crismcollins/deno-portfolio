import { DataTypes, Model, Relationships } from '../../deps.ts';
import { Game, User } from "./index.ts";

export class Job extends Model {
  static table = 'jobs'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    userId: DataTypes.STRING, 
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATETIME,
    end_date: DataTypes.DATETIME,
    company: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es']),
  };

  static user() {
    return this.hasOne(User);
  }

  static games() {
    return this.hasMany(Game);
  }
}

Relationships.belongsTo(Job, User);
