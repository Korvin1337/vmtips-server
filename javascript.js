const { useState, useEffect, useMemo, useRef, useCallback } = React;

const BIN_ID = "6a2a6a67f5f4af5e29dd5d26";
const MASTER_KEY =
  "$2a$10$hMIAUZmGPHnRrjwR/6Ai7.dBiwaa5Ki2zhznO8PeNh4inpRkeyWHW";

const JSONBIN_READ_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const JSONBIN_WRITE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const SYNC = {
  IDLE: "idle",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
  LOADING: "loading",
};

const baseFixtures = [
  {
    id: 1,
    date: "Torsdag 11 juni",
    time: "21:00",
    home: "Mexiko",
    away: "Sydafrika",
    tv: "TV4",
  },
  {
    id: 2,
    date: "Fredag 12 juni",
    time: "04:00",
    home: "Sydkorea",
    away: "Tjeckien",
    tv: "TV4",
  },
  {
    id: 3,
    date: "Fredag 12 juni",
    time: "21:00",
    home: "Kanada",
    away: "Bosnien och Hercegovina",
    tv: "SVT",
  },
  {
    id: 4,
    date: "Lördag 13 juni",
    time: "03:00",
    home: "USA",
    away: "Paraguay",
    tv: "TV4",
  },
  {
    id: 5,
    date: "Lördag 13 juni",
    time: "21:00",
    home: "Qatar",
    away: "Schweiz",
    tv: "TV4",
  },
  {
    id: 6,
    date: "Söndag 14 juni",
    time: "00:00",
    home: "Brasilien",
    away: "Marocko",
    tv: "SVT",
  },
  {
    id: 7,
    date: "Söndag 14 juni",
    time: "03:00",
    home: "Haiti",
    away: "Skottland",
    tv: "SVT",
  },
  {
    id: 8,
    date: "Söndag 14 juni",
    time: "06:00",
    home: "Australien",
    away: "Turkiet",
    tv: "TV4",
  },
  {
    id: 9,
    date: "Söndag 14 juni",
    time: "19:00",
    home: "Tyskland",
    away: "Curacao",
    tv: "TV4",
  },
  {
    id: 10,
    date: "Söndag 14 juni",
    time: "22:00",
    home: "Nederländerna",
    away: "Japan",
    tv: "TV4",
  },
  {
    id: 11,
    date: "Måndag 15 juni",
    time: "01:00",
    home: "Elfenbenskusten",
    away: "Ecuador",
    tv: "TV4",
  },
  {
    id: 12,
    date: "Måndag 15 juni",
    time: "04:00",
    home: "Sverige",
    away: "Tunisien",
    tv: "SVT",
  },
  {
    id: 13,
    date: "Måndag 15 juni",
    time: "18:00",
    home: "Spanien",
    away: "Kap Verde",
    tv: "SVT",
  },
  {
    id: 14,
    date: "Måndag 15 juni",
    time: "21:00",
    home: "Belgien",
    away: "Egypten",
    tv: "SVT",
  },
  {
    id: 15,
    date: "Tisdag 16 juni",
    time: "00:00",
    home: "Saudiarabien",
    away: "Uruguay",
    tv: "TV4",
  },
  {
    id: 16,
    date: "Tisdag 16 juni",
    time: "03:00",
    home: "Iran",
    away: "Nya Zeeland",
    tv: "TV4",
  },
  {
    id: 17,
    date: "Tisdag 16 juni",
    time: "21:00",
    home: "Frankrike",
    away: "Senegal",
    tv: "SVT",
  },
  {
    id: 18,
    date: "Onsdag 17 juni",
    time: "00:00",
    home: "Irak",
    away: "Norge",
    tv: "TV4",
  },
  {
    id: 19,
    date: "Onsdag 17 juni",
    time: "03:00",
    home: "Argentina",
    away: "Algeriet",
    tv: "TV4",
  },
  {
    id: 20,
    date: "Onsdag 17 juni",
    time: "06:00",
    home: "Österrike",
    away: "Jordanien",
    tv: "TV4",
  },
  {
    id: 21,
    date: "Onsdag 17 juni",
    time: "19:00",
    home: "Portugal",
    away: "Kongo-Kinshasa",
    tv: "TV4",
  },
  {
    id: 22,
    date: "Onsdag 17 juni",
    time: "22:00",
    home: "England",
    away: "Kroatien",
    tv: "TV4",
  },
  {
    id: 23,
    date: "Torsdag 18 juni",
    time: "01:00",
    home: "Ghana",
    away: "Panama",
    tv: "TV4",
  },
  {
    id: 24,
    date: "Torsdag 18 juni",
    time: "04:00",
    home: "Uzbekistan",
    away: "Colombia",
    tv: "TV4",
  },
  {
    id: 25,
    date: "Torsdag 18 juni",
    time: "18:00",
    home: "Tjeckien",
    away: "Sydafrika",
    tv: "TV4",
  },
  {
    id: 26,
    date: "Torsdag 18 juni",
    time: "21:00",
    home: "Schweiz",
    away: "Bosnien och Hercegovina",
    tv: "TV4",
  },
  {
    id: 27,
    date: "Fredag 19 juni",
    time: "00:00",
    home: "Kanada",
    away: "Qatar",
    tv: "TV4",
  },
  {
    id: 28,
    date: "Fredag 19 juni",
    time: "03:00",
    home: "Mexiko",
    away: "Sydkorea",
    tv: "TV4",
  },
  {
    id: 29,
    date: "Fredag 19 juni",
    time: "21:00",
    home: "USA",
    away: "Australien",
    tv: "SVT",
  },
  {
    id: 30,
    date: "Lördag 20 juni",
    time: "00:00",
    home: "Skottland",
    away: "Marocko",
    tv: "SVT",
  },
  {
    id: 31,
    date: "Lördag 20 juni",
    time: "03:00",
    home: "Brasilien",
    away: "Haiti",
    tv: "TV4",
  },
  {
    id: 32,
    date: "Lördag 20 juni",
    time: "06:00",
    home: "Turkiet",
    away: "Paraguay",
    tv: "TV4",
  },
  {
    id: 33,
    date: "Lördag 20 juni",
    time: "19:00",
    home: "Nederländerna",
    away: "Sverige",
    tv: "TV4",
  },
  {
    id: 34,
    date: "Lördag 20 juni",
    time: "22:00",
    home: "Tyskland",
    away: "Elfenbenskusten",
    tv: "TV4",
  },
  {
    id: 35,
    date: "Söndag 21 juni",
    time: "02:00",
    home: "Ecuador",
    away: "Curacao",
    tv: "TV4",
  },
  {
    id: 36,
    date: "Söndag 21 juni",
    time: "06:00",
    home: "Tunisien",
    away: "Japan",
    tv: "SVT",
  },
  {
    id: 37,
    date: "Söndag 21 juni",
    time: "18:00",
    home: "Spanien",
    away: "Saudiarabien",
    tv: "TV4",
  },
  {
    id: 38,
    date: "Söndag 21 juni",
    time: "21:00",
    home: "Belgien",
    away: "Iran",
    tv: "TV4",
  },
  {
    id: 39,
    date: "Måndag 22 juni",
    time: "00:00",
    home: "Uruguay",
    away: "Kap Verde",
    tv: "TV4",
  },
  {
    id: 40,
    date: "Måndag 22 juni",
    time: "03:00",
    home: "Nya Zeeland",
    away: "Egypten",
    tv: "TV4",
  },
  {
    id: 41,
    date: "Måndag 22 juni",
    time: "19:00",
    home: "Argentina",
    away: "Österrike",
    tv: "SVT",
  },
  {
    id: 42,
    date: "Måndag 22 juni",
    time: "23:00",
    home: "Frankrike",
    away: "Irak",
    tv: "SVT",
  },
  {
    id: 43,
    date: "Tisdag 23 juni",
    time: "02:00",
    home: "Norge",
    away: "Senegal",
    tv: "SVT",
  },
  {
    id: 44,
    date: "Tisdag 23 juni",
    time: "05:00",
    home: "Jordanien",
    away: "Algeriet",
    tv: "TV4",
  },
  {
    id: 45,
    date: "Tisdag 23 juni",
    time: "19:00",
    home: "Portugal",
    away: "Uzbekistan",
    tv: "SVT",
  },
  {
    id: 46,
    date: "Tisdag 23 juni",
    time: "22:00",
    home: "England",
    away: "Ghana",
    tv: "SVT",
  },
  {
    id: 47,
    date: "Onsdag 24 juni",
    time: "01:00",
    home: "Panama",
    away: "Kroatien",
    tv: "TV4",
  },
  {
    id: 48,
    date: "Onsdag 24 juni",
    time: "04:00",
    home: "Colombia",
    away: "Kongo-Kinshasa",
    tv: "TV4",
  },
  {
    id: 49,
    date: "Onsdag 24 juni",
    time: "21:00",
    home: "Schweiz",
    away: "Kanada",
    tv: "TV4",
  },
  {
    id: 50,
    date: "Onsdag 24 juni",
    time: "21:00",
    home: "Bosnien och Hercegovina",
    away: "Qatar",
    tv: "TV4",
  },
  {
    id: 51,
    date: "Torsdag 25 juni",
    time: "00:00",
    home: "Marocko",
    away: "Haiti",
    tv: "TV4",
  },
  {
    id: 52,
    date: "Torsdag 25 juni",
    time: "00:00",
    home: "Skottland",
    away: "Brasilien",
    tv: "TV4",
  },
  {
    id: 53,
    date: "Torsdag 25 juni",
    time: "03:00",
    home: "Sydafrika",
    away: "Sydkorea",
    tv: "SVT",
  },
  {
    id: 54,
    date: "Torsdag 25 juni",
    time: "03:00",
    home: "Tjeckien",
    away: "Mexiko",
    tv: "SVT",
  },
  {
    id: 55,
    date: "Torsdag 25 juni",
    time: "22:00",
    home: "Curacao",
    away: "Elfenbenskusten",
    tv: "SVT",
  },
  {
    id: 56,
    date: "Torsdag 25 juni",
    time: "22:00",
    home: "Ecuador",
    away: "Tyskland",
    tv: "SVT",
  },
  {
    id: 57,
    date: "Fredag 26 juni",
    time: "01:00",
    home: "Tunisien",
    away: "Nederländerna",
    tv: "SVT",
  },
  {
    id: 58,
    date: "Fredag 26 juni",
    time: "01:00",
    home: "Japan",
    away: "Sverige",
    tv: "SVT",
  },
  {
    id: 59,
    date: "Fredag 26 juni",
    time: "04:00",
    home: "Turkiet",
    away: "USA",
    tv: "TV4",
  },
  {
    id: 60,
    date: "Fredag 26 juni",
    time: "04:00",
    home: "Paraguay",
    away: "Australien",
    tv: "TV4",
  },
  {
    id: 61,
    date: "Fredag 26 juni",
    time: "21:00",
    home: "Norge",
    away: "Frankrike",
    tv: "TV4",
  },
  {
    id: 62,
    date: "Fredag 26 juni",
    time: "21:00",
    home: "Senegal",
    away: "Irak",
    tv: "TV4",
  },
  {
    id: 63,
    date: "Lördag 27 juni",
    time: "02:00",
    home: "Kap Verde",
    away: "Saudiarabien",
    tv: "TV4",
  },
  {
    id: 64,
    date: "Lördag 27 juni",
    time: "02:00",
    home: "Uruguay",
    away: "Spanien",
    tv: "TV4",
  },
  {
    id: 65,
    date: "Lördag 27 juni",
    time: "05:00",
    home: "Nya Zeeland",
    away: "Belgien",
    tv: "TV4",
  },
  {
    id: 66,
    date: "Lördag 27 juni",
    time: "05:00",
    home: "Egypten",
    away: "Iran",
    tv: "TV4",
  },
  {
    id: 67,
    date: "Lördag 27 juni",
    time: "23:00",
    home: "Panama",
    away: "England",
    tv: "SVT",
  },
  {
    id: 68,
    date: "Lördag 27 juni",
    time: "23:00",
    home: "Kroatien",
    away: "Ghana",
    tv: "SVT",
  },
  {
    id: 69,
    date: "Söndag 28 juni",
    time: "01:30",
    home: "Kongo-Kinshasa",
    away: "Uzbekistan",
    tv: "TV4",
  },
  {
    id: 70,
    date: "Söndag 28 juni",
    time: "01:30",
    home: "Colombia",
    away: "Portugal",
    tv: "TV4",
  },
  {
    id: 71,
    date: "Söndag 28 juni",
    time: "04:00",
    home: "Algeriet",
    away: "Österrike",
    tv: "TV4",
  },
  {
    id: 72,
    date: "Söndag 28 juni",
    time: "04:00",
    home: "Jordanien",
    away: "Argentina",
    tv: "TV4",
  },
];

