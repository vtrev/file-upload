const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

let app =  document.querySelector('#quiz-attachment');
let app2 = document.querySelector('#quiz-attachment-img')



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state =  {
			quizAttachmentFile : null,
			img : null,
			clientUrl: "holder.d7e9ba75.jpg",
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
			if(res.data.error){
				this.setState({
					error:res.data.error,
					clientUrl:"holder.d7e9ba75.jpg"
				})
				return
			}

			globalClientUrl = "data:image/png;base64, "+res.data.base64img;
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
				<img className="img-responsive" data-toggle="modal" data-target="#quizModal" src={ this.state.clientUrl }  alt=""/>
		    </div>
			<div>
				<App2 clientUrl={this.state.clientUrl} />
			</div>
		</div>	
	}
}

function App2({clientUrl}) {

		return <div className="">
			<div id="quizModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="quizModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body" id="quiz-attachment-img" >
						<img className="img-responsive col-8" data-toggle="modal" data-target="#quizModal" src={ clientUrl }  alt=""/>							
						</div>
					</div>
				</div>
			</div>
		</div>	

}

ReactDOM.render(<App />, app);
