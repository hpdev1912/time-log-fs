'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { GrAdd } from 'react-icons/gr';
import DatePicker from './DatePicker';
import { useLogStore } from '@/store';
import { useToast } from './ui/use-toast';
import dayjs from 'dayjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function NewLog() {
  const supapase = createClientComponentClient();

  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  const { toast } = useToast();

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw 'Date or hour can not be empty!';
    } else if (log.hour >= 24) {
      throw 'Please enter a valid hour';
    }
  };

  const closeDialog = () => {
    document.getElementById('close-btn')?.click();
  };

  const handleSubmit = async () => {
    validateLog();

    //call supapase to store data into database on supapase
    const { data, error } = await supapase
      .from('logs')
      .upsert({ ...log, date: dayjs(log.date).format('YYYY-MM-DD') })
      .select('*')
      .single();

    if (!error) {
      toast({
        title: 'Successfully create log',
        description: `${log.hour} in ${log.date as Date}`,
      });
      closeDialog();
      setLogs(log, dayjs(log.date).format('YYYY-MM-DD'));
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to create log',
        description: error.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full sm:w-72 border-dashed border py-3 flex items-center justify-center rounded-md cursor-pointer hover:border-solid">
          <GrAdd />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>
          <DialogDescription>
            Remember, time is your most valuable asset - invest it wisely with our Time Log App
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              date
            </Label>
            <DatePicker />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hour" className="text-right">
              hour
            </Label>
            <Input
              id="hour"
              type="number"
              className="col-span-3"
              value={log.hour}
              onChange={(e) =>
                setLog({
                  ...log,
                  hour: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              placeholder="note of the log"
              className="col-span-3"
              value={log.note}
              onChange={(e) =>
                setLog({
                  ...log,
                  note: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
