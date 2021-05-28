import axios from 'axios';
import React from 'react';
import FileBase from 'react-file-base64'
import './Form.css';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            creator:"",
            title:"",
            message:"",
            tags: "",
            selectedFile:"",
        }
    }

    onInputChangeCreator = (event) => {
        this.setState({creator: event.target.value});
    }

    onInputChangeTitle = (event) => {
        this.setState({title: event.target.value});
    }

    onInputChangeMsg = (event) => {
        this.setState({message: event.target.value});
    }

    onInputChangeTags = (event) => {
        this.setState({tags: event.target.value});
    }

    handleFileSubmit = ({base64}) => {
        this.setState({selectedFile: base64})
    }

    handleSubmit = () => {
        const newPost = {
            creator: this.state.creator,
            title: this.state.title,
            message: this.state.message,
            tags: this.state.tags.split(','),
            selectedFile: this.state.selectedFile
        }
        axios.post("/forum", newPost);
    }

    render(){
        return(
            <div className="formContainer">
                <div class="formInput">
                    <form>
                        <h2 id="formTitle">Make a Post</h2>
                        <label>
                            Creator 
                            <input type="text" class="formInput" autofocus placeholder="Creator" onChange={this.onInputChangeCreator}/>
                        </label>
                        <label>
                            Title
                            <input type="text" class="formInput" autofocus placeholder="Title" onChange={this.onInputChangeTitle} /> 
                        </label>
                        <label>
                            Messages
                            <input type="text" class="formInput" autofocus placeholder="Messages" onChange={this.onInputChangeMsg} /> 
                        </label>
                        <label>
                            Tags
                            <input type="text" class="formInput" autofocus placeholder="Tags(seperacted with ',')" onChange={this.onInputChangeTags} /> 
                        </label>
                    </form>
                </div>
                <div className="uploadFile">
                    <FileBase
                        type="file"
                        multiple={ false }
                        onDone={this.handleFileSubmit}
                    />
                </div>
                <button onClick={this.handleSubmit}>SUBMIT</button>
            </div>
        );
    }
}

export default Form;