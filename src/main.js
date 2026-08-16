import { Actor, log } from 'apify';
import { fetchFacilities } from './cms.js';

await Actor.init();

const input = (await Actor.getInput()) ?? {};
const { name, state, minRating, maxResults = 25 } = input;

/** Must match the event name configured in this Actor's pay-per-event pricing on Apify. */
const FACILITY_SEARCH_EVENT = 'facility-search';

const facilities = await fetchFacilities({
    name,
    state,
    minRating,
    maxResults: Math.min(maxResults, 100),
});

for (const facility of facilities) {
    await Actor.pushData(facility);
}

await Actor.charge({ eventName: FACILITY_SEARCH_EVENT });

log.info(`Pushed ${facilities.length} facility(s)`);

await Actor.exit();
