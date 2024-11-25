import { DataTypes, Model, Relationships } from '../../deps.ts';
import { User } from "./index.ts";

export class Education extends Model {
  static table = 'educations'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    institution: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATETIME,
    end_date: DataTypes.DATETIME,
    language: DataTypes.enum(['en', 'es']),
    location: DataTypes.TEXT,
    logo: DataTypes.TEXT,
  };

  static user() {
    return this.hasOne(User);
  };
}


Relationships.belongsTo(Education, User);
