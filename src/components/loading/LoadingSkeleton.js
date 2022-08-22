import React from 'react';

const LoadingSkeleton = (props) => {
    return (
        <div className='skeleton' style={{
            height: props.height,
            width: props.width,
            borderRadius: props.borderRadius
        }}>
            
        </div>
    );
};

export default LoadingSkeleton;