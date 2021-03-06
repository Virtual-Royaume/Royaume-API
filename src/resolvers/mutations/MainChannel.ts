import { Resolvers } from "../../interfaces/ServerSchema";
import channelCollection from "../../database/collections/MainChannel";

const mainChannelMutation: Resolvers["Mutation"] = {
    addChannel: async(_, { channelId, category }) => !!(
        await channelCollection.updateOne(
            { channelId },
            { $setOnInsert: { channelId, category } },
            { upsert: true }
        )
    ).upsertedCount,

    removeChannel: async(_, { channelId }) => !!(await channelCollection.deleteOne({ channelId })).deletedCount
};

export default mainChannelMutation;