import decode from "jwt-decode";

const keys = {
  TOKEN: "token",
  SETTINGS: "settings"
};

export function getToken() {
  return localStorage.getItem(keys.TOKEN);
}

export function getProfile(token) {
  return decode(token ? token : getToken());
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

export function getSession(token = getToken()) {
  let session = {};

  try {
    const profile = getProfile(token);

    session = {
      token,
      user: {
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        roles: profile.roles
      }
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
