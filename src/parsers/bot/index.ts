import { Bots } from "../../typings/bot";
import { userAgentParser } from "../../utils/user-agent";
import { get } from "../../utils/get";
import { BotResult } from "./typing";

namespace BotParser {
  export type DeviceDetectorBotResult = BotResult | null;
}

const bots: Bots = require("../../../fixtures/regexes/bots.json");

class BotParser {
  public parse = (userAgent: string): BotParser.DeviceDetectorBotResult => {
    for (const bot of bots) {
      const match = userAgentParser(bot.regex, userAgent);

      if (!match) continue;

      return {
        name: bot.name,
        category: bot.category || "",
        url: bot.url || "",
        producer: {
          name: get(bot, "producer.name", ""),
          url: get(bot, "producer.url", "")
        }
      };
    }

    return null;
  };
}

export = BotParser;
