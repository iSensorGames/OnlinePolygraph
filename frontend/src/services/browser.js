import decode from "jwt-decode";

const keys = {
  TOKEN: "token",
  SETTINGS: "settings"
};

export function getProfile() {
  return decode(localStorage.getItem(keys.TOKEN));
}

export function updateSession(token) {
  let session = {};

  if (token) {
    session = getSession(token);
  }

  if (!!session) {
    localStorage.setItem(keys.TOKEN, token);
  } else {
    localStorage.removeItem(keys.TOKEN);
  }
}

export function getSession(token = localStorage.getItem(keys.TOKEN)) {
  let session = {};

  try {
    const profile = decode(token);

    session = {
      token,
      userId: profile.id,
      expiryTime: profile.exp
    };
  } catch (error) {
    session = null;
  }

  return session;
}

export function getSettings() {
  let settings = localStorage.getItem(keys.SETTINGS);

  if (!!!settings) {
    return null;
  }

  try {
    settings = JSON.parse(settings);
  } catch (e) {
    settings = null;
  }

  return settings;
}
