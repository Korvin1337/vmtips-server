const { useState, useEffect, useMemo, useRef, useCallback } = React;

const BIN_ID = '67cd0095ad19ca34f817db4b';
const API_KEY = '$2a$10$xdIj7X87M6xfcsj/Sn95c.KHT8STn5a1kT4eg2htIjFrRyImmb34G';

const fixturesData = [
    { id: 1, date: "Torsdag 11 juni", time: "21:00", home: "Mexiko", away: "Sydafrika", tv: "TV4" },
    { id: 2, date: "Fredag 12 juni", time: "04:00", home: "Sydkorea", away: "Tjeckien", tv: "TV4" },
    { id: 3, date: "Fredag 12 juni", time: "21:00", home: "Kanada", away: "Bosnien och Hercegovina", tv: "SVT" },
    { id: 4, date: "Lördag 13 juni", time: "03:00", home: "USA", away: "Paraguay", tv: "TV4" },
    { id: 5, date: "Lördag 13 juni", time: "21:00", home: "Qatar", away: "Schweiz", tv: "TV4" },
    { id: 6, date: "Söndag 14 juni", time: "00:00", home: "Brasilien", away: "Marocko", tv: "SVT" },
    { id: 7, date: "Söndag 14 juni", time: "03:00", home: "Haiti", away: "Skottland", tv: "SVT" },
    { id: 8, date: "Söndag 14 juni", time: "06:00", home: "Australien", away: "Turkiet", tv: "TV4" },
    { id: 9, date: "Söndag 14 juni", time: "19:00", home: "Tyskland", away: "Curacao", tv: "TV4" },
    { id: 10, date: "Söndag 14 juni", time: "22:00", home: "Nederländerna", away: "Japan", tv: "TV4" },
    { id: 11, date: "Måndag 15 juni", time: "01:00", home: "Elfenbenskusten", away: "Ecuador", tv: "TV4" },
    { id: 12, date: "Måndag 15 juni", time: "04:00", home: "Sverige", away: "Tunisien", tv: "SVT" },
    { id: 13, date: "Måndag 15 juni", time: "18:00", home: "Spanien", away: "Kap Verde", tv: "SVT" },
    { id: 14, date: "Måndag 15 juni", time: "21:00", home: "Belgien", away: "Egypten", tv: "SVT" },
    { id: 15, date: "Tisdag 16 juni", time: "00:00", home: "Saudiarabien", away: "Uruguay", tv: "TV4" },
    { id: 16, date: "Tisdag 16 juni", time: "03:00", home: "Iran", away: "Nya Zeeland", tv: "TV4" },
    { id: 17, date: "Tisdag 16 juni", time: "21:00", home: "Frankrike", away: "Senegal", tv: "SVT" },
    { id: 18, date: "Onsdag 17 juni", time: "00:00", home: "Irak", away: "Norge", tv: "TV4" },
    { id: 19, date: "Onsdag 17 juni", time: "03:00", home: "Argentina", away: "Algeriet", tv: "TV4" },
    { id: 20, date: "Onsdag 17 juni", time: "06:00", home: "Österrike", away: "Jordanien", tv: "TV4" },
    { id: 21, date: "Onsdag 17 juni", time: "19:00", home: "Portugal", away: "Kongo-Kinshasa", tv: "TV4" },
    { id: 22, date: "Onsdag 17 juni", time: "22:00", home: "England", away: "Kroatien", tv: "TV4" },
    { id: 23, date: "Torsdag 18 juni", time: "01:00", home: "Ghana", away: "Panama", tv: "TV4" },
    { id: 24, date: "Torsdag 18 juni", time: "04:00", home: "Uzbekistan", away: "Colombia", tv: "TV4" },
    { id: 25, date: "Torsdag 18 juni", time: "18:00", home: "Tjeckien", away: "Sydafrika", tv: "TV4" },
    { id: 26, date: "Torsdag 18 juni", time: "21:00", home: "Schweiz", away: "Bosnien och Hercegovina", tv: "TV4" },
    { id: 27, date: "Fredag 19 juni", time: "00:00", home: "Kanada", away: "Qatar", tv: "TV4" },
    { id: 28, date: "Fredag 19 juni", time: "03:00", home: "Mexiko", away: "Sydkorea", tv: "TV4" },
    { id: 29, date: "Fredag 19 juni", time: "21:00", home: "USA", away: "Australien", tv: "SVT" },
    { id: 30, date: "Lördag 20 juni", time: "00:00", home: "Skottland", away: "Marocko", tv: "SVT" },
    { id: 31, date: "Lördag 20 juni", time: "03:00", home: "Brasilien", away: "Haiti", tv: "TV4" },
    { id: 32, date: "Lördag 20 juni", time: "06:00", home: "Turkiet", away: "Paraguay", tv: "TV4" },
    { id: 33, date: "Lördag 20 juni", time: "19:00", home: "Nederländerna", away: "Sverige", tv: "TV4" },
    { id: 34, date: "Lördag 20 juni", time: "22:00", home: "Tyskland", away: "Elfenbenskusten", tv: "TV4" },
    { id: 35, date: "Söndag 21 juni", time: "02:00", home: "Ecuador", away: "Curacao", tv: "TV4" },
    { id: 36, date: "Söndag 21 juni", time: "06:00", home: "Tunisien", away: "Japan", tv: "SVT" },
    { id: 37, date: "Söndag 21 juni", time: "18:00", home: "Spanien", away: "Saudiarabien", tv: "TV4" },
    { id: 38, date: "Söndag 21 juni", time: "21:00", home: "Belgien", away: "Iran", tv: "TV4" },
    { id: 39, date: "Måndag 22 juni", time: "00:00", home: "Uruguay", away: "Kap Verde", tv: "TV4" },
    { id: 40, date: "Måndag 22 juni", time: "03:00", home: "Nya Zeeland", away: "Egypten", tv: "TV4" },
    { id: 41, date: "Måndag 22 juni", time: "19:00", home: "Argentina", away: "Österrike", tv: "SVT" },
    { id: 42, date: "Måndag 22 juni", time: "23:00", home: "Frankrike", away: "Irak", tv: "SVT" },
    { id: 43, date: "Tisdag 23 juni", time: "02:00", home: "Norge", away: "Senegal", tv: "SVT" },
    { id: 44, date: "Tisdag 23 juni", time: "05:00", home: "Jordanien", away: "Algeriet", tv: "TV4" },
    { id: 45, date: "Tisdag 23 juni", time: "19:00", home: "Portugal", away: "Uzbekistan", tv: "SVT" },
    { id: 46, date: "Tisdag 23 juni", time: "22:00", home: "England", away: "Ghana", tv: "SVT" },
    { id: 47, date: "Onsdag 24 juni", time: "01:00", home: "Panama", away: "Kroatien", tv: "TV4" },
    { id: 48, date: "Onsdag 24 juni", time: "04:00", home: "Colombia", away: "Kongo-Kinshasa", tv: "TV4" },
    { id: 49, date: "Onsdag 24 juni", time: "21:00", home: "Schweiz", away: "Kanada", tv: "TV4" },
    { id: 50, date: "Onsdag 24 juni", time: "21:00", home: "Bosnien och Hercegovina", away: "Qatar", tv: "TV4" },
    { id: 51, date: "Torsdag 25 juni", time: "00:00", home: "Marocko", away: "Haiti", tv: "TV4" },
    { id: 52, date: "Torsdag 25 juni", time: "00:00", home: "Skottland", away: "Brasilien", tv: "TV4" },
    { id: 53, date: "Torsdag 25 juni", time: "03:00", home: "Sydafrika", away: "Sydkorea", tv: "SVT" },
    { id: 54, date: "Torsdag 25 juni", time: "03:00", home: "Tjeckien", away: "Mexiko", tv: "SVT" },
    { id: 55, date: "Torsdag 25 juni", time: "22:00", home: "Curacao", away: "Elfenbenskusten", tv: "SVT" },
    { id: 56, date: "Torsdag 25 juni", time: "22:00", home: "Ecuador", away: "Tyskland", tv: "SVT" },
    { id: 57, date: "Fredag 26 juni", time: "01:00", home: "Tunisien", away: "Nederländerna", tv: "SVT" },
    { id: 58, date: "Fredag 26 juni", time: "01:00", home: "Japan", away: "Sverige", tv: "SVT" },
    { id: 59, date: "Fredag 26 juni", time: "04:00", home: "Turkiet", away: "USA", tv: "TV4" },
    { id: 60, date: "Fredag 26 juni", time: "04:00", home: "Paraguay", away: "Australien", tv: "TV4" },
    { id: 61, date: "Fredag 26 juni", time: "21:00", home: "Norge", away: "Frankrike", tv: "TV4" },
    { id: 62, date: "Fredag 26 juni", time: "21:00", home: "Senegal", away: "Irak", tv: "TV4" },
    { id: 63, date: "Lördag 27 juni", time: "02:00", home: "Kap Verde", away: "Saudiarabien", tv: "TV4" },
    { id: 64, date: "Lördag 27 juni", time: "02:00", home: "Uruguay", away: "Spanien", tv: "TV4" },
    { id: 65, date: "Lördag 27 juni", time: "05:00", home: "Nya Zeeland", away: "Belgien", tv: "TV4" },
    { id: 66, date: "Lördag 27 juni", time: "05:00", home: "Egypten", away: "Iran", tv: "TV4" },
    { id: 67, date: "Lördag 27 juni", time: "23:00", home: "Panama", away: "England", tv: "SVT" },
    { id: 68, date: "Lördag 27 juni", time: "23:00", home: "Kroatien", away: "Ghana", tv: "SVT" },
    { id: 69, date: "Söndag 28 juni", time: "01:30", home: "Kongo-Kinshasa", away: "Uzbekistan", tv: "TV4" },
    { id: 70, date: "Söndag 28 juni", time: "01:30", home: "Colombia", away: "Portugal", tv: "TV4" },
    { id: 71, date: "Söndag 28 juni", time: "04:00", home: "Algeriet", away: "Österrike", tv: "TV4" },
    { id: 72, date: "Söndag 28 juni", time: "04:00", home: "Jordanien", away: "Argentina", tv: "TV4" }
];

