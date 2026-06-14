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

const fixturesData = [
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

const defaultAppState = { players: {}, actual: {}, lockedDays: {} };

const groupedFixtures = fixturesData.reduce((acc, f) => {
  if (!acc[f.date]) acc[f.date] = [];
  acc[f.date].push(f);
  return acc;
}, {});

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
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY,
    },
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
        console.warn("Cloud load failed, using localStorage:", err.message);
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
    if (appReady) {
      localStorage.setItem("vmtips_v3", JSON.stringify(state));
    }
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

      setModalConfig({
        title: "Ändra Namn",
        message: "",
        type: "custom",
        content: (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Nuvarande Namn
              </label>
              <p className="text-slate-400 cursor-not-allowed select-none">
                {oldName}
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
                  if (e.key === "Enter") confirmNameChange(oldName);
                }}
                autoFocus
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        ),
        onConfirm: () => confirmNameChange(oldName),
      });
    });
  };

  useEffect(() => {
    if (modalConfig && modalConfig.title === "Ändra Namn") {
      setModalConfig((prev) => ({
        ...prev,
        content: (
          <div className="flex flex-col gap-4">
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
        ),
        onConfirm: () => confirmNameChange(browsedPlayer.trim()),
      }));
    }
  }, [editNameValue]);

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

  const adjustScore = (id, field, currentVal, delta, isActual, date) => {
    if (!isActual) {
      const key = browsedPlayer.trim();
      if (!key || state.players[key]?.locked) return;
    } else {
      if (state.lockedDays?.[date]) return;
    }
    const cur =
      currentVal !== undefined && currentVal !== ""
        ? parseInt(currentVal, 10)
        : 0;
    const next = Math.max(0, Math.min(9, cur + delta)).toString();
    if (isActual) updateActual(id, field, next);
    else updateTip(id, field, next);
  };

  const toggleDayLock = (date) => {
    requireAdmin(() => {
      setModalConfig({
        title: "Hantera Dagens Låsning",
        message: `Vill du ändra låsstatus för "${date}"?`,
        type: "confirm",
        onConfirm: () => {
          let updatedStateToSave;
          setState((s) => {
            updatedStateToSave = {
              ...s,
              lockedDays: { ...s.lockedDays, [date]: !s.lockedDays?.[date] },
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
              fixturesData.forEach((f) => {
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

  const leaderboard = useMemo(() => {
    return Object.entries(state.players)
      .map(([name, data]) => {
        let pts = 0;
        fixturesData.forEach((f) => {
          const act = state.actual[f.id] || {};
          const tip = data.tips[f.id] || {};
          pts += calculateMatchScore(
            act.h,
            act.a,
            tip.h,
            tip.a,
            state.lockedDays?.[f.date] || false,
          );
        });
        return { name, pts, locked: data.locked };
      })
      .sort((a, b) => b.pts - a.pts);
  }, [state]);

  const uniqueDates = useMemo(() => Object.keys(groupedFixtures), []);
  const playerKeys = Object.keys(state.players);

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

  // ─── FIX: ScoreInputGroup is a single +/number/- control for ONE score value ───
  // The root div must NOT stretch; it is always shrink-0 and sized to its content.
  const ScoreInputGroup = ({ id, field, val, disabled, isActual, date }) => {
    const v = val === undefined || val === "" ? "" : val;
    const isDisabled = disabled || (!isActual && !isAuthenticated);
    return (
      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md p-0.5 select-none shrink-0">
        <button
          type="button"
          disabled={isDisabled || (v !== "" && parseInt(v) >= 9)}
          onClick={() => adjustScore(id, field, v, 1, isActual, date)}
          className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-xs transition-colors disabled:opacity-40"
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
          className="w-7 bg-transparent text-center text-sm font-bold text-white focus:outline-none disabled:opacity-50"
          style={{ MozAppearance: "textfield" }}
        />
        <button
          type="button"
          disabled={isDisabled || v === "0" || v === ""}
          onClick={() => adjustScore(id, field, v, -1, isActual, date)}
          className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-xs transition-colors disabled:opacity-40"
        >
          &minus;
        </button>
      </div>
    );
  };

  const PlayerControlPanel = () => {
    if (!browsedPlayer.trim() || !state.players[browsedPlayer.trim()])
      return null;
    return (
      <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
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
  };

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
                {fixturesData.map((f) => {
                  const act = state.actual[f.id] || {};
                  let actStr = "–";
                  const actH_hasValue = act.h !== undefined && act.h !== "";
                  const actA_hasValue = act.a !== undefined && act.a !== "";
                  if (actH_hasValue || actA_hasValue) {
                    actStr = `${actH_hasValue ? act.h : "0"} – ${actA_hasValue ? act.a : "0"}`;
                  }
                  const locked = state.lockedDays?.[f.date] || false;
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
                          {f.date} {f.time}
                        </div>
                      </td>
                      <td className="p-2 text-center font-bold text-white">
                        {actStr}
                      </td>
                      {playerKeys.map((p) => {
                        const tip = state.players[p]?.tips[f.id] || {};
                        let tipStr = "";
                        const tipH_hasValue =
                          tip.h !== undefined && tip.h !== "";
                        const tipA_hasValue =
                          tip.a !== undefined && tip.a !== "";
                        if (tipH_hasValue || tipA_hasValue) {
                          tipStr = `${tipH_hasValue ? tip.h : "0"}–${tipA_hasValue ? tip.a : "0"}`;
                        }
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
                {dateList.map(([date, matches]) => (
                  <div key={date} className="mb-6 print-avoid-break">
                    <h3 className="text-emerald-500 font-bold text-lg mb-3 border-b border-slate-700 pb-1">
                      {date}
                    </h3>
                    <div className="grid gap-2">
                      {matches.map((f) => {
                        const tip = state.players[pK]?.tips[f.id] || {};
                        const act = state.actual[f.id] || {};
                        const locked = state.lockedDays?.[f.date] || false;
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
                            <div className="w-16 shrink-0">
                              <div className="text-slate-300 font-bold text-sm">
                                {f.time}
                              </div>
                              <div className="text-xs text-emerald-400">
                                {f.tv}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 flex items-center gap-2">
                              <div
                                className="flex-1 min-w-0 text-right font-medium text-slate-200 text-sm truncate"
                                title={f.home}
                              >
                                {f.home}
                              </div>
                              {has ? (
                                <div className="flex items-center justify-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-700 shrink-0">
                                  <span className="w-5 text-center text-sm font-bold text-white">
                                    {tH}
                                  </span>
                                  <span className="text-slate-500 font-extrabold text-xs">
                                    &ndash;
                                  </span>
                                  <span className="w-5 text-center text-sm font-bold text-white">
                                    {tA}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center bg-slate-900 px-2 py-1 rounded border border-slate-700/50 shrink-0 w-14">
                                  <span className="text-slate-600 font-bold">
                                    –
                                  </span>
                                </div>
                              )}
                              <div
                                className="flex-1 min-w-0 text-left font-medium text-slate-200 text-sm truncate"
                                title={f.away}
                              >
                                {f.away}
                              </div>
                            </div>
                            <div
                              className={`w-14 shrink-0 text-center rounded-lg py-1 font-bold text-sm border ${pts > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-900 text-slate-500 border-slate-700/60"}`}
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
          <div className="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700 print-avoid-break">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4 uppercase text-center">
              Aktuell Leaderboard
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="p-3 border-b border-slate-700 text-slate-400">
                    Placering
                  </th>
                  <th className="p-4 border-b border-slate-700 text-slate-400">
                    Spelare
                  </th>
                  <th className="p-3 border-b border-slate-700 text-right text-emerald-400">
                    Poäng
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((l, i) => (
                  <tr key={l.name} className="border-b border-slate-700/50">
                    <td className="p-3 text-lg font-bold text-slate-300">
                      #{i + 1}
                    </td>
                    <td className="p-4 font-bold text-slate-100">{l.name}</td>
                    <td className="p-3 text-right font-bold text-lg text-emerald-400">
                      {l.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700 flex-wrap justify-center">
            {[
              { key: "tips", label: "Tips rader" },
              { key: "leaderboard", label: "Leaderboard" },
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
                  <br />
                  <strong className="text-slate-300">
                    Kostar 0 förfrågningar
                  </strong>{" "}
                  – sparas bara lokalt i din webbläsare.
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
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
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
                    <th className="p-4 border-b border-slate-700 text-right text-emerald-400 font-bold">
                      Poäng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((l, i) => (
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
                      <td className="p-4 border-b border-slate-700 text-right font-bold text-xl text-emerald-400">
                        {l.pts}
                      </td>
                    </tr>
                  ))}
                  {leaderboard.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-8 text-center text-slate-500"
                      >
                        Inga spelare har lagts till än.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
                  {fixturesData.map((f) => {
                    const act = state.actual[f.id] || {};
                    let actStr = "–";
                    const actH_hasValue = act.h !== undefined && act.h !== "";
                    const actA_hasValue = act.a !== undefined && act.a !== "";
                    if (actH_hasValue || actA_hasValue) {
                      actStr = `${actH_hasValue ? act.h : "0"} – ${actA_hasValue ? act.a : "0"}`;
                    }
                    const locked = state.lockedDays?.[f.date] || false;
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
                            {f.date} {f.time} ({f.tv})
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-white bg-slate-900/30">
                          {actStr}
                        </td>
                        {playerKeys.map((p) => {
                          const tip = state.players[p]?.tips[f.id] || {};
                          let tipStr = "";
                          const tipH_hasValue =
                            tip.h !== undefined && tip.h !== "";
                          const tipA_hasValue =
                            tip.a !== undefined && tip.a !== "";
                          if (tipH_hasValue || tipA_hasValue) {
                            tipStr = `${tipH_hasValue ? tip.h : "0"}–${tipA_hasValue ? tip.a : "0"}`;
                          }
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
                <PlayerControlPanel />
              </div>
            )}

            {Object.entries(groupedFixtures).map(([date, matches]) => {
              const isDayLocked = state.lockedDays?.[date];
              return (
                <div key={date} className="mb-8">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h2 className="text-emerald-500 font-bold text-lg">
                      {date}
                    </h2>
                    {tab === "admin" && (
                      <button
                        onClick={() => toggleDayLock(date)}
                        className={`px-4 py-1 rounded text-sm font-bold shadow-sm transition-colors ${isDayLocked ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
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
                            state.lockedDays?.[f.date],
                          )
                        : null;

                      return (
                        <div
                          key={f.id}
                          className={`bg-slate-800 border ${tab === "admin" && isDayLocked ? "border-rose-500/50" : "border-slate-700"} rounded-lg p-3 shadow-sm hover:border-slate-600 transition-colors w-full`}
                        >
                          {/* ── FIXED LAYOUT: single flex row, no nested grid ── */}
                          <div className="flex items-center gap-2 w-full min-w-0">
                            {/* Time + TV */}
                            <div className="shrink-0 w-14 text-center">
                              <div className="text-slate-300 font-bold text-sm leading-tight">
                                {f.time}
                              </div>
                              <div className="text-xs text-emerald-400 font-medium">
                                {f.tv}
                              </div>
                            </div>

                            {/* Home team name */}
                            <div className="flex-1 min-w-0 text-right">
                              <span
                                className="font-medium text-slate-200 text-xs sm:text-sm leading-tight break-words"
                                title={f.home}
                              >
                                {f.home}
                              </span>
                            </div>

                            {/* Score inputs — fixed width, never grows */}
                            <div className="shrink-0 flex items-center gap-1 bg-slate-950 px-1.5 py-1 rounded border border-slate-700">
                              <ScoreInputGroup
                                id={f.id}
                                field="h"
                                val={matchData.h}
                                disabled={isInputDisabled}
                                isActual={!isTips}
                                date={f.date}
                              />
                              <span className="text-slate-500 font-extrabold text-sm shrink-0 px-0.5">
                                &ndash;
                              </span>
                              <ScoreInputGroup
                                id={f.id}
                                field="a"
                                val={matchData.a}
                                disabled={isInputDisabled}
                                isActual={!isTips}
                                date={f.date}
                              />
                            </div>

                            {/* Away team name */}
                            <div className="flex-1 min-w-0 text-left">
                              <span
                                className="font-medium text-slate-200 text-xs sm:text-sm leading-tight break-words"
                                title={f.away}
                              >
                                {f.away}
                              </span>
                            </div>

                            {/* Points badge */}
                            {isTips && (
                              <div
                                className={`shrink-0 w-12 text-center rounded-lg py-1 font-bold text-xs border ${pts > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-900 text-slate-500 border-slate-700/60"}`}
                              >
                                {pts} pt
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {tab === "tips" && (
              <div className="mt-8 mb-4 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col gap-6 items-center text-center">
                <PlayerControlPanel />
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
                    Exportera en specifik dag:
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
