import { PortableText } from '@portabletext/react';

const PortableTextCustom = ({value}) => {

  const firstContent = value[0].children[0].text;
  const isHTML = (/<\/?[a-z][\s\S]*>/i.test(firstContent));

  return (
  
    isHTML ? (
      
      <div dangerouslySetInnerHTML={{__html: firstContent}}/>
    
    ) : (
    
    <PortableText 
      value={value} 
      components={{
        marks: { 
          superscript: SuperscriptMark, 
          color: ColorMark,
        }
      }}
    />

    )

  );

};

const SuperscriptMark = ({children}) => <sup>{children}</sup>;

const ColorMark = ({text, value}) => <span style={{color: value.hex}}>{text}</span>;

export default PortableTextCustom;