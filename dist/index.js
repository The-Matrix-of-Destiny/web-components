"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  CardContent: () => CardContent,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  DateInputControlled: () => DateInputControlled,
  DateInputUncontrolled: () => DateInputUncontrolled
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-0 outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      className: classes,
      disabled: disabled || isLoading,
      ...props,
      children: [
        isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }) }) : null,
        children
      ]
    }
  );
};

// src/components/Card/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = ({ children, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `bg-white rounded-lg shadow-md p-6 ${className}`, children });
};
var CardHeader = ({ children, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `mb-4 ${className}`, children });
};
var CardTitle = ({ children, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: `text-xl font-semibold text-gray-900 ${className}`, children });
};
var CardContent = ({ children, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `text-gray-600 ${className}`, children });
};
var CardFooter = ({ children, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `mt-4 pt-4 border-t border-gray-200 ${className}`, children });
};

// src/components/DateInput/DateInputControlled.tsx
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var inputStyle = {
  border: "none"
};
var DateInputControlled = ({ value, onChange, formSubmitted, width = "w-56", focusBgColor = "purple", focusTextColor = "white" }) => {
  const [month, setMonth] = (0, import_react.useState)("");
  const [day, setDay] = (0, import_react.useState)("");
  const [year, setYear] = (0, import_react.useState)("");
  const [monthTouched, setMonthTouched] = (0, import_react.useState)(false);
  const [dayTouched, setDayTouched] = (0, import_react.useState)(false);
  const [yearTouched, setYearTouched] = (0, import_react.useState)(false);
  const monthRef = (0, import_react.useRef)(null);
  const dayRef = (0, import_react.useRef)(null);
  const yearRef = (0, import_react.useRef)(null);
  const monthDebounceRef = (0, import_react.useRef)();
  const dayDebounceRef = (0, import_react.useRef)();
  const lastKeyRef = (0, import_react.useRef)(null);
  const focusBgClassMap = {
    purple: "focus:bg-lt-purple",
    green: "focus:bg-green-500",
    blue: "focus:bg-blue-500",
    maroon: "focus:bg-lt-dark-red/80"
  };
  const focusTextClassMap = {
    white: "focus:text-white",
    black: "focus:text-black",
    gray: "focus:text-gray-800"
  };
  const focusBgClass = focusBgClassMap[focusBgColor] || focusBgClassMap["purple"];
  const focusTextClass = focusTextClassMap[focusTextColor] || focusTextClassMap["white"];
  const inputFocusClass = `
    text-gray-800
    bg-transparent
    rounded
    border-2
    border-transparent
    font-normal
    placeholder-gray-400
    outline-none
    focus:font-bold
    focus:border-lt-purple
    focus:placeholder-white
    focus:ring-0
    focus:shadow-md
  `.replace(/\s+/g, " ");
  (0, import_react.useEffect)(() => {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      setYear(y ? y.padStart(4, "0") : "");
      setMonth(m ? m.padStart(2, "0") : "");
      setDay(d ? d.padStart(2, "0") : "");
    }
  }, [value]);
  const handleUpdate = (m, d, y) => {
    if (y.length === 4 && m.length === 2 && d.length === 2) {
      const yearNum = Number(y);
      const monthNum = Number(m);
      const dayNum = Number(d);
      const isLeap = yearNum % 4 === 0 && yearNum % 100 !== 0 || yearNum % 400 === 0;
      const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (yearNum >= 1900 && yearNum <= 2099 && monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= daysInMonth[monthNum - 1]) {
        onChange == null ? void 0 : onChange(`${y}-${m}-${d}`);
        return;
      }
    }
    onChange == null ? void 0 : onChange("invalid-date");
  };
  let monthErrorMsg = "";
  if (monthTouched || formSubmitted) {
    if (!month) {
      monthErrorMsg = "Month is required";
    } else if (month.length < 2) {
      monthErrorMsg = "Month must be 2 digits";
    } else if (Number(month) < 1 || Number(month) > 12) {
      monthErrorMsg = "Month must be between 01 and 12";
    }
  }
  let dayErrorMsg = "";
  if (dayTouched || formSubmitted) {
    if (!day) {
      dayErrorMsg = "Day is required";
    } else if (day.length < 2) {
      dayErrorMsg = "Day must be 2 digits";
    } else if (Number(day) < 1 || Number(day) > 31) {
      dayErrorMsg = "Day must be between 01 and 31";
    }
  }
  let yearErrorMsg = "";
  if (yearTouched || formSubmitted) {
    if (!year) {
      yearErrorMsg = "Year is required";
    } else if (year.length < 4) {
      yearErrorMsg = "Year must be 4 digits";
    } else if (Number(year) < 1900 || Number(year) > 2099) {
      yearErrorMsg = "Year must be between 1900 and 2099";
    }
  }
  let dayMonthYearError = false;
  if (!monthErrorMsg && !dayErrorMsg && !yearErrorMsg) {
    const m = Number(month);
    const d = Number(day);
    const y = Number(year);
    const isLeap = y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
    const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (d > daysInMonth[m - 1]) {
      dayMonthYearError = true;
    }
  }
  let dayMonthYearErrorMsg = "";
  if ((dayTouched || formSubmitted) && !monthErrorMsg && !dayErrorMsg && !yearErrorMsg && dayMonthYearError) {
    dayMonthYearErrorMsg = "Invalid day for selected month/year";
  }
  const debounceVal = 100;
  const isMonthComplete = month.length === 2;
  const isDayComplete = day.length === 2;
  const isYearComplete = year.length === 4;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `relative ${width}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center bg-gray-100 text-gray-700 px-3 py-2 pr-12 rounded-xl focus-within:ring-2 focus-within:ring-lt-purple focus-within:ring-offset-2 focus-within:ring-offset-gray-100 w-full relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-1 items-center min-w-0 gap-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex flex-col items-center flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          ref: monthRef,
          type: "number",
          value: month,
          onChange: (e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 2);
            clearTimeout(monthDebounceRef.current);
            if (val !== month) setMonth(val);
            if (val === "") {
              handleUpdate("", day, year);
              return;
            }
            if (val.length === 2) {
              monthDebounceRef.current = setTimeout(() => {
                var _a;
                const isValidMonth = Number(val) >= 1 && Number(val) <= 12;
                handleUpdate(val, day, year);
                if (isValidMonth && lastKeyRef.current !== "ArrowUp" && lastKeyRef.current !== "ArrowDown") {
                  (_a = dayRef.current) == null ? void 0 : _a.focus();
                }
              }, debounceVal);
            }
          },
          onFocus: () => setMonthTouched(true),
          onBlur: () => {
            var _a;
            setMonthTouched(true);
            clearTimeout(monthDebounceRef.current);
            if (month.length === 1 && /^[1-9]$/.test(month)) {
              const padded = month.padStart(2, "0");
              if (padded !== month) setMonth(padded);
              handleUpdate(padded, day, year);
              const isValidMonth = Number(padded) >= 1 && Number(padded) <= 12;
              if (isValidMonth) {
                (_a = dayRef.current) == null ? void 0 : _a.focus();
              }
            }
          },
          placeholder: "MM",
          className: `bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${monthErrorMsg && (monthTouched || formSubmitted) && isMonthComplete ? " text-red-500" : ""}`,
          onKeyDown: (e) => {
            lastKeyRef.current = e.key;
            let newVal = month;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              let num = Number(month) || 0;
              if (num < 12) {
                num += 1;
                newVal = num.toString().padStart(2, "0");
                setMonth(newVal);
                handleUpdate(newVal, day, year);
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              let num = Number(month) || 1;
              if (num > 1) {
                num -= 1;
                newVal = num.toString().padStart(2, "0");
                setMonth(newVal);
                handleUpdate(newVal, day, year);
              }
            } else if ((e.key === "Backspace" || e.key === "Delete") && month === "") {
              return;
            }
          },
          style: inputStyle
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mx-1 flex-shrink-0", children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex flex-col items-center flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          ref: dayRef,
          type: "number",
          value: day,
          onChange: (e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 2);
            clearTimeout(dayDebounceRef.current);
            if (val !== day) setDay(val);
            if (val === "") {
              handleUpdate(month, "", year);
              return;
            }
            if (val.length === 2) {
              dayDebounceRef.current = setTimeout(() => {
                var _a;
                const isValidDay = Number(val) >= 1 && Number(val) <= 31;
                handleUpdate(month, val, year);
                if (isValidDay && lastKeyRef.current !== "ArrowUp" && lastKeyRef.current !== "ArrowDown") {
                  (_a = yearRef.current) == null ? void 0 : _a.focus();
                }
              }, debounceVal);
            }
          },
          onFocus: () => setDayTouched(true),
          onBlur: () => {
            var _a;
            setDayTouched(true);
            clearTimeout(dayDebounceRef.current);
            if (day.length === 1 && /^[1-9]$/.test(day)) {
              const padded = day.padStart(2, "0");
              if (padded !== day) setDay(padded);
              handleUpdate(month, padded, year);
              const isValidDay = Number(padded) >= 1 && Number(padded) <= 31;
              if (isValidDay) {
                (_a = yearRef.current) == null ? void 0 : _a.focus();
              }
            }
          },
          placeholder: "DD",
          className: `bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${(dayErrorMsg || dayMonthYearErrorMsg) && (dayTouched || formSubmitted) && isDayComplete ? " text-red-500" : ""}`,
          onKeyDown: (e) => {
            var _a;
            lastKeyRef.current = e.key;
            let newVal = day;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              let num = Number(day) || 0;
              if (num < 31) {
                num += 1;
                newVal = num.toString().padStart(2, "0");
                setDay(newVal);
                handleUpdate(month, newVal, year);
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              let num = Number(day) || 1;
              if (num > 1) {
                num -= 1;
                newVal = num.toString().padStart(2, "0");
                setDay(newVal);
                handleUpdate(month, newVal, year);
              }
            } else if ((e.key === "Backspace" || e.key === "Delete") && day === "") {
              (_a = monthRef.current) == null ? void 0 : _a.focus();
              e.preventDefault();
            }
          },
          style: inputStyle
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mx-1 flex-shrink-0", children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex flex-col items-center flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          ref: yearRef,
          type: "number",
          value: year,
          onChange: (e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
            setYear(val);
            handleUpdate(month, day, val);
          },
          onFocus: () => setYearTouched(true),
          onBlur: () => setYearTouched(true),
          placeholder: "YYYY",
          className: `bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${yearErrorMsg && (yearTouched || formSubmitted) && isYearComplete ? " text-red-500" : ""}`,
          onKeyDown: (e) => {
            var _a;
            lastKeyRef.current = e.key;
            if ((e.key === "Backspace" || e.key === "Delete") && year === "") {
              (_a = dayRef.current) == null ? void 0 : _a.focus();
              e.preventDefault();
            }
            if (e.key === "ArrowDown" && (year === "" || Number(year) <= 1e3)) {
              e.preventDefault();
            }
          },
          style: inputStyle
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.CalendarFold, { className: "w-6 h-6 text-gray-400", style: { display: "block" } }) })
  ] }) });
};

// src/components/DateInput/DateInputUncontrolled.tsx
var import_react2 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var DateInputUncontrolled = ({ defaultValue = "", onChange, formSubmitted }) => {
  const [value, setValue] = (0, import_react2.useState)(defaultValue);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    DateInputControlled,
    {
      value,
      onChange: (val) => {
        setValue(val);
        onChange == null ? void 0 : onChange(val);
      },
      formSubmitted
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DateInputControlled,
  DateInputUncontrolled
});
//# sourceMappingURL=index.js.map