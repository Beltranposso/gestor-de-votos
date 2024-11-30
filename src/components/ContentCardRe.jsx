
import React from 'react';

const ContentCardRe = ({svg, description,data}) => {
    return (
        <div className="rounded-lg bg-[#F5F5F5] shadow-sm flex flex-col justify-around pl-2">
       <div>
        {svg||<p>svg</p>}
       </div>

        <div className=' text-sm'>
            <p>{description|| <p>description</p>}</p>
        <div className='text-xl'>{data}</div>
        </div> 

        </div>
    );
};

export default ContentCardRe;
