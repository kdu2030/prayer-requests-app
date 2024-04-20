export type SelectOption<ValueType = any> = {
  label: string;
  value: ValueType;
};

export type DatePickerValidRange = {
  startDate?: Date;
  endDate?: Date;
  disabledDates?: Date[];
};

export type DateValue = {
  date?: Date;
  dateStr: string;
};
