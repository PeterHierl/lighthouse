/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * @type {Array<Smokehouse.ExpectedRunnerResult>}
 * Expected Lighthouse audit values for byte efficiency tests
 */
const expectations = [
  {
    artifacts: {
      ScriptElements: [
        {
          type: null,
          src: null,
          async: false,
          defer: false,
          source: 'head',
          devtoolsNodePath: '2,HTML,0,HEAD,3,SCRIPT',
        },
        {
          type: 'application/javascript',
          src: 'http://localhost:10200/byte-efficiency/script.js',
          async: false,
          defer: false,
          source: 'head',
          devtoolsNodePath: '2,HTML,0,HEAD,5,SCRIPT',
        },
        {
          type: null,
          src: null,
          async: false,
          defer: false,
          source: 'body',
          devtoolsNodePath: '2,HTML,1,BODY,0,DIV,3,SCRIPT',
        },
        {
          type: null,
          src: null,
          async: false,
          defer: false,
          source: 'body',
          devtoolsNodePath: '2,HTML,1,BODY,3,SCRIPT',
        },
        {
          type: null,
          src: 'http://localhost:10200/byte-efficiency/delay-complete.js?delay=8000',
          async: true,
          defer: false,
          source: 'body',
          devtoolsNodePath: '2,HTML,1,BODY,1438,SCRIPT',
        },
        {
          type: null,
          src: null,
          async: false,
          defer: false,
          source: 'body',
          devtoolsNodePath: '2,HTML,1,BODY,1439,SCRIPT',
          content: /Used block #1/,
        },
        {
          type: null,
          src: null,
          async: false,
          defer: false,
          source: 'body',
          devtoolsNodePath: '2,HTML,1,BODY,1440,SCRIPT',
          content: /Unused block #1/,
        },
      ],
    },
    lhr: {
      requestedUrl: 'http://localhost:10200/byte-efficiency/tester.html',
      finalUrl: 'http://localhost:10200/byte-efficiency/tester.html',
      audits: {
        'unminified-css': {
          details: {
            overallSavingsBytes: '>17000',
            items: {
              length: 2,
            },
          },
        },
        'unminified-javascript': {
          score: '<1',
          details: {
            overallSavingsBytes: '>45000',
            overallSavingsMs: '>500',
            items: [
              {
                url: 'http://localhost:10200/byte-efficiency/script.js',
                wastedBytes: '46481 +/- 100',
                wastedPercent: '87 +/- 5',
              },
              {
                url: 'inline: \n  function unusedFunction() {\n    // Un...',
                wastedBytes: '6581 +/- 100',
                wastedPercent: '99.6 +/- 0.1',
              },
              {
                url: 'inline: \n  // Used block #1\n  // FILLER DATA JUS...',
                wastedBytes: '6559 +/- 100',
                wastedPercent: 100,
              },
            ],
          },
        },
        'unused-css-rules': {
          details: {
            overallSavingsBytes: '>40000',
            items: {
              length: 2,
            },
          },
        },
        'unused-javascript': {
          score: '<1',
          details: {
            overallSavingsBytes: '>=25000',
            overallSavingsMs: '>300',
            items: {
              length: 2,
            },
          },
        },
        'offscreen-images': {
          details: {
            items: [
              {
                url: /lighthouse-unoptimized.jpg$/,
              }, {
                url: /lighthouse-480x320.webp$/,
              }, {
                url: /lighthouse-480x320.webp\?invisible$/,
              }, {
                url: /large.svg$/,
              },
            ],
          },
        },
        'uses-webp-images': {
          details: {
            overallSavingsBytes: '>60000',
            items: {
              length: 5,
            },
          },
        },
        'uses-text-compression': {
          score: '<1',
          details: {
            overallSavingsMs: '>700',
            overallSavingsBytes: '>50000',
            items: {
              length: 2,
            },
          },
        },
        'uses-optimized-images': {
          details: {
            overallSavingsBytes: '>10000',
            items: {
              length: 1,
            },
          },
        },
        'uses-responsive-images': {
          displayValue: 'Potential savings of 53\xa0KB',
          details: {
            overallSavingsBytes: '>50000',
            items: {
              0: {wastedPercent: '<46'},
              1: {wastedPercent: '<46'},
              length: 2,
            },
          },
        },
      },
    },
  },
  {
    lhr: {
      requestedUrl: 'http://localhost:10200/byte-efficiency/gzip.html',
      finalUrl: 'http://localhost:10200/byte-efficiency/gzip.html',
      audits: {
        'network-requests': {
          details: {
            items: [
              {
                url: 'http://localhost:10200/byte-efficiency/gzip.html',
              },
              {
                url: 'http://localhost:10200/byte-efficiency/script.js?gzip=1',
                transferSize: '1100 +/- 100',
                resourceSize: '53000 +/- 1000',
              },
              {
                url: 'http://localhost:10200/byte-efficiency/script.js',
                transferSize: '53200 +/- 1000',
                resourceSize: '53000 +/- 1000',
              },
              {
                url: 'http://localhost:10200/favicon.ico',
              },
            ],
          },
        },
      },
    },
  },
];

module.exports = expectations;
