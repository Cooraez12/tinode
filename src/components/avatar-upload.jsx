import React from 'react';
import LetterTile from './letter-tile.jsx';

export default class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataUrl: props.avatar
    };

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.dataUrl != nextProps.avatar) {
      return {
        dataUrl: nextProps.avatar
      };
    }
    return null;
  }

  handleFileUpload(e) {
    imageFileScaledToBase64(e.target.files[0], AVATAR_SIZE, AVATAR_SIZE, true,
      // Success
      (base64bits, mime) => {
        var du = makeImageUrl({data: base64bits, type: mime});
        this.setState({dataUrl: du});
        this.props.onImageChanged(du);
      },
      // Failure
      (err) => {
        this.props.onError(err, 'err');
      });
    // Clear the value so the same file can be uploaded again.
    e.target.value = '';
  }

  render() {
    // Randomize id value in case more than one AvatarUpload is shown
    // at the same time.
    var randId = "file-input-avatar-" + (Math.random() + '').substr(2);
    return (
      <div className="avatar-upload">
        {this.state.dataUrl ?
          <img src={this.state.dataUrl} className="preview" /> :
          this.props.readOnly && this.props.uid ?
            <div className="avatar-box">
              <LetterTile
                avatar={true}
                topic={this.props.uid}
                title={this.props.title} />
            </div>
            :
            <div className="blank">128&times;128</div>}
        {this.props.readOnly ? null :
          <input type="file" id={randId} className="inputfile hidden"
            accept="image/*" onChange={this.handleFileUpload} />}
        {this.props.readOnly ? null :
        <label htmlFor={randId} className="round">
          <i className="material-icons">file_upload</i>
        </label>}
      </div>
    );
  }
};
