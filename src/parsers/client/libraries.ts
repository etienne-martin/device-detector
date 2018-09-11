import { Libraries } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface LibraryResult {
  type: string;
  name: string;
  version: string;
  url: string;
}

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const libraries: Libraries = loadRegexes("client/libraries");

export default class LibraryParser {
  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
  }

  public parse = (userAgent: string): LibraryResult => {
    const result: LibraryResult = {
      type: "",
      name: "",
      version: "",
      url: ""
    };

    for (const library of libraries) {
      const match = userAgentParser(library.regex, userAgent);

      if (!match) continue;

      result.type = "library";
      result.name = variableReplacement(library.name, match);
      result.version = formatVersion(variableReplacement(library.version, match), this.options.versionTruncation);
      result.url = library.url || "";
      break;
    }

    return result;
  };
}
