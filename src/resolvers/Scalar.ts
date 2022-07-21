import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../interfaces/ServerSchema";
import { getDateWithoutTime } from "../utils/Date";
import DayJS from "../utils/DayJS";

export const date: Resolvers["Date"] = new GraphQLScalarType({
    name: "Date",
    description: "Date without time",

    serialize(value) {
        return getDateWithoutTime(DayJS(value as Date)).millisecond();
    },
    parseValue(value) {
        return getDateWithoutTime(DayJS(value as string));
    },
    parseLiteral(ast) {
        return ast.kind === Kind.STRING
            ? getDateWithoutTime(DayJS(ast.value))
            : null;
    }
});