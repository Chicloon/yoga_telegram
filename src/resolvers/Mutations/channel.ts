import { ResolverMap } from "../../types/ResolverType";
import { Channel } from "../../entity/Channel";
import { User } from "../../entity/User";
import { getConnection, getRepository, getManager } from "typeorm";
import { validate } from "class-validator";

import * as _ from "lodash";
import { Category } from "../../entity/Category";
import { Question } from "../../entity/Question";
import { ChannelMember } from "../../entity/ChannelMember";

// import { Question } from "../../entity/Question";

// const connection = getConnection();
// console.log(connection);

// const manager = getConnection().manager;

export const channelResolvers: ResolverMap = {
  createChannel: async (parentValues, args) => {
    const user = await User.findOne(1);
    const newChannel = await Channel.create({ name: args.name });

    const errors = await validate(newChannel);
    console.log(errors);
    if (errors.length > 0) {
      const constraints = errors[0].constraints;
      const errorMsg = constraints[Object.keys(constraints)[0]];

      throw new Error(errorMsg);
    } else {
      await newChannel.save();
    }
    return newChannel;
  },
  addChannelMember: async (_, { channelId, userId }) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Channel, "users")
        .of(channelId)
        .add(userId);
      return true;
    } catch (error) {
      throw new Error(`User already channel's member`);
    }
  },
  async test() {
    // const channel = await getRepository(Channel)
    //   .createQueryBuilder("channel")
    //   .leftJoinAndSelect("channel.users", "user")
    //   .where("user.id = :cid", { cid: 13 })
    //   .andWhere("channel.id = :id", { id: 7 })
    //   .getOne();

    // console.log("found channel", channel);

    const user = await User.findOne(1);

    console.log("found user", user);

    // const channel = await getConnection()
    //   .createQueryBuilder()
    //   .relation(Channel, "users")
    //   .of(1)
    //   .add(3);

    // console.log("found channel", channel);

    const channelMembers = await getRepository(ChannelMember)
      .createQueryBuilder("channelMember")
      .where("channelMember.role = :role", { role: "admin" })
      .innerJoinAndSelect("channelMember.user", "user")
      .leftJoinAndSelect("channelMember.channel", "channel")
      // .where("user.id = :id", { id: user.id })
      .getMany();

    // const member = await ChannelMember.findOne({
    //   where: { userId: 3 }
    // });
    // console.log("found member", member);

    // member.role = "admin";
    // member.save();

    console.log(await ChannelMember.find());
    // const channelMembers = await ChannelMember.find({
    //   where: { channelId: 1, role: "admin" }
    // });

    console.log("channel members", channelMembers);

    return true;
  }
  // async createChannelMember(_, { userId, channelId }) {
  //   const member = { role: "user", channelId: args.channel, userId: args.user };

  //   const user = await User.findOneById(userId);

  //   console.log(member);
  //   const channelMember = await new ChannelMember();
  //   channelMember.role = "the role";
  //   channelMember.user = user;
  //   channelMember.save();

  //   return channelMember;
  // }
};
