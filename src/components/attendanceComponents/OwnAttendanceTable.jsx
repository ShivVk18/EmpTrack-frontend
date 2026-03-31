import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock, TrendingUp } from "lucide-react";

/* ─── Status config ─── */
const STATUS_META = {
  PRESENT: {
    label: "Present",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    chipBg: "bg-emerald-50",
    chipBorder: "border-l-emerald-500",
    hex: "#10b981",
    icon: "✓",
  },
  LATE: {
    label: "Late",
    color: "bg-amber-400",
    lightBg: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    chipBg: "bg-amber-50",
    chipBorder: "border-l-amber-400",
    hex: "#f59e0b",
    icon: "◷",
  },
  ABSENT: {
    label: "Absent",
    color: "bg-rose-500",
    lightBg: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    chipBg: "bg-rose-50",
    chipBorder: "border-l-rose-500",
    hex: "#f43f5e",
    icon: "✕",
  },
  HALF_DAY: {
    label: "Half Day",
    color: "bg-amber-500",
    lightBg: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    chipBg: "bg-amber-50",
    chipBorder: "border-l-amber-500",
    hex: "#f59e0b",
    icon: "◑",
  },
  HOLIDAY: {
    label: "Holiday",
    color: "bg-orange-500",
    lightBg: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    chipBg: "bg-orange-50",
    chipBorder: "border-l-orange-500",
    hex: "#f97316",
    icon: "★",
  },
};

const formatTime = (time) => {
  if (!time) return "—";
  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


const FC_SCOPED_STYLE = `
  .attn-fc .fc-theme-standard td,
  .attn-fc .fc-theme-standard th,
  .attn-fc .fc-theme-standard .fc-scrollgrid { border-color: #e2e8f0; }
  .attn-fc .fc-col-header-cell { background: #f8fafc; }
  .attn-fc .fc-col-header-cell-cushion {
    color: #94a3b8; font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    text-decoration: none !important; padding: 10px 0;
    display: block;
  }
  .attn-fc .fc-daygrid-day-number {
    font-size: 0.78rem; font-weight: 500; color: #475569;
    text-decoration: none !important; padding: 6px 8px; display: block;
  }
  .attn-fc .fc-day-today { background: #fffbeb !important; }
  .attn-fc .fc-day-today .fc-daygrid-day-number {
    background: #f59e0b; color: #fff; border-radius: 6px; width: fit-content;
  }
  .attn-fc .fc-daygrid-day-frame { min-height: 82px; }
  .attn-fc .fc-event {
    background: transparent !important; border: none !important;
    padding: 0 3px 2px; box-shadow: none !important;
  }
  .attn-fc .fc-event-main { padding: 0; }
  .attn-fc .fc-toolbar {
    padding: 16px 20px 12px; flex-wrap: wrap; gap: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
  .attn-fc .fc-toolbar-title {
    font-size: 1rem; font-weight: 700; color: #0f172a; letter-spacing: -0.02em;
  }
  .attn-fc .fc-button {
    background: #fff !important; border: 1px solid #e2e8f0 !important;
    color: #475569 !important; border-radius: 8px !important;
    font-size: 0.78rem !important; font-weight: 500 !important;
    padding: 5px 12px !important; box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
    transition: all .15s !important;
  }
  .attn-fc .fc-button:hover {
    background: #f8fafc !important; border-color: #cbd5e1 !important; color: #0f172a !important;
  }
  .attn-fc .fc-button:focus { outline: none !important; box-shadow: 0 0 0 2px #fde68a !important; }
  .attn-fc .fc-button-active {
    background: #fffbeb !important; border-color: #fcd34d !important; color: #b45309 !important;
  }
  .attn-fc .fc-daygrid-more-link {
    font-size: 0.68rem; color: #64748b; font-weight: 600;
    padding: 1px 4px; border-radius: 4px;
  }
  .attn-fc .fc-daygrid-more-link:hover { background: #f1f5f9; color: #334155; }
`;

/* ─── Stat Card ─── */
const StatCard = ({ label, value, meta }) => (
  <Card className={`relative overflow-hidden border ${meta.borderColor} shadow-none hover:shadow-md transition-shadow duration-200`}>
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${meta.color}`} />
    <CardContent className="pl-5 pr-4 py-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1">
          {label}
        </p>
        <p className={`text-3xl font-bold tabular-nums ${meta.textColor}`}>
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-xl ${meta.lightBg} flex items-center justify-center text-base shrink-0`}>
        <span className={meta.textColor}>{meta.icon}</span>
      </div>
    </CardContent>
  </Card>
);


