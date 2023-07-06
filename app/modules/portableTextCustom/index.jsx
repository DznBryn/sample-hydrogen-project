import { PortableText } from '@portabletext/react';

const PortableTextCustom = ({value}) => {

  return (
  
    <PortableText 
      value={value} 
      components={{
        marks: { 
          superscript: SuperscriptMark, 
        }
      }}
    />

  );

};

const SuperscriptMark = ({children}) => <sup>{children}</sup>;

export default PortableTextCustom;