const studioSettings = {
  components: {
    logo: ({title, renderDefault, ...props}) => {
      return (
        <div style={{display: 'flex'}}>
          <img
            style={{height: '35px'}}
            alt="Welcome To Tula"
            decoding="async"
            src="https://cdn.shopify.com/s/files/1/1736/9637/files/5yOoDPBE.png?v=1671489084"
            loading="lazy"
          />
          {renderDefault({...props, title: title})}
        </div>
      )
    },
  },
}

export default studioSettings