const EventChip = ({ event }) => {
  const { type, status, name, inTime, outTime, date } = event.extendedProps;
  const meta = type === "holiday" ? STATUS_META.HOLIDAY : (STATUS_META[status] || STATUS_META.PRESENT);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`
            flex items-center gap-1 px-1.5 py-0.5 rounded-md
            text-[0.62rem] font-semibold border-l-2 cursor-default
            select-none truncate max-w-full transition-opacity hover:opacity-80
            ${meta.chipBg} ${meta.chipBorder} ${meta.textColor}
          `}
        >
          <span className="shrink-0 text-[0.6rem]">{meta.icon}</span>
          <span className="truncate">
            {type === "holiday" ? name : meta.label}
          </span>
        </div>
      </TooltipTrigger>

      <TooltipContent
         side="top"
  sideOffset={6}
  className="
    p-3
    min-w-[170px]
    bg-slate-900
    text-white
    border
    border-slate-700
    shadow-xl
    rounded-lg
  "
      >
        <p className={`font-bold text-sm mb-2 ${meta.textColor}`}>
          {meta.icon} {type === "holiday" ? "Holiday" : meta.label}
        </p>
        <p className="text-[11px] text-slate-300 mb-2">{formatDate(date)}</p>

        {type === "holiday" ? (
          <p className="text-slate-300 font-medium text-xs">{name}</p>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" /> In
              </span>
              <span className="font-semibold text-slate-300 text-xs tabular-nums">
                {formatTime(inTime)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" /> Out
              </span>
              <span className="font-semibold text-slate-300 text-xs tabular-nums">
                {formatTime(outTime)}
              </span>
            </div>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

/* ─── Main Component ─── */
const AttendanceCalendar = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);

      const [attendanceRes, holidayRes] = await Promise.all([
        api.get("/attendance/own"),
        api.get("/holiday"),
      ]);

      const attendances = attendanceRes?.data?.data?.attendances || [];
      const holidays = holidayRes?.data?.data?.records || [];

      // Stats
      const counts = { PRESENT: 0, LATE: 0, ABSENT: 0, HALF_DAY: 0 };
      attendances.forEach((a) => {
        if (counts[a.status] !== undefined) counts[a.status]++;
      });
      setStats(counts);

      const attendanceEvents = attendances.map((a) => ({
        title: a.status,
        date: a.date,
        extendedProps: {
          type: "attendance",
          status: a.status,
          inTime: a.inTime,
          outTime: a.outTime,
          date: a.date,
        },
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: "transparent",
      }));

      const holidayEvents = holidays.map((h) => ({
        title: h.name,
        date: h.date,
        extendedProps: { type: "holiday", name: h.name, date: h.date },
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: "transparent",
      }));

      setEvents([...attendanceEvents, ...holidayEvents]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to load calendar"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return (
    <>
      {/* Scoped FullCalendar style overrides */}
      <style>{FC_SCOPED_STYLE}</style>

      <div className="p-6 space-y-6 bg-amber-50 min-h-screen">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-amber-600" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-amber-950">
                Attendance Calendar
              </h1>
            </div>
            <p className="text-sm text-amber-800/80 ml-10">
              Your punches, leaves & public holidays at a glance
            </p>
          </div>

          {/* Legend badges */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <Badge
                key={key}
                variant="outline"
                className={`text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full
                  ${meta.lightBg} ${meta.textColor} ${meta.borderColor}`}
              >
                <span className="mr-1">{meta.icon}</span>
                {meta.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {loading
            ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-[88px] rounded-xl" />)
            : stats
            ? Object.entries(stats).map(([key, val]) => (
                <StatCard key={key} label={STATUS_META[key].label} value={val} meta={STATUS_META[key]} />
              ))
            : null}
        </div>

        {/* ── Calendar Card ── */}
        <Card className="shadow-sm border-amber-200 overflow-hidden">
          {loading ? (
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-36" />
                <Skeleton className="h-8 w-44" />
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {[...Array(35)].map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            </CardContent>
          ) : (
            <div className="attn-fc">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                events={events}
                dayMaxEvents={3}
                eventContent={(arg) => <EventChip event={arg.event} />}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
              />
            </div>
          )}
        </Card>

        
      </div>
 </>
  );
};

export default AttendanceCalendar;