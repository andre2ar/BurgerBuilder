import React, {Fragment} from 'react';

const layout = (props) =>(
    <Fragment>
        <div>
            Toobar
        </div>

        <main>
            {props.children}
        </main>
    </Fragment>
);

export default layout;