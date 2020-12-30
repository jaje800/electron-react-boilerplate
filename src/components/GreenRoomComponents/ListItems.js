import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {
  colors,
  fontSizes,
  devOutline,
} from '../../contexts/styling/LolaTheme';
// import tealRight from '../../assets/images/tealRight.png'; //temporary til get correct gtraphics
// import whiteSq from '../../assets/images/whiteSq.png'; //temporary will replace with rect of theme background color
import { DropDownContainer } from '../FormsComponents/FormsStyledComponents';

//the item container has the image and the text for a selectable item
//the image is the teal right arrow or no image if not selected
const ItemContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  color: ${colors.textColor};
  appearance: none;
  &:hover {
    color: ${colors.lolaYellow};
  }
`;

//ItemText is the text name of the selectable item in the list
const ItemText = styled.div`
  cursor: pointer;
  font-size: ${fontSizes.txt};
  padding-left: 30px;
`;

const ArrowImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

/*-----------------------------------------------------------------
L8R I am making my own dropdown component to adhere to Robin's design
note: this component list devices, a use we no longer need
it could be repurposed to list saved setups?

    let preImgSrc;
    if (devId === deviceId) {
      console.log('this is the one');
      preImgSrc = tealRight;
    } else preImgSrc = whiteSq;


---------------------------------------------------------*/
export function ListItems(props) {
  const { devices, listOf, ...rest } = props; //destructuring this way allows me to still pass all props in a spread
  const [touched, setTouched] = useState(false);
  let allItems = listOf === 'output' ? devices.output : devices.input;

  //a single list item
  function SingleItem({ value, listOf, ...rest }) {
    let storage = window.localStorage;
    let key =
      listOf === 'output'
        ? 'audio-output-configuration'
        : 'audio-input-configuration';
    let storedValue = storage.getItem(key);
    let isSelected = JSON.stringify(value) === storedValue;
    //    let preImgSrc = isSelected ? tealRight : whiteSq;

    //handles the selection and stores the selection in local storage
    function handleItemSelect({ value, listOf }) {
      setTouched(!touched);
      let key =
        listOf === 'output'
          ? 'audio-output-configuration'
          : 'audio-input-configuration';
      let selectedItem = value;
      storage.setItem(key, JSON.stringify(selectedItem));
    }

    return (
      <div>
        <ItemContainer onClick={() => handleItemSelect({ value })} {...rest}>
          <ItemText {...rest} />
        </ItemContainer>
      </div>
    );
  }

  return (
    <DropDownContainer>
      {Object.entries(allItems).map((theItem) => (
        <SingleItem value={theItem[1]} key={theItem[1].name} {...props}>
          {theItem[1].name}
        </SingleItem>
      ))}
    </DropDownContainer>
  );
}
