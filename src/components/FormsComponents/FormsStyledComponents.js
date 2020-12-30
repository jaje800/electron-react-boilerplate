import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import { css } from 'styled-components';
import {
  colors,
  fonts,
  fontSizes,
  devOutline,
  formFieldColor,
} from '../../contexts/styling/LolaTheme';
import { Field, ErrorMessage } from 'formik';
// import DateView from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

/*---------------------------------------------------------------------------------------
Constants for controlling styled components placed here for easy design altering
might extract to gloabal/theme later
---------------------------------------------------------------------------------------*/

export const formRadius = '6px';
const paddingFromInputField = '8px';
const paddingFromFormEdge = '1px';

/*---------------------------------------------------------------------------------------
Home of all form relates  styled components.

Lola Forms Components contains:
FormsContainer: box containing the form
InputGroup: to keep the labels and input fields of a single row blocked together
Label: formatting for labels around input fields
Input: all aspects of the input filed. placeholder, action on error, when focused, etc
StyledInlineErrorMessage: formatting for the error messages
---------------------------------------------------------------------------------------*/

export const FormContainer = styled.section`
  font-family: ${fonts.main};
  font-size: ${fontSizes.formInput};
  width: 60vw;
  //margin-top: 20px;
  //display: flex;
  flex-direction: column;
  border: ${devOutline} solid peachpuff;
`;

export const FormBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  height: auto;
  border: ${devOutline} solid palevioletred;
`;

export const InputGroup = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: ${devOutline} dashed darkorchid;
`;

export const Label = styled.label`
  margin-top: 3px;
  /* display: flex; /* helps 'keep signed in' to center better */
  flex-shrink: 0;
  flex-wrap: nowrap;
  border: ${devOutline} solid limegreen;
  font-size: ${(props) =>
    props.itsy ? `${fontSizes.itsy}` : `${fontSizes.formInput}`};
  padding-right: ${(props) =>
    props.pre ? paddingFromInputField : paddingFromFormEdge};
  padding-left: ${(props) =>
    props.post ? paddingFromInputField : paddingFromFormEdge};
`;

export const Input = styled(InputField)`
  text-transform: ${(props) => (props.allcaps ? `uppercase` : `none`)};
  border: 1px solid ${colors.lolaGray};
  border-radius: ${formRadius};
  padding: 0 0 0 0.25rem;
  font-family: ${fonts.main};
  font-size: ${fontSizes.formInput};
  width: 100%;
  flex-wrap: nowrap;
  margin: 10px;

  background-color: ${formFieldColor};

  &:focus,
  &:active {
    box-shadow: ${colors.lolaGray} 0px 0px 2px 1px;
    border: 1px solid ${colors.lolaBlueNight};
    outline: none;
  }

  /* Autocomplete styles in Chrome
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }
  */

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid ${colors.lolaTeal};

      &:focus,
      &:active {
        border: 1px solid ${colors.lolaTeal};
        box-shadow: ${colors.lolaBlueDim} 0px 0px 2px 1px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      /*
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid ${colors.lolaTeal};
        */
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.lolaRed};
      outline: none;

      &:focus,
      &:active {
        box-shadow: ${colors.lolaRedDim} 0px 0px 2px 1px;
        border: 1px solid ${colors.lolaRed};
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      /*
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid ${colors.lolaRed};
        */
      }
    `}
`;

export const StyledInlineErrorMessage = styled.div`
  font-size: ${fontSizes.mini};
  color: ${colors.lolaRed};
  padding-right: ${(props) => (props.center ? `130px` : `20px`)};
`;

export const DropDownContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  width: calc(285px + 1vw); //FIXTHIS
  border-radius: 3px;
  border: 0.5px solid gray;
`;

//removed from dropdowncontainer
// {devices.input.map(connectedDevice => <SingleItem key={connectedDevice.name}{...props}>{connectedDevice.name}</SingleItem>)}
//if in fact a real drop down list that uses os formatted options, here is where the options will be mapped
export function SelectField(props) {
  const { devices, label, name, ...rest } = props;

  return (
    <DropDownContainer>
      <Label htmlFor={name}>{label}</Label>
      <Field as="select" id={name} name={name} {...rest}>
        <DropDownContainer></DropDownContainer>
      </Field>
      <ErrorMessage component={StyledInlineErrorMessage} name={name} />{' '}
      {/*needs an error message style variation*/}
    </DropDownContainer>
  );
}

//this had been used to style the select field. The options filed was unreachable, so
//the component has been defined separately in the AudioStyledComponents file
// const DropSelect = styled(SelectField)`
//   width: 400px;
//   padding: 6px 6px;
//   text-indent: 80px;
//   font-size: ${fontSizes.text};
//   line-height: 1.42857143;
//   color: ${colors.textColor};
//   appearance: none;
//   background: url(${tealRight}) 5% / 5% no-repeat;
//   border: 1px solid ${colors.lolaBlue};
//   border-radius: 4px;
//   &:hover {/* trying to get to the option options */}
//   border: 1px solid purple;
//   background-color: wheat;
// `;

export function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={StyledInlineErrorMessage} name={name} />{' '}
      {/*probably needs a error message variation*/}
    </div>
  );
}

// export function DatePicker (props) {
//   const { label, name, ...rest } = props
//   return (
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <Field name={name}>
//         {({ form, field }) => {
//           const { setFieldValue } = form
//           const { value } = field
//           return (
//             <DateView
//               id={name}
//               {...field}
//               {...rest}
//               selected={value}
//               onChange={val => setFieldValue(name, val)}
//             />
//           )
//         }}
//       </Field>
//       <ErrorMessage component={StyledInlineErrorMessage} name={name} />
//     </div>
//   )
// }

export function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={StyledInlineErrorMessage} name={name} />
    </div>
  );
}

// export function SampleInput (props) {
//   const { label, name, ...rest } = props
//   return (
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <Field id={name} name={name} {...rest} />
//       <ErrorMessage component={StyledInlineErrorMessage} name={name} />
//     </div>
//   )
// }

export function InputField({ className, valid, error, ...props }) {
  return <Field className={className} {...props} />;
}

export function TextArea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage component={StyledInlineErrorMessage} name={name} />
    </div>
  );
}

//L8R separate the props filtering functions into one file
//I don't completely understand how all of the props filtering is working
//I combined documented methods and used trial and error
//is there a better way?
