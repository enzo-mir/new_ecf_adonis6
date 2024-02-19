"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var cross_js_1 = require("../../assets/style/cross.js");
var react_2 = require("react");
var connect_store_js_1 = require("../../data/store/connect.store.js");
var api_data_store_js_1 = require("../../data/store/api_data.store.js");
var framer_motion_1 = require("framer-motion");
var react_3 = require("react");
var react_4 = require("@inertiajs/react");
var reservation_data_scheama_js_1 = require("../../types/reservation_data.scheama.js");
var tb_1 = require("react-icons/tb");
var md_1 = require("react-icons/md");
var md_2 = require("react-icons/md");
var fa_1 = require("react-icons/fa");
var reservation_module_css_1 = require("../../../css/reservation.module.css");
var overlay_module_css_1 = require("../../../css/overlay.module.css");
function Reserv(_a) {
    var displayReservation = _a.res;
    var _b = connect_store_js_1.userDataStore(function (state) { return [
        state.userData,
        state.setUserData,
    ]; }), userData = _b[0], setUserData = _b[1];
    var connected = connect_store_js_1.connectStore(function (state) { return state.connectedUser; });
    var hours = api_data_store_js_1.hourStore(function (state) { return state.hours; });
    var _c = react_4.useForm({
        name: connected ? userData === null || userData === void 0 ? void 0 : userData.name : '',
        email: connected ? userData === null || userData === void 0 ? void 0 : userData.email : '',
        guests: connected ? userData === null || userData === void 0 ? void 0 : userData.guests : 1,
        alergy: connected ? userData === null || userData === void 0 ? void 0 : userData.alergy : '',
        date: new Date().toLocaleDateString('fr-CA'),
        hourTargeted: null,
        timeTargeted: null
    }), data = _c.data, setData = _c.setData, processing = _c.processing, post = _c.post;
    var _d = react_1.useState(''), resError = _d[0], setResError = _d[1];
    var _e = react_1.useState((userData === null || userData === void 0 ? void 0 : userData.alergy) ? true : false), showAllergy = _e[0], setShowAllergy = _e[1];
    var _f = react_1.useState([]), DTable = _f[0], setDTable = _f[1];
    var _g = react_1.useState([]), LTable = _g[0], setLTable = _g[1];
    var reservContainerRef = react_2.useRef(null);
    var lunchTable = [];
    var dinnerTable = [];
    react_1.useEffect(function () {
        handleChangeDate(null);
        return function () {
            document.body.removeAttribute('style');
        };
    }, []);
    document.body.style.overflow = 'hidden';
    function handleChangeDate(e) {
        var hourFetchLunch = '';
        var hourFetchDinner = '';
        var dateDay = new Date(data.date).toLocaleDateString('fr-FR', {
            weekday: 'long'
        });
        var fullDate = new Date(data.date).toLocaleDateString('fr-CA');
        if (e) {
            dateDay = new Date(e.target.value).toLocaleDateString('fr-FR', {
                weekday: 'long'
            });
            fullDate = new Date(e.target.value).toLocaleDateString('fr-CA');
        }
        setData(__assign(__assign({}, data), { date: fullDate }));
        hours.forEach(function (elem) {
            if (Object.values(elem)[1] === dateDay) {
                hourFetchLunch = elem.lunch;
                hourFetchDinner = elem.dinner;
                if (elem.lunch.indexOf('-') === -1) {
                    setLTable('Fermer');
                }
                if (elem.dinner.indexOf('-') === -1) {
                    setDTable('Fermer');
                }
            }
        });
        convertDataToHourTable(hourFetchLunch, lunchTable);
        convertDataToHourTable(hourFetchDinner, dinnerTable);
        function convertDataToHourTable(hourSlice, table) {
            if (hourSlice.indexOf('-') !== -1) {
                var splitingLunch = hourSlice.split(' - ');
                var splitHourLunch = splitingLunch[0].split('h');
                var splitMinuteLunch = splitingLunch[1].split('h');
                var startHourLunch = Number.parseInt(splitHourLunch[0]);
                var endHourLunch = Number.parseInt(splitMinuteLunch[0]);
                var startDecimalLunch = Number.parseInt(splitHourLunch[1]) / 60;
                var endDecimalLunch = Number.parseInt(splitMinuteLunch[1]) / 60;
                var fullStartLunch = Number.isNaN(startDecimalLunch)
                    ? startHourLunch
                    : startHourLunch + startDecimalLunch;
                var fullEndLunch = Number.isNaN(endDecimalLunch)
                    ? endHourLunch
                    : endHourLunch + endDecimalLunch;
                /* => tableau de données qui retrace les heures et leurs plages d'horaires avec décallage
                   de 15 min (60 * 0.25) jusqu'à 30 min (60 * 0.5) avant la fin de la plage horaire */
                for (var i = fullStartLunch; i <= fullEndLunch - 0.5; i += 0.25) {
                    table.push(i.toString());
                }
                /* Conversion des heures décimales en heures traditionnelles ex => 6,25 -> 6h15 */
                var tableToSet_1 = [];
                table.map(function (elem) {
                    if (elem.indexOf('.') !== -1) {
                        tableToSet_1.push(Number.parseInt(elem.slice(3)) / 100 === 0.05
                            ? elem.slice(0, elem.indexOf('.')) +
                                'h' +
                                (Number.parseInt(elem.slice(3)) * 6).toString()
                            : elem.slice(0, elem.indexOf('.')) +
                                'h' +
                                (Number.parseInt(elem.slice(3)) * 0.6).toString());
                    }
                    else {
                        tableToSet_1.push(elem + 'h');
                    }
                });
                switch (table) {
                    case dinnerTable:
                        setDTable(tableToSet_1);
                        break;
                    case lunchTable:
                        setLTable(tableToSet_1);
                        break;
                }
            }
        }
    }
    function unselectHours() {
        document.onmouseup = function (e) {
            var obj = document.querySelector("button[data-selected='true']");
            if (obj !== null) {
                if (obj !== e.target && document.getElementById('submitRes') !== e.target) {
                    obj.dataset.selected = 'false';
                    setData(__assign(__assign({}, data), { hourTargeted: null }));
                }
            }
        };
    }
    function selectHours(e) {
        setData(__assign(__assign({}, data), { hourTargeted: e.target.innerHTML, timeTargeted: e.target.getAttribute('data-time') }));
        unselectHours();
        var oldTarget = document.querySelector("button[data-selected='true']");
        if (oldTarget)
            oldTarget.dataset.selected = 'false';
        e.target.dataset.selected = 'true';
    }
    function submitReservation() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var dataValidate;
            return __generator(this, function (_b) {
                (_a = reservContainerRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0, 0);
                setResError('');
                try {
                    dataValidate = reservation_data_scheama_js_1.reservationScheama.parse(data);
                    post('/reservation/add', {
                        data: dataValidate,
                        onError: function (err) {
                            setResError(err);
                        },
                        onSuccess: function () {
                            setResError('Table réservée !');
                            displayReservation(false);
                        }
                    });
                }
                catch (error) {
                    setResError(JSON.parse(error.message)[0].message);
                }
                return [2 /*return*/];
            });
        });
    }
    return (react_3["default"].createElement("div", { className: overlay_module_css_1["default"].overlay, onClick: function () { return displayReservation(false); } },
        react_3["default"].createElement(framer_motion_1.motion.section, { className: reservation_module_css_1["default"].reservation_section, onClick: function (e) { return e.stopPropagation(); }, initial: { y: '-20%', opacity: 0 }, animate: { y: '0', opacity: 1 }, exit: { y: '-20%', opacity: 0 }, transition: { duration: 0.5 }, ref: reservContainerRef },
            react_3["default"].createElement(cross_js_1.Cross, { onClick: function () { return displayReservation(false); } }),
            react_3["default"].createElement("h1", null, "R\u00E9servez votre table"),
            resError ? react_3["default"].createElement("p", { className: "validationReservation" }, resError) : null,
            react_3["default"].createElement("div", { className: reservation_module_css_1["default"].option_reservation },
                react_3["default"].createElement("label", { htmlFor: "persons" },
                    react_3["default"].createElement(tb_1.TbUsersPlus, { color: "#fff" }),
                    react_3["default"].createElement("input", { type: "number", id: "persons", placeholder: "convives par d\u00E9faut (1-9)", max: "9", min: "1", value: data.guests, onChange: function (e) { return setData(__assign(__assign({}, data), { guests: Number.parseInt(e.target.value) })); }, maxLength: 1, required: true })),
                react_3["default"].createElement("label", { htmlFor: "date" },
                    react_3["default"].createElement(md_1.MdOutlineDateRange, { color: "#fff" }),
                    react_3["default"].createElement("input", { type: "date", className: reservation_module_css_1["default"].date_calendar, onChange: function (e) { return handleChangeDate(e); }, min: new Date().toLocaleDateString('fr-CA'), value: data.date, required: true })),
                react_3["default"].createElement("label", { htmlFor: "email" },
                    react_3["default"].createElement(md_2.MdAlternateEmail, { color: "#fff" }),
                    react_3["default"].createElement("input", { type: "email", id: "email", required: true, placeholder: "Entrez votre e-mail", value: (userData === null || userData === void 0 ? void 0 : userData.email) || data.email, onChange: function (e) { return (userData === null || userData === void 0 ? void 0 : userData.email) || setData(__assign(__assign({}, data), { email: e.target.value })); }, disabled: (userData === null || userData === void 0 ? void 0 : userData.email) ? true : false })),
                react_3["default"].createElement("label", { htmlFor: "name" },
                    react_3["default"].createElement(fa_1.FaUserAlt, { color: "#fff" }),
                    react_3["default"].createElement("input", { type: "text", id: "name", required: true, placeholder: "Entrez votre nom", value: (userData === null || userData === void 0 ? void 0 : userData.name) || data.name, onChange: function (e) { return (userData === null || userData === void 0 ? void 0 : userData.name) || setData(__assign(__assign({}, data), { name: e.target.value })); }, disabled: (userData === null || userData === void 0 ? void 0 : userData.name) ? true : false }))),
            react_3["default"].createElement("div", { className: reservation_module_css_1["default"].lunch_hours },
                react_3["default"].createElement("h2", null, "MIDI"),
                react_3["default"].createElement("div", null,
                    react_3["default"].createElement("ul", { className: reservation_module_css_1["default"].hours_list }, typeof LTable === 'object' ? (LTable.map(function (lunch, id) {
                        return (react_3["default"].createElement("button", { key: id, onClick: selectHours, tabIndex: id, "data-time": "lunch" }, lunch));
                    })) : (react_3["default"].createElement("p", null, LTable))))),
            react_3["default"].createElement("div", { className: reservation_module_css_1["default"].dinner_hours },
                react_3["default"].createElement("h2", null, "SOIR"),
                react_3["default"].createElement("div", null,
                    react_3["default"].createElement("ul", { className: reservation_module_css_1["default"].hours_list }, typeof DTable === 'object' ? (DTable.map(function (dinner, id) {
                        return (react_3["default"].createElement("button", { key: id, onClick: selectHours, tabIndex: id, "data-time": "dinner" }, dinner));
                    })) : (react_3["default"].createElement("p", null, DTable))))),
            react_3["default"].createElement("div", { className: reservation_module_css_1["default"].final_case },
                react_3["default"].createElement("p", { onClick: function () {
                        setShowAllergy(!showAllergy);
                    } }, "Allergie(s) ?"),
                showAllergy && (react_3["default"].createElement("div", { className: reservation_module_css_1["default"].alergy_container },
                    react_3["default"].createElement("input", { type: "texte", placeholder: "Entrez vos allergies", value: data.alergy, onChange: function (e) {
                            return setData(__assign(__assign({}, data), { alergy: e.target.value }));
                        } }))),
                react_3["default"].createElement("button", { id: "submitRes", type: "submit", onClick: submitReservation, disabled: processing }, "R\u00E9servez la table")))));
}
exports["default"] = Reserv;
