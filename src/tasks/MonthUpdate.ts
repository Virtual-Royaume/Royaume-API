import memberCollection, { getMembersWithPoints } from "../database/collections/Member";
import tier from "../../resources/config/tier.json";
import { TierUpdate } from "../interfaces/ServerSchema";

setInterval(async() => {
    const date = new Date();

    if (date.getDate() === 1 && date.getHours() === 0 && date.getMinutes() === 0) {
        // Update member tiers :
        const members = await memberCollection.find({ isOnServer: true }).toArray();
        const membersWithPoints = await getMembersWithPoints();

        for (const member of members) {
            const memberPoints = membersWithPoints.find(m => m._id === member._id);

            if (!memberPoints) continue;

            if (memberPoints.points.progress === TierUpdate.Up) {
                if (member.activity.tier !== tier.max) {
                    await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": -1 } });
                }

                continue;
            }

            if (memberPoints.points.progress === TierUpdate.Down) {
                if (member.activity.tier !== tier.min) {
                    await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": 1 } });
                }

                continue;
            }
        }

        // Reset member activity :
        memberCollection.updateMany({}, { $set: { "activity.messages.monthCount": 0, "activity.monthVoiceMinute": 0 } });
    }
}, 60_000);