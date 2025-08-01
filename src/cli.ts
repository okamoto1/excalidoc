import { Command } from "commander";
import { generate } from "./generate";

import { excalidocDefaulStyles } from "./defaults/styles";

export function runCli() {
  const program = new Command();

  program
    .name("excalidoc")
    .description("CLI to generate Excalidraw documentation from decorators")
    .version("1.0.0");

  program
    .argument("<files...>", "Glob patterns or path to file")
    .option("-o, --out <file>", "Output file path", "excalidoc.excalidraw.json")
    .action(async (files: string[], options: { out: string }) => {
      try {
        await generate(files, excalidocDefaulStyles, options.out);
        console.log(`✅ ${options.out}`);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });

  program.parse();
}
