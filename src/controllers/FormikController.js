import React from 'react';
import {
  //SelectField,  //customizing with droplist for now
  //DatePicker,   //not ready for this yet
  //ChakraInput,  //not ready for this yet
  CheckboxGroup,
  RadioButtons,
  Input,
  TextArea,
} from '../components/FormsComponents/FormsStyledComponents';
import { ListItems } from '../components/GreenRoomComponents/ListItems';

//commented out "select" option for now
//not actually using the "dropList" case in a real form yet
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />;
    case 'droplist':
      return <ListItems {...rest} />;
    case 'radio':
      return <RadioButtons {...rest} />;
    case 'checkbox':
      return <CheckboxGroup {...rest} />;
    // case 'date':
    //   return <DatePicker {...rest} />
    default:
      return null;
  }
}

export default FormikControl;
