'use strict';

module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/**/*.test.js'],
    testPathIgnorePatterns: ['/src/', 'node_modules'],
    snapshotSerializers: ['enzyme-to-json/serializer']
};
