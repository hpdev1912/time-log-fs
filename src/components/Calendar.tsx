'use client';
import dayjs from 'dayjs';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { useLogStore } from '@/store';

export default function Calendar() {
  const logs = useLogStore((state) => state.logs);

  const getDateInMonth = (year = dayjs().year(), month = dayjs().month()) => {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf('month');

    const dateArray = [];
    for (let i = startDate.date(); i <= endDate.date(); i++) {
      dateArray.push(startDate.date(i).format('YYYY-MM-DD'));
    }
    return dateArray;
  };

  const getColor = (value: number) => {
    if (value === 0) {
      return 'bg-gray-100';
    } else if (value < 5) {
      return 'bg-green-100';
    } else if (value < 10) {
      return 'bg-green-300';
    } else {
      return 'bg-green-500';
    }
  };

  const hour = 10;
  return (
    <div className="border border-dashed flex flex-wrap gap-2 p-5 justify-center rounded-md">
      {getDateInMonth().map((value, index) => {
        const log = logs[value];
        return (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div className={`h-5 w-5 rounded-sm ${getColor(log?.hour || 0)}`}></div>
            </HoverCardTrigger>
            <HoverCardContent>{`${log?.hour || 0} hour on ${value}`}</HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
