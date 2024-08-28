import { DataTypes, Model, Relationships } from '../../deps.ts';
import { User } from "./index.ts";

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
  };

  static user() {
    return this.hasOne(User);
  }
}

Relationships.belongsTo(Job, User);