const baseKnockout = [
  {
    id: 101,
    group: "16-delsfinaler",
    date: "Söndag 28 juni",
    time: "21:00",
    home: "Sydafrika",
    away: "Kanada",
    tv: "TV4",
  },
  {
    id: 102,
    group: "16-delsfinaler",
    date: "Måndag 29 juni",
    time: "19:00",
    home: "Brasilien",
    away: "Japan",
    tv: "TV4",
  },
  {
    id: 103,
    group: "16-delsfinaler",
    date: "Måndag 29 juni",
    time: "22:30",
    home: "Tyskland",
    away: "Paraguay",
    tv: "SVT",
  },
  {
    id: 104,
    group: "16-delsfinaler",
    date: "Tisdag 30 juni",
    time: "03:00",
    home: "Nederländerna",
    away: "Marocko",
    tv: "SVT",
  },
  {
    id: 105,
    group: "16-delsfinaler",
    date: "Tisdag 30 juni",
    time: "19:00",
    home: "Elfenbenskusten",
    away: "Norge",
    tv: "TV4",
  },
  {
    id: 106,
    group: "16-delsfinaler",
    date: "Tisdag 30 juni",
    time: "23:00",
    home: "Frankrike",
    away: "Sverige",
    tv: "TV4",
  },
  {
    id: 107,
    group: "16-delsfinaler",
    date: "Onsdag 1 juli",
    time: "03:00",
    home: "Mexiko",
    away: "Ecuador",
    tv: "TV4",
  },
  {
    id: 108,
    group: "16-delsfinaler",
    date: "Onsdag 1 juli",
    time: "18:00",
    home: "England",
    away: "Kongo-Kinshasa",
    tv: "SVT",
  },
  {
    id: 109,
    group: "16-delsfinaler",
    date: "Onsdag 1 juli",
    time: "22:00",
    home: "Belgien",
    away: "Senegal",
    tv: "TV4",
  },
  {
    id: 110,
    group: "16-delsfinaler",
    date: "Torsdag 2 juli",
    time: "02:00",
    home: "USA",
    away: "Bosnien Hercegovina",
    tv: "TV4",
  },
  {
    id: 111,
    group: "16-delsfinaler",
    date: "Torsdag 2 juli",
    time: "21:00",
    home: "Spanien",
    away: "Österrike",
    tv: "SVT",
  },
  {
    id: 112,
    group: "16-delsfinaler",
    date: "Fredag 3 juli",
    time: "01:00",
    home: "Portugal",
    away: "Kroatien",
    tv: "TV4",
  },
  {
    id: 113,
    group: "16-delsfinaler",
    date: "Fredag 3 juli",
    time: "05:00",
    home: "Schweiz",
    away: "Algeriet",
    tv: "TV4",
  },
  {
    id: 114,
    group: "16-delsfinaler",
    date: "Fredag 3 juli",
    time: "20:00",
    home: "Australien",
    away: "Egypten",
    tv: "TV4",
  },
  {
    id: 115,
    group: "16-delsfinaler",
    date: "Lördag 4 juli",
    time: "00:00",
    home: "Argentina",
    away: "Kap Verde",
    tv: "SVT",
  },
  {
    id: 116,
    group: "16-delsfinaler",
    date: "Lördag 4 juli",
    time: "03:30",
    home: "Colombia",
    away: "Ghana",
    tv: "SVT",
  },

  {
    id: 201,
    group: "Åttondelsfinaler",
    date: "Lördag 4 juli",
    time: "19:00",
    home: "Vinnare match 73",
    away: "Vinnare match 75",
    tv: "TV4",
  },
  {
    id: 202,
    group: "Åttondelsfinaler",
    date: "Lördag 4 juli",
    time: "23:00",
    home: "Vinnare match 74",
    away: "Vinnare match 77",
    tv: "SVT",
  },
  {
    id: 203,
    group: "Åttondelsfinaler",
    date: "Söndag 5 juli",
    time: "22:00",
    home: "Vinnare match 76",
    away: "Vinnare match 78",
    tv: "TV4",
  },
  {
    id: 204,
    group: "Åttondelsfinaler",
    date: "Måndag 6 juli",
    time: "02:00",
    home: "Vinnare match 79",
    away: "Vinnare match 80",
    tv: "SVT",
  },
  {
    id: 205,
    group: "Åttondelsfinaler",
    date: "Måndag 6 juli",
    time: "21:00",
    home: "Vinnare match 83",
    away: "Vinnare match 84",
    tv: "TV4",
  },
  {
    id: 206,
    group: "Åttondelsfinaler",
    date: "Tisdag 7 juli",
    time: "02:00",
    home: "Vinnare match 81",
    away: "Vinnare match 82",
    tv: "TV4",
  },
  {
    id: 207,
    group: "Åttondelsfinaler",
    date: "Tisdag 7 juli",
    time: "18:00",
    home: "Vinnare match 86",
    away: "Vinnare match 88",
    tv: "TV4",
  },
  {
    id: 208,
    group: "Åttondelsfinaler",
    date: "Tisdag 7 juli",
    time: "22:00",
    home: "Vinnare match 85",
    away: "Vinnare match 87",
    tv: "SVT",
  },

  {
    id: 301,
    group: "Kvartsfinaler",
    date: "Torsdag 9 juli",
    time: "22:00",
    home: "Vinnare match 89",
    away: "Vinnare match 90",
    tv: "TV4",
  },
  {
    id: 302,
    group: "Kvartsfinaler",
    date: "Fredag 10 juli",
    time: "21:00",
    home: "Vinnare match 93",
    away: "Vinnare match 94",
    tv: "SVT",
  },
  {
    id: 303,
    group: "Kvartsfinaler",
    date: "Lördag 11 juli",
    time: "23:00",
    home: "Vinnare match 91",
    away: "Vinnare match 92",
    tv: "TV4",
  },
  {
    id: 304,
    group: "Kvartsfinaler",
    date: "Söndag 12 juli",
    time: "03:00",
    home: "Vinnare match 95",
    away: "Vinnare match 96",
    tv: "SVT",
  },

  {
    id: 401,
    group: "Semifinaler",
    date: "Tisdag 14 juli",
    time: "21:00",
    home: "Vinnare match 97",
    away: "Vinnare match 98",
    tv: "SVT",
  },
  {
    id: 402,
    group: "Semifinaler",
    date: "Onsdag 15 juli",
    time: "21:00",
    home: "Vinnare match 99",
    away: "Vinnare match 100",
    tv: "TV4",
  },

  {
    id: 501,
    group: "Bronsmatch",
    date: "Lördag 18 juli",
    time: "23:00",
    home: "Förlorare semi 1",
    away: "Förlorare semi 2",
    tv: "SVT",
  },

  {
    id: 502,
    group: "Final",
    date: "Söndag 19 juli",
    time: "21:00",
    home: "Vinnare semi 1",
    away: "Vinnare semi 2",
    tv: "TV4",
  },
];

