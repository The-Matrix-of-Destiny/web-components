import { useEffect, useRef, useState } from "react";
import { CalendarFold } from "lucide-react";

// Types
type DateInputSize = "sm" | "md" | "lg";

interface DateInputControlledProps {
  value: string;
  onChange: (val: string) => void;
  formSubmitted?: boolean;
  size?: DateInputSize;
}

// Constants
const inputFocusClass = "focus:text-white focus:outline-none focus:ring-0 focus:bg-lt-purple focus:rounded selection:bg-transparent selection:text-inherit focus:placeholder-white focus:font-bold";

const inputStyle = {
  border: "none",
  outline: "none",
};

const sizeStyles = {
  sm: {
    container: "w-56",
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
    container: "w-60",
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

// Helper functions
const isValidDate = (year: number, month: number, day: number): boolean => {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return (
    year >= 1900 &&
    year <= 2099 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= daysInMonth[month - 1]
  );
};

export const DateInputControlled = ({ 
  value, 
  onChange, 
  formSubmitted, 
  size = "md" 
}: DateInputControlledProps) => {
  // State
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [monthTouched, setMonthTouched] = useState(false);
  const [dayTouched, setDayTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);

  // Refs
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const monthDebounceRef = useRef<NodeJS.Timeout>();
  const dayDebounceRef = useRef<NodeJS.Timeout>();
  const lastKeyRef = useRef<string | null>(null);

  // Effects
  useEffect(() => {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      setYear(y ? y.padStart(4, "0") : "");
      setMonth(m ? m.padStart(2, "0") : "");
      setDay(d ? d.padStart(2, "0") : "");
    }
  }, [value]);

  // Handlers
  const handleUpdate = (m: string, d: string, y: string) => {
    if (y.length === 4 && m.length === 2 && d.length === 2) {
      const yearNum = Number(y);
      const monthNum = Number(m);
      const dayNum = Number(d);
      
      if (isValidDate(yearNum, monthNum, dayNum)) {
        onChange?.(`${y}-${m}-${d}`);
        return;
      }
    }
    onChange?.("invalid-date");
  };

  const handleMonthChange = (val: string) => {
    clearTimeout(monthDebounceRef.current);
    if (val !== month) setMonth(val);
    if (val === "") {
      handleUpdate("", day, year);
      return;
    }
    if (val.length === 2) {
      monthDebounceRef.current = setTimeout(() => {
        const isValidMonth = Number(val) >= 1 && Number(val) <= 12;
        handleUpdate(val, day, year);
        if (isValidMonth && lastKeyRef.current !== "ArrowUp" && lastKeyRef.current !== "ArrowDown") {
          dayRef.current?.focus();
        }
      }, 100);
    }
  };

  const handleDayChange = (val: string) => {
    clearTimeout(dayDebounceRef.current);
    if (val !== day) setDay(val);
    if (val === "") {
      handleUpdate(month, "", year);
      return;
    }
    if (val.length === 2) {
      dayDebounceRef.current = setTimeout(() => {
        const isValidDay = Number(val) >= 1 && Number(val) <= 31;
        handleUpdate(month, val, year);
        if (isValidDay && lastKeyRef.current !== "ArrowUp" && lastKeyRef.current !== "ArrowDown") {
          yearRef.current?.focus();
        }
      }, 100);
    }
  };

  // Validation
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
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    return d > daysInMonth[m - 1] ? "Invalid day for selected month/year" : "";
  };

  // Render
  return (
    <div className={`relative ${sizeStyles[size].container}`}>
      <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-lt-purple w-full relative">
        {/* Month Input */}
        <div className="relative flex flex-col items-center">
          <input
            ref={monthRef}
            type="number"
            value={month}
            onChange={(e) => handleMonthChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
            onFocus={() => setMonthTouched(true)}
            onBlur={() => {
              setMonthTouched(true);
              clearTimeout(monthDebounceRef.current);
              if (month.length === 1 && /^[1-9]$/.test(month)) {
                const padded = month.padStart(2, "0");
                if (padded !== month) setMonth(padded);
                handleUpdate(padded, day, year);
                const isValidMonth = Number(padded) >= 1 && Number(padded) <= 12;
                if (isValidMonth) {
                  dayRef.current?.focus();
                }
              }
            }}
            placeholder="MM"
            className={`bg-transparent ${sizeStyles[size].input.width.month} text-center ${inputFocusClass}${getMonthError() ? " text-red-500" : ""}`}
            onKeyDown={(e) => {
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
            }}
            style={{ ...inputStyle, padding: sizeStyles[size].input.padding }}
          />
        </div>
        <span className="mx-1">/</span>

        {/* Day Input */}
        <div className="relative flex flex-col items-center">
          <input
            ref={dayRef}
            type="number"
            value={day}
            onChange={(e) => handleDayChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
            onFocus={() => setDayTouched(true)}
            onBlur={() => {
              setDayTouched(true);
              clearTimeout(dayDebounceRef.current);
              if (day.length === 1 && /^[1-9]$/.test(day)) {
                const padded = day.padStart(2, "0");
                if (padded !== day) setDay(padded);
                handleUpdate(month, padded, year);
                const isValidDay = Number(padded) >= 1 && Number(padded) <= 31;
                if (isValidDay) {
                  yearRef.current?.focus();
                }
              }
            }}
            placeholder="DD"
            className={`bg-transparent ${sizeStyles[size].input.width.day} text-center ${inputFocusClass}${(getDayError() || getDayMonthYearError()) ? " text-red-500" : ""}`}
            onKeyDown={(e) => {
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
                monthRef.current?.focus();
                e.preventDefault();
              }
            }}
            style={{ ...inputStyle, padding: sizeStyles[size].input.padding }}
          />
        </div>
        <span className="mx-1">/</span>

        {/* Year Input */}
        <div className="relative flex flex-col items-center">
          <input
            ref={yearRef}
            type="number"
            value={year}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setYear(val);
              handleUpdate(month, day, val);
            }}
            onFocus={() => setYearTouched(true)}
            onBlur={() => setYearTouched(true)}
            placeholder="YYYY"
            className={`bg-transparent ${sizeStyles[size].input.width.year} text-center ${inputFocusClass}${getYearError() ? " text-red-500" : ""}`}
            onKeyDown={(e) => {
              lastKeyRef.current = e.key;
              if ((e.key === "Backspace" || e.key === "Delete") && year === "") {
                dayRef.current?.focus();
                e.preventDefault();
              }
              if (e.key === "ArrowDown" && (year === "" || Number(year) <= 1000)) {
                e.preventDefault();
              }
            }}
            style={{ ...inputStyle, padding: sizeStyles[size].input.padding }}
          />
        </div>

        {/* Calendar Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <CalendarFold className="w-6 h-6 text-gray-400" style={{ display: "block" }} />
        </div>
      </div>
    </div>
  );
}; 