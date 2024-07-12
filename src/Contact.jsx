import React from 'react'

const Contact = () => {
  return (
    <div className='flex justify-center '>
      <div className='h-[500px] mt-[55px] sm:mt-[75px] sm:mx-[50px] mx-[20px]'>
        <div className='mb-3 p-3'>
          <h1 className='p-1 m-2 font-bold'>Contact:</h1>
          <p className='p-1 m-2'>Phone: +977-9812312***</p>
          <p className='p-1 m-2'>Email: blog**#12345@gmail.com</p>
        </div>
        <div className='mb-3 p-3'>
          <h1 className='p-1 m-2 font-bold'>Privacy Policy</h1>
          <h3 className='p-1 m-2 font-bold'>Introduction</h3>
          <p className='break-words p-1 m-2'>Welcome to our Blog App. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our blog app.</p>
          <h3 className='p-1 m-2 font-bold'>Sharing Your Information</h3>
          <p className='break-words p-1 m-2'>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our blog app, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
          <h3 className='p-1 m-2 font-bold'>Cookies and Tracking Technologies</h3>
          <p className='break-words p-1 m-2'>We use cookies and similar tracking technologies to track activity on our blog app and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our blog app.</p>
          <h3 className='p-1 m-2 font-bold'>Data Security</h3>
          <p className='break-words p-1 m-2'>We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee that unauthorized access, hacking, data loss, or other breaches will never occur.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact