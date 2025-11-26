import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label"; // Usado para rótulos

export function DateTimePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const generateTimeArray = (max: number): string[] => {
    return Array.from({ length: max }, (_, i) => String(i).padStart(2, "0"));
  };

  const hours = generateTimeArray(24);
  const minutes = generateTimeArray(60);

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (!date) return;

    const newDate = new Date(date.getTime());
    const numValue = parseInt(value, 10);

    if (type === "hour") {
      newDate.setHours(numValue);
    } else {
      newDate.setMinutes(numValue);
    }

    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyyy HH:mm")
          ) : (
            <span>Selecione data e hora</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />

        <div className="flex items-center justify-center gap-2 border-t p-3">
          <Label className="text-sm">Hora:</Label>

          <select
            value={date?.getHours().toString().padStart(2, "0") || "00"}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            className="rounded-md border p-1 text-sm focus:border-blue-500 focus:ring-1"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <span className="text-lg">:</span>

          <select
            value={date?.getMinutes().toString().padStart(2, "0") || "00"}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            className="rounded-md border p-1 text-sm focus:border-blue-500 focus:ring-1"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
