import { DataTypes, Model } from '../../deps.ts';
import { Education, Game, Job, Skill } from "./index.ts";

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
    github_url: DataTypes.STRING,
    location: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING,
    about_me: DataTypes.STRING,
    study_title: DataTypes.STRING,
    language: DataTypes.enum(['en', 'es']),
  };

  static jobs() {
    return this.hasMany(Job);
  }

  static educations() {
    return this.hasMany(Education);
  }

  static games() {
    return this.hasMany(Game);
  }

  static skills() {
    return this.hasMany(Skill);
  }
}
