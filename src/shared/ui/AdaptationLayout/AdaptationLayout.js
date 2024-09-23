import React from 'react';

const AdaptationLayout = ({ children }) => {
  return (
    <div className="row gy-5 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
      {children}
    </div>
  );
};

export default AdaptationLayout;