const fixturesGroup = baseFixtures.map((f) => ({
  ...f,
  groupKey: f.date,
  phase: "gruppspel",
}));
const fixturesKnockout = baseKnockout.map((f) => ({
  ...f,
  groupKey: `${f.group} · ${f.date}`,
  phase: "slutspel",
}));
const allFixtures = [...fixturesGroup, ...fixturesKnockout];

const defaultAppState = { players: {}, actual: {}, lockedDays: {} };

const calculateMatchScore = (actH, actA, tipH, tipA, isResultLocked) => {
  if (!isResultLocked) return 0;
  if (actH === undefined || actH === "" || actA === undefined || actA === "")
    return 0;
  const tH = tipH !== undefined && tipH !== "" ? parseInt(tipH, 10) : 0;
  const tA = tipA !== undefined && tipA !== "" ? parseInt(tipA, 10) : 0;
  const aH = parseInt(actH, 10);
  const aA = parseInt(actA, 10);
  const aSign = aH > aA ? "1" : aA > aH ? "2" : "X";
  const tSign = tH > tA ? "1" : tA > tH ? "2" : "X";
  return (aSign === tSign ? 1 : 0) + (aH === tH && aA === tA ? 3 : 0);
};

const loadFromCloud = async () => {
  const res = await fetch(JSONBIN_READ_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`JSONBin läsfel (${res.status}): ${text}`);
  }
  const data = await res.json();
  if (!data.record)
    throw new Error("Tomt svar från JSONBin – inget 'record' fält.");
  return data.record;
};

const saveToCloud = async (state) => {
  const res = await fetch(JSONBIN_WRITE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": MASTER_KEY },
    body: JSON.stringify(state),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`JSONBin skrivfel (${res.status}): ${text}`);
  }
  return true;
};

const App = () => {
  const [state, setState] = useState(defaultAppState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState("");
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const [browsedPlayer, setBrowsedPlayer] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [tab, setTab] = useState("tips");
  const [phase, setPhase] = useState("gruppspel");
  const [appReady, setAppReady] = useState(false);
  const [printMode, setPrintMode] = useState(null);
  const [selectedPrintDate, setSelectedPrintDate] = useState("Torsdag 11 juni");
  const [modalConfig, setModalConfig] = useState(null);
  const [editNameValue, setEditNameValue] = useState("");
  const [syncStatus, setSyncStatus] = useState(SYNC.IDLE);
  const [syncError, setSyncError] = useState("");
  const [lastSynced, setLastSynced] = useState(null);

  const fileInputRef = useRef(null);
  const ADMIN_PASSWORD = "VMTIPS2026";

  const activeFixtures =
    phase === "gruppspel" ? fixturesGroup : fixturesKnockout;
  const groupedFixtures = useMemo(() => {
    return activeFixtures.reduce((acc, f) => {
      if (!acc[f.groupKey]) acc[f.groupKey] = [];
      acc[f.groupKey].push(f);
      return acc;
    }, {});
  }, [activeFixtures]);

  const uniqueDates = useMemo(
    () => Object.keys(groupedFixtures),
    [groupedFixtures],
  );
  const playerKeys = Object.keys(state.players);

  useEffect(() => {
    setSyncStatus(SYNC.LOADING);
    loadFromCloud()
      .then((record) => {
        const merged = { ...defaultAppState, ...record };
        setState(merged);
        const keys = Object.keys(merged.players || {});
        if (keys.length > 0) setBrowsedPlayer(keys[0]);
        setLastSynced(new Date());
        setSyncStatus(SYNC.SAVED);
        localStorage.setItem("vmtips_v3", JSON.stringify(merged));
      })
      .catch((err) => {
        setSyncError(err.message);
        setSyncStatus(SYNC.ERROR);
        const saved = localStorage.getItem("vmtips_v3");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setState(parsed);
            const keys = Object.keys(parsed.players || {});
            if (keys.length > 0) setBrowsedPlayer(keys[0]);
          } catch (_) {}
        }
      })
      .finally(() => setAppReady(true));
  }, []);

  useEffect(() => {
    if (appReady) localStorage.setItem("vmtips_v3", JSON.stringify(state));
  }, [state, appReady]);

  useEffect(() => {
    if (printMode !== null) {
      const t = setTimeout(() => {
        window.print();
        setPrintMode(null);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [printMode]);

  useEffect(() => {
    if (uniqueDates.length > 0 && !uniqueDates.includes(selectedPrintDate)) {
      setSelectedPrintDate(uniqueDates[0]);
    }
  }, [uniqueDates, selectedPrintDate]);

  const leaderboard = useMemo(() => {
    return Object.entries(state.players)
      .map(([name, data]) => {
        let groupPts = 0;
        let knockoutPts = 0;
        fixturesGroup.forEach((f) => {
          const act = state.actual[f.id] || {};
          const tip = data.tips[f.id] || {};
          groupPts += calculateMatchScore(
            act.h,
            act.a,
            tip.h,
            tip.a,
            state.lockedDays?.[f.groupKey] || false,
          );
        });
        fixturesKnockout.forEach((f) => {
          const act = state.actual[f.id] || {};
          const tip = data.tips[f.id] || {};
          knockoutPts += calculateMatchScore(
            act.h,
            act.a,
            tip.h,
            tip.a,
            state.lockedDays?.[f.groupKey] || false,
          );
        });
        return {
          name,
          groupPts,
          knockoutPts,
          totalPts: groupPts + knockoutPts,
          locked: data.locked,
        };
      })
      .sort((a, b) => b.totalPts - a.totalPts);
  }, [state]);

  const leaderboardGroup = useMemo(
    () => [...leaderboard].sort((a, b) => b.groupPts - a.groupPts),
    [leaderboard],
  );
  const leaderboardKnockout = useMemo(
    () => [...leaderboard].sort((a, b) => b.knockoutPts - a.knockoutPts),
    [leaderboard],
  );

  const handleManualCloudSave = () => {
    if (!isAuthenticated) {
      setModalConfig({
        title: "Åtkomst Nekad",
        message: "Endast Admin kan spara till molnet.",
        type: "error",
      });
      return;
    }
    setSyncStatus(SYNC.SAVING);
    setSyncError("");
    saveToCloud(state)
      .then(() => {
        setLastSynced(new Date());
        setSyncStatus(SYNC.SAVED);
        localStorage.setItem("vmtips_v3", JSON.stringify(state));
      })
      .catch((err) => {
        setSyncError(err.message);
        setSyncStatus(SYNC.ERROR);
      });
  };

  const handleManualCloudLoad = () => {
    setModalConfig({
      title: "Ladda från JSONBin",
      message:
        "Detta ersätter all lokal data med det som finns sparat i molnet. Vill du fortsätta?",
      type: "confirm",
      onConfirm: () => {
        setModalConfig(null);
        setSyncStatus(SYNC.LOADING);
        setSyncError("");
        loadFromCloud()
          .then((record) => {
            const merged = { ...defaultAppState, ...record };
            setState(merged);
            const keys = Object.keys(merged.players || {});
            if (keys.length > 0) setBrowsedPlayer(keys[0]);
            setLastSynced(new Date());
            setSyncStatus(SYNC.SAVED);
            localStorage.setItem("vmtips_v3", JSON.stringify(merged));
          })
          .catch((err) => {
            setSyncError(err.message);
            setSyncStatus(SYNC.ERROR);
          });
      },
    });
  };

  const requireAdmin = (cb) => {
    if (isAuthenticated) cb();
    else
      setModalConfig({
        title: "Åtkomst Nekad",
        message: "Endast Admin kan utföra denna åtgärd.",
        type: "error",
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(loginAttempt === ADMIN_PASSWORD);
    setHasAttemptedLogin(true);
  };

  const handleGuestLogin = () => {
    setIsAuthenticated(false);
    setHasAttemptedLogin(true);
  };
  const handlePlayerChange = useCallback((name) => setBrowsedPlayer(name), []);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    requireAdmin(() => {
      const val = newPlayerName.trim();
      if (!val) return;
      setState((s) =>
        s.players[val]
          ? s
          : {
              ...s,
              players: { ...s.players, [val]: { tips: {}, locked: false } },
            },
      );
      setBrowsedPlayer(val);
      setNewPlayerName("");
    });
  };

  const handleDeletePlayer = () => {
    requireAdmin(() => {
      const key = browsedPlayer.trim();
      if (!key || !state.players[key]) return;
      setModalConfig({
        title: "Ta Bort Spelare",
        message: `Är du säker på att du vill ta bort ${key} och alla dess tips?`,
        type: "confirm",
        onConfirm: () => {
          setState((s) => {
            const p = { ...s.players };
            delete p[key];
            return { ...s, players: p };
          });
          setBrowsedPlayer("");
          setModalConfig(null);
        },
      });
    });
  };

  const handleEditPlayerName = () => {
    requireAdmin(() => {
      const oldName = browsedPlayer.trim();
      if (!oldName || !state.players[oldName]) return;
      setEditNameValue(oldName);
      setModalConfig({ title: "Ändra Namn", type: "edit-name" });
    });
  };

  const confirmNameChange = (oldName) => {
    setEditNameValue((currentVal) => {
      const newName = currentVal.trim();
      if (newName && newName !== oldName) {
        setState((s) => {
          if (s.players[newName]) {
            alert("Namnet finns redan!");
            return s;
          }
          const newPlayers = { ...s.players };
          newPlayers[newName] = newPlayers[oldName];
          delete newPlayers[oldName];
          return { ...s, players: newPlayers };
        });
        setBrowsedPlayer(newName);
      }
      setModalConfig(null);
      return currentVal;
    });
  };

  const updateTip = (id, field, val) => {
    const key = browsedPlayer.trim();
    if (!key) return;
    let v = parseInt(val, 10);
    if (isNaN(v)) v = "";
    else v = Math.max(0, Math.min(9, v));
    setState((s) => {
      const players = { ...s.players };
      if (!players[key]) players[key] = { tips: {}, locked: false };
      return {
        ...s,
        players: {
          ...players,
          [key]: {
            ...players[key],
            tips: {
              ...players[key].tips,
              [id]: { ...players[key].tips[id], [field]: v.toString() },
            },
          },
        },
      };
    });
  };

  const updateActual = (id, field, val) => {
    let v = parseInt(val, 10);
    if (isNaN(v)) v = "";
    else v = Math.max(0, Math.min(9, v));
    setState((s) => ({
      ...s,
      actual: { ...s.actual, [id]: { ...s.actual[id], [field]: v.toString() } },
    }));
  };

  const adjustScore = (id, field, currentVal, delta, isActual, groupKey) => {
    if (!isActual) {
      const key = browsedPlayer.trim();
      if (!key || state.players[key]?.locked) return;
    } else {
      if (state.lockedDays?.[groupKey]) return;
    }
    const cur =
      currentVal !== undefined && currentVal !== ""
        ? parseInt(currentVal, 10)
        : 0;
    const next = Math.max(0, Math.min(9, cur + delta)).toString();
    if (isActual) updateActual(id, field, next);
    else updateTip(id, field, next);
  };

  const toggleDayLock = (groupKey) => {
    requireAdmin(() => {
      setModalConfig({
        title: "Hantera Låsning",
        message: `Vill du ändra låsstatus för "${groupKey}"?`,
        type: "confirm",
        onConfirm: () => {
          let updatedStateToSave;
          setState((s) => {
            updatedStateToSave = {
              ...s,
              lockedDays: {
                ...s.lockedDays,
                [groupKey]: !s.lockedDays?.[groupKey],
              },
            };
            return updatedStateToSave;
          });
          setModalConfig(null);
          setTimeout(() => {
            if (updatedStateToSave) {
              setSyncStatus(SYNC.SAVING);
              setSyncError("");
              saveToCloud(updatedStateToSave)
                .then(() => {
                  setLastSynced(new Date());
                  setSyncStatus(SYNC.SAVED);
                  localStorage.setItem(
                    "vmtips_v3",
                    JSON.stringify(updatedStateToSave),
                  );
                })
                .catch((err) => {
                  setSyncError(err.message);
                  setSyncStatus(SYNC.ERROR);
                });
            }
          }, 0);
        },
      });
    });
  };

  const toggleLock = () => {
    requireAdmin(() => {
      const key = browsedPlayer.trim();
      if (!key) return;
      const isCurrentlyLocked = state.players[key]?.locked;
      setModalConfig({
        title: "Lås Spelare",
        message: `Ändra låsstatus för ${key}?`,
        type: "confirm",
        onConfirm: () => {
          let updatedStateToSave;
          setState((s) => {
            const players = { ...s.players };
            if (!players[key]) players[key] = { tips: {}, locked: false };
            const newLockedStatus = !players[key].locked;
            let updatedTips = { ...players[key].tips };
            if (!isCurrentlyLocked && newLockedStatus) {
              allFixtures.forEach((f) => {
                const currentTip = updatedTips[f.id] || {};
                const tipH_isEmpty =
                  currentTip.h === undefined || currentTip.h === "";
                const tipA_isEmpty =
                  currentTip.a === undefined || currentTip.a === "";
                if (tipH_isEmpty || tipA_isEmpty) {
                  updatedTips[f.id] = {
                    h: tipH_isEmpty ? "0" : currentTip.h,
                    a: tipA_isEmpty ? "0" : currentTip.a,
                  };
                }
              });
            }
            updatedStateToSave = {
              ...s,
              players: {
                ...players,
                [key]: {
                  ...players[key],
                  tips: updatedTips,
                  locked: newLockedStatus,
                },
              },
            };
            return updatedStateToSave;
          });
          setModalConfig(null);
          setTimeout(() => {
            if (updatedStateToSave) {
              setSyncStatus(SYNC.SAVING);
              setSyncError("");
              saveToCloud(updatedStateToSave)
                .then(() => {
                  setLastSynced(new Date());
                  setSyncStatus(SYNC.SAVED);
                  localStorage.setItem(
                    "vmtips_v3",
                    JSON.stringify(updatedStateToSave),
                  );
                })
                .catch((err) => {
                  setSyncError(err.message);
                  setSyncStatus(SYNC.ERROR);
                });
            }
          }, 0);
        },
      });
    });
  };

  const handleExport = () => {
    requireAdmin(() => {
      const a = document.createElement("a");
      a.href =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(state, null, 2));
      a.download = "vmtips_backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  const handleImport = (e) => {
    requireAdmin(() => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          setModalConfig({
            title: "Varning – Skriv Över Databas",
            message:
              "Vill du ersätta all nuvarande data med innehållet i filen?",
            type: "confirm",
            onConfirm: () => {
              setState(imported);
              setModalConfig(null);
            },
          });
        } catch (_) {
          setModalConfig({
            title: "Fel",
            message: "Ogiltig JSON-fil.",
            type: "error",
          });
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });
  };

  const SyncPill = () => {
    const t = lastSynced
      ? lastSynced.toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : null;
    const configs = {
      [SYNC.LOADING]: {
        dot: "bg-blue-400 animate-pulse",
        text: "text-blue-400",
        label: "Laddar från moln…",
      },
      [SYNC.SAVING]: {
        dot: "bg-yellow-400 animate-pulse",
        text: "text-yellow-400",
        label: "Sparar till moln…",
      },
      [SYNC.SAVED]: {
        dot: "bg-emerald-400",
        text: "text-emerald-400",
        label: `Molnsynk OK${t ? " · " + t : ""}`,
      },
      [SYNC.ERROR]: {
        dot: "bg-rose-400",
        text: "text-rose-400",
        label: "Molnfel – lokalt sparat",
      },
      [SYNC.IDLE]: {
        dot: "bg-slate-600",
        text: "text-slate-500",
        label: "Inte synkad",
      },
    };
    const c = configs[syncStatus];
    return (
      <span
        className={`flex items-center gap-1.5 text-xs font-medium ${c.text}`}
        title={syncError || undefined}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full shrink-0 ${c.dot}`}
        ></span>
        {c.label}
      </span>
    );
  };

  const ScoreInputGroup = ({
    id,
    field,
    val,
    disabled,
    isActual,
    groupKey,
  }) => {
    const v = val === undefined || val === "" ? "" : val;
    const isDisabled = disabled || (!isActual && !isAuthenticated);
    return (
      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md sm:rounded-lg p-0.5 sm:p-1 select-none shrink-0">
        <button
          type="button"
          disabled={isDisabled || (v !== "" && parseInt(v) >= 9)}
          onClick={() => adjustScore(id, field, v, 1, isActual, groupKey)}
          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-xs sm:text-sm transition-colors disabled:opacity-40"
        >
          +
        </button>
        <input
          type="number"
          min="0"
          max="9"
          value={v}
          disabled={isDisabled}
          placeholder={isActual ? "-" : "0"}
          onChange={(e) =>
            isActual
              ? updateActual(id, field, e.target.value)
              : updateTip(id, field, e.target.value)
          }
          className="w-6 sm:w-9 bg-transparent text-center text-sm sm:text-base font-bold text-white focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          disabled={isDisabled || v === "0" || v === ""}
          onClick={() => adjustScore(id, field, v, -1, isActual, groupKey)}
          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-xs sm:text-sm transition-colors disabled:opacity-40"
        >
          &minus;
        </button>
      </div>
    );
  };

  const LeaderboardTable = ({
    rows,
    labelKey,
    title,
    accent,
    showSubtotals,
  }) => (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      {title && (
        <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2">
          <span
            className={`text-base font-extrabold uppercase tracking-wider ${accent || "text-emerald-400"}`}
          >
            {title}
          </span>
        </div>
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/50">
            <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">
              Placering
            </th>
            <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">
              Spelare
            </th>
            <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">
              Status
            </th>
            {showSubtotals && (
              <>
                <th className="p-4 border-b border-slate-700 text-slate-500 font-medium text-right text-xs">
                  Grupp
                </th>
                <th className="p-4 border-b border-slate-700 text-slate-500 font-medium text-right text-xs">
                  Slutspel
                </th>
              </>
            )}
            <th
              className={`p-4 border-b border-slate-700 text-right font-bold ${accent || "text-emerald-400"}`}
            >
              Poäng
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l, i) => (
            <tr
              key={l.name}
              className="hover:bg-slate-700/50 transition-colors"
            >
              <td className="p-4 border-b border-slate-700 text-xl font-bold text-slate-300">
                #{i + 1}
              </td>
              <td className="p-4 border-b border-slate-700 font-bold">
                {l.name}
              </td>
              <td className="p-4 border-b border-slate-700">
                {l.locked ? (
                  <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded border border-rose-500/30">
                    Låst
                  </span>
                ) : (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                    Öppen
                  </span>
                )}
              </td>
              {showSubtotals && (
                <>
                  <td className="p-4 border-b border-slate-700 text-right text-slate-400 font-semibold">
                    {l.groupPts}
                  </td>
                  <td className="p-4 border-b border-slate-700 text-right text-amber-400 font-semibold">
                    {l.knockoutPts}
                  </td>
                </>
              )}
              <td
                className={`p-4 border-b border-slate-700 text-right font-bold text-xl ${accent || "text-emerald-400"}`}
              >
                {l[labelKey]}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={showSubtotals ? 6 : 4}
                className="p-8 text-center text-slate-500"
              >
                Inga spelare har lagts till än.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  let playerControlPanelJSX = null;
  if (browsedPlayer.trim() && state.players[browsedPlayer.trim()]) {
    playerControlPanelJSX = (
      <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
        <div className="text-slate-300">
          Vald Spelare:{" "}
          <span className="font-bold text-emerald-400">{browsedPlayer}</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto flex-wrap">
          <button
            onClick={toggleLock}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm whitespace-nowrap ${state.players[browsedPlayer.trim()].locked ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
          >
            {state.players[browsedPlayer.trim()].locked
              ? "Lås Upp Tips"
              : "Lås Denna Spelares Tips"}
          </button>
          <button
            onClick={handleEditPlayerName}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white"
          >
            Ändra Namn
          </button>
          <button
            onClick={handleDeletePlayer}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm whitespace-nowrap bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white"
          >
            Ta Bort
          </button>
        </div>
      </div>
    );
  }

  if (!appReady)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-slate-400 bg-slate-900">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">Laddar från JSONBin…</p>
      </div>
    );

  if (!hasAttemptedLogin)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-16 bg-slate-900 relative gap-8 w-full max-w-[100vw]">
        <div className="bg-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700 w-full max-w-lg text-center">
          <h1 className="text-5xl font-black text-emerald-400 mb-4 tracking-wider">
            VM Tips 2026
          </h1>
          <h2 className="text-xl text-slate-200 mb-8 font-medium">
            Mästerskapet
          </h2>
          <button
            onClick={handleGuestLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 text-lg rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
          >
            Fortsätt
          </button>
        </div>
        <div className="w-full max-w-sm opacity-30 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <label className="text-xs text-slate-500 uppercase tracking-widest text-center font-bold">
              Admin Inloggning
            </label>
            <input
              type="password"
              value={loginAttempt}
              onChange={(e) => setLoginAttempt(e.target.value)}
              placeholder="Lösenord…"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-center focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
            >
              Logga in som Admin
            </button>
          </form>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 pointer-events-none select-text text-[10px]">
          VMTIPS2026
        </div>
      </div>
    );

  if (printMode === "overview")
    return (
      <div className="p-4 bg-slate-900 text-slate-100 min-h-screen w-full max-w-[100vw]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8 uppercase tracking-widest">
            VM Tips 2026 – Sammanställning
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80">
                  <th className="p-2 border-b border-slate-700 text-slate-400 font-medium">
                    Match & Tid
                  </th>
                  <th className="p-2 border-b border-slate-700 text-emerald-400 font-medium text-center">
                    Resultat
                  </th>
                  {playerKeys.map((p) => (
                    <th
                      key={p}
                      className="p-2 border-b border-slate-700 text-slate-200 font-bold text-center border-l border-slate-700/50"
                    >
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeFixtures.map((f) => {
                  const act = state.actual[f.id] || {};
                  const actH_hasValue = act.h !== undefined && act.h !== "";
                  const actA_hasValue = act.a !== undefined && act.a !== "";
                  const actStr =
                    actH_hasValue || actA_hasValue
                      ? `${actH_hasValue ? act.h : "0"} – ${actA_hasValue ? act.a : "0"}`
                      : "–";
                  const locked = state.lockedDays?.[f.groupKey] || false;
                  return (
                    <tr
                      key={f.id}
                      className="border-b border-slate-700/50 print-avoid-break"
                    >
                      <td className="p-2 text-slate-300">
                        <div className="font-bold">
                          {f.home} – {f.away}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {phase === "gruppspel"
                            ? `${f.date} kl ${f.time}`
                            : `${f.groupKey} kl ${f.time}`}
                        </div>
                      </td>
                      <td className="p-2 text-center font-bold text-white">
                        {actStr}
                      </td>
                      {playerKeys.map((p) => {
                        const tip = state.players[p]?.tips[f.id] || {};
                        const tipH_hasValue =
                          tip.h !== undefined && tip.h !== "";
                        const tipA_hasValue =
                          tip.a !== undefined && tip.a !== "";
                        const tipStr =
                          tipH_hasValue || tipA_hasValue
                            ? `${tipH_hasValue ? tip.h : "0"}–${tipA_hasValue ? tip.a : "0"}`
                            : "";
                        const pts = calculateMatchScore(
                          act.h,
                          act.a,
                          tip.h,
                          tip.a,
                          locked,
                        );
                        return (
                          <td
                            key={p}
                            className="p-2 text-center border-l border-slate-700/50"
                          >
                            {tipStr ? (
                              <div className="flex flex-col items-center">
                                <span className="font-bold text-slate-200">
                                  {tipStr}
                                </span>
                                {locked && (
                                  <span
                                    className={`text-[10px] ${pts > 0 ? "text-emerald-400 font-bold" : "text-slate-500"}`}
                                  >
                                    {pts} pt
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-600">–</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  if (printMode !== null && printMode !== "overview") {
    const leaderboardOnly = printMode === "leaderboard";
    const toPrint =
      printMode === "all" || printMode === "day-all"
        ? playerKeys
        : [browsedPlayer.trim()];
    const dateList =
      printMode === "day-single" || printMode === "day-all"
        ? [[selectedPrintDate, groupedFixtures[selectedPrintDate]]]
        : Object.entries(groupedFixtures);
    return (
      <div className="p-4 bg-slate-900 text-slate-100 min-h-screen w-full max-w-[100vw]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8 uppercase tracking-widest">
            VM Tips 2026
          </h1>
          {!leaderboardOnly &&
            toPrint.map((pK, i) => (
              <div
                key={pK}
                className={`mb-12 ${i < toPrint.length - 1 ? "print-page-break" : ""}`}
              >
                <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
                  <h2 className="text-2xl font-bold text-emerald-400">{pK}</h2>
                  <p className="text-slate-400 text-sm">Officiell Tipsrad</p>
                </div>
                {dateList.map(([groupKey, matches]) => (
                  <div key={groupKey} className="mb-6 print-avoid-break">
                    <h3 className="text-emerald-500 font-bold text-lg mb-3 border-b border-slate-700 pb-1">
                      {groupKey}
                    </h3>
                    <div className="grid gap-2">
                      {matches.map((f) => {
                        const tip = state.players[pK]?.tips[f.id] || {};
                        const act = state.actual[f.id] || {};
                        const locked = state.lockedDays?.[f.groupKey] || false;
                        const pts = calculateMatchScore(
                          act.h,
                          act.a,
                          tip.h,
                          tip.a,
                          locked,
                        );
                        const tipH_hasValue =
                          tip.h !== undefined && tip.h !== "";
                        const tipA_hasValue =
                          tip.a !== undefined && tip.a !== "";
                        const has = tipH_hasValue || tipA_hasValue;
                        const tH = tipH_hasValue ? tip.h : "0";
                        const tA = tipA_hasValue ? tip.a : "0";
                        return (
                          <div
                            key={f.id}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex flex-row items-center gap-4 w-full"
                          >
                            <div className="w-20 shrink-0 text-center sm:text-left flex flex-col justify-center">
                              <div className="text-slate-300 font-bold leading-none">
                                {f.time !== "-" ? f.time : "TBD"}
                              </div>
                              <div
                                className={`text-[10px] sm:text-xs mt-0.5 font-medium ${phase === "slutspel" ? "text-amber-400" : "text-emerald-400"}`}
                              >
                                {f.tv !== "-" ? f.tv : ""}
                              </div>
                            </div>
                            <div className="flex-1 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 min-w-0">
                              <div
                                className="text-right font-medium text-slate-200 text-xs sm:text-base truncate"
                                title={f.home}
                              >
                                {f.home}
                              </div>
                              {has ? (
                                <div className="flex items-center justify-center gap-1 sm:gap-2 bg-slate-950 px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-slate-700 shrink-0 mx-auto w-max">
                                  <span className="w-5 sm:w-6 text-center text-sm sm:text-lg font-bold text-white">
                                    {tH}
                                  </span>
                                  <span className="text-slate-500 font-extrabold text-xs sm:text-base">
                                    &ndash;
                                  </span>
                                  <span className="w-5 sm:w-6 text-center text-sm sm:text-lg font-bold text-white">
                                    {tA}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center bg-slate-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-slate-700/50 w-16 sm:w-20 shrink-0 mx-auto">
                                  <span className="text-slate-600 font-bold">
                                    –
                                  </span>
                                </div>
                              )}
                              <div
                                className="text-left font-medium text-slate-200 text-xs sm:text-base truncate"
                                title={f.away}
                              >
                                {f.away}
                              </div>
                            </div>
                            <div
                              className={`w-16 shrink-0 text-center rounded-lg py-1 font-bold text-sm border ${pts > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-900 text-slate-500 border-slate-700/60"}`}
                            >
                              {pts} pt
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          <div className="mt-12">
            <LeaderboardTable
              rows={leaderboard}
              labelKey="totalPts"
              title="Aktuell Leaderboard (Totalt)"
              showSubtotals={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden text-slate-100 font-sans selection:bg-emerald-500 selection:text-white w-full max-w-[100vw]">
      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 w-full relative">
        {modalConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setModalConfig(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Stäng modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3
                className={`text-xl font-bold mb-3 ${modalConfig.type === "error" ? "text-rose-400" : "text-emerald-400"}`}
              >
                {modalConfig.title}
              </h3>
              {modalConfig.type === "edit-name" ? (
                <div className="mb-6 flex flex-col gap-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Nuvarande Namn
                    </label>
                    <p className="text-slate-400 cursor-not-allowed select-none">
                      {browsedPlayer.trim()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Nytt Namn
                    </label>
                    <input
                      type="text"
                      value={editNameValue}
                      onChange={(e) => setEditNameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          confirmNameChange(browsedPlayer.trim());
                      }}
                      autoFocus
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              ) : modalConfig.content ? (
                <div className="mb-6">{modalConfig.content}</div>
              ) : (
                <p className="text-slate-300 mb-6">{modalConfig.message}</p>
              )}
              <div className="flex justify-end gap-3">
                {modalConfig.type !== "custom" &&
                  modalConfig.type !== "edit-name" && (
                    <button
                      onClick={() => setModalConfig(null)}
                      className="px-4 py-2 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      {modalConfig.type === "error" ? "Stäng" : "Avbryt"}
                    </button>
                  )}
                {(modalConfig.type === "custom" ||
                  modalConfig.type === "edit-name") && (
                  <button
                    onClick={() => setModalConfig(null)}
                    className="px-4 py-2 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                  >
                    Avbryt
                  </button>
                )}
                {(modalConfig.type === "confirm" ||
                  modalConfig.type === "custom" ||
                  modalConfig.type === "edit-name") && (
                  <button
                    onClick={
                      modalConfig.type === "edit-name"
                        ? () => confirmNameChange(browsedPlayer.trim())
                        : modalConfig.onConfirm
                    }
                    className="px-4 py-2 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    {modalConfig.type === "confirm" ? "Bekräfta" : "Spara"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <header className="bg-slate-800 rounded-xl p-4 md:p-6 mb-6 shadow-lg border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">
              VM Tips 2026
            </h1>
            <p className="text-slate-400 text-sm">
              Läge:{" "}
              <span
                className={`font-bold ${isAuthenticated ? "text-emerald-400" : "text-slate-300"}`}
              >
                {isAuthenticated ? "Admin" : "Åskådare"}
              </span>
            </p>
            <div className="mt-1">
              <SyncPill />
            </div>
          </div>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700 flex-wrap justify-center gap-0.5">
            {[
              { key: "tips", label: "Tips rader" },
              { key: "leaderboard", label: "Grupp-LB" },
              { key: "leaderboard-slutspel", label: "Slutspels-LB" },
              { key: "leaderboard-total", label: "Total-LB" },
              { key: "admin", label: "Resultat" },
              { key: "overview", label: "Översikt" },
              { key: "settings", label: "Spara / Ladda" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-3 py-2 rounded-md text-xs md:text-sm font-bold transition-colors ${tab === key ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {["tips", "admin", "overview"].includes(tab) && (
          <div className="flex justify-center mb-6 gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700 w-fit mx-auto shadow-md">
            <button
              onClick={() => setPhase("gruppspel")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${phase === "gruppspel" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
            >
              Gruppspel
            </button>
            <button
              onClick={() => setPhase("slutspel")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${phase === "slutspel" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
            >
              Slutspel
            </button>
          </div>
        )}

        {tab === "settings" && (
          <div className="flex flex-col gap-5">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-bold text-emerald-400">
                    JSONBin Molnsynk
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Data laddas automatiskt från molnet när du öppnar sidan.
                    <br />
                    <strong className="text-slate-300">
                      Spara till molnet
                    </strong>
                  </p>
                </div>
                <SyncPill />
              </div>
              {syncStatus === SYNC.ERROR && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <p className="text-rose-400 text-sm font-bold mb-1">
                    Fel vid molnkommunikation
                  </p>
                  <p className="text-rose-300/80 text-xs break-all">
                    {syncError}
                  </p>
                </div>
              )}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleManualCloudSave}
                  disabled={
                    syncStatus === SYNC.SAVING || syncStatus === SYNC.LOADING
                  }
                  className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm shadow-md"
                >
                  {syncStatus === SYNC.SAVING
                    ? "Sparar…"
                    : "⬆  Spara till JSONBin"}
                </button>
                <button
                  onClick={handleManualCloudLoad}
                  disabled={
                    syncStatus === SYNC.SAVING || syncStatus === SYNC.LOADING
                  }
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm shadow-md"
                >
                  {syncStatus === SYNC.LOADING
                    ? "Laddar…"
                    : "⬇  Ladda från JSONBin"}
                </button>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold text-emerald-400">
                  Lokal Säkerhetskopia
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Ladda ner hela databasen som JSON, eller läs in en tidigare
                  sparad fil.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleExport}
                  className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-slate-600 text-sm"
                >
                  ⬇ Ladda ner vmtips_backup.json
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-slate-600 text-sm"
                >
                  ⬆ Ladda in JSON-fil
                </button>
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImport}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "leaderboard" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-500/0 to-emerald-500/40 rounded"></div>
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-500">
                Gruppspel · Poängställning
              </span>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-emerald-500/0 to-emerald-500/40 rounded"></div>
            </div>
            <LeaderboardTable
              rows={leaderboardGroup}
              labelKey="groupPts"
              accent="text-emerald-400"
            />
            {playerKeys.length > 0 && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-center">
                <button
                  onClick={() => setPrintMode("leaderboard")}
                  className="px-8 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Exportera / Skriv ut Leaderboard
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "leaderboard-slutspel" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/0 to-amber-500/40 rounded"></div>
              <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
                Slutspel · Poängställning
              </span>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-amber-500/0 to-amber-500/40 rounded"></div>
            </div>
            <div className="bg-slate-800 rounded-xl border border-amber-500/20 p-4 overflow-x-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
                Inlagda slutspelsresultat
              </p>
              <div className="grid gap-2">
                {fixturesKnockout
                  .map((f) => {
                    const act = state.actual[f.id] || {};
                    const actH_hasValue = act.h !== undefined && act.h !== "";
                    const actA_hasValue = act.a !== undefined && act.a !== "";
                    const hasResult = actH_hasValue || actA_hasValue;
                    const locked = state.lockedDays?.[f.groupKey] || false;
                    if (!hasResult && !locked) return null;
                    return (
                      <div
                        key={f.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="text-slate-500 text-xs w-28 shrink-0">
                          {f.group}
                        </span>
                        <span className="text-slate-300 font-medium flex-1 truncate text-right">
                          {f.home}
                        </span>
                        {hasResult ? (
                          <span className="font-bold text-white px-2 py-0.5 bg-slate-900 rounded border border-slate-700 shrink-0">
                            {actH_hasValue ? act.h : "0"} –{" "}
                            {actA_hasValue ? act.a : "0"}
                          </span>
                        ) : (
                          <span className="text-slate-600 px-2 py-0.5 shrink-0">
                            –
                          </span>
                        )}
                        <span className="text-slate-300 font-medium flex-1 truncate">
                          {f.away}
                        </span>
                        {locked && (
                          <span className="text-[10px] text-amber-400 border border-amber-500/30 rounded px-1.5 py-0.5 shrink-0">
                            Låst
                          </span>
                        )}
                      </div>
                    );
                  })
                  .filter(Boolean)}
                {fixturesKnockout.every((f) => {
                  const act = state.actual[f.id] || {};
                  return (
                    !(act.h !== undefined && act.h !== "") &&
                    !(act.a !== undefined && act.a !== "")
                  );
                }) && (
                  <p className="text-slate-500 text-sm py-2">
                    Inga slutspelsresultat har lagts in ännu.
                  </p>
                )}
              </div>
            </div>
            <LeaderboardTable
              rows={leaderboardKnockout}
              labelKey="knockoutPts"
              accent="text-amber-400"
            />
          </div>
        )}

        {tab === "leaderboard-total" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-violet-500/0 to-violet-500/40 rounded"></div>
              <span className="text-sm font-bold uppercase tracking-widest text-violet-400">
                Totalt · Grupp + Slutspel
              </span>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-violet-500/0 to-violet-500/40 rounded"></div>
            </div>
            <LeaderboardTable
              rows={leaderboard}
              labelKey="totalPts"
              accent="text-violet-400"
              showSubtotals
            />
            {playerKeys.length > 0 && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-center">
                <button
                  onClick={() => setPrintMode("leaderboard")}
                  className="px-8 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Exportera / Skriv ut Total-Leaderboard
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "overview" && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap text-sm">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="p-3 border-b border-slate-700 text-slate-400 font-medium sticky left-0 bg-slate-900 z-10">
                      Match & Tid
                    </th>
                    <th className="p-3 border-b border-slate-700 text-emerald-400 font-medium text-center">
                      Resultat
                    </th>
                    {playerKeys.map((p) => (
                      <th
                        key={p}
                        className="p-3 border-b border-slate-700 text-slate-200 font-bold text-center border-l border-slate-700/50"
                      >
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeFixtures.map((f) => {
                    const act = state.actual[f.id] || {};
                    const actH_hasValue = act.h !== undefined && act.h !== "";
                    const actA_hasValue = act.a !== undefined && act.a !== "";
                    const actStr =
                      actH_hasValue || actA_hasValue
                        ? `${actH_hasValue ? act.h : "0"} – ${actA_hasValue ? act.a : "0"}`
                        : "–";
                    const locked = state.lockedDays?.[f.groupKey] || false;
                    return (
                      <tr
                        key={f.id}
                        className="hover:bg-slate-700/50 transition-colors border-b border-slate-700/50"
                      >
                        <td className="p-3 text-slate-300 sticky left-0 bg-slate-800 z-10 border-r border-slate-700/50">
                          <div className="font-bold">
                            {f.home} – {f.away}
                          </div>
                          <div className="text-xs text-slate-500">
                            {phase === "gruppspel"
                              ? `${f.date} kl ${f.time}`
                              : `${f.groupKey} kl ${f.time}`}
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-white bg-slate-900/30">
                          {actStr}
                        </td>
                        {playerKeys.map((p) => {
                          const tip = state.players[p]?.tips[f.id] || {};
                          const tipH_hasValue =
                            tip.h !== undefined && tip.h !== "";
                          const tipA_hasValue =
                            tip.a !== undefined && tip.a !== "";
                          const tipStr =
                            tipH_hasValue || tipA_hasValue
                              ? `${tipH_hasValue ? tip.h : "0"}–${tipA_hasValue ? tip.a : "0"}`
                              : "";
                          const pts = calculateMatchScore(
                            act.h,
                            act.a,
                            tip.h,
                            tip.a,
                            locked,
                          );
                          return (
                            <td
                              key={p}
                              className="p-3 text-center border-l border-slate-700/50"
                            >
                              {tipStr ? (
                                <div className="flex flex-col items-center">
                                  <span className="font-bold text-slate-200">
                                    {tipStr}
                                  </span>
                                  {locked && (
                                    <span
                                      className={`text-[10px] ${pts > 0 ? "text-emerald-400 font-bold" : "text-slate-500"}`}
                                    >
                                      {pts} pt
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-600">–</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-center">
              <button
                onClick={() => setPrintMode("overview")}
                className="px-8 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white"
              >
                Exportera / Skriv ut Översikt
              </button>
            </div>
          </div>
        )}

        {(tab === "tips" || tab === "admin") && (
          <div>
            {tab === "tips" && (
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md flex flex-col gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Lägg till / Sök Spelare
                  </label>
                  <form
                    onSubmit={handleAddPlayer}
                    className="flex flex-col md:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder="Skriv in namn och tryck enter / lägg till…"
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white text-lg font-bold focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                    />
                    <button
                      type="submit"
                      disabled={!newPlayerName.trim() || !isAuthenticated}
                      className="px-6 py-3 rounded-lg font-bold shadow-sm transition-colors text-sm md:text-base whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Lägg Till / Sök
                    </button>
                  </form>
                </div>
                {playerKeys.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Välj Befintlig Spelare:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {playerKeys.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePlayerChange(p)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${browsedPlayer === p ? "bg-emerald-600 text-white border-emerald-500 shadow-md" : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {playerControlPanelJSX}
              </div>
            )}

            {phase === "slutspel" && (
              <div className="mb-4 flex items-center gap-3">
                <div className="h-0.5 flex-1 bg-amber-500/30 rounded"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500 px-2">
                  Slutspelsmatcher
                </span>
                <div className="h-0.5 flex-1 bg-amber-500/30 rounded"></div>
              </div>
            )}

            {Object.entries(groupedFixtures).map(([groupKey, matches]) => {
              const isDayLocked = state.lockedDays?.[groupKey];
              const isKnockoutPhase = phase === "slutspel";
              return (
                <div key={groupKey} className="mb-8">
                  <div
                    className="flex justify-between items-center mb-4 border-b pb-2"
                    style={{
                      borderColor: isKnockoutPhase
                        ? "rgba(245,158,11,0.3)"
                        : "rgb(51,65,85)",
                    }}
                  >
                    <h2
                      className={`font-bold text-lg ${isKnockoutPhase ? "text-amber-500" : "text-emerald-500"}`}
                    >
                      {groupKey}
                    </h2>
                    {tab === "admin" && (
                      <button
                        onClick={() => toggleDayLock(groupKey)}
                        className={`px-4 py-1 rounded text-sm font-bold shadow-sm transition-colors ${isDayLocked ? "bg-rose-600 hover:bg-rose-500 text-white" : isKnockoutPhase ? "bg-amber-600 hover:bg-amber-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                      >
                        {isDayLocked
                          ? "Lås Upp Dagen"
                          : "Lås Resultat för Dagen"}
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3">
                    {matches.map((f) => {
                      const isTips = tab === "tips";
                      const key = browsedPlayer.trim();
                      const matchData = isTips
                        ? state.players[key]?.tips[f.id] || {}
                        : state.actual[f.id] || {};
                      const act = state.actual[f.id] || {};
                      const isInputDisabled = isTips
                        ? !key || state.players[key]?.locked || !isAuthenticated
                        : isDayLocked || !isAuthenticated;
                      const pts = isTips
                        ? calculateMatchScore(
                            act.h,
                            act.a,
                            matchData.h,
                            matchData.a,
                            state.lockedDays?.[f.groupKey],
                          )
                        : null;
                      const borderColor = isKnockoutPhase
                        ? tab === "admin" && isDayLocked
                          ? "border-rose-500/50"
                          : "border-amber-500/20"
                        : tab === "admin" && isDayLocked
                          ? "border-rose-500/50"
                          : "border-slate-700";
                      return (
                        <div
                          key={f.id}
                          className={`bg-slate-800 border ${borderColor} rounded-lg p-3 sm:p-4 flex flex-col md:flex-row items-center gap-3 sm:gap-4 shadow-sm hover:border-slate-600 transition-colors w-full`}
                        >
                          <div className="w-24 sm:w-28 shrink-0 text-center sm:text-left flex flex-col justify-center">
                            <div className="text-slate-300 font-bold leading-none">
                              {f.time !== "-" ? f.time : "TBD"}
                            </div>
                            <div
                              className={`text-[10px] sm:text-xs mt-0.5 font-medium ${isKnockoutPhase ? "text-amber-400" : "text-emerald-400"}`}
                            >
                              {f.tv !== "-" ? f.tv : ""}
                            </div>
                          </div>
                          <div className="flex-1 w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
                            <div
                              className="text-right font-medium text-slate-200 text-xs sm:text-base truncate"
                              title={f.home}
                            >
                              {f.home}
                            </div>
                            <div className="flex items-center justify-center gap-1 sm:gap-2 bg-slate-950 px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-slate-700 shrink-0 mx-auto w-max">
                              <ScoreInputGroup
                                id={f.id}
                                field="h"
                                val={matchData.h}
                                disabled={isInputDisabled}
                                isActual={!isTips}
                                groupKey={f.groupKey}
                              />
                              <span className="text-slate-500 font-extrabold text-xs sm:text-base">
                                &ndash;
                              </span>
                              <ScoreInputGroup
                                id={f.id}
                                field="a"
                                val={matchData.a}
                                disabled={isInputDisabled}
                                isActual={!isTips}
                                groupKey={f.groupKey}
                              />
                            </div>
                            <div
                              className="text-left font-medium text-slate-200 text-xs sm:text-base truncate"
                              title={f.away}
                            >
                              {f.away}
                            </div>
                          </div>
                          {isTips && (
                            <div
                              className={`md:w-16 shrink-0 text-center rounded-lg py-1.5 font-bold text-xs sm:text-sm border ${pts > 0 ? (isKnockoutPhase ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20") : "bg-slate-900 text-slate-500 border-slate-700/60"}`}
                            >
                              {pts} pt
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {tab === "tips" && (
              <div className="mt-8 mb-4 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col gap-6 items-center text-center">
                {playerControlPanelJSX}
                <div className="w-full border-t border-slate-700/60 my-2"></div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-1">
                    Exportera / Skriv ut (PDF)
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    Skriv ut rader eller spara som PDF med leaderboard
                    inkluderat.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full pb-4 border-b border-slate-700/60 justify-center flex-wrap">
                  {browsedPlayer.trim() &&
                    state.players[browsedPlayer.trim()] && (
                      <button
                        onClick={() => setPrintMode("single")}
                        className="px-6 py-3 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto"
                      >
                        Spara {browsedPlayer.trim()}s Tips + Leaderboard
                      </button>
                    )}
                  {playerKeys.length > 0 && (
                    <button
                      onClick={() => setPrintMode("all")}
                      className="px-6 py-3 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 w-full sm:w-auto"
                    >
                      Spara Allas Tips + Leaderboard
                    </button>
                  )}
                  {playerKeys.length > 0 && (
                    <button
                      onClick={() => setPrintMode("leaderboard")}
                      className="px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto"
                    >
                      Exportera Leaderboard
                    </button>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Exportera en specifik dag/runda:
                  </label>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 flex-wrap">
                    <select
                      value={selectedPrintDate}
                      onChange={(e) => setSelectedPrintDate(e.target.value)}
                      className="bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                    >
                      {uniqueDates.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {browsedPlayer.trim() &&
                      state.players[browsedPlayer.trim()] && (
                        <button
                          onClick={() => setPrintMode("day-single")}
                          className="px-5 py-2.5 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto"
                        >
                          Spara {browsedPlayer.trim()}s dag + Leaderboard
                        </button>
                      )}
                    {playerKeys.length > 0 && (
                      <button
                        onClick={() => setPrintMode("day-all")}
                        className="px-5 py-2.5 rounded-lg font-bold text-xs bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 w-full sm:w-auto"
                      >
                        Spara Allas dag + Leaderboard
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
            
