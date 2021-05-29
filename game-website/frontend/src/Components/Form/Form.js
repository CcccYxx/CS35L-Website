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

    handleSubmit = (event) => {
        event.preventDefault(); //needs to be fixed so no empty submit
        if(this.state.creator==="" || this.state.title==="" || this.state.message===""||this.state.tags===""){
            alert("Please fill in the form completely");
        }else{
            const newPost = {
                creator: this.state.creator,
                title: this.state.title,
                message: this.state.message,
                tags: this.state.tags.split(','),
                selectedFile: this.state.selectedFile
            }
            axios.post("/forum/post", newPost);
            window.location.reload(false);
        }
    }

    render(){
        return(
            <div className="formContainer">
                <div className="formInput">
                    <form>
                        <h2 id="formTitle">Make a Post</h2>
                        <label>
                            Creator 
                            <input type="text" className="formInput"  required placeholder="Creator" onChange={this.onInputChangeCreator}/>
                        </label>
                        <label>
                            Title
                            <input type="text" className="formInput"  required placeholder="Title" onChange={this.onInputChangeTitle} /> 
                        </label>
                        <label>
                            Tags
                            <input type="text" className="formInput"  required placeholder="Tags(seperated with ',')" onChange={this.onInputChangeTags} /> 
                        </label>
                        <label>
                            Messages
                            <input type="text" className="formInput"  required placeholder="Messages" onChange={this.onInputChangeMsg} /> 
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