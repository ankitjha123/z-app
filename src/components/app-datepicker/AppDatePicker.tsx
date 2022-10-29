import moment from 'moment';
import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

export interface Dates {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
}

export interface DatePickerProps {
    appDates: Record<"startDate" | "endDate", moment.Moment>
    setAppDates: React.Dispatch<React.SetStateAction<{
        startDate: moment.Moment;
        endDate: moment.Moment;
    }>>
}


export function AppDatePicker({appDates, setAppDates} : DatePickerProps) {
    const [focusedInput, setFocusedInput] = React.useState<moment.Moment | null>(null);
    
    const {startDate, endDate} = appDates

    const isOutsideRange = React.useCallback((day: moment.Moment) => {
        return day.isBefore(moment.utc("2021-07-24"),) ||  day.isSameOrAfter(moment.utc("2021-08-26").add(1,'days'));
    },[])

    const handleDatesChange = (dates: Dates) => {
        if(dates.startDate!==null && dates.endDate!==null) {
            setAppDates({
                startDate: dates.startDate,
                endDate: dates.endDate
            });
        }
    };

    return (<DateRangePicker
        showDefaultInputIcon
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        minimumNights={0}
        isOutsideRange={(day) => isOutsideRange(day)}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        small
        hideKeyboardShortcutsPanel
        readOnly
        anchorDirection="right"
        //@ts-ignore
        focusedInput={focusedInput}
        //@ts-ignore
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
    />)
}