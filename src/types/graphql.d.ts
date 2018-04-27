// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
me: IUser;
users: Array<IUser> | null;
user: IUser | null;
channels: Array<IChannel>;
messages: Array<IMessage>;
}

interface IUserOnQueryArguments {
id: string;
}

interface IUser {
__typename: "User";
id: string;
email: string;
name: string;
password: string;
channels: Array<IChannel> | null;
}

interface IChannel {
__typename: "Channel";
id: string;
name: string;
members: Array<IChannelMember>;
}

interface IChannelMember {
__typename: "ChannelMember";
id: string;
member: IUser;
channel: IChannel;
role: string;
}

interface IMessage {
__typename: "Message";
id: string;
text: string | null;
user: IUser;
channel: IChannel | null;
createdAt: any;
}

interface IMutation {
__typename: "Mutation";
createMessage: IMessage | null;
createUser: IUser;
createChannel: IChannel;
addChannelMember: boolean;
signup: IUser;
test: boolean | null;
}

interface ICreateMessageOnMutationArguments {
channelId: number;
userId: number;
text: string;
}

interface ICreateUserOnMutationArguments {
email: string;
password: string;
name: string;
}

interface ICreateChannelOnMutationArguments {
name: string;
member?: number | null;
}

interface IAddChannelMemberOnMutationArguments {
channelId?: number | null;
userId?: number | null;
}

interface ISignupOnMutationArguments {
email: string;
password: string;
name: string;
}
}

// tslint:enable
