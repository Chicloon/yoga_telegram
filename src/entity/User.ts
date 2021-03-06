import { v4 as uuid } from 'uuid';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  BeforeInsert
} from "typeorm";


@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid") id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "varchar", length: "230" })
  password: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
