import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
  };
  

const ContactUs = ({content}) => {
  const emailAddress = "mailto:" + content[0].emailAddress;
  
  return (
    <div id="contact-us" className="fixedWidthPage minHeight">
        <div className={"contactUsWrapper"}>
            <div className={"contacUsHeader"}>
            <h1>{content[0].name}</h1>
            <h2>
                {content[0].contactMessage}
            </h2>
        </div>

        <div className={"contactUsBody"}>
          
          <div className={"contactUsDetails"}>
            <div>
              <img className={"contactIcon"} src={content[0].contactEmailIcon.asset.url} />
              <h3>{content[0].contactEmailHeader}</h3>
              <a href={emailAddress}>{content[0].emailAddress}</a>
            </div>
            <div>
              <img className={"contactIcon"} src={content[0].contactPhoneIcon.asset.url} />
              <h3>{content[0].contactPhoneHeader}</h3>
              <p className={styles.secondHeader}>{content[0].phoneNumber}</p>
              <p>{content[0].officeHours}</p>
            </div>

            <div>
              <img className={"contactIcon"} src={content[0].contactSocialIcon.asset.url} />
              <h3>{content[0].contactSocialHeader}</h3>
              <div className={"socialWrapper"}>
                <a href="https://www.instagram.com/tula/" target="_blank">
                  <svg viewBox="0 0 27 27" fill="#4c4e56" xmlns="http://www.w3.org/2000/svg"><path d="M20.713 10.541C20.713 12.009 20.717 13.478 20.713 14.951C20.705 17.083 19.713 18.662 17.94 19.778C16.902 20.426 15.75 20.713 14.528 20.713C11.853 20.713 9.183 20.725 6.509 20.709C4.651 20.697 3.052 20.04 1.784 18.662C1.00813 17.8318 0.521891 16.7726 0.397998 15.643C0.372687 15.3992 0.361668 15.1541 0.364998 14.909C0.364998 11.985 0.360998 9.06004 0.364998 6.13604C0.376998 3.99904 1.37 2.42004 3.142 1.30404C4.188 0.652043 5.344 0.370043 6.575 0.370043C9.241 0.370043 11.907 0.358043 14.573 0.374043C16.439 0.387043 18.043 1.04704 19.31 2.43404C20.0777 3.26129 20.5581 4.31406 20.68 5.43604C20.733 5.88604 20.709 6.33804 20.713 6.78504C20.717 8.04004 20.713 9.29104 20.713 10.542V10.541ZM1.887 10.541C1.887 12.046 1.883 13.547 1.887 15.053C1.891 16.086 2.268 16.976 2.974 17.715C3.921 18.703 5.102 19.183 6.46 19.191C9.155 19.208 11.845 19.195 14.54 19.195C15.41 19.195 16.238 19.007 16.993 18.572C18.403 17.764 19.199 16.574 19.199 14.909V6.03004C19.199 5.00504 18.826 4.11904 18.125 3.38504C17.185 2.39204 16 1.90504 14.647 1.89604C11.923 1.87604 9.204 1.88804 6.48 1.88804C5.64278 1.88183 4.81862 2.09563 4.09 2.50804C2.682 3.31904 1.883 4.50804 1.887 6.17404V10.542V10.541Z"/><path d="M10.27 15.369C9.64363 15.3726 9.02274 15.252 8.44319 15.0143C7.86364 14.7766 7.33691 14.4265 6.89342 13.9841C6.44993 13.5417 6.09846 13.0159 5.8593 12.4369C5.62014 11.858 5.49803 11.2374 5.50002 10.611C5.50402 8.039 7.65802 5.931 10.287 5.935C12.928 5.935 15.061 8.055 15.057 10.672C15.053 13.265 12.907 15.369 10.27 15.369ZM10.27 13.851C12.07 13.851 13.54 12.42 13.54 10.661C13.54 8.892 12.083 7.453 10.287 7.453C8.48702 7.453 7.01702 8.884 7.01702 10.643C7.01702 12.411 8.47402 13.851 10.27 13.851ZM14.606 5.55C14.606 4.967 15.053 4.5 15.611 4.5C16.168 4.5 16.615 4.971 16.615 5.55C16.615 6.12 16.168 6.587 15.619 6.591C15.061 6.595 14.606 6.132 14.606 5.55Z"/></svg>
                </a>
                <a href="https://www.facebook.com/TULA/" target="_blank">
                  <svg viewBox="0 0 27 27" fill="#4c4e56" xmlns="http://www.w3.org/2000/svg"><path d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9913 3.65687 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93043 3.90625 12.2146 3.90625C13.3088 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1921C11.9499 6.5625 11.5625 7.33332 11.5625 8.12414V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9913 20 10Z" /></svg>
                </a>
                <a href="https://www.pinterest.com/liveTULA/" target="_blank">
                  <svg viewBox="0 0 27 27" fill="#4c4e56" xmlns="http://www.w3.org/2000/svg"><path d="M10.5002 0C4.70154 0 0 4.70026 0 10.5002C0 14.7992 2.58529 18.4927 6.28478 20.1169C6.25536 19.3831 6.27966 18.5038 6.46771 17.706C6.66939 16.8532 7.81855 11.9845 7.81855 11.9845C7.81855 11.9845 7.48297 11.3142 7.48297 10.3233C7.48297 8.76773 8.38482 7.60578 9.50797 7.60578C10.4631 7.60578 10.9245 8.32299 10.9245 9.18134C10.9245 10.1416 10.3117 11.5773 9.99706 12.9073C9.73439 14.0215 10.5556 14.9301 11.6545 14.9301C13.6437 14.9301 14.9839 12.3751 14.9839 9.34764C14.9839 7.04634 13.4339 5.32366 10.6149 5.32366C7.42967 5.32366 5.44561 7.69874 5.44561 10.3518C5.44561 11.2669 5.71553 11.9116 6.13809 12.4114C6.33211 12.6403 6.3594 12.7329 6.28904 12.996C6.23873 13.1891 6.12317 13.6548 6.07541 13.839C6.00548 14.1055 5.79015 14.2006 5.54966 14.1021C4.08282 13.5034 3.3993 11.8967 3.3993 10.0904C3.3993 7.10817 5.91466 3.53148 10.9036 3.53148C14.9118 3.53148 17.5504 6.43274 17.5504 9.54677C17.5504 13.665 15.261 16.7424 11.8856 16.7424C10.7518 16.7424 9.68535 16.1292 9.32035 15.4341C9.32035 15.4341 8.71059 17.8536 8.58182 18.32C8.35924 19.1302 7.92302 19.9391 7.52476 20.5693C8.46925 20.8482 9.46661 21 10.5006 21C16.2989 21 21 16.2997 21 10.5006C20.9996 4.70026 16.298 0 10.5002 0Z"/></svg>
                </a>
                <a href="https://twitter.com/tula" target="_blank">
                  <svg viewBox="0 0 27 27" fill="#4c4e56" xmlns="http://www.w3.org/2000/svg"><path d="M6.60409 19.0323C14.5286 19.0323 18.863 12.4669 18.863 6.77336C18.863 6.5869 18.863 6.40127 18.8505 6.21645C19.6937 5.60651 20.4216 4.85137 21 3.98627C20.2137 4.3347 19.3795 4.56315 18.5254 4.66413C19.4246 4.12584 20.098 3.27854 20.4195 2.28104C19.5738 2.78287 18.6485 3.13659 17.6837 3.32686C16.869 2.46057 15.7313 1.96875 14.5422 1.96875C12.1763 1.96875 10.2296 3.91552 10.2296 6.2813C10.2296 6.6095 10.2671 6.93669 10.3412 7.25636C6.87877 7.08282 3.6483 5.44507 1.46159 2.75481C0.324475 4.71233 0.912844 7.24914 2.7955 8.50627C2.10993 8.48597 1.43907 8.30099 0.84 7.967V8.02159C0.840574 10.0647 2.29388 11.8406 4.29659 12.2451C3.66233 12.4181 2.99668 12.4434 2.35118 12.319C2.9142 14.0698 4.53776 15.2766 6.37645 15.3111C4.85108 16.5099 2.96572 17.1611 1.02564 17.1591C0.682828 17.1585 0.340348 17.1377 0 17.097C1.97014 18.3613 4.26316 19.0321 6.60409 19.029" /></svg>
                </a>
              </div>
            </div>

         
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ContactUs