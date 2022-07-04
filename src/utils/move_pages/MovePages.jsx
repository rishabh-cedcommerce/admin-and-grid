import React from 'react';

import  {Pagination} from '@shopify/polaris';

function MovePages({handlePage}) {
    return ( 
        <Pagination
        hasPrevious
        onPrevious={() => {
          handlePage("Previous");
        }}
        hasNext
        onNext={() => {
            handlePage("Next");
        }}
      />
     );
}

export default MovePages;