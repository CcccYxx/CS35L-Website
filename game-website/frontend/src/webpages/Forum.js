import React from 'react';
import Post from '../Components/Post/Post'
import Form from '../Components/Form/Form'

class Forum extends React.Component{
    render(){
        return(
            <div className="forumPageContainer">
                <table className="PostFormContainer">
                    <tr>
                        <td className="posts">
                            <Post/>
                        </td>
                        <td className="form">
                            <Form/>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Forum;