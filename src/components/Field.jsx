import React from "react";

function getChildrenId(children) {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }

    /*      if (child?.props?.id) {
        return child.props.id;
    } */
}

const Field = ({ label, children, htmlFor, error }) => {
    const id = htmlFor || getChildrenId(children);

    return (
        <div className='flex flex-col'>
            {label && (
                <label
                    htmlFor={id}
                    className='text-md mr-5 capitalize mb-2 '>
                    {label}
                </label>
            )}
            {children}
            {!!error && <p className='text-xs text-red-600'>{error.message}</p>}
        </div>
    );
};

export default Field;

