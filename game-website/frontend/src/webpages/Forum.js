import React from 'react';
import { Container } from '@material-ui/core';
import { Grow, Grid } from '@material-ui/core';
import Posts from '../Components/Uploads/Posts.js'
import Form from '../Components/Form/form'

const Forum = () => {
    return(
        <Container> 
           <Grow in> 
                <Container>
                    <Grid container justify= "space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                         </Grid>   
                         <Grid item xs={12} sm={4}>
                             <Form />
                         </Grid>
                    </Grid>
                </Container>
           </Grow>
        </Container>
    );
};

export default Forum;