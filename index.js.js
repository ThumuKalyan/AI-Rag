import { askQuestion } from './query.js';

const siteNickname = 'Credera'; // Must match the nickname you used earlier
const question = "What does this website talk about?"; 

console.log(`Asking about ${siteNickname}...`);
askQuestion(siteNickname, question);