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
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}
export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const generateTimeArray = (max: number): string[] => {
    return Array.from({ length: max }, (_, i) => String(i).padStart(2, "0"));
  };

  const hours = generateTimeArray(24);
  const minutes = generateTimeArray(60);

  const handleTimeChange = (type: "hour" | "minute", timeValue: string) => {
    if (!value) return;

    const newDate = new Date(value.getTime());
    const numValue = parseInt(timeValue, 10);

    if (type === "hour") {
      newDate.setHours(numValue);
    } else {
      newDate.setMinutes(numValue);
    }
    onChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "dd/MM/yyyy HH:mm")
          ) : (
            <span>Selecione data e hora</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />

        <div className="flex items-center justify-center gap-2 border-t p-3">
          <Label className="text-sm">Hora:</Label>

          <select
            value={value?.getHours().toString().padStart(2, "0") || "00"}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            className={cn(
              "flex h-9 w-fit items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {hours.map((h) => (
              <option
                key={h}
                value={h}
                className="bg-background text-foreground"
              >
                {h}
              </option>
            ))}
          </select>

          <span className="text-lg">:</span>

          <select
            value={value?.getMinutes().toString().padStart(2, "0") || "00"}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            className={cn(
              "flex h-9 w-fit items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {minutes.map((m) => (
              <option
                key={m}
                value={m}
                className="bg-background text-foreground"
              >
                {m}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
