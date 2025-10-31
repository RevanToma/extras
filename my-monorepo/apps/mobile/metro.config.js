// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Project root should be the mobile app directory only
config.projectRoot = __dirname;

// Only watch the mobile app directory, not the entire monorepo
config.watchFolders = [__dirname];

// Block Metro from watching build directories of other apps in monorepo
// This prevents Metro from trying to watch directories that don't exist yet
config.resolver = {
  ...config.resolver,
  blockList: [
    // Ignore strapi dist and other build directories
    /.*[/\\]apps[/\\]strapi.*/,
    /.*[/\\]apps[/\\]web[/\\].*\.next.*/,
    /.*[/\\]apps[/\\]docs[/\\].*\.next.*/,
    // Also ignore from root node_modules perspective
    /.*strapi.*dist.*/,
    /.*strapi.*\.cache.*/,
  ],
};

// Override watcher configuration
config.watcher = {
  ...config.watcher,
  watchman: {
    deferStates: ['hg.update'],
  },
  additionalExts: ['cjs', 'mjs'],
  healthCheck: {
    enabled: true,
  },
};

module.exports = config;
