import styled from 'styled-components';

const Wrapper = styled.li`
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const CartListItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

const CartListItemName = styled.h5`
  color: rgba(0,0,0,0.8);
  font-size: 1.25em;
  font-weight: 500;
`;

const CartListItemPrice = styled.h5`
  color: #449C6C
  font-size: 1.25em;
`;

const CartListItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CartListItemSelect = styled.div`
  overflow: visible;
  position: relative;
`;

const CartListItemSelectButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  color: rgba(0,0,0,0.8);
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1em;
  font-weight: 500;
  height: 44px;
  min-width: 8rem;
  outline: none;
  padding: 0.5rem 0.75rem;
  text-align: left;
  position: relative;

  &:focus {
    border-color: #405DCF;
  }

  &:after {
    position: absolute;
    content: "";
    top: 18px;
    right: 12px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-color: #757575 transparent transparent transparent;
  }
`;

const CartListItemSelectOptions = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 8rem;
  padding: 0.25rem 0;
  z-index: 6;
`;

const CartListItemSelectOptionsHeader = styled.header`
  color: rgba(0,0,0,0.6);
  font-size: 0.875em;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0.25rem 0.75rem 0.5rem 0.75rem;
  position: relative;
  text-transform: uppercase;

  &:after {
    bottom: 0;
    border-bottom: 1px solid #E0E0E0;
    content: "";
    left: 0;
    height: 1px;
    width: 100%;
    right: 0;
    position: absolute;
  }
`;

const CartListItemSelectOption = styled.div`
  background: ${({ selected }) => selected ? '#405DCF' : 'transparent'};
  color: ${({ selected }) => selected ? '#FFFFFF' : 'rgba(0,0,0,0.8)'};
  font-weight: ${({ selected }) => selected ? 500 : 400};
  margin: ${({ selected }) => selected ? '0 -1px' : 0};
  cursor: ${({ selected }) => selected ? 'default' : 'pointer'};
  padding: 0.5rem 1rem;
`;

export {
  Wrapper,
  CartListItemContent,
  CartListItemName,
  CartListItemPrice,
  CartListItemActions,
  CartListItemSelect,
  CartListItemSelectButton,
  CartListItemSelectOptions,
  CartListItemSelectOptionsHeader,
  CartListItemSelectOption,
};
