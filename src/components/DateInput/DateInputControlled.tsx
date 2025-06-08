import { useEffect, useRef, useState } from "react";
import { CalendarFold } from "lucide-react";

const inputFocusClass =
  "bg-transparent appearance-none text-center text-gray-400 placeholder-gray-400 uppercase font-medium px-0 border-none outline-none focus:outline-none focus:ring-0 focus:bg-transparent focus:placeholder-gray-400 focus:text-gray-700";

export interface DateInputControlledProps {
  value: string;
  onChange: (val: string) => void;
  formSubmitted?: boolean;
  hasError?: boolean;
}

export const DateInputControlled = ({ value, onChange, formSubmitted, hasError }: DateInputControlledProps) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [monthTouched, setMonthTouched] = useState(false);
  const [dayTouched, setDayTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const monthDebounceRef = useRef<any>();
  const dayDebounceRef = useRef<any>();
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      setYear(y ? y.padStart(4, "0") : "");
      setMonth(m ? m.padStart(2, "0") : "");
      setDay(d ? d.padStart(2, "0") : "");
    }
  }, [value]);

  const handleUpdate = (m: string, d: string, y: string) => {
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
    <div className="relative w-full max-w-xs">
      <div className="flex items-center bg-gray-100 rounded-2xl px-6 py-3 w-full relative">
        {/* Month */}
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
          className={`w-10 ${inputFocusClass}${monthErrorMsg && (monthTouched || formSubmitted) && isMonthComplete ? " text-red-500" : ""}`}
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
              return;
            }
          }}
        />
        <span className="mx-2 text-gray-400 text-lg select-none">/</span>
        {/* Day */}
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
          className={`w-10 ${inputFocusClass}${(dayErrorMsg || dayMonthYearErrorMsg) && (dayTouched || formSubmitted) && isDayComplete ? " text-red-500" : ""}`}
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
        />
        <span className="mx-2 text-gray-400 text-lg select-none">/</span>
        {/* Year */}
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
          className={`w-16 ${inputFocusClass}${yearErrorMsg && (yearTouched || formSubmitted) && isYearComplete ? " text-red-500" : ""}`}
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
        />
        {/* CalendarFold Icon */}
        <div className="ml-auto flex items-center">
          <CalendarFold className="w-6 h-6 text-gray-400" style={{ display: "block" }} />
        </div>
      </div>
    </div>
  );
}; 