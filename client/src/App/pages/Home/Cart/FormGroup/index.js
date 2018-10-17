import styled from 'styled-components';

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-gap: 0.875rem;
  margin-bottom: ${({ tight }) => tight ? '0.5rem' : '0.875rem'};

  @media (max-width: 992px) {
    grid-template-columns: auto;
  }
`;

export default FormGroup;

export const FormField = styled.div`
  color: #CC231C;
  display: flex;
  flex-direction: column;
  grid-column: ${({ span }) => span ? `1 / span ${span}` : 'auto'};
  margin-bottom: ${({ gutterBottom }) => gutterBottom ? '0.5rem' : 0};
  font-size: 0.875em;

  .react-select-container {
    color: rgba(0,0,0,0.8);

    .react-select__control {
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      box-shadow: none;
      min-height: 0;
      height: 38px;

      .react-select__value-container {
        padding: 0 0.75rem;

        .react-select__placeholder {
          color: rgba(0,0,0,0.4);
          font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
            'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
          font-size: 1em;
        }

        .react-select__single-value {
          color: rgba(0,0,0,0.8);
          font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
            'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
          font-size: 1em;
          margin: 0;
        }
      }

      .react-select__control--is-focused {
        border: 1px solid #405DCF;
      }
    }

    .react-select__menu {
      background: #FFFFFF;
      box-shadow: 0;
      border-radius: 4px;
      font-size: 1em;
      padding: 0.5rem 0;

      .react-select__option {
        ${'' /* color: rgba(0,0,0,0.8); */}
        font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
          'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
        font-size: 1em;
        padding: 0.5rem 0.75rem;
      }
    }
  }
`;

export const Label = styled.label`
  color: rgba(0,0,0,0.6);
  font-size: 1em;
  font-weight: 500;
  ${'' /* text-transform: uppercase; */}
  margin-bottom: 0.2rem;
`;

export const Input = styled.input`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1em;
  min-width: 0;
  outline: 0;
  padding: 0.5rem 0.75rem;
  width: 100%;

  ::placeholder {
    color: rgba(0,0,0,0.5);
  }

  &:focus {
    border-color: #405DCF;
  }
`;
