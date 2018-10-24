// NOTE: ENSURE THIS IS SET TO PRODUCTION TOO
export default process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PUBLIC_KEY_LIVE : process.env.REACT_APP_PUBLIC_KEY_TEST;
