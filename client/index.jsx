const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');



let app =  document.querySelector('#quiz-attachment');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quizAttachmentFile : null,
			img : null,
			clientUrl:"holder.d7e9ba75.jpg",
			error: ''

		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onClickHandler  = this.onClickHandler.bind(this);

	}
	
	onChangeHandler(e){
		this.setState({
			quizAttachmentFile: event.target.files[0],
			uploaded: 0,
		  });
	}

	onClickHandler(){
		let formData =  new FormData();
		formData.append('quizAttachment', this.state.quizAttachmentFile);

		axios.post('/api/uploadQuizAttachment',formData).then((res)=>{
			console.log(res.data)
			if(res.data.error){
				this.setState({
					error:res.data.error,
					clientUrl:"holder.d7e9ba75.jpg"
				})
				return
			}
			this.setState({
				clientUrl : "data:image/png;base64, "+res.data.base64img,
				error:''
			})
		});
	}
	
	render() {
		return <div className="col-8">
			<form  method='post' encType="multipart/form-data">
			<input type="file" name="quizAttachment" onChange={this.onChangeHandler}/>
			<button type='button' value='upload' onClick={this.onClickHandler}>Upload Image</button>
			<br/>
			<p className="error">{this.state.error}</p>
		</form>
		<br/>
		<div className="">
			<img src={ this.state.clientUrl }  alt=""/>
		</div>
		</div>	
	}
}

ReactDOM.render(<App />, app);