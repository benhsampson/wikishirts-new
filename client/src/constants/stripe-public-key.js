// NOTE: ENSURE THIS IS SET TO PRODUCTION TOO
export default process.env.NODE_ENV === 'production' ? process.env.PUBLIC_KEY_LIVE : process.env.PUBLIC_KEY_TEST;
