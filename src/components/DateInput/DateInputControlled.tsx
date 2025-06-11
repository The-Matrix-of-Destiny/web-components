import { useEffect, useRef, useState, FC } from "react";
import { CalendarFold } from "lucide-react";

// Types
export interface DateInputControlledProps {
  value: string;
  onChange: (val: string) => void;
  formSubmitted?: boolean;
  width?: string;
  focusBgColor?: "purple" | "green" | "blue" | "maroon";
  focusTextColor?: "white" | "black" | "gray";
}

// Constants


const inputStyle = {
  border: "none",
}

export const DateInputControlled: FC<DateInputControlledProps> = ({ value, onChange, formSubmitted, width = "w-56", focusBgColor = "purple", focusTextColor = "white" }) => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [monthTouched, setMonthTouched] = useState<boolean>(false);
  const [dayTouched, setDayTouched] = useState<boolean>(false);
  const [yearTouched, setYearTouched] = useState<boolean>(false);

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const monthDebounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dayDebounceRef = useRef<ReturnType<typeof setTimeout>>();
  const lastKeyRef = useRef<string | null>(null);

  // Static mappings for Tailwind focus classes (now using simple color names)
  const focusBgClassMap: Record<string, string> = {
    purple: "focus:bg-lt-purple",
    green: "focus:bg-green-500",
    blue: "focus:bg-blue-500",
    maroon: "focus:bg-lt-dark-red",
  };
  const focusTextClassMap: Record<string, string> = {
    white: "focus:text-white",
    black: "focus:text-black",
    gray: "focus:text-gray-800",
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
  `.replace(/\s+/g, ' ');

  useEffect(() => {
    // Only update local state if value is a valid YYYY-MM-DD
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      setYear(y ? y.padStart(4, "0") : "");
      setMonth(m ? m.padStart(2, "0") : "");
      setDay(d ? d.padStart(2, "0") : "");
    }
    // If value is empty or invalid, do not reset fields—let user keep editing
  }, [value]);

  const handleUpdate = (m: string, d: string, y: string) => {
    // Only call onChange if all fields are complete and valid
    if (y.length === 4 && m.length === 2 && d.length === 2) {
      const yearNum = Number(y);
      const monthNum = Number(m);
      const dayNum = Number(d);
      const isLeap = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
      const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (
        yearNum >= 1900 &&
        yearNum <= 2099 &&
        monthNum >= 1 &&
        monthNum <= 12 &&
        dayNum >= 1 &&
        dayNum <= daysInMonth[monthNum - 1]
      ) {
        onChange?.(`${y}-${m}-${d}`);
        return;
      }
    }
    // If not valid or incomplete, send 'invalid-date' instead of empty string
    onChange?.("invalid-date");
  };

  // Error logic is now local and realtime
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

  // Additional day validation for month and leap year
  let dayMonthYearError = false;
  if (!monthErrorMsg && !dayErrorMsg && !yearErrorMsg) {
    const m = Number(month);
    const d = Number(day);
    const y = Number(year);
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
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

  return (
    <div className={`relative ${width}`}>
      <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 pr-12 rounded-xl focus-within:ring-2 focus-within:ring-lt-purple focus-within:ring-offset-2 focus-within:ring-offset-gray-100 w-full relative">
        <div className="flex flex-1 items-center min-w-0 gap-0">
          {/* Month */}
          <div className="relative flex flex-col items-center flex-1 min-w-0">
            <input
              ref={monthRef}
              type="number"
              value={month}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 2);
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
                  }, debounceVal);
                }
              }}
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
              className={`bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${monthErrorMsg && (monthTouched || formSubmitted) && isMonthComplete ? " text-red-500" : ""}`}
              onKeyDown={(e) => {
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
                  // No previous field for month, so do nothing
                  return;
                }
              }}
              style={inputStyle}
            />
          </div>
          <span className="mx-1 flex-shrink-0">/</span>
          {/* Day */}
          <div className="relative flex flex-col items-center flex-1 min-w-0">
            <input
              ref={dayRef}
              type="number"
              value={day}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 2);
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
                  }, debounceVal);
                }
              }}
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
              className={`bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${(dayErrorMsg || dayMonthYearErrorMsg) && (dayTouched || formSubmitted) && isDayComplete ? " text-red-500" : ""}`}
              onKeyDown={(e) => {
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
                  monthRef.current?.focus();
                  e.preventDefault();
                }
              }}
              style={inputStyle}
            />
          </div>
          <span className="mx-1 flex-shrink-0">/</span>
          {/* Year */}
          <div className="relative flex flex-col items-center flex-1 min-w-0">
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
              className={`bg-transparent w-full text-center ${inputFocusClass} ${focusTextClass} ${focusBgClass} ${yearErrorMsg && (yearTouched || formSubmitted) && isYearComplete ? " text-red-500" : ""}`}
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
              style={inputStyle}
            />
          </div>
        </div>
        {/* CalendarFold Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none flex-shrink-0">
          <CalendarFold className="w-6 h-6 text-gray-400" style={{ display: "block" }} />
        </div>
      </div>
    </div>
  );
};