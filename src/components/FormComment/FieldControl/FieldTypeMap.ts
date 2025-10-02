import Single from './Single';
import Multiline from './Multiline';
import Choice from './Choice';
import Number from './Number';
import DateTime from './DateTime';
import Checkbox from './Checkbox';
import Person from './Person';
import Currency from './Currency';
import Calculated from './Calculated';
import Radio from './Radio';
import DropDownList from './DropDownList';
import Combobox from './Combobox';
import Lookup from './Lookup';
import Details from './Details';
import Related from './Related';
import Attachments from './Attachments';

// Ánh xạ FieldTypeId -> Component
export const fieldTypeComponentMap: Record<number, React.FC<any>> = {
  1: Single,
  2: Multiline,
  3: Choice,
  4: Number,
  5: DateTime,
  6: Checkbox,
  7: Person,
  8: Currency,
  9: Calculated,
  10: Radio,
  11: DropDownList, 
  12: Combobox,
  13: Lookup,
  14: Details,
  15: Related,
  17: Attachments,
  // Thêm các ánh xạ khác nếu cần
};