export const credentials = {
  userName: process.env.TEST_USERNAME || 'TestUser877',
  password: process.env.TEST_PASSWORD || 'C{fjr$)KGY&%'
};


export const urls = {
    base: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/',
    login: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn',
    benefits: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits'
};

export const timeouts = {
  default: 5000,
  long: 90000,
  navigation: 30000,
  captcha: 1000
};
