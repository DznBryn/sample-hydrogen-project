import { PortableText } from '@portabletext/react';

const PortableTextCustom = ({value}) => {

  return (
  
    <PortableText 
      value={value} 
      components={{
        marks: { 
          superscript: SuperscriptMark, 
          color: ColorMark,
        }
      }}
    />

  );

};

const SuperscriptMark = ({children}) => <sup>{children}</sup>;

const ColorMark = ({text, value}) => <span style={{color: value.hex}}>{text}</span>;

export default PortableTextCustom;