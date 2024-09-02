import { DataTypes, Model } from '../../deps.ts';
import { Education, Job, Skill } from "./index.ts";

export class User extends Model {
  static table = 'users'; 
  static timestamps = false;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    full_name: DataTypes.STRING,
    profession: DataTypes.STRING,
    alias: DataTypes.STRING,
    email: DataTypes.STRING,
    linkedin_url: DataTypes.STRING,
    about_me: DataTypes.STRING,
    study_title: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es']),
  };

  static jobs() {
    return this.hasMany(Job);
  }

  static skills() {
    return this.hasMany(Skill);
  }

  static educations() {
    return this.hasMany(Education);
  }
}