const defaultAppState = {
    players: {},
    actual: {},
    lockedDays: {}
};

const groupedFixtures = fixturesData.reduce((acc, f) => {
    if (!acc[f.date]) acc[f.date] = [];
    acc[f.date].push(f);
    return acc;
}, {});

const calculateMatchScore = (actH, actA, tipH, tipA, isResultLocked) => {
    if (!isResultLocked) return 0;
    
    if (actH === undefined || actH === "" || actA === undefined || actA === "") return 0;

    const tH = (tipH !== undefined && tipH !== "") ? parseInt(tipH, 10) : 0;
    const tA = (tipA !== undefined && tipA !== "") ? parseInt(tipA, 10) : 0;
    const aH = parseInt(actH, 10);
    const aA = parseInt(actA, 10);
    const aSign = aH > aA ? "1" : aA > aH ? "2" : "X";
    const tSign = tH > tA ? "1" : tA > tH ? "2" : "X";
    const signPts = aSign === tSign ? 1 : 0;
    const exactPts = (aH === tH && aA === tA) ? 3 : 0;
    return signPts + exactPts;
};

const App = () => {
    const [state, setState] = useState(defaultAppState);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState("");
    const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
    const [browsedPlayer, setBrowsedPlayer] = useState("");
    const [newPlayerName, setNewPlayerName] = useState("");
    const [tab, setTab] = useState("tips");
    const [loadedFile, setLoadedFile] = useState(false);
    const [printMode, setPrintMode] = useState(null);
    const [selectedPrintDate, setSelectedPrintDate] = useState("Torsdag 11 juni");
    
    const [modalConfig, setModalConfig] = useState(null);

    const fileInputRef = useRef(null);
    const ADMIN_PASSWORD = "VMTIPS2026";

    useEffect(() => {
        fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Access-Key': API_KEY
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Could not load from server");
        })
        .then(data => {
            if (data.record) {
                setState(data.record);
                if (Object.keys(data.record.players).length > 0) {
                    setBrowsedPlayer(Object.keys(data.record.players)[0]);
                }
            }
            setLoadedFile(true);
        })
        .catch(() => {
            const saved = localStorage.getItem("vmtips_v3");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setState(parsed);
                    if (Object.keys(parsed.players).length > 0) {
                        setBrowsedPlayer(Object.keys(parsed.players)[0]);
                    }
                } catch (e) {}
            }
            setLoadedFile(true);
        });
    }, []);

    useEffect(() => {
        if (loadedFile) {
            localStorage.setItem("vmtips_v3", JSON.stringify(state));

            if (isAuthenticated) {
                fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Access-Key': API_KEY
                    },
                    body: JSON.stringify(state),
                }).catch(err => console.error("Failed to save to server:", err));
            }
        }
    }, [state, loadedFile, isAuthenticated]);

    useEffect(() => {
        if (printMode !== null) {
            const timer = setTimeout(() => {
                window.print();
                setPrintMode(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [printMode]);

    const requireAdmin = (actionCallback) => {
        if (isAuthenticated) {
            actionCallback();
        } else {
            setModalConfig({
                title: "Åtkomst Nekad",
                message: "Endast Admin kan utföra denna åtgärd.",
                type: "error"
            });
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginAttempt === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setHasAttemptedLogin(true);
    };

    const handleGuestLogin = () => {
        setIsAuthenticated(false);
        setHasAttemptedLogin(true);
    };

    const handlePlayerChange = useCallback((newName) => {
        setBrowsedPlayer(newName);
    }, []);

    const handleAddPlayer = (e) => {
        e.preventDefault();
        requireAdmin(() => {
            const val = newPlayerName.trim();
            if (val) {
                setState(s => {
                    if (!s.players[val]) {
                        return {
                            ...s,
                            players: {
                                ...s.players,
                                [val]: { tips: {}, locked: false }
                            }
                        };
                    }
                    return s;
                });
                setBrowsedPlayer(val);
                setNewPlayerName("");
            }
        });
    };

    const handleDeletePlayer = () => {
        requireAdmin(() => {
            const playerKey = browsedPlayer.trim();
            if (!playerKey || !state.players[playerKey]) return;
            
            setModalConfig({
                title: "Ta Bort Spelare",
                message: `Är du säker på att du vill ta bort ${playerKey} och alla dess tips?`,
                type: "confirm",
                onConfirm: () => {
                    setState(s => {
                        const newPlayers = { ...s.players };
                        delete newPlayers[playerKey];
                        return { ...s, players: newPlayers };
                    });
                    setBrowsedPlayer("");
                    setModalConfig(null);
                }
            });
        });
    };

    const updateTip = (id, field, val) => {
        const playerKey = browsedPlayer.trim();
        if (!playerKey) return;
        
        let parsedVal = parseInt(val, 10);
        if (isNaN(parsedVal)) parsedVal = "";
        else {
            parsedVal = Math.max(0, Math.min(9, parsedVal));
        }

        setState(s => {
            const currentPlayers = { ...s.players };
            if (!currentPlayers[playerKey]) {
                currentPlayers[playerKey] = { tips: {}, locked: false };
            }
            return {
                ...s,
                players: {
                    ...currentPlayers,
                    [playerKey]: {
                        ...currentPlayers[playerKey],
                        tips: {
                            ...currentPlayers[playerKey].tips,
                            [id]: { ...currentPlayers[playerKey].tips[id], [field]: parsedVal.toString() }
                        }
                    }
                }
            };
        });
    };

    const updateActual = (id, field, val) => {
        let parsedVal = parseInt(val, 10);
        if (isNaN(parsedVal)) parsedVal = "";
        else {
            parsedVal = Math.max(0, Math.min(9, parsedVal));
        }

        setState(s => ({
            ...s,
            actual: {
                ...s.actual,
                [id]: { ...s.actual[id], [field]: parsedVal.toString() }
            }
        }));
    };

    const toggleDayLock = (date) => {
        requireAdmin(() => {
            setModalConfig({
                title: "Hantera Dagens Låsning",
                message: `Vill du ändra status för "${date}"?`,
                type: "confirm",
                onConfirm: () => {
                    setState(s => ({
                        ...s,
                        lockedDays: {
                            ...s.lockedDays,
                            [date]: !s.lockedDays?.[date]
                        }
                    }));
                    setModalConfig(null);
                }
            });
        });
    };

    const adjustScore = (id, field, currentVal, delta, isActual, date) => {
        if (!isActual) {
            const playerKey = browsedPlayer.trim();
            if (!playerKey || state.players[playerKey]?.locked) return;
        } else {
            if (state.lockedDays?.[date]) return;
        }
        
        const current = (currentVal !== undefined && currentVal !== "") ? parseInt(currentVal, 10) : 0;
        let next = current + delta;
        next = Math.max(0, Math.min(9, next)).toString();

        if (isActual) {
            updateActual(id, field, next);
        } else {
            updateTip(id, field, next);
        }
    };

    const toggleLock = () => {
        requireAdmin(() => {
            const playerKey = browsedPlayer.trim();
            if (!playerKey) return;

            setModalConfig({
                title: "Lås Spelare",
                message: `Ändra lås-status för ${playerKey}?`,
                type: "confirm",
                onConfirm: () => {
                    setState(s => {
                        const currentPlayers = { ...s.players };
                        if (!currentPlayers[playerKey]) {
                            currentPlayers[playerKey] = { tips: {}, locked: false };
                        }
                        return {
                            ...s,
                            players: {
                                ...currentPlayers,
                                [playerKey]: {
                                    ...currentPlayers[playerKey],
                                    locked: !currentPlayers[playerKey].locked
                                }
                            }
                        }
                    });
                    setModalConfig(null);
                }
            });
        });
    };

    const handleExport = () => {
        requireAdmin(() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "vmtips_backup.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    };

    const handleImport = (event) => {
        requireAdmin(() => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedState = JSON.parse(e.target.result);
                        setModalConfig({
                            title: "Varning - Skriv Över Databas",
                            message: "Är du säker på att du vill läsa in en extern fil? Detta skriver över alla nuvarande inställningar.",
                            type: "confirm",
                            onConfirm: () => {
                                setState(importedState);
                                setModalConfig(null);
                            }
                        });
                    } catch (err) {}
                };
                reader.readAsText(file);
            }
        });
    };

    const leaderboard = useMemo(() => {
        return Object.entries(state.players).map(([name, data]) => {
            let pts = 0;
            fixturesData.forEach(f => {
                const act = state.actual[f.id] || {};
                const tip = data.tips[f.id] || {};
                const isResultLocked = state.lockedDays?.[f.date] || false;
                pts += calculateMatchScore(act.h, act.a, tip.h, tip.a, isResultLocked);
            });
            return { name, pts, locked: data.locked };
        }).sort((a, b) => b.pts - a.pts);
    }, [state]);

    const uniqueDates = useMemo(() => Object.keys(groupedFixtures), []);
    const playerKeys = Object.keys(state.players);

    const ScoreInputGroup = ({ id, field, val, disabled, isActual, date }) => {
        const cleanVal = (val === undefined || val === "") ? "" : val;
        
        return (
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 select-none">
                <button
                    type="button"
                    disabled={disabled || (!isActual && !isAuthenticated) || (cleanVal !== "" && parseInt(cleanVal) >= 9)}
                    onClick={() => adjustScore(id, field, cleanVal, 1, isActual, date)}
                    className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-sm transition-colors disabled:opacity-40"
                >
                    +
                </button>
                <input
                    type="number"
                    min="0"
                    max="9"
                    value={cleanVal}
                    disabled={disabled || (!isActual && !isAuthenticated)}
                    placeholder={isActual ? "-" : "0"}
                    onChange={e => isActual ? updateActual(id, field, e.target.value) : updateTip(id, field, e.target.value)}
                    className="w-9 bg-transparent text-center text-base font-bold text-white focus:outline-none disabled:opacity-50"
                />
                <button
                    type="button"
                    disabled={disabled || (!isActual && !isAuthenticated) || cleanVal === "0" || cleanVal === ""}
                    onClick={() => adjustScore(id, field, cleanVal, -1, isActual, date)}
                    className="w-7 h-7 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 disabled:text-slate-600 rounded font-black text-sm transition-colors disabled:opacity-40"
                >
                    &minus;
                </button>
            </div>
        );
    };

    if (!loadedFile) return <div className="text-center p-8 text-slate-400">Laddar databas...</div>;

    if (!hasAttemptedLogin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 relative gap-12">
                <div className="bg-slate-800 p-10 rounded-xl shadow-2xl border border-slate-700 w-full max-w-lg text-center">
                    <h1 className="text-5xl font-black text-emerald-400 mb-4 tracking-wider">VM Tips 2026</h1>
                    <h2 className="text-xl text-slate-200 mb-8 font-medium">Mästerskapet</h2>
                    
                    <button 
                        onClick={handleGuestLogin}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 text-lg rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
                    >
                        Fortsätt
                    </button>
                </div>

                <div className="w-full max-w-sm mt-12 opacity-30 hover:opacity-100 transition-opacity duration-300">
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
                        <label className="text-xs text-slate-500 uppercase tracking-widest text-center font-bold">Admin Inloggning</label>
                        <input
                            type="password"
                            value={loginAttempt}
                            onChange={e => setLoginAttempt(e.target.value)}
                            placeholder="Lösenord..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-center focus:outline-none focus:border-emerald-500"
                        />
                        <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                            Logga in som Admin
                        </button>
                    </form>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 pointer-events-none select-text text-[10px]">
                    VMTIPS2026
                </div>
            </div>
        );
    }

    if (printMode === 'overview') {
        return (
            <div className="p-4 bg-slate-900 text-slate-100 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8 uppercase tracking-widest">VM Tips 2026 - Sammanställning</h1>
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-slate-900/80">
                            <th className="p-2 border-b border-slate-700 text-slate-400 font-medium">Match & Tid</th>
                            <th className="p-2 border-b border-slate-700 text-emerald-400 font-medium text-center">Resultat</th>
                            {playerKeys.map(p => (
                                <th key={p} className="p-2 border-b border-slate-700 text-slate-200 font-bold text-center border-l border-slate-700/50">{p}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fixturesData.map((f, idx) => {
                            const act = state.actual[f.id] || {};
                            const actStr = (act.h !== undefined && act.h !== "" && act.a !== undefined && act.a !== "") ? `${act.h} - ${act.a}` : "-";
                            const isResultLocked = state.lockedDays?.[f.date] || false;

                            return (
                                <tr key={f.id} className="border-b border-slate-700/50 print-avoid-break">
                                    <td className="p-2 text-slate-300">
                                        <div className="font-bold">{f.home} - {f.away}</div>
                                        <div className="text-[10px] text-slate-500">{f.date} {f.time}</div>
                                    </td>
                                    <td className="p-2 text-center font-bold text-white">{actStr}</td>
                                    {playerKeys.map(p => {
                                        const tip = state.players[p]?.tips[f.id] || {};
                                        const tipStr = (tip.h !== undefined && tip.h !== "" && tip.a !== undefined && tip.a !== "") ? `${tip.h}-${tip.a}` : "";
                                        const pts = calculateMatchScore(act.h, act.a, tip.h, tip.a, isResultLocked);
                                        
                                        return (
                                            <td key={p} className="p-2 text-center border-l border-slate-700/50">
                                                {tipStr ? (
                                                    <div className="flex flex-col items-center">
                                                        <span className="font-bold text-slate-200">{tipStr}</span>
                                                        {isResultLocked && <span className={`text-[10px] ${pts > 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>{pts} pt</span>}
                                                    </div>
                                                ) : <span className="text-slate-600">-</span>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    if (printMode !== null && printMode !== 'overview') {
        const isLeaderboardOnly = printMode === 'leaderboard';
        const playersToPrint = (printMode === 'all' || printMode === 'day-all') ? playerKeys : [browsedPlayer.trim()];
        const datesToRender = (printMode === 'day-single' || printMode === 'day-all') 
            ? [[selectedPrintDate, groupedFixtures[selectedPrintDate]]] 
            : Object.entries(groupedFixtures);
        
        return (
            <div className="p-4 bg-slate-900 text-slate-100 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8 uppercase tracking-widest">VM Tips 2026</h1>
                
                {!isLeaderboardOnly && playersToPrint.map((pK, index) => (
                    <div key={pK} className={`mb-12 ${index !== playersToPrint.length - 1 ? 'print-page-break' : ''}`}>
                        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700 shadow-md">
                            <h2 className="text-2xl font-bold text-emerald-400 mb-1">{pK}</h2>
                            <p className="text-slate-400 text-sm">Officiell Tipsrad</p>
                        </div>
                        
                        {datesToRender.map(([date, matches]) => (
                            <div key={date} className="mb-6 print-avoid-break">
                                <h3 className="text-emerald-500 font-bold text-lg mb-3 border-b border-slate-700 pb-1">{date}</h3>
                                <div className="grid gap-2">
                                    {matches.map(f => {
                                        const tip = state.players[pK]?.tips[f.id] || {};
                                        const act = state.actual[f.id] || {};
                                        const isResultLocked = state.lockedDays?.[f.date] || false;
                                        const pts = calculateMatchScore(act.h, act.a, tip.h, tip.a, isResultLocked);
                                        const tipStrH = (tip.h !== undefined && tip.h !== "") ? tip.h : "0";
                                        const tipStrA = (tip.a !== undefined && tip.a !== "") ? tip.a : "0";
                                        
                                        return (
                                            <div key={f.id} className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex flex-row items-center gap-4 shadow-sm">
                                                <div className="w-20 shrink-0">
                                                    <div className="text-slate-300 font-bold text-sm">{f.time}</div>
                                                    <div className="text-xs text-emerald-400 font-medium">{f.tv}</div>
                                                </div>
                                                
                                                <div className="flex-1 flex items-center justify-between gap-4">
                                                    <div className="text-right flex-1 font-medium tracking-wide text-slate-200">{f.home}</div>
                                                    
                                                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-700">
                                                        <div className="w-6 text-center text-lg font-bold text-white">{tipStrH}</div>
                                                        <span className="text-slate-500 font-extrabold text-base">&ndash;</span>
                                                        <div className="w-6 text-center text-lg font-bold text-white">{tipStrA}</div>
                                                    </div>

                                                    <div className="text-left flex-1 font-medium tracking-wide text-slate-200">{f.away}</div>
                                                </div>
                                                
                                                <div className={`w-16 shrink-0 text-center rounded-lg py-1 font-bold text-sm border ${pts > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-900 text-slate-500 border-slate-700/60'}`}>
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

                <div className="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md print-avoid-break">
                    <h2 className="text-2xl font-bold text-emerald-400 mb-4 uppercase tracking-wider text-center">Aktuell Leaderboard</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50">
                                <th className="p-3 border-b border-slate-700 text-slate-400 font-medium">Placering</th>
                                <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">Spelare</th>
                                <th className="p-3 border-b border-slate-700 text-right text-emerald-400 font-bold">Poäng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((l, idx) => (
                                <tr key={l.name} className="border-b border-slate-700/50">
                                    <td className="p-3 text-lg font-bold text-slate-300">#{idx + 1}</td>
                                    <td className="p-4 font-bold text-slate-100">{l.name}</td>
                                    <td className="p-3 text-right font-bold text-lg text-emerald-400">{l.pts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 relative">
            
            {modalConfig && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-md">
                        <h3 className={`text-xl font-bold mb-3 ${modalConfig.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {modalConfig.title}
                        </h3>
                        <p className="text-slate-300 mb-6">{modalConfig.message}</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setModalConfig(null)} 
                                className="px-4 py-2 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                            >
                                {modalConfig.type === 'error' ? 'Stäng' : 'Avbryt'}
                            </button>
                            {modalConfig.type === 'confirm' && (
                                <button 
                                    onClick={modalConfig.onConfirm} 
                                    className="px-4 py-2 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                                >
                                    Bekräfta
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="bg-slate-800 rounded-xl p-6 mb-6 shadow-lg border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-emerald-400">VM Tips 2026</h1>
                    <p className="text-slate-400 text-sm">Läge: <span className={`font-bold ${isAuthenticated ? 'text-emerald-400' : 'text-slate-300'}`}>{isAuthenticated ? 'Admin' : 'Åskådare'}</span></p>
                </div>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700 flex-wrap justify-center">
                    <button onClick={() => setTab("tips")} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${tab === "tips" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}>
                        Hantera Tips rader
                    </button>
                    <button onClick={() => setTab("leaderboard")} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${tab === "leaderboard" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}>
                        Leaderboard
                    </button>
                    <button onClick={() => setTab("admin")} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${tab === "admin" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}>
                        Faktiska Resultat
                    </button>
                    <button onClick={() => setTab("overview")} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${tab === "overview" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}>
                        Översikt
                    </button>
                    <button onClick={() => setTab("settings")} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${tab === "settings" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}>
                        Spara / Ladda
                    </button>
                </div>
            </header>

            {tab === "settings" && (
                <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 flex flex-col items-center gap-6 text-center">
                    <h2 className="text-xl font-bold text-emerald-400">Exportera / Importera Databas (JSON)</h2>
                    <p className="text-slate-400 max-w-lg">
                        Din data sparas automatiskt i webbläsaren och uppdateras mot molnet när du är inloggad som Admin. Om du vill ta en säkerhetskopia kan du ladda ner databasen manuellt här.
                    </p>
                    
                    <div className="flex gap-4">
                        <button onClick={handleExport} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
                            Ladda ner vmtips_backup.json
                        </button>
                        
                        <button onClick={() => fileInputRef.current.click()} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-slate-600">
                            Ladda in befintlig JSON Fil
                        </button>
                        <input 
                            type="file" 
                            accept=".json" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleImport} 
                        />
                    </div>
                </div>
            )}

            {tab === "leaderboard" && (
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50">
                                    <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">Placering</th>
                                    <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">Spelare</th>
                                    <th className="p-4 border-b border-slate-700 text-slate-400 font-medium">Status</th>
                                    <th className="p-4 border-b border-slate-700 text-right text-emerald-400 font-bold">Poäng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((l, idx) => (
                                    <tr key={l.name} className="hover:bg-slate-700/50 transition-colors">
                                        <td className="p-4 border-b border-slate-700 text-xl font-bold text-slate-300">#{idx + 1}</td>
                                        <td className="p-4 border-b border-slate-700 font-bold">{l.name}</td>
                                        <td className="p-4 border-b border-slate-700">
                                            {l.locked ? <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded border border-rose-500/30">Låst</span> : <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">Öppen</span>}
                                        </td>
                                        <td className="p-4 border-b border-slate-700 text-right font-bold text-xl text-emerald-400">{l.pts}</td>
                                    </tr>
                                ))}
                                {leaderboard.length === 0 && (
                                    <tr><td colSpan="4" className="p-8 text-center text-slate-500">Inga spelare har lagts till än. Välj fliken 'Hantera Tips rader' och lägg till en spelare.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {playerKeys.length > 0 && (
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex justify-center">
                            <button 
                                onClick={() => setPrintMode('leaderboard')} 
                                className="px-8 py-3 rounded-lg font-bold shadow-lg transition-colors text-sm bg-blue-600 hover:bg-blue-500 text-white"
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
                                    <th className="p-3 border-b border-slate-700 text-slate-400 font-medium sticky left-0 bg-slate-900 z-10">Match & Tid</th>
                                    <th className="p-3 border-b border-slate-700 text-emerald-400 font-medium text-center">Resultat</th>
                                    {playerKeys.map(p => (
                                        <th key={p} className="p-3 border-b border-slate-700 text-slate-200 font-bold text-center border-l border-slate-700/50">{p}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fixturesData.map((f, idx) => {
                                    const act = state.actual[f.id] || {};
                                    const actStr = (act.h !== undefined && act.h !== "" && act.a !== undefined && act.a !== "") ? `${act.h} - ${act.a}` : "-";
                                    const isResultLocked = state.lockedDays?.[f.date] || false;

                                    return (
                                        <tr key={f.id} className="hover:bg-slate-700/50 transition-colors border-b border-slate-700/50">
                                            <td className="p-3 text-slate-300 sticky left-0 bg-slate-800 z-10 border-r border-slate-700/50">
                                                <div className="font-bold">{f.home} - {f.away}</div>
                                                <div className="text-xs text-slate-500">{f.date} {f.time} ({f.tv})</div>
                                            </td>
                                            <td className="p-3 text-center font-bold text-white bg-slate-900/30">{actStr}</td>
                                            {playerKeys.map(p => {
                                                const tip = state.players[p]?.tips[f.id] || {};
                                                const tipStr = (tip.h !== undefined && tip.h !== "" && tip.a !== undefined && tip.a !== "") ? `${tip.h}-${tip.a}` : "";
                                                const pts = calculateMatchScore(act.h, act.a, tip.h, tip.a, isResultLocked);
                                                
                                                return (
                                                    <td key={p} className="p-3 text-center border-l border-slate-700/50">
                                                        {tipStr ? (
                                                            <div className="flex flex-col items-center">
                                                                <span className="font-bold text-slate-200">{tipStr}</span>
                                                                {isResultLocked && <span className={`text-[10px] ${pts > 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>{pts} pt</span>}
                                                            </div>
                                                        ) : <span className="text-slate-600">-</span>}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex justify-center">
                        <button 
                            onClick={() => setPrintMode('overview')} 
                            className="px-8 py-3 rounded-lg font-bold shadow-lg transition-colors text-sm bg-blue-600 hover:bg-blue-500 text-white"
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
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Lägg till / Sök Spelare</label>
                                <form onSubmit={handleAddPlayer} className="flex flex-col md:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={newPlayerName}
                                        onChange={e => setNewPlayerName(e.target.value)}
                                        placeholder="Skriv in namn och tryck enter/lägg till..."
                                        className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white text-lg font-bold focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newPlayerName.trim() || !isAuthenticated}
                                        className="px-6 py-3 rounded-lg font-bold shadow-sm transition-colors text-sm md:text-base whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                        title={!isAuthenticated ? "Endast Admin kan lägga till spelare" : ""}
                                    >
                                        Lägg Till / Sök
                                    </button>
                                </form>
                            </div>

                            {playerKeys.length > 0 && (
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Välj Befintlig Spelare:</label>
                                    <div className="flex flex-wrap gap-2">
                                        {playerKeys.map(p => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => handlePlayerChange(p)}
                                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${browsedPlayer === p ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {browsedPlayer.trim() && state.players[browsedPlayer.trim()] && (
                                <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-slate-300">
                                        Vald Spelare: <span className="font-bold text-emerald-400">{browsedPlayer}</span>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={toggleLock}
                                            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm whitespace-nowrap ${state.players[browsedPlayer.trim()].locked ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                                        >
                                            {state.players[browsedPlayer.trim()].locked ? 'Lås Upp Tips' : 'Lås Denna Spelares Tips'}
                                        </button>
                                        <button
                                            onClick={handleDeletePlayer}
                                            className="px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm whitespace-nowrap bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white"
                                        >
                                            Ta Bort
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {Object.entries(groupedFixtures).map(([date, matches]) => {
                        const isDayLocked = state.lockedDays?.[date];
                        return (
                            <div key={date} className="mb-8">
                                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                                    <h2 className="text-emerald-500 font-bold text-lg">{date}</h2>
                                    {tab === "admin" && (
                                        <button
                                            onClick={() => toggleDayLock(date)}
                                            className={`px-4 py-1 rounded text-sm font-bold shadow-sm transition-colors ${isDayLocked ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                                        >
                                            {isDayLocked ? 'Lås Upp Dagen' : 'Lås Resultat för Dagen'}
                                        </button>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    {matches.map(f => {
                                        const isTipsMode = tab === "tips";
                                        const playerKey = browsedPlayer.trim();
                                        const matchData = isTipsMode ? (state.players[playerKey]?.tips[f.id] || {}) : (state.actual[f.id] || {});
                                        const act = state.actual[f.id] || {};
                                        
                                        const isInputDisabled = isTipsMode 
                                            ? (!playerKey || state.players[playerKey]?.locked || !isAuthenticated) 
                                            : (isDayLocked || !isAuthenticated);
                                            
                                        const pts = isTipsMode ? calculateMatchScore(act.h, act.a, matchData.h, matchData.a, state.lockedDays?.[f.date]) : null;

                                        return (
                                            <div key={f.id} className={`bg-slate-800 border ${tab === 'admin' && isDayLocked ? 'border-rose-500/50' : 'border-slate-700'} rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm hover:border-slate-600 transition-colors`}>
                                                <div className="text-center md:text-left md:w-24 shrink-0">
                                                    <div className="text-slate-300 font-bold">{f.time}</div>
                                                    <div className="text-xs text-emerald-400 font-medium">{f.tv}</div>
                                                </div>
                                                
                                                <div className="flex-1 flex items-center justify-between gap-4 w-full">
                                                    <div className="text-right flex-1 font-medium tracking-wide text-slate-200">{f.home}</div>
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <ScoreInputGroup
                                                            id={f.id}
                                                            field="h"
                                                            val={matchData.h}
                                                            disabled={isInputDisabled}
                                                            isActual={!isTipsMode}
                                                            date={f.date}
                                                        />
                                                        <span className="text-slate-500 font-extrabold text-lg">&ndash;</span>
                                                        <ScoreInputGroup
                                                            id={f.id}
                                                            field="a"
                                                            val={matchData.a}
                                                            disabled={isInputDisabled}
                                                            isActual={!isTipsMode}
                                                            date={f.date}
                                                        />
                                                    </div>

                                                    <div className="text-left flex-1 font-medium tracking-wide text-slate-200">{f.away}</div>
                                                </div>

                                                {isTipsMode && (
                                                    <div className={`md:w-20 shrink-0 text-center rounded-lg py-2 font-bold text-sm border ${pts > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-900 text-slate-500 border-slate-700/60'}`}>
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
                            <div>
                                <h3 className="text-lg font-bold text-emerald-400 mb-1">Exportera / Skriv ut (PDF)</h3>
                                <p className="text-slate-400 text-sm max-w-md">Skriv ut rader eller spara ner som en stilren PDF-sammanställning med leaderboard inkluderat på slutet.</p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pb-4 border-b border-slate-700/60 w-full justify-center flex-wrap">
                                {browsedPlayer.trim() && state.players[browsedPlayer.trim()] && (
                                    <button 
                                        onClick={() => setPrintMode('single')} 
                                        className="px-6 py-3 rounded-lg font-bold shadow-sm transition-colors text-sm bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto"
                                    >
                                        Spara {browsedPlayer.trim()}s Tips + Leaderboard
                                    </button>
                                )}
                                
                                {playerKeys.length > 0 && (
                                    <button 
                                        onClick={() => setPrintMode('all')} 
                                        className="px-6 py-3 rounded-lg font-bold shadow-sm transition-colors text-sm bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 w-full sm:w-auto"
                                    >
                                        Spara Allas Tips + Leaderboard
                                    </button>
                                )}

                                {playerKeys.length > 0 && (
                                    <button 
                                        onClick={() => setPrintMode('leaderboard')} 
                                        className="px-6 py-3 rounded-lg font-bold shadow-sm transition-colors text-sm bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto"
                                    >
                                        Exportera Endast Leaderboard
                                    </button>
                                )}
                            </div>

                            <div className="w-full">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Exportera en specifik dag:</label>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                                    <select 
                                        value={selectedPrintDate} 
                                        onChange={e => setSelectedPrintDate(e.target.value)} 
                                        className="bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                                    >
                                        {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    
                                    {browsedPlayer.trim() && state.players[browsedPlayer.trim()] && (
                                        <button 
                                            onClick={() => setPrintMode('day-single')} 
                                            className="px-5 py-2.5 rounded-lg font-bold shadow-sm transition-colors text-xs bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto"
                                        >
                                            Spara {browsedPlayer.trim()}s dag + Leaderboard
                                        </button>
                                    )}
                                    
                                    {playerKeys.length > 0 && (
                                        <button 
                                            onClick={() => setPrintMode('day-all')} 
                                            className="px-5 py-2.5 rounded-lg font-bold shadow-sm transition-colors text-xs bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 w-full sm:w-auto"
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
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
