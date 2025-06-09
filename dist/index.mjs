"use client";

// src/components/Button/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: classes,
      disabled: disabled || isLoading,
      ...props,
      children: [
        isLoading ? /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
          /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }) }) : null,
        children
      ]
    }
  );
};

// src/components/Card/index.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsx2("div", { className: `bg-white rounded-lg shadow-md p-6 ${className}`, children });
};
var CardHeader = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsx2("div", { className: `mb-4 ${className}`, children });
};
var CardTitle = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsx2("h3", { className: `text-xl font-semibold text-gray-900 ${className}`, children });
};
var CardContent = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsx2("div", { className: `text-gray-600 ${className}`, children });
};
var CardFooter = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsx2("div", { className: `mt-4 pt-4 border-t border-gray-200 ${className}`, children });
};

// src/components/DateInput/DateInputControlled.tsx
import { useEffect, useRef, useState } from "react";
import { CalendarFold } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var inputFocusClass = "focus:text-white focus:outline-none focus:ring-0 focus:bg-lt-purple focus:rounded selection:bg-transparent selection:text-inherit focus:placeholder-white focus:font-bold";
var inputStyle = {
  border: "none",
  outline: "none"
};
var sizeStyles = {
  sm: {
    container: "w-48",
    input: {
      padding: 1,
      width: {
        month: "w-8",
        day: "w-8",
        year: "w-14"
      }
    }
  },
  md: {
    container: "w-56",
    input: {
      padding: 2,
      width: {
        month: "w-10",
        day: "w-10",
        year: "w-16"
      }
    }
  },
  lg: {
    container: "w-64",
    input: {
      padding: 3,
      width: {
        month: "w-12",
        day: "w-12",
        year: "w-20"
      }
    }
  }
};
var isValidDate = (year, month, day) => {
  const isLeap = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return year >= 1900 && year <= 2099 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
};
var DateInputControlled = ({
  value,
  onChange,
  formSubmitted,
  size = "md"
}) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [monthTouched, setMonthTouched] = useState(false);
  const [dayTouched, setDayTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);
  const monthDebounceRef = useRef();
  const dayDebounceRef = useRef();
  const lastKeyRef = useRef(null);
  useEffect(() => {
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
      if (isValidDate(yearNum, monthNum, dayNum)) {
        onChange == null ? void 0 : onChange(`${y}-${m}-${d}`);
        return;
      }
    }
    onChange == null ? void 0 : onChange("invalid-date");
  };
  const handleMonthChange = (val) => {
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
      }, 100);
    }
  };
  const handleDayChange = (val) => {
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
      }, 100);
    }
  };
  const getMonthError = () => {
    if (!monthTouched && !formSubmitted) return "";
    if (!month) return "Month is required";
    if (month.length < 2) return "Month must be 2 digits";
    if (Number(month) < 1 || Number(month) > 12) return "Month must be between 01 and 12";
    return "";
  };
  const getDayError = () => {
    if (!dayTouched && !formSubmitted) return "";
    if (!day) return "Day is required";
    if (day.length < 2) return "Day must be 2 digits";
    if (Number(day) < 1 || Number(day) > 31) return "Day must be between 01 and 31";
    return "";
  };
  const getYearError = () => {
    if (!yearTouched && !formSubmitted) return "";
    if (!year) return "Year is required";
    if (year.length < 4) return "Year must be 4 digits";
    if (Number(year) < 1900 || Number(year) > 2099) return "Year must be between 1900 and 2099";
    return "";
  };
  const getDayMonthYearError = () => {
    if (!dayTouched && !formSubmitted) return "";
    if (getMonthError() || getDayError() || getYearError()) return "";
    const m = Number(month);
    const d = Number(day);
    const y = Number(year);
    const isLeap = y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
    const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return d > daysInMonth[m - 1] ? "Invalid day for selected month/year" : "";
  };
  return /* @__PURE__ */ jsx3("div", { className: `relative ${sizeStyles[size].container}`, children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-lt-purple w-full relative", children: [
    /* @__PURE__ */ jsx3("div", { className: "relative flex flex-col items-center", children: /* @__PURE__ */ jsx3(
      "input",
      {
        ref: monthRef,
        type: "number",
        value: month,
        onChange: (e) => handleMonthChange(e.target.value.replace(/\D/g, "").slice(0, 2)),
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
        className: `bg-transparent ${sizeStyles[size].input.width.month} text-center ${inputFocusClass}${getMonthError() ? " text-red-500" : ""}`,
        onKeyDown: (e) => {
          lastKeyRef.current = e.key;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            let num = Number(month) || 0;
            if (num < 12) {
              num += 1;
              const newVal = num.toString().padStart(2, "0");
              setMonth(newVal);
              handleUpdate(newVal, day, year);
            }
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            let num = Number(month) || 1;
            if (num > 1) {
              num -= 1;
              const newVal = num.toString().padStart(2, "0");
              setMonth(newVal);
              handleUpdate(newVal, day, year);
            }
          }
        },
        style: { ...inputStyle, padding: sizeStyles[size].input.padding }
      }
    ) }),
    /* @__PURE__ */ jsx3("span", { className: "mx-1", children: "/" }),
    /* @__PURE__ */ jsx3("div", { className: "relative flex flex-col items-center", children: /* @__PURE__ */ jsx3(
      "input",
      {
        ref: dayRef,
        type: "number",
        value: day,
        onChange: (e) => handleDayChange(e.target.value.replace(/\D/g, "").slice(0, 2)),
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
        className: `bg-transparent ${sizeStyles[size].input.width.day} text-center ${inputFocusClass}${getDayError() || getDayMonthYearError() ? " text-red-500" : ""}`,
        onKeyDown: (e) => {
          var _a;
          lastKeyRef.current = e.key;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            let num = Number(day) || 0;
            if (num < 31) {
              num += 1;
              const newVal = num.toString().padStart(2, "0");
              setDay(newVal);
              handleUpdate(month, newVal, year);
            }
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            let num = Number(day) || 1;
            if (num > 1) {
              num -= 1;
              const newVal = num.toString().padStart(2, "0");
              setDay(newVal);
              handleUpdate(month, newVal, year);
            }
          } else if ((e.key === "Backspace" || e.key === "Delete") && day === "") {
            (_a = monthRef.current) == null ? void 0 : _a.focus();
            e.preventDefault();
          }
        },
        style: { ...inputStyle, padding: sizeStyles[size].input.padding }
      }
    ) }),
    /* @__PURE__ */ jsx3("span", { className: "mx-1", children: "/" }),
    /* @__PURE__ */ jsx3("div", { className: "relative flex flex-col items-center", children: /* @__PURE__ */ jsx3(
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
        className: `bg-transparent ${sizeStyles[size].input.width.year} text-center ${inputFocusClass}${getYearError() ? " text-red-500" : ""}`,
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
        style: { ...inputStyle, padding: sizeStyles[size].input.padding }
      }
    ) }),
    /* @__PURE__ */ jsx3("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ jsx3(CalendarFold, { className: "w-6 h-6 text-gray-400", style: { display: "block" } }) })
  ] }) });
};

// src/components/DateInput/DateInputUncontrolled.tsx
import { useState as useState2 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var DateInputUncontrolled = ({ defaultValue = "", onChange, formSubmitted }) => {
  const [value, setValue] = useState2(defaultValue);
  return /* @__PURE__ */ jsx4(
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
export {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DateInputControlled,
  DateInputUncontrolled
};
//# sourceMappingURL=index.mjs.map