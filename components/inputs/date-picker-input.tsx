import * as React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";

interface Props {
  name: string;
  locale: SupportedLanguages;
  label: string;
}
