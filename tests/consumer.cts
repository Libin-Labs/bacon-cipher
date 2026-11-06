import { encodeBacon, decodeBacon } from '@lp-labs/bacon-cipher';
if (decodeBacon(encodeBacon('HELLO')) !== 'HELLO') throw new Error('Bacon');
// @ts-expect-error invalid argument must be rejected by declarations
encodeBacon(42);
