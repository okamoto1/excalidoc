#!/usr/bin/env node
require("reflect-metadata");
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  },
});

require("../dist/cli").runCli();
