import { Dayjs } from "dayjs";
import { getDateWithoutTime } from "../../utils/Date";
import database from "../Database";

export interface ServerActivity {
    date: Dayjs;

    voiceMinute: number;
    messageCount: number;
    memberCount: number;
}

const serverActivityCollection = database.collection<ServerActivity>("serveractivity");
export default serverActivityCollection;

// FUNCTIONS //

export async function getServerActivity(): Promise<ServerActivity> {
    let serverActivity = await serverActivityCollection.findOne({
        date: getDateWithoutTime()
    });

    if (!serverActivity) {
        const defaultValue = {
            date: getDateWithoutTime(),

            voiceMinute: 0,
            messageCount: 0,
            memberCount: 0
        };
        const insert = await serverActivityCollection.insertOne(defaultValue);

        serverActivity = {
            _id: insert.insertedId,
            ...defaultValue
        };
    }

    return serverActivity;
}